declare module "cc/spreadsheetimporter/v0_26_1/controller/odata/ODataV2" {
    import { Columns } from "cc/spreadsheetimporter/v0_26_1/types";
    import SpreadsheetUpload from "cc/spreadsheetimporter/v0_26_1/controller/SpreadsheetUpload";
    import OData from "cc/spreadsheetimporter/v0_26_1/controller/odata/OData";
    import MetadataHandlerV2 from "cc/spreadsheetimporter/v0_26_1/controller/odata/MetadataHandlerV2";
    import ODataListBinding from "sap/ui/model/odata/v2/ODataListBinding";
    import ODataModel from "sap/ui/model/odata/v2/ODataModel";
    /**
     * @namespace cc.spreadsheetimporter.XXXnamespaceXXX
     */
    export default class ODataV2 extends OData {
        createPromises: Promise<any>[];
        createContexts: any[];
        customBinding: ODataListBinding;
        submitChangesResponse: any;
        private metadataHandler;
        constructor(ui5version: number, spreadsheetUploadController: SpreadsheetUpload);
        create(model: any, binding: any, payload: any): Promise<unknown>;
        createAsync(model: any, binding: any, payload: any): void;
        checkForErrors(model: any, binding: any, showBackendErrorMessages: Boolean): Promise<boolean>;
        createCustomBinding(binding: any): Promise<void>;
        submitChanges(model: ODataModel): Promise<void>;
        waitForCreation(): Promise<void>;
        waitForDraft(): Promise<any[]>;
        getView(context: any): any;
        getOdataType(binding: any, tableObject: any, odataType: any): Promise<any>;
        getLabelList(columns: Columns, odataType: string, tableObject?: any): Promise<ListObject>;
        getKeyList(odataType: string, tableObject: any): Promise<string[]>;
        resetContexts(): void;
        getMetadataHandler(): MetadataHandlerV2;
    }
}
//# sourceMappingURL=ODataV2.d.ts.map