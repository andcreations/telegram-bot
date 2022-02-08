import { TelegramAnonymousMessage } from './model';
/** */
export declare class TelegramMessageBuilder {
    /** Message being built. */
    private text;
    /** Entities. */
    private entities;
    /** */
    private append;
    /** */
    normal(str: string): TelegramMessageBuilder;
    /** */
    bold(str: string): TelegramMessageBuilder;
    /** */
    code(str: string): TelegramMessageBuilder;
    /** */
    newLine(): TelegramMessageBuilder;
    /** */
    build(): TelegramAnonymousMessage;
    /** */
    static fromString(text: string): TelegramAnonymousMessage;
}
