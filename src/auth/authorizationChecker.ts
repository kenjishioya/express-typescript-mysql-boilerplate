import { Action } from 'routing-controllers';
import { Container } from 'typedi';

import { Logger } from '../lib/logger';
import { AuthService } from './AuthService';

export function authorizationChecker(): (action: Action, roles: any[]) => Promise<boolean> | boolean {
    const log = new Logger(__filename);
    const authService = Container.get<AuthService>(AuthService);

    return async function innerAuthorizationChecker(action: Action, roles: string[]): Promise<boolean> {
        return authService.validateApiKey(action.request.headers.key);
    };
}
