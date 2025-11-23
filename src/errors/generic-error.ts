export class GenericError extends Error {
    private readonly status: number;
    private readonly data: {};

    constructor(message: string, status: number = 400, data: {} = {}) {
        super(message);
        this.status = status;
        this.data = data;
    }

    getStatus(): number {
        return this.status;
    }

    getData(): {} {
        return this.data;
    }
}