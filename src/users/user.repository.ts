import { UserModel } from '@prisma/client';
import { User } from './user.entity';
import { IUserRepository } from './user.repository.interface';
import { PrismaService } from '../database/prisma.service';
import { TYPES } from '../type';
import { inject, injectable } from 'inversify';

@injectable()
export class UserRepository implements IUserRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}
	async create({ email, password, name }: User): Promise<UserModel> {
		return this.prismaService.client.userModel.create({
			data: {
				email,
				name,
				password,
			},
		});
	}
	async find(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
		});
	}
}
