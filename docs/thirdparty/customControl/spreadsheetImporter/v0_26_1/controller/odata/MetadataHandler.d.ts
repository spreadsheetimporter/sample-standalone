declare module "cc/spreadsheetimporter/v0_26_1/controller/odata/MetadataHandler" {
    import ManagedObject from "sap/ui/base/ManagedObject";
    import { Columns, ListObject } from "cc/spreadsheetimporter/v0_26_1/types";
    import SpreadsheetUpload from "cc/spreadsheetimporter/v0_26_1/controller/SpreadsheetUpload";
    /**
     * @namespace cc.spreadsheetimporter.XXXnamespaceXXX
     */
    export default abstract class MetadataHandler extends ManagedObject {
        spreadsheetUploadController: SpreadsheetUpload;
        constructor(spreadsheetUploadController: any);
        parseI18nText(i18nMetadataText: string, view: any): string;
        abstract getLabelList(colums: Columns, odataType: string, oDataEntityType: any): ListObject;
        abstract getKeyList(oDataEntityType: any): string[];
    }
}
//# sourceMappingURL=MetadataHandler.d.ts.map