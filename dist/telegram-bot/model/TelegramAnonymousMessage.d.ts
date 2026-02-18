import { TelegramMessage } from './TelegramMessage';
/** */
export type TelegramAnonymousMessage = Omit<TelegramMessage, 'chat_id'>;
