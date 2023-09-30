declare module "cc/spreadsheetimporter/v0_26_1/controller/MessageHandler" {
    import ManagedObject from "sap/ui/base/ManagedObject";
    import { Messages, ListObject, ArrayData, PayloadArray, GroupedMessage } from "cc/spreadsheetimporter/v0_26_1/types";
    /**
     * @namespace cc.spreadsheetimporter.XXXnamespaceXXX
     */
    export default class MessageHandler extends ManagedObject {
        private messages;
        private spreadsheetUploadController;
        private messageDialog;
        constructor(spreadsheetUploadController: any);
        setMessages(messages: Messages[]): void;
        addArrayToMessages(messages: Messages[]): void;
        addMessageToMessages(message: Messages): void;
        getMessages(): Messages[];
        checkMandatoryColumns(data: PayloadArray, columnNames: string[], mandatoryFieldsUser: string[], mandatoryFieldsMetadata: string[], typeLabelList: ListObject): void;
        checkMandatoryFields(data: ArrayData, mandatoryFields: string[], typeLabelList: ListObject): void;
        checkFormat(data: ArrayData): void;
        checkColumnNames(columnNames: string[], fieldMatchType: string, typeLabelList: ListObject): void;
        checkKeyColumns(columnNames: string[], odataKeyList: string[], typeLabelList: ListObject): any[];
        areMessagesPresent(): boolean;
        /**
         * Display messages.
         */
        displayMessages(): Promise<void>;
        groupMessages(messages: Messages[]): GroupedMessage[];
        private onCloseMessageDialog;
        private onContinue;
        private sortMessagesByTitle;
        private getWorstType;
    }
}
//# sourceMappingURL=MessageHandler.d.ts.map