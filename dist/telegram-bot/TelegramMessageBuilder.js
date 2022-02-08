"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramMessageBuilder = void 0;
const model_1 = require("./model");
/** */
class TelegramMessageBuilder {
    constructor() {
        /** Message being built. */
        this.text = '';
    }
    /** */
    append(str, type) {
        if (type) {
            if (!this.entities) {
                this.entities = [];
            }
            this.entities.push({
                type,
                offset: this.text.length,
                length: str.length,
            });
        }
        this.text += str;
        return this;
    }
    /** */
    normal(str) {
        return this.append(str);
    }
    /** */
    bold(str) {
        return this.append(str, model_1.TelegramEntityType.Bold);
    }
    /** */
    code(str) {
        return this.append(str, model_1.TelegramEntityType.Code);
    }
    /** */
    newLine() {
        this.text += '\n';
        return this;
    }
    /** */
    build() {
        return {
            text: this.text,
            entities: this.entities,
        };
    }
    /** */
    static fromString(text) {
        const builder = new TelegramMessageBuilder();
        builder.normal(text);
        return builder.build();
    }
}
exports.TelegramMessageBuilder = TelegramMessageBuilder;
