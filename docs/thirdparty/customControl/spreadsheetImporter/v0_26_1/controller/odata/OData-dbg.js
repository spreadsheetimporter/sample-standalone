"use strict";

sap.ui.define(["sap/ui/base/ManagedObject", "../dialog/ODataMessageHandler", "sap/base/Log", "../TableSelector", "sap/ui/model/json/JSONModel", "sap/ui/core/Fragment"], function (ManagedObject, __ODataMessageHandler, Log, __TableSelector, JSONModel, Fragment) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const ODataMessageHandler = _interopRequireDefault(__ODataMessageHandler);
  const TableSelector = _interopRequireDefault(__TableSelector);
  /**
   * @namespace cc.spreadsheetimporter.v0_26_1
   */
  const OData = ManagedObject.extend("cc.spreadsheetimporter.v0_26_1.OData", {
    constructor: function _constructor(ui5version, spreadsheetUploadController) {
      ManagedObject.prototype.constructor.call(this);
      this._tables = [];
      this.UI5MinorVersion = ui5version;
      this.odataMessageHandler = new ODataMessageHandler(spreadsheetUploadController);
      this.spreadsheetUploadController = spreadsheetUploadController;
    },
    callOdata: async function _callOdata(fnResolve, fnReject, spreadsheetUploadController) {
      const component = spreadsheetUploadController.component;
      const tableObject = spreadsheetUploadController.tableObject;
      const payloadArray = spreadsheetUploadController.payloadArray;
      const binding = spreadsheetUploadController.binding;
      const context = spreadsheetUploadController.context;

      // intializing the message manager for displaying the odata response messages
      try {
        // get binding of table to create rows
        const model = tableObject.getModel();
        await this.createBusyDialog(spreadsheetUploadController);

        // Slice the array into chunks of 'batchSize' if necessary
        const slicedPayloadArray = this.processPayloadArray(component.getBatchSize(), payloadArray);
        this.busyDialog.getModel("busyModel").setProperty("/progressText", `0/${payloadArray.length}`);
        let currentProgressPercent = 0;
        let currentProgressValue = 0;

        // Loop over the sliced array
        for (const batch of slicedPayloadArray) {
          // loop over data from spreadsheet file
          for (const payload of batch) {
            // Extension method to manipulate payload
            component.fireChangeBeforeCreate({
              payload: payload
            });
            this.createAsync(model, binding, payload);
          }
          // wait for all drafts to be created
          await this.submitChanges(model);
          let errorsFound = await this.checkForErrors(model, binding, component.getShowBackendErrorMessages());
          if (errorsFound) {
            this.busyDialog.close();
            break;
          } else {
            await this.waitForCreation();
          }

          // check for and activate all drafts and wait for all draft to be created
          if (component.getActivateDraft() && !errorsFound) {
            await this.waitForDraft();
          }
          this.resetContexts();
          currentProgressPercent = currentProgressPercent + batch.length / payloadArray.length * 100;
          currentProgressValue = currentProgressValue + batch.length;
          this.busyDialog.getModel("busyModel").setProperty("/progressPercent", currentProgressPercent);
          this.busyDialog.getModel("busyModel").setProperty("/progressText", `${currentProgressValue} / ${payloadArray.length}`);
        }
        spreadsheetUploadController.refreshBinding(context, binding, tableObject.getId());
        this.busyDialog.close();
        fnResolve();
      } catch (error) {
        this.busyDialog.close();
        this.resetContexts();
        Log.error("Error while calling the odata service", error, "SpreadsheetUpload: callOdata");
        fnReject(error);
      }
    },
    getBinding: function _getBinding(tableObject) {
      if (tableObject.getMetadata().getName() === "sap.m.Table" || tableObject.getMetadata().getName() === "sap.m.List") {
        return tableObject.getBinding("items");
      }
      if (tableObject.getMetadata().getName() === "sap.ui.table.Table") {
        return tableObject.getBinding("rows");
      }
    },
    _getActionName: function _getActionName(oContext, sOperation) {
      var oModel = oContext.getModel(),
        oMetaModel = oModel.getMetaModel(),
        sEntitySetPath = oMetaModel.getMetaPath(oContext.getPath());
      return oMetaModel.getObject("".concat(sEntitySetPath, "@com.sap.vocabularies.Common.v1.DraftRoot/").concat(sOperation));
    },
    processPayloadArray: function _processPayloadArray(batchSize, payloadArray) {
      if (batchSize > 0) {
        let slicedPayloadArray = [];
        const numOfSlices = Math.ceil(payloadArray.length / batchSize);
        const equalSize = Math.ceil(payloadArray.length / numOfSlices);
        for (let i = 0; i < payloadArray.length; i += equalSize) {
          slicedPayloadArray.push(payloadArray.slice(i, i + equalSize));
        }
        return slicedPayloadArray;
      } else {
        return [payloadArray];
      }
    },
    getTableObject: async function _getTableObject(tableId, view, spreadsheetUploadController) {
      // try get object page table
      if (!tableId) {
        this.tables = view.findAggregatedObjects(true, function (object) {
          return object.isA("sap.m.Table") || object.isA("sap.ui.table.Table");
        });
        if (this.tables.length > 1 && !spreadsheetUploadController.component.getUseTableSelector()) {
          throw new Error("Found more than one table on Object Page.\n Please specify table in option 'tableId'");
        } else if (this.tables.length > 1 && spreadsheetUploadController.component.getUseTableSelector()) {
          const tableSelector = new TableSelector(view);
          let selectedTable;
          try {
            selectedTable = await tableSelector.chooseTable();
          } catch (error) {
            // user canceled or no table found
            throw new Error(spreadsheetUploadController.util.geti18nText("tableSelectorDialogCancel"));
          }
          return selectedTable;
        } else if (this.tables.length === 0) {
          throw new Error("Found more than one table on Object Page.\n Please specify table in option 'tableId'");
        } else {
          return this.tables[0];
        }
      } else {
        return view.byId(tableId);
      }
    },
    createBusyDialog: async function _createBusyDialog(spreadsheetUploadController) {
      const busyModel = new JSONModel({
        progressPercent: 0,
        progressText: "0"
      });
      if (!this.busyDialog) {
        this.busyDialog = await Fragment.load({
          name: "cc.spreadsheetimporter.v0_26_1.fragment.BusyDialogProgress",
          controller: this
        });
      }
      this.busyDialog.setModel(busyModel, "busyModel");
      this.busyDialog.setModel(spreadsheetUploadController.component.getModel("device"), "device");
      this.busyDialog.setModel(spreadsheetUploadController.component.getModel("i18n"), "i18n");
      this.busyDialog.open();
    },
    get tables() {
      return this._tables;
    },
    set tables(value) {
      this._tables = value;
    }
  });
  return OData;
});
//# sourceMappingURL=OData.js.map