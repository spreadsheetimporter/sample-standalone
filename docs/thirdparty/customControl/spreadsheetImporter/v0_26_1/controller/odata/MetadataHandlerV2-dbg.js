"use strict";

sap.ui.define(["sap/base/Log", "./MetadataHandler"], function (Log, __MetadataHandler) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const MetadataHandler = _interopRequireDefault(__MetadataHandler);
  /**
   * @namespace cc.spreadsheetimporter.v0_26_1
   */
  const MetadataHandlerV2 = MetadataHandler.extend("cc.spreadsheetimporter.v0_26_1.MetadataHandlerV2", {
    constructor: function _constructor(spreadsheetUploadController) {
      MetadataHandler.prototype.constructor.call(this, spreadsheetUploadController);
    },
    getLabelList: function _getLabelList(colums, odataType, oDataEntityType) {
      let listObject = new Map();

      // get the property list of the entity for which we need to download the template
      const properties = oDataEntityType.property;
      const entityTypeLabel = oDataEntityType["sap:label"];
      Log.debug("SpreadsheetUpload: Annotations", undefined, "SpreadsheetUpload: MetadataHandler", () => this.spreadsheetUploadController.component.logger.returnObject(oDataEntityType));

      // check if file name is not set
      if (!this.spreadsheetUploadController.component.getSpreadsheetFileName() && entityTypeLabel) {
        this.spreadsheetUploadController.component.setSpreadsheetFileName(`${entityTypeLabel}.xlsx`);
      } else if (!this.spreadsheetUploadController.component.getSpreadsheetFileName() && !entityTypeLabel) {
        this.spreadsheetUploadController.component.setSpreadsheetFileName(`Template.xlsx`);
      }
      if (colums.length > 0) {
        for (const propertyName of colums) {
          const property = properties.find(property => property.name === propertyName);
          if (property) {
            let propertyObject = {};
            propertyObject.label = this.getLabel(oDataEntityType, properties, property, propertyName);
            if (!propertyObject.label) {
              propertyObject.label = propertyName;
            }
            propertyObject.type = property["type"];
            propertyObject.maxLength = property["maxLength"];
            listObject.set(propertyName, propertyObject);
          } else {
            Log.warning(`SpreadsheetUpload: Property ${propertyName} not found`);
          }
        }
      } else {
        for (const property of properties) {
          let hiddenProperty = false;
          const propertyName = property.name;
          try {
            hiddenProperty = property["com.sap.vocabularies.UI.v1.Hidden"].Bool === "true";
          } catch (error) {
            Log.debug(`No hidden property on ${property.name}`, undefined, "SpreadsheetUpload: MetadataHandler");
          }
          if (!hiddenProperty && !propertyName.startsWith("SAP__")) {
            let propertyObject = {};
            propertyObject.label = this.getLabel(oDataEntityType, properties, property, propertyName);
            propertyObject.type = property["type"];
            propertyObject.maxLength = property["maxLength"];
            listObject.set(propertyName, propertyObject);
          }
        }
      }
      return listObject;
    },
    getLabel: function _getLabel(oDataEntityType, properties, property, propertyName) {
      let label = "";
      if (property["sap:label"]) {
        label = property["sap:label"];
      }
      try {
        const lineItemsAnnotations = oDataEntityType["com.sap.vocabularies.UI.v1.LineItem"];
        label = lineItemsAnnotations.find(dataField => dataField.Value.Path === propertyName).Label.String;
      } catch (error) {
        Log.debug(`SpreadsheetUpload: ${propertyName} not found as a LineItem Label`, undefined, "SpreadsheetUpload: MetadataHandlerV2");
      }
      if (label.startsWith("{") && label.endsWith("}")) {
        try {
          label = this.parseI18nText(label, this.spreadsheetUploadController.view);
        } catch (error) {
          Log.debug(`SpreadsheetUpload: ${label} not found as a Resource Bundle and i18n text`, undefined, "SpreadsheetUpload: MetadataHandlerV2");
        }
      }
      if (label === "") {
        label = propertyName;
      }
      return label;
    },
    getKeyList: function _getKeyList(oDataEntityType) {
      let keys = [];
      if (this.spreadsheetUploadController.component.getSkipMandatoryFieldCheck()) {
        return keys;
      }
      for (const property of oDataEntityType.property) {
        // if property is mandatory, field should be in spreadsheet file
        const propertyName = property.name;
        // skip sap property
        if (propertyName.startsWith("SAP__")) {
          continue;
        }
        if (!this.spreadsheetUploadController.component.getSkipMandatoryFieldCheck() && property["com.sap.vocabularies.Common.v1.FieldControl"] && property["com.sap.vocabularies.Common.v1.FieldControl"]["EnumMember"] && property["com.sap.vocabularies.Common.v1.FieldControl"]["EnumMember"] === "com.sap.vocabularies.Common.v1.FieldControlType/Mandatory") {
          keys.push(propertyName);
        }
      }
      return keys;
    }
  });
  return MetadataHandlerV2;
});
//# sourceMappingURL=MetadataHandlerV2.js.map