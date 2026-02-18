"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramBot = void 0;
const fs = __importStar(require("fs"));
const form_data_1 = __importDefault(require("form-data"));
const axios_1 = require("axios");
const common_1 = require("@andcreations/common");
const error_1 = require("./error");
/** */
class TelegramBot {
    /** */
    constructor(token) {
        this.token = token;
        this.axios = new axios_1.Axios({});
    }
    /** */
    url(urlPath, queryParams) {
        return common_1.URLBuilder.build(`https://api.telegram.org/bot${this.token}${urlPath}`, queryParams);
    }
    /** */
    toTelegramResult(axiosResponse) {
        const httpResponse = (0, common_1.toHTTPResponse)(axiosResponse);
        const telegramResponse = httpResponse.data;
        if (!telegramResponse.ok) {
            throw new error_1.TelegramBotResponseError(httpResponse.status, httpResponse.statusText, telegramResponse?.description || 'Unknown Telegram error');
        }
        return httpResponse.data.result;
    }
    /** */
    async get(urlPath, queryParams) {
        const config = {
            headers: {
                Accept: 'application/json',
            },
        };
        const axiosResponse = await this.axios.get(this.url(urlPath, queryParams), config);
        return this.toTelegramResult(axiosResponse);
    }
    /** */
    async post(urlPath, body, queryParams) {
        const config = {
            headers: {
                'content-type': 'application/json',
                Accept: 'application/json',
            },
        };
        const axiosResponse = await this.axios.post(this.url(urlPath, queryParams), JSON.stringify(body), config);
        return this.toTelegramResult(axiosResponse);
    }
    /** */
    async postFormData(urlPath, form, queryParams) {
        const config = {
            headers: {
                Accept: 'application/json',
                ...form.getHeaders(),
            },
        };
        const axiosResponse = await this.axios.post(this.url(urlPath, queryParams), form, config);
        return this.toTelegramResult(axiosResponse);
    }
    /** */
    getUpdates(offset) {
        return this.get(`/getUpdates`, { offset });
    }
    /** */
    sendMessage(message) {
        return this.post('/sendMessage', message);
    }
    /** */
    setCommands(commands) {
        return this.post('/setMyCommands', { commands });
    }
    /** */
    async setWebhook(webhook) {
        const form = new form_data_1.default();
        form.append('url', webhook.url);
        form.append('max_connections', webhook.max_connections);
        if (webhook.certificate) {
            form.append('certificate', fs.createReadStream(webhook.certificate));
        }
        await this.postFormData('/setWebhook', form);
    }
    /** */
    async getWebhookInfo() {
        return this.get('/getWebhookInfo');
    }
    /** */
    async deleteWebhook() {
        return this.post('/deleteWebhook', {});
    }
    /** */
    async deleteMessage(chatId, messageId) {
        return this.post('/deleteMessage', {
            chat_id: chatId,
            message_id: messageId,
        });
    }
    /** */
    async deleteMessages(chatId, messageIds) {
        return this.post('/deleteMessages', {
            chat_id: chatId,
            message_ids: messageIds,
        });
    }
    /** */
    static getNextUpdateId(updates) {
        const count = updates.length;
        if (count) {
            return updates[count - 1].update_id + 1;
        }
    }
}
exports.TelegramBot = TelegramBot;
