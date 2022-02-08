"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTelegramUpdateUsername = void 0;
/** */
function getTelegramUpdateUsername(update) {
    return update.message?.chat?.username;
}
exports.getTelegramUpdateUsername = getTelegramUpdateUsername;
