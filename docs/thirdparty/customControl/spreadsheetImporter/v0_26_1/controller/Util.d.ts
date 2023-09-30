declare module "cc/spreadsheetimporter/v0_26_1/controller/Util" {
    import ManagedObject from "sap/ui/base/ManagedObject";
    import ResourceBundle from "sap/base/i18n/ResourceBundle";
    import { RowData, ValueData } from "cc/spreadsheetimporter/v0_26_1/types";
    import Component from "cc/spreadsheetimporter/v0_26_1/Component";
    import { FieldMatchType } from "cc/spreadsheetimporter/v0_26_1/enums";
    /**
     * @namespace cc.spreadsheetimporter.XXXnamespaceXXX
     */
    export default class Util extends ManagedObject {
        private resourceBundle;
        constructor(resourceBundle: ResourceBundle);
        static getValueFromRow(row: RowData, label: string, type: string, fieldMatchType: FieldMatchType): ValueData;
        geti18nText(text: string, array?: any): string;
        static changeDecimalSeperator(value: string): number;
        static sleep(ms: number): Promise<unknown>;
        static showError(error: any, className: string, methodName: string): void;
        static showErrorMessage(errorMessage: string, className: string, methodName: string): void;
        static getBrowserDecimalAndThousandSeparators(componentDecimalSeparator: string): {
            thousandSeparator: string;
            decimalSeparator: string;
        };
        static normalizeNumberString(numberString: string, component: Component): string;
        static getRandomString(length: number): string;
        static stringify(obj: any): string;
        static extractObjects(objects: any[]): Record<string, any>[];
    }
}
//# sourceMappingURL=Util.d.ts.map