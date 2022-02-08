/** */
export interface TelegramWebhook {
  /** URL to POST endpoint. */
  url: string;

  /** Maximum number of parallel connections. */
  max_connections?: number;

  /** Allowed update types. */
  allowed_updates?: string[];

  /** Path to the CA self-signed certificate file. */
  certificate?: string;
}