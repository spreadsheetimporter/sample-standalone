"use strict";

sap.ui.define(["sap/ui/base/ManagedObject", "./Util", "sap/ui/core/Fragment", "sap/ui/model/json/JSONModel", "sap/ui/core/library", "sap/base/Log", "../enums"], function (ManagedObject, __Util, Fragment, JSONModel, sap_ui_core_library, Log, ___enums) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const Util = _interopRequireDefault(__Util);
  const MessageType = sap_ui_core_library["MessageType"];
  const CustomMessageTypes = ___enums["CustomMessageTypes"];
  /**
   * @namespace cc.spreadsheetimporter.v0_26_1
   */
  const MessageHandler = ManagedObject.extend("cc.spreadsheetimporter.v0_26_1.MessageHandler", {
    constructor: function _constructor(spreadsheetUploadController) {
      ManagedObject.prototype.constructor.call(this);
      this.messages = [];
      this.messages = [];
      this.spreadsheetUploadController = spreadsheetUploadController;
    },
    setMessages: function _setMessages(messages) {
      this.messages = messages;
    },
    addArrayToMessages: function _addArrayToMessages(messages) {
      Log.debug("addArrayToMessages", undefined, "SpreadsheetUpload: MessageHandler", () => this.spreadsheetUploadController.component.logger.returnObject(messages));
      this.messages = this.messages.concat(messages);
    },
    addMessageToMessages: function _addMessageToMessages(message) {
      Log.debug("addMessageToMessages", undefined, "SpreadsheetUpload: MessageHandler", () => this.spreadsheetUploadController.component.logger.returnObject(message));
      this.messages.push(message);
    },
    getMessages: function _getMessages() {
      return this.messages;
    },
    checkMandatoryColumns: function _checkMandatoryColumns(data, columnNames, mandatoryFieldsUser, mandatoryFieldsMetadata, typeLabelList) {
      // concat mandatory fields arrays and remove duplicates
      const mandatoryFields = [...new Set([...mandatoryFieldsUser, ...mandatoryFieldsMetadata])];
      // check if column is in the data list
      //const availableKeyColumns = this.checkKeyColumns(columnNames, mandatoryFields, typeLabelList);
      // check if data is filled in for available columns
      this.checkMandatoryFields(data, mandatoryFields, typeLabelList);
    },
    checkMandatoryFields: function _checkMandatoryFields(data, mandatoryFields, typeLabelList) {
      if (!mandatoryFields) {
        return;
      }
      for (const mandatoryField of mandatoryFields) {
        const fieldLabel = typeLabelList.get(mandatoryField)?.label;
        if (!fieldLabel) {
          Log.error(`Mandatory Field ${mandatoryField} not found for checking mandatory fields`, undefined, "SpreadsheetUpload: MessageHandler");
          continue;
        }
        for (const [index, row] of data.entries()) {
          const value = Util.getValueFromRow(row, fieldLabel, mandatoryField, this.spreadsheetUploadController.component.getFieldMatchType());
          const errorMessage = {
            title: this.spreadsheetUploadController.util.geti18nText("mandatoryFieldNotFilled", [fieldLabel]),
            type: CustomMessageTypes.MandatoryFieldNotFilled,
            row: index + 2,
            counter: 1,
            ui5type: MessageType.Error
          };
          // no value found or value is empty, create error message
          if (!value || value.rawValue === "" || value.rawValue === undefined) {
            this.addMessageToMessages(errorMessage);
          }
        }
      }
    },
    checkFormat: function _checkFormat(data) {
      for (const [index, row] of data.entries()) {
        Object.values(row).forEach(_ref => {
          let {
            sheetDataType,
            format,
            rawValue,
            formattedValue
          } = _ref;
          if (sheetDataType === "n" && format !== "General" && rawValue !== Number(formattedValue)) {
            const warningMessage = {
              title: "Format",
              type: CustomMessageTypes.Formatting,
              row: index + 2,
              counter: 1,
              ui5type: MessageType.Warning,
              rawValue: rawValue,
              formattedValue: formattedValue
            };
            this.addMessageToMessages(warningMessage);
          }
        });
      }
    },
    checkColumnNames: function _checkColumnNames(columnNames, fieldMatchType, typeLabelList) {
      for (let index = 0; index < columnNames.length; index++) {
        const columnName = columnNames[index];
        let found = false;
        for (const [key, value] of typeLabelList) {
          if (fieldMatchType === "label") {
            if (value.label === columnName) {
              found = true;
              break;
            }
          }
          if (fieldMatchType === "labelTypeBrackets") {
            if (columnName.includes(`[${key}]`)) {
              found = true;
              break;
            }
          }
        }
        if (!found) {
          const errorMessage = {
            title: this.spreadsheetUploadController.util.geti18nText("columnNotFound", [columnName]),
            type: CustomMessageTypes.ColumnNotFound,
            counter: 1,
            ui5type: MessageType.Error
          };
          this.addMessageToMessages(errorMessage);
        }
      }
    },
    checkKeyColumns: function _checkKeyColumns(columnNames, odataKeyList, typeLabelList) {
      const availableKeyColumns = [];
      for (let index = 0; index < odataKeyList.length; index++) {
        const columnName = odataKeyList[index];
        let found = false;
        for (const index in columnNames) {
          if (columnNames[index].includes(`[${columnName}]`)) {
            found = true;
            availableKeyColumns.push(columnName);
            break;
          }
        }
        if (!found) {
          const columnNameLabel = typeLabelList.get(columnName)?.label ? typeLabelList.get(columnName).label : columnName;
          const errorMessage = {
            title: this.spreadsheetUploadController.util.geti18nText("keyColumnNotFound", [columnNameLabel]),
            type: CustomMessageTypes.ColumnNotFound,
            counter: 1,
            ui5type: MessageType.Error
          };
          this.addMessageToMessages(errorMessage);
        }
      }
      return availableKeyColumns;
    },
    areMessagesPresent: function _areMessagesPresent() {
      if (this.messages.some(message => message.counter > 0)) {
        return true;
      }
      return false;
    },
    displayMessages: async function _displayMessages() {
      if (!this.messageDialog) {
        this.messageDialog = await Fragment.load({
          name: "cc.spreadsheetimporter.v0_26_1.fragment.MessagesDialog",
          type: "XML",
          controller: this
        });
      }
      this.messageDialog.setModel(this.spreadsheetUploadController.componentI18n, "i18n");
      this.messageDialog.setModel(new JSONModel(), "messages");
      const messagesGrouped = this.groupMessages(this.messages);
      const sortedMessagesGrouped = this.sortMessagesByTitle(messagesGrouped);
      Log.debug("sortedMessagesGrouped", undefined, "SpreadsheetUpload: MessageHandler", () => this.spreadsheetUploadController.component.logger.returnObject({
        sortedMessagesGrouped: sortedMessagesGrouped
      }));
      this.messageDialog.getModel("messages").setData(sortedMessagesGrouped);
      const dialogState = this.getWorstType(sortedMessagesGrouped);
      const infoModel = new JSONModel({
        strict: this.spreadsheetUploadController.component.getStrict(),
        dialogState: dialogState
      });
      this.messageDialog.setModel(infoModel, "info");
      this.messageDialog.open();
    },
    groupMessages: function _groupMessages(messages) {
      const counterLargerThanOne = messages.filter(message => message.counter !== 0);
      const parsingMessages = counterLargerThanOne.filter(message => message.type.group === true);
      const messageGroups = parsingMessages.reduce((groups, message) => {
        let messageText = "";
        if (!groups[message.title]) {
          groups[message.title] = [];
        }
        if (message.rawValue && message.formattedValue) {
          messageText = this.spreadsheetUploadController.util.geti18nText("errorInRowWithValueFormatted", [message.row, message.formattedValue, message.rawValue]);
        } else if (message.rawValue) {
          messageText = this.spreadsheetUploadController.util.geti18nText("errorInRowWithValue", [message.row, message.rawValue]);
        } else {
          messageText = this.spreadsheetUploadController.util.geti18nText("errorInRow", [message.row]);
        }
        groups[message.title].push(messageText);
        return groups;
      }, {});
      const groupedMessages = [];
      for (const title in messageGroups) {
        const ui5type = messages.find(message => message.title === title)?.ui5type || "";
        groupedMessages.push({
          title: title,
          description: messageGroups[title].join("\n"),
          ui5type: ui5type
        });
      }
      const allMessages = groupedMessages.concat(counterLargerThanOne.filter(message => message.type.group === false));
      return allMessages;
    },
    onCloseMessageDialog: function _onCloseMessageDialog() {
      this.messageDialog.close();
      // rest file uploader content
      this.spreadsheetUploadController.resetContent();
    },
    onContinue: function _onContinue() {
      this.messageDialog.close();
      const spreadsheetUploadDialog = this.spreadsheetUploadController.getSpreadsheetUploadDialog();
      const payloadArrayLength = this.spreadsheetUploadController.payloadArray.length;
      spreadsheetUploadDialog.getModel("info").setProperty("/dataRows", payloadArrayLength);
    },
    sortMessagesByTitle: function _sortMessagesByTitle(messages) {
      return messages.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    },
    getWorstType: function _getWorstType(messages) {
      let worstType = MessageType.None;

      // Map MessageType to severity levels
      const severity = {
        [MessageType.None]: 0,
        [MessageType.Information]: 1,
        [MessageType.Success]: 2,
        [MessageType.Warning]: 3,
        [MessageType.Error]: 4
      };
      for (const message of messages) {
        if (severity[message.ui5type] > severity[worstType]) {
          worstType = message.ui5type;
        }
      }

      // Convert MessageType to ValueState
      return worstType;
    }
  });
  return MessageHandler;
});
//# sourceMappingURL=MessageHandler.js.map