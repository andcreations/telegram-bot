import { TelegramEntity } from './TelegramEntity';

/** @see https://core.telegram.org/bots/api#inlinekeyboardbutton */
export interface TelegramInlineKeyboardButton {
  /** Label text on the button. */
  text: string;

  /** */
  style?: 'danger' | 'success' | 'primary';

  /** Data to be sent in a callback query to the bot when the button is pressed, 1-64 bytes. */
  callback_data: string;
}

/** @see https://core.telegram.org/bots/api#inlinekeyboardmarkup */
export interface TelegramInlineKeyboardMarkup {
  inline_keyboard: TelegramInlineKeyboardButton[][];
}

/** @see https://core.telegram.org/bots/api#sendmessage*/
export interface TelegramMessage {
  /** */
  chat_id: number;

  /** */
  text: string;

  /** */
  entities?: TelegramEntity[];

  /** */
  disable_notification?: boolean;

  /** */
  reply_markup?: TelegramInlineKeyboardMarkup;
}