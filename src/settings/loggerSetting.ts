import { configure, format, transports } from 'winston';

import { env } from '../env';

export class LoggerSetting {
    static configure() {
        configure({
            transports: [
                new transports.Console({
                    level: env.log.level,
                    handleExceptions: true,
                    format: env.node !== 'development'
                        ? format.combine(
                            format.json()
                        )
                        : format.combine(
                            format.colorize(),
                            format.simple()
                        ),
                }),
                new transports.File({
                    filename: env.log.errorFilePath,
                    format: format.json(),
                    level: 'error'
                }),
                new transports.File({
                    filename: env.log.combinedFilePath,
                    format: format.json(),
                    level: env.log.level
                })
            ],
        })
    }
};
