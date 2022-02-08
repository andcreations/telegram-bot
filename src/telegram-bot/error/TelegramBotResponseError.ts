import { HTTPError } from '@andcreations/common';

/** */
export class TelegramBotResponseError extends HTTPError {
  /** */
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly message: string
  ) {
    super(status, statusText, message);
  }
}