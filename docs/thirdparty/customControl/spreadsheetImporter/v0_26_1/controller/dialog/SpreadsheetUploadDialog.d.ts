declare module "cc/spreadsheetimporter/v0_26_1/controller/dialog/SpreadsheetUploadDialog" {
    import ManagedObject from "sap/ui/base/ManagedObject";
    import SpreadsheetUpload from "cc/spreadsheetimporter/v0_26_1/controller/SpreadsheetUpload";
    import SpreadsheetDialog, { SpreadsheetDialog$AvailableOptionsChangedEvent, SpreadsheetDialog$DecimalSeparatorChangedEvent } from "cc/spreadsheetimporter/v0_26_1/control/SpreadsheetDialog";
    import ResourceModel from "sap/ui/model/resource/ResourceModel";
    import Component from "cc/spreadsheetimporter/v0_26_1/Component";
    import Event from "sap/ui/base/Event";
    import { FileUploader$ChangeEvent } from "sap/ui/unified/FileUploader";
    import Preview from "cc/spreadsheetimporter/v0_26_1/controller/Preview";
    import Util from "cc/spreadsheetimporter/v0_26_1/controller/Util";
    import OptionsDialog from "cc/spreadsheetimporter/v0_26_1/controller/dialog/OptionsDialog";
    import MessageHandler from "cc/spreadsheetimporter/v0_26_1/controller/MessageHandler";
    import JSONModel from "sap/ui/model/json/JSONModel";
    type InputType = {
        [key: string]: {
            rawValue: any;
            [additionalKeys: string]: any;
        };
    };
    /**
     * @namespace cc.spreadsheetimporter.XXXnamespaceXXX
     */
    export default class SpreadsheetUploadDialog extends ManagedObject {
        spreadsheetUploadController: SpreadsheetUpload;
        spreadsheetUploadDialog: SpreadsheetDialog;
        component: Component;
        previewHandler: Preview;
        util: Util;
        componentI18n: ResourceModel;
        optionsHandler: OptionsDialog;
        messageHandler: MessageHandler;
        spreadsheetOptionsModel: JSONModel;
        constructor(spreadsheetUploadController: SpreadsheetUpload, component: Component, componentI18n: ResourceModel, messageHandler: MessageHandler);
        createSpreadsheetUploadDialog(): Promise<void>;
        /**
         * Handles file upload event.
         * @param {Event} event - The file upload event
         */
        onFileUpload(event: FileUploader$ChangeEvent): Promise<void>;
        /**
         * Sending extracted data to backend
         * @param {*} event
         */
        onUploadSet(event: Event): Promise<void>;
        openSpreadsheetUploadDialog(): void;
        /**
         * Closes the Spreadsheet upload dialog.
         */
        onCloseDialog(): void;
        onDecimalSeparatorChanged(event: SpreadsheetDialog$DecimalSeparatorChangedEvent): void;
        onAvailableOptionsChanged(event: SpreadsheetDialog$AvailableOptionsChangedEvent): void;
        resetContent(): void;
        setDataRows(length: number): void;
        getDialog(): SpreadsheetDialog;
        showPreview(): Promise<void>;
        onTempDownload(): void;
        onOpenOptionsDialog(): void;
        /**
         * Read the uploaded workbook from the file.
         * @param {File} file - The uploaded file.
         * @returns {Promise} - Promise object representing the workbook.
         */
        _readWorkbook(file: Blob): Promise<unknown>;
        buffer_RS(stream: ReadableStream): Promise<Uint8Array>;
        _extractRawValues(data: InputType[]): any[];
        _extractParsedValues(data: InputType[]): any[];
    }
}
//# sourceMappingURL=SpreadsheetUploadDialog.d.ts.map