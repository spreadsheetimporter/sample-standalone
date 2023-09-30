declare module "cc/spreadsheetimporter/v0_26_1/control/SpreadsheetDialog" {
    import Dialog from "sap/m/Dialog";
    import type { MetadataOptions } from "sap/ui/core/Element";
    import SpreadsheetDialogRenderer from "cc/spreadsheetimporter/v0_26_1/control/SpreadsheetDialogRenderer";
    /**
     * Constructor for a new <code>cc.spreadsheetimporter.XXXnamespaceXXX.SpreadsheetDialog</code> control.
     *
     * Some class description goes here.
     * @extends Dialog
     *
     * @constructor
     * @public
     * @name cc.spreadsheetimporter.XXXnamespaceXXX.SpreadsheetDialog
     */
    export default class SpreadsheetDialog extends Dialog {
        constructor(id?: string | $SpreadsheetDialogSettings);
        constructor(id?: string, settings?: $SpreadsheetDialogSettings);
        static readonly metadata: MetadataOptions;
        static renderer: typeof SpreadsheetDialogRenderer;
    }
}
//# sourceMappingURL=SpreadsheetDialog.d.ts.map