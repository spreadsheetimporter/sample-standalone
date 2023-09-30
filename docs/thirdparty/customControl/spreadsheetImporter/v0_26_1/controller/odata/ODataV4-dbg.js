"use strict";

sap.ui.define(["./OData", "../Util", "sap/base/Log", "./MetadataHandlerV4"], function (__OData, __Util, Log, __MetadataHandlerV4) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const OData = _interopRequireDefault(__OData);
  const Util = _interopRequireDefault(__Util);
  const MetadataHandlerV4 = _interopRequireDefault(__MetadataHandlerV4);
  /**
   * @namespace cc.spreadsheetimporter.v0_26_1
   */
  const ODataV4 = OData.extend("cc.spreadsheetimporter.v0_26_1.ODataV4", {
    constructor: function _constructor(ui5version, spreadsheetUploadController) {
      OData.prototype.constructor.call(this, ui5version, spreadsheetUploadController);
      this.createPromises = [];
      this.createContexts = [];
      this.updateGroupId = Util.getRandomString(10);
      this.metadataHandler = new MetadataHandlerV4(spreadsheetUploadController);
    },
    create: function _create(model, binding, payload) {
      const context = this.customBinding.create(payload, true);
      return {
        context: context,
        promise: context.created()
      };
    },
    createAsync: function _createAsync(model, binding, payload) {
      const returnObject = this.create(model, this.customBinding, payload);
      this.createContexts.push(returnObject.context);
      this.createPromises.push(returnObject.promise);
    },
    submitChanges: async function _submitChanges(model) {
      return model.submitBatch(this.updateGroupId);
    },
    waitForCreation: async function _waitForCreation() {
      await Promise.all(this.createPromises);
    },
    checkForErrors: async function _checkForErrors(model, binding, showBackendErrorMessages) {
      // if the binding has pending changes, a error occured
      if (this.customBinding.hasPendingChanges()) {
        // delete all the created context
        this.createContexts.forEach(async context => {
          await context.delete(this.updateGroupId);
        });
        // show messages from the Messages Manager Model
        if (showBackendErrorMessages) {
          this.odataMessageHandler.displayMessages();
        }
        return true;
      }
      return false;
    },
    createCustomBinding: function _createCustomBinding(binding) {
      if (this.spreadsheetUploadController.component.getOdataType()) {
        const containerName = this.spreadsheetUploadController.context.getModel().getMetaModel().getData()["$EntityContainer"];
        const entityContainer = this.spreadsheetUploadController.context.getModel().getMetaModel().getData()[containerName];
        const typeToSearch = this.spreadsheetUploadController.component.getOdataType();
        const odataEntityTypeParameterPath = this._findAttributeByType(entityContainer, typeToSearch);
        this.customBinding = this.spreadsheetUploadController.view.getModel().bindList("/" + odataEntityTypeParameterPath, null, [], [], {
          $$updateGroupId: this.updateGroupId
        });
      } else {
        let path = binding.getPath();
        if (binding.getResolvedPath) {
          path = binding.getResolvedPath();
        } else {
          // workaround for getResolvedPath only available from 1.88
          path = binding.getModel().resolve(binding.getPath(), binding.getContext());
        }
        this.customBinding = binding.getModel().bindList(path, null, [], [], {
          $$updateGroupId: this.updateGroupId
        });
      }
    },
    waitForDraft: async function _waitForDraft() {
      const activateActionsPromises = [];
      for (let index = 0; index < this.createContexts.length; index++) {
        const element = this.createContexts[index];
        const operationName = this._getActionName(element, "ActivationAction");
        if (operationName) {
          const operation = element.getModel().bindContext(`${operationName}(...)`, element, {
            $$inheritExpandSelect: true
          });
          activateActionsPromises.push(operation.execute("$auto", false, null, /*bReplaceWithRVC*/true));
        }
      }
      return Promise.all(activateActionsPromises);
    },
    getView: function _getView(context) {
      return context._view || context.oView || context.getView();
    },
    getOdataType: function _getOdataType(binding, tableObject, odataType) {
      const tableBindingPath = binding.getPath();
      const metaModel = tableObject.getModel().getMetaModel();
      const metaModelData = tableObject.getModel().getMetaModel().getData();
      if (!odataType) {
        // for list report
        try {
          const metaDataObject = metaModel.getObject(tableBindingPath);
          return metaDataObject["$Type"];
        } catch (error) {
          Log.debug("Error while getting OData Type for List Report", error, "SpreadsheetUpload: ODataV4");
        }
        // for object page
        if (!odataType) {
          for (const [key, value] of Object.entries(metaModelData)) {
            if (value["$kind"] === "EntityType" && value[tableBindingPath]) {
              return value[tableBindingPath]["$Type"];
            }
          }
        }
        if (!odataType) {
          Log.error("Error while getting OData Type. Please specify 'odataType' in options", undefined, "SpreadsheetUpload: ODataV4");
        }
      } else {
        const containerName = this.spreadsheetUploadController.context.getModel().getMetaModel().getData()["$EntityContainer"];
        const entityContainer = this.spreadsheetUploadController.context.getModel().getMetaModel().getData()[containerName];
        const odataEntityType = this._findAttributeByType(entityContainer, odataType);
        if (!odataEntityType) {
          // filter out $kind
          const availableEntities = Object.keys(entityContainer).filter(entity => entity !== "$kind").join();
          Log.error(`Error while getting specified OData Type. ${availableEntities}`, undefined, "SpreadsheetUpload: ODataV4");
          throw new Error(`Error while getting specified OData Type. Available Entities: ${availableEntities}`);
        }
        return odataType;
      }
    },
    getLabelList: async function _getLabelList(columns, odataType) {
      return this.getMetadataHandler().getLabelList(columns, odataType);
    },
    getKeyList: async function _getKeyList(odataType, tableObject) {
      return this.getMetadataHandler().getKeyList(odataType);
    },
    resetContexts: function _resetContexts() {
      this.createContexts = [];
      this.createPromises = [];
    },
    getMetadataHandler: function _getMetadataHandler() {
      return this.metadataHandler;
    },
    _findAttributeByType: function _findAttributeByType(obj, typeToSearch) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const entity = obj[key];
          if (entity.$Type === typeToSearch) {
            return key;
          }
        }
      }
      return undefined; // if not found
    }
  });
  return ODataV4;
});
//# sourceMappingURL=ODataV4.js.map