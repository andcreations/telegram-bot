import * as fs from 'fs';
import FormData from 'form-data';
import { Axios, AxiosResponse } from 'axios';
import { HTTPParams, toHTTPResponse, URLBuilder } from '@andcreations/common';

import { TelegramBotResponseError } from './error';
import {
  TelegramBotCommand,
  TelegramWebhook,
  TelegramWebhookInfo,
  TelegramMessage,
  TelegramUpdate,
  TelegramSendMessageResult,
} from './model';

/** */
interface TelegramBotResponse<T> {
  /** true for success, failure otherwise. */
  ok: true;

  /** Error description. */
  description?: string;

  /** */
  result?: T;
}

/** */
interface SetMyCommandsRequest {
  /** */
  commands: TelegramBotCommand[];
}

/** */
export class TelegramBot {
  /** Axios HTTP client. */
  private axios: Axios;

  /** */
  constructor(private readonly token: string) {
    this.axios = new Axios({});
  }

  /** */
  private url(urlPath: string, queryParams?: HTTPParams): string {
    return URLBuilder.build(
      `https://api.telegram.org/bot${this.token}${urlPath}`,
      queryParams,
    );
  }

  /** */
  private toTelegramResult<T>(axiosResponse: AxiosResponse<string>): T {
    const httpResponse = toHTTPResponse<TelegramBotResponse<T>>(axiosResponse);
    const telegramResponse = httpResponse.data;
    if (!telegramResponse.ok) {
      throw new TelegramBotResponseError(
        httpResponse.status,
        httpResponse.statusText,
        telegramResponse?.description || 'Unknown Telegram error',
      );
    }
    return httpResponse.data.result;
  }

  /** */
  private async get<T>(
    urlPath: string,
    queryParams?: HTTPParams,
  ): Promise<T> {
    const config = {
      headers: {
        Accept: 'application/json',
      },
    };
    const axiosResponse = await this.axios.get<string>(
      this.url(urlPath, queryParams),
      config
    );
    return this.toTelegramResult(axiosResponse);
  }

  /** */
  private async post<B, T = any>(
    urlPath: string,
    body: B,
    queryParams?: HTTPParams,
  ): Promise<T> {
    const config = {
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
      },
    };
    const axiosResponse = await this.axios.post<string>(
      this.url(urlPath, queryParams),
      JSON.stringify(body),
      config
    );
    return this.toTelegramResult(axiosResponse);
  }

  /** */
  private async postFormData<T = any>(
    urlPath: string,
    form: FormData,
    queryParams?: HTTPParams,
  ): Promise<T> {
    const config = {
      headers: {
        Accept: 'application/json',
        ...form.getHeaders(),
      },
    };
    const axiosResponse = await this.axios.post<string>(
      this.url(urlPath, queryParams),
      form,
      config
    );
    return this.toTelegramResult(axiosResponse);
  }

  /** */
  getUpdates(offset?: number): Promise<TelegramUpdate[]> {
    return this.get<TelegramUpdate[]>(`/getUpdates`, { offset });
  }

  /** */
  sendMessage(message: TelegramMessage): Promise<TelegramSendMessageResult> {
    return this.post<TelegramMessage, TelegramSendMessageResult>(
      '/sendMessage', 
      message,
    );
  }

  /** */
  setCommands(commands: TelegramBotCommand[]): Promise<void> {
    return this.post<SetMyCommandsRequest>('/setMyCommands', { commands });
  }

  /** */
  async setWebhook(webhook: TelegramWebhook): Promise<void> {
    const form = new FormData();
    form.append('url', webhook.url);
    form.append('max_connections', webhook.max_connections);
    if (webhook.certificate) {
      form.append('certificate', fs.createReadStream(webhook.certificate));
    }
    await this.postFormData('/setWebhook', form);
  }

  /** */
  async getWebhookInfo(): Promise<TelegramWebhookInfo> {
    return this.get<TelegramWebhookInfo>('/getWebhookInfo');
  }

  /** */
  async deleteWebhook(): Promise<void> {
    return this.post('/deleteWebhook', {});
  }

  /** */
  async deleteMessage(chatId: number, messageId: number): Promise<void> {
    return this.post(
      '/deleteMessage',
      {
        chat_id: chatId,
        message_id: messageId,
      },
    );
  }

  /** */
  async deleteMessages(chatId: number, messageIds: number[]): Promise<void> {
    return this.post(
      '/deleteMessages',
      {
        chat_id: chatId,
        message_ids: messageIds,
      },
    );
  }

  /** */
  static getNextUpdateId(updates: TelegramUpdate[]): number | undefined {
    const count = updates.length;
    if (count) {
      return updates[count - 1].update_id + 1;
    }
  }
}