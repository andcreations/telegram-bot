"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramBotResponseError = void 0;
const common_1 = require("@andcreations/common");
/** */
class TelegramBotResponseError extends common_1.HTTPError {
    /** */
    constructor(status, statusText, message) {
        super(status, statusText, message);
        this.status = status;
        this.statusText = statusText;
        this.message = message;
    }
}
exports.TelegramBotResponseError = TelegramBotResponseError;
