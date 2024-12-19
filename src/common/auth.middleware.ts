import { Request, Response, NextFunction } from 'express';
import { IMiddleWare } from './middleware.interface';
import { verify } from 'jsonwebtoken';

export class AuthMiddleware implements IMiddleWare {
	constructor(private secret: string) {}
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			const jwt = req.headers.authorization.split(' ')[1];
			new Promise((resolve, reject) => {
				verify(jwt, this.secret, (err, payload) => {
					if (err) {
						next();
					} else if (payload && typeof payload !== 'string') {
						req.user = payload.email;
						next();
					}
				});
			});
		} else {
			next();
		}
	}
}
