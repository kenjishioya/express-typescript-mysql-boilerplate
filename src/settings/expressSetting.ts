import { Application } from "express";
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from 'typedi'
import { authorizationChecker } from "../auth/authorizationChecker";
import { env } from '../env'

export class ExpressSetting {
    private static app: Application 

    public static createApp() {
        if (!ExpressSetting.app) {
            useContainer(Container)
            const expressApp = createExpressServer({
                cors: true,
                classTransformer: true,
                routePrefix: env.app.routePrefix,
                defaultErrorHandler: false,
                controllers: env.app.dirs.controllers,
                middlewares: env.app.dirs.middlewares,
                interceptors: env.app.dirs.interceptors,
                authorizationChecker: authorizationChecker()
            })
            ExpressSetting.app = expressApp
        }
        return ExpressSetting.app
    }
}
