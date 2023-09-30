"use strict";

sap.ui.define(["sap/ui/base/ManagedObject", "sap/base/Log", "sap/ui/core/Fragment", "sap/ui/model/json/JSONModel"], function (ManagedObject, Log, Fragment, JSONModel) {
  "use strict";

  /**
   * @namespace cc.spreadsheetimporter.v0_26_1
   */
  const OptionsDialog = ManagedObject.extend("cc.spreadsheetimporter.v0_26_1.OptionsDialog", {
    constructor: function _constructor(spreadsheetUploadController) {
      ManagedObject.prototype.constructor.call(this);
      this.availableOptions = ["strict", "fieldMatchType", "decimalSeperator"];
      this.spreadsheetUploadController = spreadsheetUploadController;
    },
    openOptionsDialog: async function _openOptionsDialog() {
      let showOptionsToUser = this.spreadsheetUploadController.component.getAvailableOptions();
      if (showOptionsToUser.length === 0) {
        showOptionsToUser = this.availableOptions;
      }
      const availableOptionsData = this.availableOptions.reduce((acc, key) => {
        acc[key] = showOptionsToUser.includes(key);
        return acc;
      }, {});
      this.spreadsheetUploadController.spreadsheetUploadDialogHandler.getDialog().setBusy(true);
      const optionsModel = new JSONModel({
        strict: this.spreadsheetUploadController.component.getStrict(),
        fieldMatchType: this.spreadsheetUploadController.component.getFieldMatchType(),
        decimalSeparator: this.spreadsheetUploadController.component.getDecimalSeparator()
      });
      const showOptionsModel = new JSONModel(availableOptionsData);
      Log.debug("openOptionsDialog", undefined, "SpreadsheetUpload: Options", () => this.spreadsheetUploadController.component.logger.returnObject({
        strict: this.spreadsheetUploadController.component.getStrict(),
        fieldMatchType: this.spreadsheetUploadController.component.getFieldMatchType(),
        decimalSeparator: this.spreadsheetUploadController.component.getDecimalSeparator()
      }));
      if (!this.optionsDialog) {
        this.optionsDialog = await Fragment.load({
          name: "cc.spreadsheetimporter.v0_26_1.fragment.OptionsDialog",
          type: "XML",
          controller: this
        });
        this.optionsDialog.setModel(this.spreadsheetUploadController.componentI18n, "i18n");
      }
      this.optionsDialog.setModel(optionsModel, "options");
      this.optionsDialog.setModel(showOptionsModel, "availableOptions");
      this.optionsDialog.open();
      this.spreadsheetUploadController.spreadsheetUploadDialogHandler.getDialog().setBusy(false);
    },
    onSave: function _onSave() {
      this.spreadsheetUploadController.component.setFieldMatchType(this.optionsDialog.getModel("options").getProperty("/fieldMatchType"));
      this.spreadsheetUploadController.component.setStrict(this.optionsDialog.getModel("options").getProperty("/strict"));
      this.spreadsheetUploadController.component.setDecimalSeparator(this.optionsDialog.getModel("options").getProperty("/decimalSeparator"));
      this.optionsDialog.close();
    },
    onCancel: function _onCancel() {
      this.optionsDialog.close();
    }
  });
  return OptionsDialog;
});
//# sourceMappingURL=OptionsDialog.js.map