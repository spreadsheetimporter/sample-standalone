"use strict";

sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/model/json/JSONModel", "sap/ui/Device", "./controller/SpreadsheetUpload", "sap/base/Log", "./controller/Logger", "sap/m/Button"], function (UIComponent, JSONModel, Device, __SpreadsheetUpload, Log, __Logger, Button) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const SpreadsheetUpload = _interopRequireDefault(__SpreadsheetUpload);
  const Logger = _interopRequireDefault(__Logger);
  /**
   * @namespace cc.spreadsheetimporter.v0_26_1
   */
  const Component = UIComponent.extend("cc.spreadsheetimporter.v0_26_1.Component", {
    metadata: {
      // interfaces: ["sap.ui.core.IAsyncContentCreation"],
      manifest: "json",
      properties: {
        spreadsheetFileName: {
          type: "string",
          defaultValue: "Template.xlsx"
        },
        context: {
          type: "object"
        },
        // @ts-ignore
        columns: {
          type: "string[]",
          defaultValue: []
        },
        tableId: {
          type: "string"
        },
        odataType: {
          type: "string"
        },
        // @ts-ignore
        mandatoryFields: {
          type: "string[]",
          defaultValue: []
        },
        fieldMatchType: {
          type: "string",
          defaultValue: "labelTypeBrackets"
        },
        activateDraft: {
          type: "boolean",
          defaultValue: false
        },
        batchSize: {
          type: "int",
          defaultValue: 1000
        },
        standalone: {
          type: "boolean",
          defaultValue: false
        },
        strict: {
          type: "boolean",
          defaultValue: false
        },
        decimalSeparator: {
          type: "string",
          defaultValue: ""
        },
        hidePreview: {
          type: "boolean",
          defaultValue: false
        },
        skipMandatoryFieldCheck: {
          type: "boolean",
          defaultValue: false
        },
        showBackendErrorMessages: {
          type: "boolean",
          defaultValue: false
        },
        showOptions: {
          type: "boolean",
          defaultValue: false
        },
        // @ts-ignore
        availableOptions: {
          type: "string[]",
          defaultValue: []
        },
        hideSampleData: {
          type: "boolean",
          defaultValue: false
        },
        sampleData: {
          type: "object"
        },
        useTableSelector: {
          type: "boolean",
          defaultValue: false
        },
        readAllSheets: {
          type: "boolean",
          defaultValue: false
        },
        debug: {
          type: "boolean",
          defaultValue: false
        },
        componentContainerData: {
          type: "object"
        }
        //Pro Configurations
      },

      aggregations: {
        rootControl: {
          type: "sap.ui.core.Control",
          multiple: false,
          visibility: "hidden"
        }
      },
      events: {
        checkBeforeRead: {
          parameters: {
            sheetData: {
              type: "object"
            },
            messages: {
              type: "object"
            }
          }
        },
        changeBeforeCreate: {
          parameters: {
            payload: {
              type: "object"
            }
          }
        },
        uploadButtonPress: {
          allowPreventDefault: true,
          parameters: {
            payload: {
              type: "object"
            },
            rawData: {
              type: "object"
            },
            parsedData: {
              type: "object"
            }
          }
        }
      }
    },
    constructor: function _constructor(id, settings) {
      this.settingsFromContainer = id;
      UIComponent.prototype.constructor.call(this, id, settings);
    },
    init: async function _init() {
      var oModel;
      const componentData = this.getComponentData();
      const oCompData = componentData != null ? Object.keys(componentData).length === 0 ? this.settingsFromContainer : componentData : this.settingsFromContainer;
      this.getContentDensityClass();
      this.setSpreadsheetFileName(oCompData?.spreadsheetFileName);
      this.setContext(oCompData?.context);
      this.setColumns(oCompData?.columns);
      this.setTableId(oCompData?.tableId);
      this.setOdataType(oCompData?.odataType);
      this.setMandatoryFields(oCompData?.mandatoryFields);
      this.setFieldMatchType(oCompData?.fieldMatchType);
      this.setActivateDraft(oCompData?.activateDraft);
      this.setBatchSize(oCompData?.batchSize);
      this.setStandalone(oCompData?.standalone);
      this.setReadAllSheets(oCompData?.readAllSheets);
      this.setStrict(oCompData?.strict);
      this.setDecimalSeparator(oCompData?.decimalSeparator);
      this.setHidePreview(oCompData?.hidePreview);
      this.setSkipMandatoryFieldCheck(oCompData?.skipMandatoryFieldCheck);
      this.setShowBackendErrorMessages(oCompData?.showBackendErrorMessages);
      this.setShowOptions(oCompData?.showOptions);
      this.setDebug(oCompData?.debug);
      this.setAvailableOptions(oCompData?.availableOptions);
      this.setSampleData(oCompData?.sampleData);
      this.setUseTableSelector(oCompData?.useTableSelector);
      this.setHideSampleData(oCompData?.hideSampleData);
      this.setComponentContainerData(oCompData?.componentContainerData);
      if (oCompData?.availableOptions && oCompData?.availableOptions.length > 0) {
        // if availableOptions is set show the Options Menu
        this.setShowOptions(true);
      }

      // Pro Configurations - Start

      // Pro Configurations - End

      // // we could create a device model and use it
      oModel = new JSONModel(Device);
      oModel.setDefaultBindingMode("OneWay");
      this.setModel(oModel, "device");
      this.logger = new Logger();

      // call the init function of the parent - ATTENTION: this triggers createContent()
      // call the base component's init function
      UIComponent.prototype.init.call(this);
    },
    createContent: function _createContent() {
      if (this.getDebug() || Log.getLevel() >= Log.Level.DEBUG) {
        Log.setLevel(Log.Level.DEBUG);
        Log.logSupportInfo(true);
        this.setShowOptions(true);
      }
      const componentData = Object.assign({}, this.getComponentData());
      delete componentData.context;
      Log.debug("Component Data", undefined, "SpreadsheetUpload: Component", () => this.logger.returnObject(componentData));
      this.spreadsheetUpload = new SpreadsheetUpload(this, this.getModel("i18n"));
      const componentContainerData = this.getComponentContainerData?.() || {};
      const buttonText = componentContainerData.buttonText ?? "Excel Import";
      return new Button({
        text: buttonText,
        press: () => this.openSpreadsheetUploadDialog()
      });
    },
    openSpreadsheetUploadDialog: function _openSpreadsheetUploadDialog(options) {
      if (!this.getContext()) {
        // if loaded via ComponentContainer, context is not set
        const context = this._getViewControllerOfControl(this.oContainer);
        this.setContext(context);
        // attach event from ComponentContainer
        this._attachEvents(context);
      }
      Log.debug("openSpreadsheetUploadDialog", undefined, "SpreadsheetUpload: Component");
      this.spreadsheetUpload.openSpreadsheetUploadDialog(options);
    },
    _attachEvents: function _attachEvents(context) {
      const componentContainerOptions = this.getComponentContainerData();
      const eventMethodMap = {
        uploadButtonPress: this.attachUploadButtonPress,
        changeBeforeCreate: this.attachChangeBeforeCreate,
        checkBeforeRead: this.attachCheckBeforeRead
      };
      for (const [eventName, attachMethod] of Object.entries(eventMethodMap)) {
        const methodName = componentContainerOptions[eventName];
        if (methodName && typeof context[methodName] === "function") {
          try {
            attachMethod.call(this, context[methodName].bind(context), context);
          } catch (error) {
            Log.error(`Error while attaching event ${eventName}`, error, "SpreadsheetUpload: Component");
          }
        } else {}
      }
    },
    triggerInitContext: async function _triggerInitContext() {
      await this.spreadsheetUpload.initialSetup();
    },
    setPayload: function _setPayload(payload) {
      this.spreadsheetUpload._setPayload(payload);
    },
    addArrayToMessages: function _addArrayToMessages(errorArray) {
      this.spreadsheetUpload.addToMessages(errorArray);
    },
    getMessages: function _getMessages() {
      return this.spreadsheetUpload.getMessages();
    },
    getContentDensityClass: function _getContentDensityClass() {
      if (this._sContentDensityClass === undefined) {
        // check whether FLP has already set the content density class; do nothing in this case
        if (document.body.classList.contains("sapUiSizeCozy") || document.body.classList.contains("sapUiSizeCompact")) {
          this._sContentDensityClass = "";
        } else if (!Device.support.touch) {
          // apply "compact" mode if touch is not supported
          this._sContentDensityClass = "sapUiSizeCompact";
        } else {
          // "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
          this._sContentDensityClass = "sapUiSizeCozy";
        }
      }
      return this._sContentDensityClass;
    },
    _getViewControllerOfControl: function _getViewControllerOfControl(control) {
      var oView = null;
      while (control && !(control instanceof sap.ui.core.mvc.View)) {
        control = control.getParent();
      }
      if (control) {
        oView = control;
        var oController = oView.getController();
        return oController;
      } else {
        return null;
      }
    }
  });
  return Component;
});
//# sourceMappingURL=Component.js.map