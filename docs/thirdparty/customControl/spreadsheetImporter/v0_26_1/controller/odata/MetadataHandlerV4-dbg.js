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
  const MetadataHandlerV4 = MetadataHandler.extend("cc.spreadsheetimporter.v0_26_1.MetadataHandlerV4", {
    constructor: function _constructor(spreadsheetUploadController) {
      MetadataHandler.prototype.constructor.call(this, spreadsheetUploadController);
    },
    getLabelList: function _getLabelList(colums, odataType) {
      let listObject = new Map();
      let entityTypeLabel;

      // get the property list of the entity for which we need to download the template
      var annotations = this.spreadsheetUploadController.context.getModel().getMetaModel().getData()["$Annotations"];
      const properties = this.spreadsheetUploadController.context.getModel().getMetaModel().getData()[odataType];
      Log.debug("SpreadsheetUpload: Annotations", undefined, "SpreadsheetUpload: MetadataHandler", () => this.spreadsheetUploadController.component.logger.returnObject(this.spreadsheetUploadController.context.getModel().getMetaModel().getData()));
      // try get facet label
      try {
        entityTypeLabel = annotations[odataType]["@com.sap.vocabularies.UI.v1.Facets"][0].Label;
      } catch (error) {
        Log.debug(`SpreadsheetUpload: Facet Label not found`, undefined, "SpreadsheetUpload: MetadataHandler");
      }

      // check if file name is not set
      if (!this.spreadsheetUploadController.component.getSpreadsheetFileName() && entityTypeLabel) {
        this.spreadsheetUploadController.component.setSpreadsheetFileName(`${entityTypeLabel}.xlsx`);
      } else if (!this.spreadsheetUploadController.component.getSpreadsheetFileName() && !entityTypeLabel) {
        this.spreadsheetUploadController.component.setSpreadsheetFileName(`Template.xlsx`);
      }
      if (colums.length > 0) {
        for (const propertyName of colums) {
          const property = properties[propertyName];
          if (property) {
            const propertyLabel = annotations[`${odataType}/${propertyName}`];
            let propertyObject = {};
            propertyObject.label = this.getLabel(annotations, properties, propertyName, propertyLabel, odataType);
            if (!propertyObject.label) {
              propertyObject.label = propertyName;
            }
            propertyObject.type = property.$Type;
            propertyObject.maxLength = property.$MaxLength;
            listObject.set(propertyName, propertyObject);
          } else {
            Log.warning(`SpreadsheetUpload: Property ${propertyName} not found`, undefined, "SpreadsheetUpload: MetadataHandler");
          }
        }
      } else {
        const propertiesFiltered = [];
        for (const propertyName in properties) {
          const propertyValue = properties[propertyName];
          if (propertyValue["$kind"] === "Property") {
            propertiesFiltered.push([propertyName, propertyValue]);
          }
        }
        for (const [propertyName, propertyValue] of propertiesFiltered) {
          const propertyLabel = annotations[`${odataType}/${propertyName}`];
          if (!propertyLabel["@com.sap.vocabularies.UI.v1.Hidden"] && !propertyName.startsWith("SAP__")) {
            let propertyObject = {};
            propertyObject.label = this.getLabel(annotations, properties, propertyName, propertyLabel, odataType);
            if (!propertyObject.label) {
              propertyObject.label = propertyName;
            }
            propertyObject.type = propertyValue.$Type;
            propertyObject.maxLength = propertyValue.$MaxLength;
            listObject.set(propertyName, propertyObject);
          }
        }
      }
      return listObject;
    },
    getLabel: function _getLabel(annotations, properties, propertyName, propertyLabel, odataType) {
      let label = "";
      if (propertyLabel && propertyLabel["@com.sap.vocabularies.Common.v1.Label"]) {
        label = propertyLabel["@com.sap.vocabularies.Common.v1.Label"];
      }
      if (label === "") {
        try {
          const lineItemsAnnotations = annotations[odataType]["@com.sap.vocabularies.UI.v1.LineItem"];
          label = lineItemsAnnotations.find(dataField => dataField.Value.$Path === propertyName).Label;
        } catch (error) {
          Log.debug(`v: ${propertyName} not found as a LineItem Label`, undefined, "SpreadsheetUpload: MetadataHandlerV4");
        }
      }
      if (label.startsWith("{") && label.endsWith("}")) {
        try {
          label = this.parseI18nText(label, this.spreadsheetUploadController.view);
        } catch (error) {
          Log.debug(`SpreadsheetUpload: ${label} not found as a Resource Bundle and i18n text`, undefined, "SpreadsheetUpload: MetadataHandlerV4");
        }
      }
      if (label === "") {
        label = propertyName;
      }
      return label;
    },
    getKeyList: function _getKeyList(odataType) {
      let keys = [];
      if (this.spreadsheetUploadController.component.getSkipMandatoryFieldCheck()) {
        return keys;
      }
      var annotations = this.spreadsheetUploadController.context.getModel().getMetaModel().getData()["$Annotations"];
      const properties = this.spreadsheetUploadController.context.getModel().getMetaModel().getData()[odataType];
      const messagesPath = annotations[odataType]["@com.sap.vocabularies.Common.v1.Messages"];
      const propertiesFiltered = Object.entries(properties).filter(_ref => {
        let [propertyName, propertyValue] = _ref;
        return propertyValue["$kind"] === "Property";
      });
      for (const [propertyName, propertyValue] of propertiesFiltered) {
        const propertyLabel = annotations[`${odataType}/${propertyName}`];
        if (!propertyLabel) {
          continue;
        }
        // skip messages property
        if (propertyName === messagesPath?.$Path || propertyName.startsWith("SAP__")) {
          continue;
        }
        // if property is mandatory, field should be in spreadsheet file
        if (!this.spreadsheetUploadController.component.getSkipMandatoryFieldCheck() && propertyLabel["@com.sap.vocabularies.Common.v1.FieldControl"] && propertyLabel["@com.sap.vocabularies.Common.v1.FieldControl"]["$EnumMember"] && propertyLabel["@com.sap.vocabularies.Common.v1.FieldControl"]["$EnumMember"] === "com.sap.vocabularies.Common.v1.FieldControlType/Mandatory") {
          keys.push(propertyName);
        }
      }
      return keys;
    }
  });
  return MetadataHandlerV4;
});
//# sourceMappingURL=MetadataHandlerV4.js.map