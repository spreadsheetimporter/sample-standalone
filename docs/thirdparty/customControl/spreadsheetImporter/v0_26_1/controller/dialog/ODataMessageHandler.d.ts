declare module "cc/spreadsheetimporter/v0_26_1/controller/dialog/ODataMessageHandler" {
    import ManagedObject from "sap/ui/base/ManagedObject";
    import SpreadsheetUpload from "cc/spreadsheetimporter/v0_26_1/controller/SpreadsheetUpload";
    /**
     * @namespace cc.spreadsheetimporter.XXXnamespaceXXX
     */
    export default class ODataMessageHandler extends ManagedObject {
        private messages;
        private spreadsheetUploadController;
        private messageDialog;
        constructor(spreadsheetUploadController: SpreadsheetUpload);
        /**
         * Display messages.
         */
        displayMessages(): Promise<void>;
        private onCloseMessageDialog;
    }
}
//# sourceMappingURL=ODataMessageHandler.d.ts.map