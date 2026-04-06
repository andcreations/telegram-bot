/** https://core.telegram.org/bots/api#user */
export interface TelegramUser {
    /** User/bot from which a message is received. */
    id: number;
    /** Indicates if the other side is a bot. */
    is_bot: boolean;
    /** */
    first_name: string;
    /** */
    username: string;
    /** */
    language_code: string;
}
