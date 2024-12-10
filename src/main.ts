import { Container, ContainerModule, interfaces } from "inversify";
import { App } from "./app";
import { ExceptionFilter } from "./errors/exception.filter";
import { LoggerService } from "./logger/loggerService";
import { UserController } from "./users/user.controller";
import { ILogger } from "./logger/logger.interface";
import { TYPES } from "./type";
import { IExceptionFilter } from "./errors/exception.filter.interface";
import 'reflect-metadata';
import { IUserController } from "./users/user.controller.interface";

// const logger = new LoggerService()
// const app = new App(
//     logger,
//     new UserController(logger),
//     new ExceptionFilter(logger)
// );
// await app.init()
export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
    bind<ILogger>(TYPES.ILogger).to(LoggerService);
    bind<IUserController>(TYPES.IUserController).to(UserController);
    bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
    bind<App>(TYPES.Application).to(App);
})
function bootstrap() {
    const appContainer = new Container()
    appContainer.load(appBindings)
    const app = appContainer.get<App>(TYPES.Application);
    app.init();
    return { app, appContainer };
}


export const { app, appContainer } = bootstrap();