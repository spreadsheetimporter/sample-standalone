"use strict";

sap.ui.define(["sap/base/Log", "./OData", "./MetadataHandlerV2", "sap/ui/model/odata/v2/ODataListBinding"], function (Log, __OData, __MetadataHandlerV2, ODataListBinding) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const OData = _interopRequireDefault(__OData);
  const MetadataHandlerV2 = _interopRequireDefault(__MetadataHandlerV2);
  /**
   * @namespace cc.spreadsheetimporter.v0_26_1
   */
  const ODataV2 = OData.extend("cc.spreadsheetimporter.v0_26_1.ODataV2", {
    constructor: function _constructor(ui5version, spreadsheetUploadController) {
      OData.prototype.constructor.call(this, ui5version, spreadsheetUploadController);
      this.createPromises = [];
      this.createContexts = [];
      this.metadataHandler = new MetadataHandlerV2(spreadsheetUploadController);
    },
    create: function _create(model, binding, payload) {
      const submitChangesPromise = (binding, payload) => {
        return new Promise((resolve, reject) => {
          // @ts-ignore
          let context = this.customBinding.getModel().createEntry(this.customBinding.sDeepPath, {
            properties: payload,
            success: () => {
              resolve(context);
            },
            error: error => {
              reject(error);
            }
          });
        });
      };
      return submitChangesPromise(this.customBinding, payload);
    },
    createAsync: function _createAsync(model, binding, payload) {
      const returnObject = this.create(model, this.customBinding, payload);
      this.createPromises.push(returnObject);
    },
    checkForErrors: async function _checkForErrors(model, binding, showBackendErrorMessages) {
      // check if this.submitChangesResponse and this.submitChangesResponse.__batchResponses exist
      if (this.submitChangesResponse && this.submitChangesResponse.__batchResponses) {
        const firstResponse = this.submitChangesResponse.__batchResponses[0];
        // check if firstResponse and firstResponse.response exist and that statusCode is >= 400
        if (firstResponse && firstResponse.response && firstResponse.response.statusCode >= 400) {
          // show messages from the Messages Manager Model
          if (showBackendErrorMessages) {
            this.odataMessageHandler.displayMessages();
          }
          return true;
        }
      }
      return false;
    },
    createCustomBinding: async function _createCustomBinding(binding) {
      if (this.spreadsheetUploadController.component.getOdataType()) {
        const metaModel = this.spreadsheetUploadController.view.getModel().getMetaModel();
        await metaModel.loaded();
        const oDataEntityType = metaModel.getODataEntityType(this.spreadsheetUploadController.component.getOdataType());
        const odataEntitySet = metaModel.getODataEntityContainer().entitySet.find(item => item.entityType === `${oDataEntityType.namespace}.${oDataEntityType.name}`);
        this.customBinding = new ODataListBinding(this.spreadsheetUploadController.view.getModel(), `/${odataEntitySet.name}`);
      } else {
        this.customBinding = binding;
      }
    },
    submitChanges: async function _submitChanges(model) {
      const submitChangesPromise = model => {
        return new Promise((resolve, reject) => {
          model.submitChanges({
            success: data => {
              resolve(data);
            },
            error: error => {
              reject(error);
            }
          });
        });
      };
      try {
        this.submitChangesResponse = await submitChangesPromise(model);
      } catch (error) {
        Log.error(error);
      }
    },
    waitForCreation: async function _waitForCreation() {
      this.createContexts = await Promise.all(this.createPromises);
    },
    waitForDraft: async function _waitForDraft() {
      const activateActionsPromises = [];
      for (let index = 0; index < this.createContexts.length; index++) {
        const element = this.createContexts[index];
        if (this.draftController.getDraftContext().hasDraft(element)) {
          // this will fail i.e. in a Object Page Table, maybe better way to check, hasDraft is still true
          try {
            const checkImport = this.draftController.getDraftContext().getODataDraftFunctionImportName(element, "ActivationAction");
            if (checkImport !== null) {
              const activationPromise = this.draftController.activateDraftEntity(element, true, undefined);
              activateActionsPromises.push(activationPromise);
            }
          } catch (error) {
            Log.error("Activate Draft failed", error, "SpreadsheetUpload: OdataV2");
          }
        }
      }
      return Promise.all(activateActionsPromises);
    },
    getView: function _getView(context) {
      return context.getView();
    },
    getOdataType: async function _getOdataType(binding, tableObject, odataType) {
      if (!odataType) {
        return binding._getEntityType().entityType;
      } else {
        const metaModel = this.spreadsheetUploadController.view.getModel().getMetaModel();
        await metaModel.loaded();
        const oDataEntityType = metaModel.getODataEntityType(odataType);
        if (!oDataEntityType) {
          // filter out $kind
          const availableEntities = metaModel.getODataEntityContainer().entitySet.map(item => item.name).join();
          Log.error(`Error while getting specified OData Type. ${availableEntities}`, undefined, "SpreadsheetUpload: ODataV4");
          throw new Error(`Error while getting specified OData Type. Available Entities: ${availableEntities}`);
        }
        return odataType;
      }
    },
    getLabelList: async function _getLabelList(columns, odataType, tableObject) {
      const metaModel = tableObject.getModel().getMetaModel();
      await metaModel.loaded();
      const oDataEntityType = metaModel.getODataEntityType(odataType);
      return this.getMetadataHandler().getLabelList(columns, odataType, oDataEntityType);
    },
    getKeyList: async function _getKeyList(odataType, tableObject) {
      const metaModel = tableObject.getModel().getMetaModel();
      await metaModel.loaded();
      const oDataEntityType = metaModel.getODataEntityType(odataType);
      return this.getMetadataHandler().getKeyList(oDataEntityType);
    },
    resetContexts: function _resetContexts() {
      this.createContexts = [];
      this.createPromises = [];
    },
    getMetadataHandler: function _getMetadataHandler() {
      return this.metadataHandler;
    }
  });
  return ODataV2;
});
//# sourceMappingURL=ODataV2.js.map