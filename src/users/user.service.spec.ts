import 'reflect-metadata';
import { Container } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { IUserRepository } from './user.repository.interface';
import { UserService } from './user.service';
import { IUserService } from './user.service.interface';
import { TYPES } from '../type';
import { User } from './user.entity';
import { UserModel } from '@prisma/client';

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};
const UsersRepositoryMock: IUserRepository = {
	create: jest.fn(),
	find: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUserRepository;
let usersService: IUserService;
let createdUser: UserModel | null;

beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UserService);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
	container.bind<IUserRepository>(TYPES.UserRepository).toConstantValue(UsersRepositoryMock);

	configService = container.get<IConfigService>(TYPES.ConfigService);
	usersRepository = container.get<IUserRepository>(TYPES.UserRepository);
	usersService = container.get<IUserService>(TYPES.UserService);
});

describe('User service,', () => {
	it('Create user', async () => {
		configService.get = jest.fn().mockReturnValueOnce('1');
		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				email: user.email,
				name: user.name,
				password: user.password,
				id: 1,
			}),
		);
		createdUser = await usersService.createUser({
			email: 'a@a.ru',
			name: 'andre',
			password: '123',
		});

		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual('123');
	});

	it('Validate user success', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const res = await usersService.validateUser({
			email: 'a@a.ru',
			password: '123',
		});
		expect(res).toBeTruthy();
	});
	it('Validate user not valid password', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const res = await usersService.validateUser({
			email: 'a@a.ru',
			password: '1234',
		});
		expect(res).toBeFalsy();
	});
	it('Validate not exist user', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(null);
		const res = await usersService.validateUser({
			email: 'a1@a.ru',
			password: '1234',
		});
		expect(res).toBeFalsy();
	});
});
