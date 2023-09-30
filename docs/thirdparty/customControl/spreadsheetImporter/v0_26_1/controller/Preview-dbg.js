"use strict";

sap.ui.define(["sap/ui/base/ManagedObject", "sap/m/Button", "sap/m/Column", "sap/m/ColumnListItem", "sap/m/Dialog", "sap/m/Table", "sap/ui/model/json/JSONModel", "sap/m/Text", "./Util"], function (ManagedObject, Button, Column, ColumnListItem, Dialog, Table, JSONModel, Text, __Util) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const Util = _interopRequireDefault(__Util);
  /**
   * @namespace cc.spreadsheetimporter.v0_26_1
   */
  const Preview = ManagedObject.extend("cc.spreadsheetimporter.v0_26_1.Preview", {
    constructor: function _constructor(util) {
      ManagedObject.prototype.constructor.call(this);
      this.util = util;
    },
    showPreview: function _showPreview(payload, typeLabelList) {
      const table = this.createDynamicTable(payload, typeLabelList);
      if (typeof table === "undefined") {
        return;
      }
      this.dialog = new Dialog({
        title: this.util.geti18nText("previewTableName"),
        content: [table],
        buttons: [new Button({
          text: "Close",
          press: () => {
            this.dialog.close();
          }
        })],
        afterClose: () => {
          this.dialog.destroy();
        }
      });
      this.dialog.open();
    },
    createDynamicTable: function _createDynamicTable(data, typeLabelList) {
      const table = new Table();

      // Create table columns and cells based on the first object's keys
      if (typeof data !== "undefined" && data !== null && data.length > 0) {
        const firstObject = data[0];
        const aColumns = Object.keys(firstObject);
        aColumns.forEach(column => {
          const type = typeLabelList.get(column);
          const label = type && type.label ? type.label : column;
          const oColumn = new Column({
            header: new Text({
              text: label
            })
          });
          table.addColumn(oColumn);
        });

        // Create a template for table rows
        const oTemplate = new ColumnListItem();
        aColumns.forEach(column => {
          let oCell;
          if (typeof firstObject[column] === "object" && firstObject[column] instanceof Date) {
            // show date in the format dd.mm.yyyy
            oCell = new Text({
              text: `{path: '${column}', type: 'sap.ui.model.type.Date'}`
            });
          } else {
            oCell = new Text({
              text: "{" + column + "}"
            });
          }
          oTemplate.addCell(oCell);
        });

        // Bind the data to the table
        const oModel = new JSONModel();
        oModel.setData(data);
        table.setModel(oModel);
        table.bindItems({
          path: "/",
          template: oTemplate
        });
        return table;
      } else {
        // No data
        Util.showError(new Error(this.util.geti18nText("noDataPreview")), "Preview.ts", "createDynamicTable");
        return undefined;
      }
    }
  });
  return Preview;
});
//# sourceMappingURL=Preview.js.map