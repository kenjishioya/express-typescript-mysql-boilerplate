import * as express from 'express';
import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../decorators/Logger';

import { env } from '../env'

@Service()
export class AuthService {

    constructor(
        @Logger(__filename) private log: LoggerInterface,
    ) { }

    public validateApiKey(apiKey?: string): boolean {
        return apiKey ? apiKey === env.app.apiKey: false
    }

}
