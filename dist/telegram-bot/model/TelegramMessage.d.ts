import { TelegramEntity } from './TelegramEntity';
/** */
export interface TelegramMessage {
    /** */
    chat_id: number;
    /** */
    text: string;
    /** */
    entities?: TelegramEntity[];
    /** */
    disable_notification?: boolean;
}
