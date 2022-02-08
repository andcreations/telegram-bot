import {
  TelegramMessage,
  TelegramAnonymousMessage,
  TelegramEntity,
  TelegramEntityType,
} from './model';

/** */
export class TelegramMessageBuilder {
  /** Message being built. */
  private text = '';

  /** Entities. */
  private entities: TelegramEntity[];

  /** */
  private append(
    str: string,
    type?: TelegramEntityType,
  ): TelegramMessageBuilder {
    if (type) {
      if (!this.entities) {
        this.entities = [];
      }
      this.entities.push({
        type,
        offset: this.text.length,
        length: str.length,
      })
    }
    this.text += str;
    return this;
  }

  /** */
  normal(str: string): TelegramMessageBuilder {
    return this.append(str);
  }

  /** */
  bold(str: string): TelegramMessageBuilder {
    return this.append(str, TelegramEntityType.Bold);
  }

  /** */
  code(str: string): TelegramMessageBuilder {
    return this.append(str, TelegramEntityType.Code);
  }

  /** */
  newLine(): TelegramMessageBuilder {
    this.text += '\n';
    return this;
  }

  /** */
  build(): TelegramAnonymousMessage {
    return {
      text: this.text,
      entities: this.entities,
    }
  }

  /** */
  static fromString(text: string): TelegramAnonymousMessage {
    const builder = new TelegramMessageBuilder();
    builder.normal(text);
    return builder.build();
  }
}