/** */
export interface TelegramUpdateMessage {
  /** */
  message_id: number;

  /** */
  date: number;

  /** Message text. */
  text: string;

  /** */
  from: {
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
  };

  /** */
  chat: {
    /** Chat identifier. */
    id: number;

    /** */
    first_name: string;

    /** */
    username: string;

    /** */
    type: string;
  }
}

/** */
export interface TelegramUpdate {
  /** */
  update_id: number;

  /** */
  message: TelegramUpdateMessage;
}

/** */
export function getTelegramUpdateUsername(update: TelegramUpdate): string {
  return update.message?.chat?.username;
}