declare module "cc/spreadsheetimporter/v0_26_1/controller/SpreadsheetUpload" {
    import ManagedObject from "sap/ui/base/ManagedObject";
    import Component from "cc/spreadsheetimporter/v0_26_1/Component";
    import XMLView from "sap/ui/core/mvc/XMLView";
    import { Messages, ListObject, ComponentData } from "cc/spreadsheetimporter/v0_26_1/types";
    import ResourceModel from "sap/ui/model/resource/ResourceModel";
    import OData from "cc/spreadsheetimporter/v0_26_1/controller/odata/OData";
    import Util from "cc/spreadsheetimporter/v0_26_1/controller/Util";
    import OptionsDialog from "cc/spreadsheetimporter/v0_26_1/controller/dialog/OptionsDialog";
    import SpreadsheetDialog from "cc/spreadsheetimporter/v0_26_1/control/SpreadsheetDialog";
    import SpreadsheetUploadDialog from "cc/spreadsheetimporter/v0_26_1/controller/dialog/SpreadsheetUploadDialog";
    /**
     * @namespace cc.spreadsheetimporter.XXXnamespaceXXX
     */
    export default class SpreadsheetUpload extends ManagedObject {
        oDataEntityType: any;
        component: Component;
        context: any;
        private _isODataV4;
        private isOpenUI5;
        private _view;
        private _tableObject;
        private messageHandler;
        util: Util;
        private model;
        typeLabelList: ListObject;
        componentI18n: ResourceModel;
        UI5MinorVersion: number;
        private odataHandler;
        payload: any;
        private _odataType;
        private _binding;
        payloadArray: any[];
        errorState: boolean;
        errorMessage: any;
        private initialSetupPromise;
        messageArray: Messages[];
        odataKeyList: string[];
        optionsHandler: OptionsDialog;
        private _spreadsheetUploadDialogHandler;
        private _controller;
        /**
         * Initializes SpreadsheetUpload instance.
         * @param {Component} component - The component to be used.
         * @param {ResourceModel} componentI18n - The i18n resource model for the component.
         */
        constructor(component: Component, componentI18n: ResourceModel);
        /**
         * Executes initial setup.
         * @returns {Promise<void>} A promise that resolves when the initial setup is complete.
         */
        initialSetup(): Promise<void>;
        /**
         * Sets context for the instance.
         */
        setContext(): Promise<void>;
        /**
         * Retrieves OData handler based on UI5 version.
         * @param {number} version - UI5 version number.
         * @returns {OData} OData handler instance.
         */
        createODataHandler(version: number, spreadsheetUploadController: SpreadsheetUpload): OData;
        /**
         * Opens the Spreadsheet upload dialog.
         * @param {object} options - all component options.
         */
        openSpreadsheetUploadDialog(options: ComponentData): Promise<void>;
        setComponentOptions(options: ComponentData): void;
        _checkIfODataIsV4(): boolean;
        _setPayload(payload: any): void;
        refreshBinding(context: any, binding: any, id: any): void;
        /**
         * Dynamically loads the `sap.ui.generic.app.transaction.DraftController` module.
         * @returns {Promise<sap.ui.generic.app.transaction.DraftController>} A Promise that resolves to an instance of the `DraftController` class.
         * @throws {Error} If the `DraftController` module cannot be loaded.
         */
        _loadDraftController(): Promise<unknown>;
        resetContent(): void;
        /**
         * Returns messages from the MessageHandler.
         * @returns {Messages[]} - An array of messages.
         */
        getMessages(): Messages[];
        /**
         * Adds messages to the MessageHandler's messages.
         * @param {Messages[]} messagesArray - An array of messages to add.
         */
        addToMessages(messagesArray: Messages[]): void;
        getSpreadsheetUploadDialog(): SpreadsheetDialog;
        getPayloadArray(): any[];
        getODataHandler(): OData;
        get isODataV4(): boolean;
        set isODataV4(value: boolean);
        get tableObject(): any;
        set tableObject(value: any);
        get binding(): any;
        set binding(value: any);
        get spreadsheetUploadDialogHandler(): SpreadsheetUploadDialog;
        set spreadsheetUploadDialogHandler(value: SpreadsheetUploadDialog);
        get controller(): import("sap/ui/core/mvc/Controller").default;
        get view(): XMLView;
        getOdataType(): string;
    }
}
//# sourceMappingURL=SpreadsheetUpload.d.ts.map