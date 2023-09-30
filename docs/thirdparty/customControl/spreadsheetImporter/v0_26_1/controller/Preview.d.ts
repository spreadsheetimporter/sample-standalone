declare module "cc/spreadsheetimporter/v0_26_1/controller/Preview" {
    import ManagedObject from "sap/ui/base/ManagedObject";
    import Dialog from "sap/m/Dialog";
    import Util from "cc/spreadsheetimporter/v0_26_1/controller/Util";
    import { ListObject } from "cc/spreadsheetimporter/v0_26_1/types";
    /**
     * @namespace cc.spreadsheetimporter.XXXnamespaceXXX
     */
    export default class Preview extends ManagedObject {
        dialog: Dialog;
        util: Util;
        constructor(util: Util);
        showPreview(payload: any, typeLabelList: ListObject): void;
        createDynamicTable(data: any[], typeLabelList: ListObject): any;
    }
}
//# sourceMappingURL=Preview.d.ts.map