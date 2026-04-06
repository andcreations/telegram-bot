import { TelegramChat } from './TelegramChat';
import { TelegramUser } from './TelegramUser';

/** @see https://core.telegram.org/bots/api#message */
export interface TelegramUpdateMessage {
  /** */
  message_id: number;

  /** */
  date: number;

  /** Message text. */
  text: string;

  /** */
  from: TelegramUser;

  /** */
  chat: TelegramChat;
}

/** @see https://core.telegram.org/bots/api#callbackquery */
export interface TelegramUpdateCallbackQuery {
  /** Unique identifier for this callback query. */
  id: string;

  /** */
  from: TelegramUser;
  
  /** */
  data: string;
}

/** @see https://core.telegram.org/bots/api#update */
export interface TelegramUpdate {
  /** */
  update_id: number;

  /** */
  message?: TelegramUpdateMessage;

  /** */
  callback_query?: TelegramUpdateCallbackQuery;
}

/** */
export function getTelegramUpdateUsername(update: TelegramUpdate): string {
  return update.message?.chat?.username;
}