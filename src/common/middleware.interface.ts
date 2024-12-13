import { Request, Response, NextFunction, Router } from 'express';
export interface IMiddleWare {
	execute: (req: Request, res: Response, next: NextFunction) => void;
}
