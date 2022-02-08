import { TelegramMessage } from './TelegramMessage';
/** */
export declare type TelegramAnonymousMessage = Omit<TelegramMessage, 'chat_id'>;
