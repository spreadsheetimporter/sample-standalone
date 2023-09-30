declare module "cc/spreadsheetimporter/v0_26_1/Component" {
    import UIComponent from "sap/ui/core/UIComponent";
    import SpreadsheetUpload from "cc/spreadsheetimporter/v0_26_1/controller/SpreadsheetUpload";
    import { ComponentData, Messages } from "cc/spreadsheetimporter/v0_26_1/types";
    import Logger from "cc/spreadsheetimporter/v0_26_1/controller/Logger";
    import ComponentContainer from "sap/ui/core/ComponentContainer";
    /**
     * @namespace cc.spreadsheetimporter.XXXnamespaceXXX
     */
    export default class Component extends UIComponent {
        spreadsheetUpload: SpreadsheetUpload;
        private _sContentDensityClass;
        logger: Logger;
        oContainer: ComponentContainer;
        settingsFromContainer: $ComponentSettings;
        constructor(idOrSettings?: string | $ComponentSettings);
        constructor(id?: string, settings?: $ComponentSettings);
        static metadata: {
            manifest: string;
            properties: {
                spreadsheetFileName: {
                    type: string;
                    defaultValue: string;
                };
                context: {
                    type: string;
                };
                columns: {
                    type: string;
                    defaultValue: any[];
                };
                tableId: {
                    type: string;
                };
                odataType: {
                    type: string;
                };
                mandatoryFields: {
                    type: string;
                    defaultValue: any[];
                };
                fieldMatchType: {
                    type: string;
                    defaultValue: string;
                };
                activateDraft: {
                    type: string;
                    defaultValue: boolean;
                };
                batchSize: {
                    type: string;
                    defaultValue: number;
                };
                standalone: {
                    type: string;
                    defaultValue: boolean;
                };
                strict: {
                    type: string;
                    defaultValue: boolean;
                };
                decimalSeparator: {
                    type: string;
                    defaultValue: string;
                };
                hidePreview: {
                    type: string;
                    defaultValue: boolean;
                };
                skipMandatoryFieldCheck: {
                    type: string;
                    defaultValue: boolean;
                };
                showBackendErrorMessages: {
                    type: string;
                    defaultValue: boolean;
                };
                showOptions: {
                    type: string;
                    defaultValue: boolean;
                };
                availableOptions: {
                    type: string;
                    defaultValue: any[];
                };
                hideSampleData: {
                    type: string;
                    defaultValue: boolean;
                };
                sampleData: {
                    type: string;
                };
                useTableSelector: {
                    type: string;
                    defaultValue: boolean;
                };
                readAllSheets: {
                    type: string;
                    defaultValue: boolean;
                };
                debug: {
                    type: string;
                    defaultValue: boolean;
                };
                componentContainerData: {
                    type: string;
                };
            };
            aggregations: {
                rootControl: {
                    type: string;
                    multiple: boolean;
                    visibility: string;
                };
            };
            events: {
                checkBeforeRead: {
                    parameters: {
                        sheetData: {
                            type: string;
                        };
                        messages: {
                            type: string;
                        };
                    };
                };
                changeBeforeCreate: {
                    parameters: {
                        payload: {
                            type: string;
                        };
                    };
                };
                uploadButtonPress: {
                    allowPreventDefault: boolean;
                    parameters: {
                        payload: {
                            type: string;
                        };
                        rawData: {
                            type: string;
                        };
                        parsedData: {
                            type: string;
                        };
                    };
                };
            };
        };
        init(): Promise<void>;
        createContent(): any;
        /**
         * Opens the dialog for selecting a customer.
         * @public
         */
        openSpreadsheetUploadDialog(options?: ComponentData): void;
        /**
         * Attaches events to the component container based on the provided options.
         * @param context - The controller context to attach the events to.
         * @returns void
         */
        private _attachEvents;
        triggerInitContext(): Promise<void>;
        /**
         * Set Payload for Event
         * @public
         */
        setPayload(payload: any): void;
        /**
         * add to error array
         * @public
         */
        addArrayToMessages(errorArray: Messages[]): void;
        getMessages(): Messages[];
        /**
         * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
         * design mode class should be set, which influences the size appearance of some controls.
         * @private
         * @return {string} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set
         */
        getContentDensityClass(): any;
        _getViewControllerOfControl(control: any): any;
    }
}
//# sourceMappingURL=Component.d.ts.map