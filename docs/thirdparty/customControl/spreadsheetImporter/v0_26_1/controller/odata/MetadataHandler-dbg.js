"use strict";

sap.ui.define(["sap/ui/base/ManagedObject"], function (ManagedObject) {
  "use strict";

  /**
   * @namespace cc.spreadsheetimporter.v0_26_1
   */
  const MetadataHandler = ManagedObject.extend("cc.spreadsheetimporter.v0_26_1.MetadataHandler", {
    constructor: function _constructor(spreadsheetUploadController) {
      ManagedObject.prototype.constructor.call(this);
      this.spreadsheetUploadController = spreadsheetUploadController;
    },
    parseI18nText: function _parseI18nText(i18nMetadataText, view) {
      let translatedText = "";

      // remove the symbols from the start and end of the string
      const trimmedStr = i18nMetadataText.slice(1, -1);
      // split the string by the ">" symbol
      const splitStr = trimmedStr.split(">");
      // check if there are exactly 2 parts before and after the ">" symbol
      if (splitStr.length === 2) {
        const resourceBundleName = splitStr[0];
        const i18nPropertyName = splitStr[1];
        const resourceBundle = view.getModel(resourceBundleName).getResourceBundle();
        translatedText = resourceBundle.getText(i18nPropertyName, undefined, true);
      }
      if (!translatedText || translatedText === "") {
        return "";
      } else {
        return translatedText;
      }
    }
  });
  return MetadataHandler;
});
//# sourceMappingURL=MetadataHandler.js.map