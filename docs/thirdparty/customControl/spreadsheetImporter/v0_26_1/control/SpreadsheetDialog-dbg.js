"use strict";

sap.ui.define(["sap/m/Dialog", "../enums", "./SpreadsheetDialogRenderer"], function (Dialog, ___enums, __SpreadsheetDialogRenderer) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const AvailableOptions = ___enums["AvailableOptions"];
  const SpreadsheetDialogRenderer = _interopRequireDefault(__SpreadsheetDialogRenderer);
  /**
   * Constructor for a new <code>cc.spreadsheetimporter.v0_26_1.SpreadsheetDialog</code> control.
   *
   * Some class description goes here.
   * @extends Dialog
   *
   * @constructor
   * @public
   * @name cc.spreadsheetimporter.v0_26_1.SpreadsheetDialog
   */
  const SpreadsheetDialog = Dialog.extend("cc.spreadsheetimporter.v0_26_1.SpreadsheetDialog", {
    renderer: SpreadsheetDialogRenderer,
    metadata: {
      properties: {
        decimalSeparator: {
          type: "string"
        },
        availableOptions: {
          type: "string[]"
        },
        component: {
          type: "object"
        }
      },
      events: {
        decimalSeparatorChanged: {
          parameters: {
            decimalSeparator: {
              type: "string"
            }
          }
        },
        availableOptionsChanged: {
          parameters: {
            availableOptions: {
              type: "string[]"
            }
          }
        }
      }
    },
    constructor: function _constructor(id, settings) {
      Dialog.prototype.constructor.call(this, id, settings);
    },
    setDecimalSeparator: function _setDecimalSeparator(sDecimalSeparator) {
      if (sDecimalSeparator === "," || sDecimalSeparator === ".") {
        this.setProperty("decimalSeparator", sDecimalSeparator);
        this.fireDecimalSeparatorChanged({
          decimalSeparator: sDecimalSeparator
        });
        return this;
      } else {
        throw new Error("Decimal separator must be either ',' or '.'");
      }
    },
    setAvailableOptions: function _setAvailableOptions(aAvailableOptions) {
      for (let option of aAvailableOptions) {
        if (!Object.values(AvailableOptions).includes(option)) {
          throw new Error("Invalid option: " + option);
        }
      }
      this.setProperty("availableOptions", aAvailableOptions);
      this.fireAvailableOptionsChanged({
        availableOptions: aAvailableOptions
      });
      return this;
    }
  });
  return SpreadsheetDialog;
});
//# sourceMappingURL=SpreadsheetDialog.js.map