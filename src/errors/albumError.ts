import { BaseError } from "./baseError";

export class AlbumError extends BaseError {
    constructor(public message: string, public status: number = 401) {
        super(message)
    }
}