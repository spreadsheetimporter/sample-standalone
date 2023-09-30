"use strict";sap.ui.define(["sap/ui/base/ManagedObject","sap/m/Button","sap/m/Column","sap/m/ColumnListItem","sap/m/Dialog","sap/m/Table","sap/ui/model/json/JSONModel","sap/m/Text","./Util"],function(e,t,n,s,o,a,i,l,r){"use strict";function c(e){return e&&e.__esModule&&typeof e.default!=="undefined"?e.default:e}const u=c(r);const d=e.extend("cc.spreadsheetimporter.v0_26_1.Preview",{constructor:function t(n){e.prototype.constructor.call(this);this.util=n},showPreview:function e(n,s){const a=this.createDynamicTable(n,s);if(typeof a==="undefined"){return}this.dialog=new o({title:this.util.geti18nText("previewTableName"),content:[a],buttons:[new t({text:"Close",press:()=>{this.dialog.close()}})],afterClose:()=>{this.dialog.destroy()}});this.dialog.open()},createDynamicTable:function e(t,o){const r=new a;if(typeof t!=="undefined"&&t!==null&&t.length>0){const e=t[0];const a=Object.keys(e);a.forEach(e=>{const t=o.get(e);const s=t&&t.label?t.label:e;const a=new n({header:new l({text:s})});r.addColumn(a)});const c=new s;a.forEach(t=>{let n;if(typeof e[t]==="object"&&e[t]instanceof Date){n=new l({text:`{path: '${t}', type: 'sap.ui.model.type.Date'}`})}else{n=new l({text:"{"+t+"}"})}c.addCell(n)});const u=new i;u.setData(t);r.setModel(u);r.bindItems({path:"/",template:c});return r}else{u.showError(new Error(this.util.geti18nText("noDataPreview")),"Preview.ts","createDynamicTable");return undefined}}});return d});
//# sourceMappingURL=Preview.js.map