import 'reflect-metadata';

import { AppServer } from './app'
import Container from 'typedi';

import { LoggerSetting } from './settings'
import { Logger } from './lib/logger'
LoggerSetting.configure()
const log = new Logger(__filename)
const appServer = Container.get<AppServer>(AppServer)
appServer.startServer().then(() => {
    process.on('uncaughtException', appServer.unexpectedErrorHandler)
    process.on('unhandledRejection', appServer.unexpectedErrorHandler)
    process.on('SIGINT', () => {
        appServer.shutdownHander('SIGINT')
    })
    process.on('SIGTERM', () => {
        appServer.shutdownHander('SIGTERM')
    })
}).catch((error: Error) => {
    log.error('Failed to start Server....')
    log.error(error.message, error.stack)
})

