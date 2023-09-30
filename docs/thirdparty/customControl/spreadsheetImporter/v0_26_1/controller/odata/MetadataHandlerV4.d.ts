declare module "cc/spreadsheetimporter/v0_26_1/controller/odata/MetadataHandlerV4" {
    import { Columns, ListObject } from "cc/spreadsheetimporter/v0_26_1/types";
    import MetadataHandler from "cc/spreadsheetimporter/v0_26_1/controller/odata/MetadataHandler";
    /**
     * @namespace cc.spreadsheetimporter.XXXnamespaceXXX
     */
    export default class MetadataHandlerV4 extends MetadataHandler {
        constructor(spreadsheetUploadController: any);
        getLabelList(colums: Columns, odataType: string): ListObject;
        getLabel(annotations: {
            [x: string]: {
                [x: string]: any;
            };
        }, properties: any, propertyName: string, propertyLabel: {
            [x: string]: any;
        }, odataType: string): string;
        /**
         * Creates a list of properties that are defined mandatory in the OData metadata V4
         * @param odataType
         **/
        getKeyList(odataType: string): string[];
    }
}
//# sourceMappingURL=MetadataHandlerV4.d.ts.map