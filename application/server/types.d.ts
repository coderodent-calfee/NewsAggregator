declare namespace Express {
    export interface Request {
        id?: string;
        table?: string;
    }

    export interface Response {
        id?: string;
        table?: string;
    }
}