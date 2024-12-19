import { Request, Response, NextFunction } from 'express';
import { IMiddleWare } from './middleware.interface';

export class AuthGuardMiddleware implements IMiddleWare {
	execute(req: Request, res: Response, next: NextFunction): void {
		if (!req.user) {
			res.status(401).send('you not authorized');
		} else {
			next();
		}
	}
}
