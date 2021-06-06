import { ExpressSetting, TypeormSetting } from './settings'
import { env } from './env'
import { Logger, LoggerInterface } from './decorators/Logger';
import { Server } from 'http';
import { Service } from 'typedi';

@Service()
export class AppServer {

    private server: Server

    constructor(
        @Logger(__filename) private log: LoggerInterface
    ) {}

    async startServer() {
        const connection = await TypeormSetting.getConnection()
        this.server = ExpressSetting.createApp()
        .listen(env.app.port)
        .on('listening', () => this.log.info(`Listening at port ${env.app.port} ...`))
        .on('close', () => connection.close())
    }

    private exitHandler() {
        if (this.server) {
            this.server.close(() => {
                this.log.info('Server closed')
                process.exit(1)
            })
        } else {
            process.exit(1)
        }
    }

    public unexpectedErrorHandler(error: Error) {
        this.log.error(error.name, error.message, error.stack);
        this.exitHandler()
    }

    public shutdownHander(code: string) {
        this.log.info(`Server is shutting down with ${code}....`)
        this.exitHandler()
    }
}
