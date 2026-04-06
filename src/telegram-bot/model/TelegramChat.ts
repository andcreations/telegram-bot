/** @see https://core.telegram.org/bots/api#chat */
export interface TelegramChat {
  /** Chat identifier. */
  id: number;

  /** Oneof: private, group, supergroup, channel*/
  type: string;

  /** */
  username?: string;

  /** */
  first_name?: string;

  /** */
  last_name?: string;

  /** Title for supergroups, channels and group chats. */
  title?: string;
}