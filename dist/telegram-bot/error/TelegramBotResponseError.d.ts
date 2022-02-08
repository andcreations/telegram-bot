import { HTTPError } from '@andcreations/common';
/** */
export declare class TelegramBotResponseError extends HTTPError {
    readonly status: number;
    readonly statusText: string;
    readonly message: string;
    /** */
    constructor(status: number, statusText: string, message: string);
}
