"use strict";

sap.ui.define(["sap/ui/base/ManagedObject", "./odata/ODataV2", "./odata/ODataV4", "./Util", "./MessageHandler", "sap/base/Log", "./dialog/SpreadsheetUploadDialog", "../enums"], function (ManagedObject, __ODataV2, __ODataV4, __Util, __MessageHandler, Log, __SpreadsheetUploadDialog, ___enums) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const ODataV2 = _interopRequireDefault(__ODataV2);
  const ODataV4 = _interopRequireDefault(__ODataV4);
  const Util = _interopRequireDefault(__Util);
  const MessageHandler = _interopRequireDefault(__MessageHandler);
  const SpreadsheetUploadDialog = _interopRequireDefault(__SpreadsheetUploadDialog);
  const CustomMessageTypes = ___enums["CustomMessageTypes"];
  /**
   * @namespace cc.spreadsheetimporter.v0_26_1
   */
  const SpreadsheetUpload = ManagedObject.extend("cc.spreadsheetimporter.v0_26_1.SpreadsheetUpload", {
    constructor: function _constructor(component, componentI18n) {
      ManagedObject.prototype.constructor.call(this);
      this.errorState = false;
      // @ts-ignore
      this.UI5MinorVersion = sap.ui.version.split(".")[1];
      this.component = component;
      this.componentI18n = componentI18n;
      this.util = new Util(componentI18n.getResourceBundle());
      this.messageHandler = new MessageHandler(this);
      this.spreadsheetUploadDialogHandler = new SpreadsheetUploadDialog(this, component, componentI18n, this.messageHandler);
      // check if "sap.ui.generic" is available, if false it is OpenUI5
      // @ts-ignore
      this.isOpenUI5 = sap.ui.generic ? true : false;
      Log.debug("constructor", undefined, "SpreadsheetUpload: SpreadsheetUpload", () => this.component.logger.returnObject({
        ui5version: this.UI5MinorVersion,
        isOpenUI5: this.isOpenUI5
      }));
    },
    initialSetup: async function _initialSetup() {
      await this.spreadsheetUploadDialogHandler.createSpreadsheetUploadDialog();
      if (!this.component.getStandalone()) {
        try {
          await this.setContext();
          this.errorState = false;
        } catch (error) {
          this.errorMessage = error;
          this.errorState = true;
          Log.error("Error setting 'setContext'", error, "SpreadsheetUpload: SpreadsheetUpload", () => this.component.logger.returnObject({
            error: error
          }));
        }
      }
    },
    setContext: async function _setContext() {
      this.context = this.component.getContext();
      if (this.context.base) {
        this.context = this.context.base;
      }
      this.isODataV4 = this._checkIfODataIsV4();
      this.odataHandler = this.createODataHandler(this.UI5MinorVersion, this);
      this.view = this.odataHandler.getView(this.context);
      this.controller = this.view.getController();
      Log.debug("View", undefined, "SpreadsheetUpload: SpreadsheetUpload", () => this.component.logger.returnObject({
        view: this.view
      }));
      this.view.addDependent(this.spreadsheetUploadDialogHandler.getDialog());
      this.tableObject = await this.odataHandler.getTableObject(this.component.getTableId(), this.view, this);
      Log.debug("tableObject", undefined, "SpreadsheetUpload: SpreadsheetUpload", () => this.component.logger.returnObject({
        tableObject: this.tableObject
      }));
      this.component.setTableId(this.tableObject.getId());
      Log.debug("table Id", undefined, "SpreadsheetUpload: SpreadsheetUpload", () => this.component.logger.returnObject({
        tableID: this.tableObject.getId()
      }));
      this.binding = this.odataHandler.getBinding(this.tableObject);
      if (!this.binding) {
        throw new Error(this.util.geti18nText("bindingError"));
      }
      this._odataType = await this.odataHandler.getOdataType(this.binding, this.tableObject, this.component.getOdataType());
      Log.debug("odataType", undefined, "SpreadsheetUpload: SpreadsheetUpload", () => this.component.logger.returnObject({
        odataType: this._odataType
      }));
      this.odataKeyList = await this.odataHandler.getKeyList(this._odataType, this.tableObject);
      Log.debug("odataKeyList", undefined, "SpreadsheetUpload: SpreadsheetUpload", () => this.component.logger.returnObject({
        odataKeyList: this.odataKeyList
      }));
      this.typeLabelList = await this.odataHandler.getLabelList(this.component.getColumns(), this._odataType, this.tableObject);
      Log.debug("typeLabelList", undefined, "SpreadsheetUpload: SpreadsheetUpload", () => this.component.logger.returnObject({
        typeLabelList: this.typeLabelList
      }));
      this.model = this.tableObject.getModel();
      Log.debug("model", undefined, "SpreadsheetUpload: SpreadsheetUpload", () => this.component.logger.returnObject({
        model: this.model
      }));
      this.odataHandler.createCustomBinding(this.binding);
      try {
        // Load the DraftController asynchronously using the loadDraftController function
        // @ts-ignore
        const DraftController = await this._loadDraftController();
        // Create an instance of the DraftController
        this.odataHandler.draftController = new DraftController(this.model, undefined);
      } catch (error) {
        Log.error("Error setting the draft controller", error, "SpreadsheetUpload: SpreadsheetUpload");
      }
    },
    createODataHandler: function _createODataHandler(version, spreadsheetUploadController) {
      if (this.isODataV4) {
        return new ODataV4(version, spreadsheetUploadController);
      } else {
        return new ODataV2(version, spreadsheetUploadController);
      }
    },
    openSpreadsheetUploadDialog: async function _openSpreadsheetUploadDialog(options) {
      if (options) {
        // set options to component
        this.setComponentOptions(options);
        this.initialSetupPromise = this.initialSetup();
      } else {
        this.initialSetupPromise = this.initialSetup();
      }
      await this.initialSetupPromise;
      if (!this.errorState) {
        this.spreadsheetUploadDialogHandler.getDialog().getContent()[0].getItems()[1].clear();
        this.spreadsheetUploadDialogHandler.openSpreadsheetUploadDialog();
      } else {
        Util.showError(this.errorMessage, "SpreadsheetUpload.ts", "initialSetup");
        Log.error("Error opening the dialog", undefined, "SpreadsheetUpload: SpreadsheetUpload");
      }
    },
    setComponentOptions: function _setComponentOptions(options) {
      if (options.hasOwnProperty("spreadsheetFileName")) {
        this.component.setSpreadsheetFileName(options.spreadsheetFileName);
      }
      if (options.hasOwnProperty("context")) {
        this.component.setContext(options.context);
      }
      if (options.hasOwnProperty("columns")) {
        this.component.setColumns(options.columns);
      }
      if (options.hasOwnProperty("tableId")) {
        this.component.setTableId(options.tableId);
      }
      if (options.hasOwnProperty("odataType")) {
        this.component.setOdataType(options.odataType);
      }
      if (options.hasOwnProperty("mandatoryFields")) {
        this.component.setMandatoryFields(options.mandatoryFields);
      }
      if (options.hasOwnProperty("fieldMatchType")) {
        this.component.setFieldMatchType(options.fieldMatchType);
      }
      if (options.hasOwnProperty("activateDraft")) {
        this.component.setActivateDraft(options.activateDraft);
      }
      if (options.hasOwnProperty("batchSize")) {
        this.component.setBatchSize(options.batchSize);
      }
      if (options.hasOwnProperty("standalone")) {
        this.component.setStandalone(options.standalone);
      }
      if (options.hasOwnProperty("strict")) {
        this.component.setStrict(options.strict);
      }
      if (options.hasOwnProperty("decimalSeparator")) {
        this.component.setDecimalSeparator(options.decimalSeparator);
      }
      if (options.hasOwnProperty("hidePreview")) {
        this.component.setHidePreview(options.hidePreview);
      }
      if (options.hasOwnProperty("skipMandatoryFieldCheck")) {
        this.component.setSkipMandatoryFieldCheck(options.skipMandatoryFieldCheck);
      }
      if (options.hasOwnProperty("showBackendErrorMessages")) {
        this.component.setShowBackendErrorMessages(options.showBackendErrorMessages);
      }
      if (options.hasOwnProperty("showOptions")) {
        this.component.setShowOptions(options.showOptions);
      }
      if (options.hasOwnProperty("debug")) {
        this.component.setDebug(options.debug);
      }
      if (options.hasOwnProperty("availableOptions")) {
        this.component.setAvailableOptions(options.availableOptions);
      }
      if (options.hasOwnProperty("sampleData")) {
        this.component.setSampleData(options.sampleData);
      }
      if (options.hasOwnProperty("hideSampleData")) {
        this.component.setHideSampleData(options.hideSampleData);
      }

      // Special case for showOptions
      if (options.availableOptions && options.availableOptions.length > 0) {
        this.component.setShowOptions(true);
      }
    },
    _checkIfODataIsV4: function _checkIfODataIsV() {
      try {
        let model;
        // @ts-ignore
        if (this.component.getContext().base) {
          // @ts-ignore
          model = this.component.getContext().base.getModel();
        } else {
          // @ts-ignore
          model = this.component.getContext().getModel();
        }
        if (model.getODataVersion() === "4.0") {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        return false;
      }
    },
    _setPayload: function _setPayload(payload) {
      this.payloadArray = payload;
    },
    refreshBinding: function _refreshBinding(context, binding, id) {
      if (context._controller?.getExtensionAPI()) {
        // refresh binding in V4 FE context
        try {
          context._controller.getExtensionAPI().refresh(binding.getPath());
        } catch (error) {
          Log.error("Failed to refresh binding in V4 FE context: " + error);
        }
      } else if (context.extensionAPI) {
        // refresh binding in V2 FE context
        if (context.extensionAPI.refresh) {
          try {
            context.extensionAPI.refresh(binding.getPath(id));
          } catch (error) {
            Log.error("Failed to refresh binding in Object Page V2 FE context: " + error);
          }
        }
        if (context.extensionAPI.refreshTable) {
          try {
            context.extensionAPI.refreshTable(id);
          } catch (error) {
            Log.error("Failed to refresh binding in List Report V2 FE context: " + error);
          }
        }
      }
      // try refresh binding either way
      try {
        binding.refresh(true);
      } catch (error) {
        Log.error("Failed to refresh binding in other contexts: " + error);
      }
    },
    _loadDraftController: async function _loadDraftController() {
      return new Promise(function (resolve, reject) {
        sap.ui.require(["sap/ui/generic/app/transaction/DraftController"], function (DraftController) {
          resolve(DraftController);
        }, function (err) {
          reject(err);
        });
      });
    },
    resetContent: function _resetContent() {
      this.payloadArray = [];
      this.payload = [];
      this.odataHandler.resetContexts();
      this.spreadsheetUploadDialogHandler.resetContent();
    },
    getMessages: function _getMessages() {
      return this.messageHandler.getMessages();
    },
    addToMessages: function _addToMessages(messagesArray) {
      messagesArray.forEach(message => {
        if (message.group) {
          message.type = CustomMessageTypes.CustomErrorGroup;
        } else {
          message.type = CustomMessageTypes.CustomError;
        }
        message.counter = 1;
      });
      this.messageHandler.addArrayToMessages(messagesArray);
    },
    getSpreadsheetUploadDialog: function _getSpreadsheetUploadDialog() {
      return this.spreadsheetUploadDialogHandler.getDialog();
    },
    getPayloadArray: function _getPayloadArray() {
      return this.payloadArray;
    },
    getODataHandler: function _getODataHandler() {
      return this.odataHandler;
    },
    get isODataV4() {
      return this._isODataV4;
    },
    set isODataV4(value) {
      this._isODataV4 = value;
    },
    get tableObject() {
      return this._tableObject;
    },
    set tableObject(value) {
      this._tableObject = value;
    },
    get binding() {
      return this._binding;
    },
    set binding(value) {
      this._binding = value;
    },
    get spreadsheetUploadDialogHandler() {
      return this._spreadsheetUploadDialogHandler;
    },
    set spreadsheetUploadDialogHandler(value) {
      this._spreadsheetUploadDialogHandler = value;
    },
    get controller() {
      return this._controller;
    },
    get view() {
      return this._view;
    },
    getOdataType: function _getOdataType() {
      return this._odataType;
    }
  });
  return SpreadsheetUpload;
});
//# sourceMappingURL=SpreadsheetUpload.js.map