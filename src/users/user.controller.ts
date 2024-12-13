import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../type';
import 'reflect-metadata';
import { IUserController } from './user.controller.interface';
import fs from 'fs';
import { resolve } from 'path';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
	) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/login', method: 'post', func: this.login },
			{ path: '/register', method: 'post', func: this.register },
		]);
	}

	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		console.log(req.body);
		next(new HTTPError(401, 'ошибка авторизации', 'login'));
	}

	async register(
		{ body }: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		console.log(body);
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HTTPError(422, 'user exist'));
		}
		this.ok(res, { email: result.email });
	}
}
