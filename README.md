# Telegram bot

Telegram bot is a package allowing an application to act as a Telegram bot. The main class is `TelegramBot` which takes a bot token as argument:

```javascript
const { TelegramBot } = require('@andcreations/telegram-bot');

const bot = new TelegramBot('123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11');
```

## Getting messages

Messages entered by users can be retrived from Telegram servers either with [`getUpdates`](https://core.telegram.org/bots/api#getupdates) or via a [webhook](https://core.telegram.org/bots/api#setwebhook). Either of the methods of getting updates can be used at the same time.

Getting updates in an interval manner is straightforward:

```javascript
async function processUpdate(update) {
  const { message } = update;
  const { text } = message; // entered message
  const { username } = message.from; // user who entered the message
  const { id } = message.chat; // identifier of the chat
  // process the message and send response here
}

let offset = await restoreOffset();
setInterval(async () => {
  const updates = await bot.getUpdates(offset);
  for (const update of updates) {
    await processUpdate(update);
  }
  offset = TelegramBot.getNextUpdateId(updates);
  await storeOffset(offset);
}, INTERVAL);
```

Note the `offset` variable passed to `getUpdates()`. This mechanism allows to get only new updates not yet processed. The offset can be undefined when getting updates for the first time. In the snippet above `restoreOffset()` can simply return undefined.

If a webhook has been previously set, it needs to be deleted using `deleteWebhook()`. Otherwise, the Telegram server will report an error:

```javascript
await bot.deleteWebhook();
```

### Webhook

A webhook requires a secure HTTPS endpoint publicly available. When a webhook is set, Telegram will send updates to the endpoint every time a user sends a message to the bot. The below snippet shows how to set a webhook:

```javascript
const webhook = {
  url: 'https://api.your-application.io/telegram/webhook?token=HoxIshyW8dEtrxvUYoUtJmKAhNqeIW43',
  certificate: '/home/scott/.telegram-bot/ca.cert.pem'
};

await bot.setWebhook(webhook);
```

`url` is the URL to which Telegram will send updates. `ceritifcate` is a path to a CA certificate used to sign the web server key and certificate. Telegram uses the CA certificate to verfiy that it talks to the proper web server.

The `token` parameter is a security token and should be kept secret. The handler of requests `/telegram/webhook` in the application should accept requests only with a valid token. This way only the Telegram server can talk to the endpoint and no one can send fake updates without the token.

A webhook can be deleted using `deleteWebhook()`. From now on, the Telegram server will not send any updates.

```javascript
await bot.deleteWebhook();
```

### Webhook information

Information on the currently set webhook can be retrieved using `getWebhookInfo()`. In particular, the webhook information provides the last error message which allows to troubleshoot setting up a webhook.

```javascript
const info = await bot.getWebhookInfo();

if (info.last_error_message) {
  console.log(`Last error: ${info.last_error_message}`);
}
else {
  console.log('No last error');
}
```

## Sending messages

A message is sent to a user via the `sendMessage()` method. The method takes an object with three fields:
* `chat_id`: identifier of a chat (user) to which to send a message,
* `text`: text containing the message,
* `entities`: entities allowing to format a message.

### Message builder

A message can be easily built using `TelegramMessageBuilder`. It supports normal, code and bold formatting. An example is given below. Note that it takes `username` and `chat_id` from an update.
```javascript
const { TelegramMessageBuilder } = require('@andcreations/telegram-bot');

const builder = new TelegramMessageBuilder();
builder
  .normal('Hi ')
  .bold(`${update.message.from.username}!`)
  .newLine()
  .normal('Make yourself comfortable.');

await bot.sendMessage({
  chatId: update.message.chat.id,
  ...builder.build(),
});
```

## Deleting messages

A single message or multiple messages from a single chat can be deleted using the following methods:

```javascript
const chatId = 2333444555;
const msgId = 666;
await bot.deleteMessage(chatId, msgId);

const msgIds = [777, 888];
await bot.deleteMessages(chatId, msgIds);
```


## Telegram commands

When a user starts a message with slash, Telegram displays matching bot commands. These can be set via the method `setCommands()`:
```javascript
await bot.setCommands([
  {
    command: 'start',
    description: 'Say Hi!',
  },
  {
    command: 'ping',
    description: 'Ping the server',
  },
  {
    command: 'controllers',
    description: 'List controllers',
  },
])
```