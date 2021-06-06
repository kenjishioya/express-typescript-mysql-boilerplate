import { HttpError } from 'routing-controllers'

export class TitanicNotFoundError extends HttpError {
    constructor() {
        super(404, 'not found')
    }
}