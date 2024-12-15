import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../type';

@injectable()
export class PrismaService {
	client: PrismaClient;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			this.logger.log('[PrismaService] data base connected');
			await this.client.$connect();
		} catch (err) {
			if (err instanceof Error) {
				this.logger.error(`[PrismaService] Error data base connect: ${err.message}`);
			} else {
				this.logger.error(`[PrismaService] Error data base connect`);
			}
		}
	}

	async disConnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
