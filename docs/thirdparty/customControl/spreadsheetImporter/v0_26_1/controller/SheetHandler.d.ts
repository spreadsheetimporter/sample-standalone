declare module "cc/spreadsheetimporter/v0_26_1/controller/SheetHandler" {
    import ManagedObject from "sap/ui/base/ManagedObject";
    import { Sheet2JSONOpts, WorkSheet } from "xlsx";
    import { ArrayData } from "cc/spreadsheetimporter/v0_26_1/types";
    /**
     * @namespace cc.spreadsheetimporter.XXXnamespaceXXX
     */
    export default class SheetHandler extends ManagedObject {
        constructor();
        static sheet_to_json(sheet: WorkSheet, opts?: Sheet2JSONOpts): ArrayData;
        static make_json_row(sheet: WorkSheet, r: any, R: any, cols: any, header: any, hdr: any, o: any): {
            row: {};
            isempty: boolean;
        };
        static safe_decode_range(range: any): {
            s: {
                c: number;
                r: number;
            };
            e: {
                c: number;
                r: number;
            };
        };
        static renameAttributes(dataArray: any): any;
    }
}
//# sourceMappingURL=SheetHandler.d.ts.map