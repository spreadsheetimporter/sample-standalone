declare module "cc/spreadsheetimporter/v0_26_1/controller/odata/ODataV4" {
    import { Columns } from "cc/spreadsheetimporter/v0_26_1/types";
    import OData from "cc/spreadsheetimporter/v0_26_1/controller/odata/OData";
    import SpreadsheetUpload from "cc/spreadsheetimporter/v0_26_1/controller/SpreadsheetUpload";
    import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";
    import MetadataHandlerV4 from "cc/spreadsheetimporter/v0_26_1/controller/odata/MetadataHandlerV4";
    type EntityObject = {
        $kind: string;
        $Type?: string;
        $NavigationPropertyBinding?: Record<string, string>;
    };
    /**
     * @namespace cc.spreadsheetimporter.XXXnamespaceXXX
     */
    export default class ODataV4 extends OData {
        createPromises: Promise<any>[];
        createContexts: any[];
        customBinding: ODataListBinding;
        updateGroupId: string;
        metadataHandler: MetadataHandlerV4;
        constructor(ui5version: number, spreadsheetUploadController: SpreadsheetUpload);
        create(model: any, binding: any, payload: any): {
            context: any;
            promise: any;
        };
        createAsync(model: any, binding: any, payload: any): void;
        submitChanges(model: any): Promise<any>;
        waitForCreation(): Promise<any>;
        checkForErrors(model: any, binding: any, showBackendErrorMessages: Boolean): Promise<boolean>;
        createCustomBinding(binding: any): void;
        waitForDraft(): Promise<any[]>;
        getView(context: any): any;
        getOdataType(binding: any, tableObject: any, odataType: any): any;
        getLabelList(columns: Columns, odataType: string): Promise<ListObject>;
        getKeyList(odataType: string, tableObject: any): Promise<string[]>;
        resetContexts(): void;
        getMetadataHandler(): MetadataHandlerV4;
        _findAttributeByType(obj: Record<string, EntityObject>, typeToSearch: string): string | undefined;
    }
}
//# sourceMappingURL=ODataV4.d.ts.map