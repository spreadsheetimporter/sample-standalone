declare module "cc/spreadsheetimporter/v0_26_1/controller/Parser" {
    import ManagedObject from "sap/ui/base/ManagedObject";
    import Component from "cc/spreadsheetimporter/v0_26_1/Component";
    import { ArrayData, ListObject, Property, ValueData } from "cc/spreadsheetimporter/v0_26_1/types";
    import MessageHandler from "cc/spreadsheetimporter/v0_26_1/controller/MessageHandler";
    import Util from "cc/spreadsheetimporter/v0_26_1/controller/Util";
    /**
     * @namespace cc.spreadsheetimporter.XXXnamespaceXXX
     */
    export default class Parser extends ManagedObject {
        static parseSpreadsheetData(sheetData: ArrayData, typeLabelList: ListObject, component: Component, messageHandler: MessageHandler, util: Util, isODataV4: Boolean): PayloadArray;
        static checkDate(value: any, metadataColumn: Property, util: Util, messageHandler: MessageHandler, index: number): boolean;
        static checkDouble(value: ValueData, metadataColumn: Property, util: Util, messageHandler: MessageHandler, index: number, component: Component): any;
        static checkInteger(value: ValueData, metadataColumn: Property, util: Util, messageHandler: MessageHandler, index: number, component: Component): any;
        static addMessageToMessages(text: string, util: Util, messageHandler: MessageHandler, index: number, array?: any, rawValue?: any, formattedValue?: any): void;
    }
}
//# sourceMappingURL=Parser.d.ts.map