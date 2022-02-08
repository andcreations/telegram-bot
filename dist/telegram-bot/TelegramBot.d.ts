import { TelegramBotCommand, TelegramWebhook, TelegramWebhookInfo, TelegramMessage, TelegramUpdate } from './model';
/** */
export declare class TelegramBot {
    private readonly token;
    /** Axios HTTP client. */
    private axios;
    /** */
    constructor(token: string);
    /** */
    private url;
    /** */
    private toTelegramResult;
    /** */
    private get;
    /** */
    private post;
    /** */
    private postFormData;
    /** */
    getUpdates(offset?: number): Promise<TelegramUpdate[]>;
    /** */
    sendMessage(message: TelegramMessage): Promise<void>;
    /** */
    setCommands(commands: TelegramBotCommand[]): Promise<void>;
    /** */
    setWebhook(webhook: TelegramWebhook): Promise<void>;
    /** */
    getWebhookInfo(): Promise<TelegramWebhookInfo>;
    /** */
    deleteWebhook(): Promise<void>;
    /** */
    static getNextUpdateId(updates: TelegramUpdate[]): number | undefined;
}
