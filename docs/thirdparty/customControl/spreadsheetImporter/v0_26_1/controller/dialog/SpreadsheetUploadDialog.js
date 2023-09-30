"use strict";sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/core/Fragment","sap/m/MessageToast","../Preview","../Util","cc/spreadsheetimporter/v0_26_1/thirdparty/xlsx","./OptionsDialog","sap/base/Log","../SheetHandler","../Parser","sap/ui/model/json/JSONModel"],function(e,t,s,o,a,n,r,l,i,h,p){"use strict";function d(e){return e&&e.__esModule&&typeof e.default!=="undefined"?e.default:e}const c=d(o);const u=d(a);const g=d(r);const m=d(i);const f=d(h);const y=e.extend("cc.spreadsheetimporter.v0_26_1.SpreadsheetUploadDialog",{constructor:function t(s,o,a,n){e.prototype.constructor.call(this);this.spreadsheetUploadController=s;this.component=o;this.componentI18n=a;this.util=new u(a.getResourceBundle());this.previewHandler=new c(this.util);this.optionsHandler=new g(s);this.messageHandler=n},createSpreadsheetUploadDialog:async function e(){if(!this.spreadsheetUploadDialog){this.spreadsheetOptionsModel=new p({dataRows:0,strict:this.component.getStrict(),hidePreview:this.component.getHidePreview(),showOptions:this.component.getShowOptions()});this.spreadsheetUploadDialog=await t.load({name:"cc.spreadsheetimporter.v0_26_1.fragment.SpreadsheetUpload",type:"XML",controller:this});this.spreadsheetUploadDialog.setComponent(this.component);this.spreadsheetUploadDialog.setBusyIndicatorDelay(0);this.spreadsheetUploadDialog.setModel(this.componentI18n,"i18n");this.spreadsheetUploadDialog.setModel(this.spreadsheetOptionsModel,"info");this.spreadsheetUploadDialog.setModel(this.component.getModel("device"),"device");this.spreadsheetUploadDialog.attachDecimalSeparatorChanged(this.onDecimalSeparatorChanged.bind(this));this.spreadsheetUploadDialog.attachAvailableOptionsChanged(this.onAvailableOptionsChanged.bind(this))}if(this.component.getStandalone()&&this.component.getColumns().length===0){this.spreadsheetUploadDialog.getSubHeader().setVisible(false);this.spreadsheetUploadDialog.getSubHeader().getContentLeft()[0].setVisible(false)}},onFileUpload:async function e(t){try{this.messageHandler.setMessages([]);const e=t.getParameter("files")[0];const s=await this._readWorkbook(e);const o=this.component.getStandalone();const a=this.component.getReadAllSheets();let r=[];let l=[];if(o&&a){for(const e of Object.keys(s.Sheets)){let t=m.sheet_to_json(s.Sheets[e]);for(const s of t){Object.keys(s).forEach(t=>{s[t].sheetName=e})}r=r.concat(t);l=l.concat(n.utils.sheet_to_json(s.Sheets[e],{header:1})[0])}}else{const e=s.SheetNames[0];r=m.sheet_to_json(s.Sheets[e]);l=n.utils.sheet_to_json(s.Sheets[e],{header:1})[0]}if(!r||r.length===0){throw new Error(this.util.geti18nText("emptySheet"))}for(const e of r){for(const t in e){e[t].rawValue=typeof e[t].rawValue==="string"?e[t].rawValue.trim():e[t].rawValue}}if(!o){this.messageHandler.checkFormat(r);this.messageHandler.checkMandatoryColumns(r,l,this.spreadsheetUploadController.odataKeyList,this.component.getMandatoryFields(),this.spreadsheetUploadController.typeLabelList);this.messageHandler.checkColumnNames(l,this.component.getFieldMatchType(),this.spreadsheetUploadController.typeLabelList)}this.spreadsheetUploadController.payload=r;this.component.fireCheckBeforeRead({sheetData:r});this.spreadsheetUploadController.payloadArray=o?this.spreadsheetUploadController.payload:f.parseSpreadsheetData(this.spreadsheetUploadController.payload,this.spreadsheetUploadController.typeLabelList,this.component,this.messageHandler,this.util,this.spreadsheetUploadController.isODataV4);if(this.messageHandler.areMessagesPresent()){this.messageHandler.displayMessages();return}this.setDataRows(this.spreadsheetUploadController.payloadArray.length)}catch(e){u.showError(e,"SpreadsheetUpload.ts","onFileUpload");this.resetContent()}},onUploadSet:async function e(t){const o=this.component.fireUploadButtonPress({payload:this.spreadsheetUploadController.payloadArray,rawData:this._extractRawValues(this.spreadsheetUploadController.payloadArray),parsedData:this._extractParsedValues(this.spreadsheetUploadController.payloadArray)});if(!o||this.component.getStandalone()){this.onCloseDialog();return}if(!this.spreadsheetUploadController.payloadArray.length){s.show(this.util.geti18nText("selectFileUpload"));return}var a=this;const n=t.getSource();const r=n.getParent();r.setBusyIndicatorDelay(0);r.setBusy(true);await u.sleep(50);var i=function(){return new Promise((e,t)=>{a.spreadsheetUploadController.getODataHandler().callOdata(e,t,a.spreadsheetUploadController)})};var h={busy:{set:true,check:false},dataloss:{popup:false,navigation:false},sActionLabel:this.util.geti18nText("uploadingFile")};if(this.spreadsheetUploadController.isODataV4){await this.spreadsheetUploadController.context.editFlow.securedExecution(i,h)}else{try{if(this.spreadsheetUploadController.context.extensionAPI){await this.spreadsheetUploadController.context.extensionAPI.securedExecution(i,h)}else{await i()}}catch(e){l.error("Error while calling the odata service",e,"SpreadsheetUpload: onUploadSet");this.resetContent()}}r.setBusy(false);this.onCloseDialog()},openSpreadsheetUploadDialog:function e(){this.spreadsheetUploadDialog.open()},onCloseDialog:function e(){this.resetContent();this.spreadsheetUploadDialog.close()},onDecimalSeparatorChanged:function e(t){this.component.setDecimalSeparator(t.getParameter("decimalSeparator"))},onAvailableOptionsChanged:function e(t){const s=t.getParameter("availableOptions");if(s.length>0){this.component.setShowOptions(true);this.spreadsheetOptionsModel.setProperty("/showOptions",true)}else{this.component.setShowOptions(false);this.spreadsheetOptionsModel.setProperty("/showOptions",true)}this.component.setAvailableOptions(s)},resetContent:function e(){this.spreadsheetUploadDialog.getModel("info").setProperty("/dataRows",0);var t=this.spreadsheetUploadDialog.getContent()[0].getItems()[1];t.setValue()},setDataRows:function e(t){this.spreadsheetUploadDialog.getModel("info").setProperty("/dataRows",t)},getDialog:function e(){return this.spreadsheetUploadDialog},showPreview:async function e(){this.previewHandler.showPreview(this.spreadsheetUploadController.getPayloadArray())},onTempDownload:function e(){let t=this.component.getFieldMatchType();var o={};let a=[];let r=this.component.getSampleData();if(!r||r.length===0){r=[{}]}const l=15;const i=20;let h=0;let p=1;if(this.component.getStandalone()){for(let e of this.component.getColumns()){o[n.utils.encode_cell({c:h,r:0})]={v:e,t:"s"};h++}}else{for(let[e,s]of this.spreadsheetUploadController.typeLabelList.entries()){let d={v:"",t:"s"};let c="";if(t==="label"){c=s.label}if(t==="labelTypeBrackets"){c=`${s.label}[${e}]`}o[n.utils.encode_cell({c:h,r:0})]={v:c,t:"s"};for(const[t,c]of r.entries()){let r;p=t+1;if(c[e]){r=c[e]}if(s.type==="Edm.Boolean"){d={v:r?r.toString():"true",t:"b"};a.push({wch:l})}else if(s.type==="Edm.String"){let e;if(s.maxLength){e=r?r:"test string".substring(0,s.maxLength)}else{e=r?r:"test string"}d={v:e,t:"s"};a.push({wch:l})}else if(s.type==="Edm.DateTimeOffset"||s.type==="Edm.DateTime"){let e;const t=sap.ui.getCore().getConfiguration().getLanguage();if(t.startsWith("en")){e="mm/dd/yyyy hh:mm AM/PM"}else{e="dd.mm.yyyy hh:mm"}d={v:r?r:new Date,t:"d",z:e};a.push({wch:i})}else if(s.type==="Edm.Date"){d={v:r?r:new Date,t:"d"};a.push({wch:l})}else if(s.type==="Edm.TimeOfDay"||s.type==="Edm.Time"){d={v:r?r:new Date,t:"d",z:"hh:mm"};a.push({wch:l})}else if(s.type==="Edm.UInt8"||s.type==="Edm.Int16"||s.type==="Edm.Int32"||s.type==="Edm.Integer"||s.type==="Edm.Int64"||s.type==="Edm.Integer64"){d={v:r?r:85,t:"n"};a.push({wch:l})}else if(s.type==="Edm.Double"||s.type==="Edm.Decimal"){const e=this.component.getDecimalSeparator();d={v:r?r:`123${e}4`,t:"n"};a.push({wch:l})}if(!this.component.getHideSampleData()){o[n.utils.encode_cell({c:h,r:p})]=d}}h++}}o["!ref"]=n.utils.encode_range({s:{c:0,r:0},e:{c:h,r:r.length}});o["!cols"]=a;const d=n.utils.book_new();n.utils.book_append_sheet(d,o,"Tabelle1");n.writeFile(d,this.component.getSpreadsheetFileName());s.show(this.util.geti18nText("downloadingTemplate"))},onOpenOptionsDialog:function e(){this.optionsHandler.openOptionsDialog()},_readWorkbook:async function e(t){return new Promise(async(e,s)=>{try{const s=await this.buffer_RS(t.stream());let o=n.read(s,{cellNF:true,cellDates:true,cellText:true,cellFormula:true});e(o)}catch(e){l.error("Error while reading the uploaded workbook",e,"SpreadsheetUpload: _readWorkbook");s(e)}})},buffer_RS:async function e(t){const s=[];const o=t.getReader();for(;;){const e=await o.read();if(e.value)s.push(e.value);if(e.done)break}const a=new Uint8Array(s.reduce((e,t)=>e+t.length,0));let n=0;for(const e of s){a.set(e,n);n+=e.length}return a},_extractRawValues:function e(t){return t.map(e=>{const t={};for(const s in e){if(e[s].hasOwnProperty("rawValue")){t[s]=e[s].rawValue}}return t})},_extractParsedValues:function e(t){return t.map(e=>{const t={};for(const s in e){if(e[s].hasOwnProperty("formattedValue")){t[s]=e[s].formattedValue}}return t})}});return y});
//# sourceMappingURL=SpreadsheetUploadDialog.js.map