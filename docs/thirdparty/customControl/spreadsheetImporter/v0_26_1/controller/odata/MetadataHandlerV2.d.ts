declare module "cc/spreadsheetimporter/v0_26_1/controller/odata/MetadataHandlerV2" {
    import { Columns, ListObject } from "cc/spreadsheetimporter/v0_26_1/types";
    import MetadataHandler from "cc/spreadsheetimporter/v0_26_1/controller/odata/MetadataHandler";
    /**
     * @namespace cc.spreadsheetimporter.XXXnamespaceXXX
     */
    export default class MetadataHandlerV2 extends MetadataHandler {
        constructor(spreadsheetUploadController: any);
        getLabelList(colums: Columns, odataType: string, oDataEntityType: any): ListObject;
        private getLabel;
        /**
         * Creates a list of properties that are defined mandatory in the OData metadata V2
         * @param odataType
         **/
        getKeyList(oDataEntityType: any): string[];
    }
}
//# sourceMappingURL=MetadataHandlerV2.d.ts.map