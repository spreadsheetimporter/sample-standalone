"use strict";

sap.ui.define(["sap/ui/base/ManagedObject", "sap/m/Dialog", "sap/m/Select", "sap/m/Button", "sap/ui/core/Item", "sap/ui/model/resource/ResourceModel"], function (ManagedObject, Dialog, Select, Button, Item, ResourceModel) {
  "use strict";

  /**
   * @namespace cc.spreadsheetimporter.v0_26_1
   */
  const TableSelector = ManagedObject.extend("cc.spreadsheetimporter.v0_26_1.TableSelector", {
    constructor: function _constructor(view) {
      ManagedObject.prototype.constructor.call(this);
      this._tables = [];
      this._tables = this._getTableObject(view);
      this._i18nModel = new ResourceModel({
        bundleName: "cc.spreadsheetimporter.v0_26_1.i18n.i18n"
      });
    },
    getTables: function _getTables() {
      return this._tables;
    },
    chooseTable: function _chooseTable() {
      return new Promise((resolve, reject) => {
        if (this._tables.length === 0) {
          reject(new Error("No tables found"));
        }
        if (this._tables.length === 1) {
          resolve(this._tables[0]);
        }
        const select = new Select();
        this._tables.forEach(table => {
          select.addItem(new Item({
            key: table.getId(),
            text: table.getBinding("items").getPath()
          }));
        });
        const i18n = this._i18nModel.getResourceBundle();
        const dialog = new Dialog({
          title: i18n.getText("tableSelectorDialogTitle"),
          type: "Message",
          content: [select],
          beginButton: new Button({
            text: i18n.getText("ok"),
            press: () => {
              const selectedKey = select.getSelectedKey();
              const selectedTable = this._tables.find(table => table.getId() === selectedKey);
              resolve(selectedTable);
              dialog.close();
            }
          }),
          afterClose: () => dialog.destroy(),
          endButton: new Button({
            text: i18n.getText("close"),
            press: () => {
              reject(new Error(i18n.getText("close")));
              dialog.close();
            }
          })
        });
        dialog.open();
      });
    },
    _getTableObject: function _getTableObject(view) {
      return view.findAggregatedObjects(true, function (object) {
        return object.isA("sap.m.Table") || object.isA("sap.ui.table.Table");
      });
    },
    get tables() {
      return this._tables;
    },
    set tables(value) {
      this._tables = value;
    }
  });
  return TableSelector;
});
//# sourceMappingURL=TableSelector.js.map