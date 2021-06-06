import { Connection, createConnection, getConnectionOptions, useContainer } from "typeorm";
import { Container } from 'typeorm-typedi-extensions'

import { env } from '../env'

export class TypeormSetting {
    private static connection: Connection;

    private constructor() {}

    public static async getConnection(): Promise<Connection> {
        if (!TypeormSetting.connection) {
            const loadedConnectionOptions = await getConnectionOptions()

            const connectionOptions = Object.assign(loadedConnectionOptions, {
                type: env.db.type as any, // See createConnection options for valid types
                host: env.db.host,
                port: env.db.port,
                username: env.db.username,
                password: env.db.password,
                database: env.db.database,
                synchronize: env.db.synchronize,
                logging: env.db.logging,
                entities: env.app.dirs.entities,
                migrations: env.app.dirs.migrations,
            })
            useContainer(Container)
            TypeormSetting.connection = await createConnection(connectionOptions)
        }
        return TypeormSetting.connection
    }
}