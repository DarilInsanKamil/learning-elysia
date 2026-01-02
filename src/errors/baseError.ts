export class BaseError extends Error {
    constructor(public message: string, public status: number = 500) {
        super(message);
    }

    toResponse() {
        return {
            success: false,
            message: this.message,
        };
    }
}