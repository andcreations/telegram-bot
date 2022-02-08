/** */
export declare enum TelegramEntityType {
    Bold = "bold",
    Code = "code"
}
/** */
export interface TelegramEntity {
    /** */
    type: TelegramEntityType;
    /** */
    offset: number;
    /** */
    length: number;
}
