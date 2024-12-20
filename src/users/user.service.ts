import { inject, injectable } from 'inversify';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../type';
import { IUserRepository } from './user.repository.interface';
import { UserModel } from '@prisma/client';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UserRepository) private userRepository: IUserRepository,
	) {}
	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, name);
		const salt = Number(this.configService.get('SALT'));
		await newUser.setPassword(password, salt);
		console.log(newUser.password);
		const findUser = await this.userRepository.find(email);
		if (findUser) return null;
		return await this.userRepository.create(newUser);
	}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const existedUser = await this.userRepository.find(email);
		if (!existedUser) return false;
		const newUser = new User(existedUser.email, existedUser.name, existedUser.password);
		return newUser.comparePasswords(password);
	}

	async getUserInfo(email: string): Promise<UserModel | null> {
		return await this.userRepository.find(email);
	}
}
