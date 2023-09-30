"use strict";sap.ui.define(["sap/ui/core/UIComponent","sap/ui/model/json/JSONModel","sap/ui/Device","./controller/SpreadsheetUpload","sap/base/Log","./controller/Logger","sap/m/Button"],function(e,t,a,s,o,n,i){"use strict";function l(e){return e&&e.__esModule&&typeof e.default!=="undefined"?e.default:e}const r=l(s);const p=l(n);const d=e.extend("cc.spreadsheetimporter.v0_26_1.Component",{metadata:{manifest:"json",properties:{spreadsheetFileName:{type:"string",defaultValue:"Template.xlsx"},context:{type:"object"},columns:{type:"string[]",defaultValue:[]},tableId:{type:"string"},odataType:{type:"string"},mandatoryFields:{type:"string[]",defaultValue:[]},fieldMatchType:{type:"string",defaultValue:"labelTypeBrackets"},activateDraft:{type:"boolean",defaultValue:false},batchSize:{type:"int",defaultValue:1e3},standalone:{type:"boolean",defaultValue:false},strict:{type:"boolean",defaultValue:false},decimalSeparator:{type:"string",defaultValue:""},hidePreview:{type:"boolean",defaultValue:false},skipMandatoryFieldCheck:{type:"boolean",defaultValue:false},showBackendErrorMessages:{type:"boolean",defaultValue:false},showOptions:{type:"boolean",defaultValue:false},availableOptions:{type:"string[]",defaultValue:[]},hideSampleData:{type:"boolean",defaultValue:false},sampleData:{type:"object"},useTableSelector:{type:"boolean",defaultValue:false},readAllSheets:{type:"boolean",defaultValue:false},debug:{type:"boolean",defaultValue:false},componentContainerData:{type:"object"}},aggregations:{rootControl:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},events:{checkBeforeRead:{parameters:{sheetData:{type:"object"},messages:{type:"object"}}},changeBeforeCreate:{parameters:{payload:{type:"object"}}},uploadButtonPress:{allowPreventDefault:true,parameters:{payload:{type:"object"},rawData:{type:"object"},parsedData:{type:"object"}}}}},constructor:function t(a,s){this.settingsFromContainer=a;e.prototype.constructor.call(this,a,s)},init:async function s(){var o;const n=this.getComponentData();const i=n!=null?Object.keys(n).length===0?this.settingsFromContainer:n:this.settingsFromContainer;this.getContentDensityClass();this.setSpreadsheetFileName(i?.spreadsheetFileName);this.setContext(i?.context);this.setColumns(i?.columns);this.setTableId(i?.tableId);this.setOdataType(i?.odataType);this.setMandatoryFields(i?.mandatoryFields);this.setFieldMatchType(i?.fieldMatchType);this.setActivateDraft(i?.activateDraft);this.setBatchSize(i?.batchSize);this.setStandalone(i?.standalone);this.setReadAllSheets(i?.readAllSheets);this.setStrict(i?.strict);this.setDecimalSeparator(i?.decimalSeparator);this.setHidePreview(i?.hidePreview);this.setSkipMandatoryFieldCheck(i?.skipMandatoryFieldCheck);this.setShowBackendErrorMessages(i?.showBackendErrorMessages);this.setShowOptions(i?.showOptions);this.setDebug(i?.debug);this.setAvailableOptions(i?.availableOptions);this.setSampleData(i?.sampleData);this.setUseTableSelector(i?.useTableSelector);this.setHideSampleData(i?.hideSampleData);this.setComponentContainerData(i?.componentContainerData);if(i?.availableOptions&&i?.availableOptions.length>0){this.setShowOptions(true)}o=new t(a);o.setDefaultBindingMode("OneWay");this.setModel(o,"device");this.logger=new p;e.prototype.init.call(this)},createContent:function e(){if(this.getDebug()||o.getLevel()>=o.Level.DEBUG){o.setLevel(o.Level.DEBUG);o.logSupportInfo(true);this.setShowOptions(true)}const t=Object.assign({},this.getComponentData());delete t.context;o.debug("Component Data",undefined,"SpreadsheetUpload: Component",()=>this.logger.returnObject(t));this.spreadsheetUpload=new r(this,this.getModel("i18n"));const a=this.getComponentContainerData?.()||{};const s=a.buttonText??"Excel Import";return new i({text:s,press:()=>this.openSpreadsheetUploadDialog()})},openSpreadsheetUploadDialog:function e(t){if(!this.getContext()){const e=this._getViewControllerOfControl(this.oContainer);this.setContext(e);this._attachEvents(e)}o.debug("openSpreadsheetUploadDialog",undefined,"SpreadsheetUpload: Component");this.spreadsheetUpload.openSpreadsheetUploadDialog(t)},_attachEvents:function e(t){const a=this.getComponentContainerData();const s={uploadButtonPress:this.attachUploadButtonPress,changeBeforeCreate:this.attachChangeBeforeCreate,checkBeforeRead:this.attachCheckBeforeRead};for(const[e,n]of Object.entries(s)){const s=a[e];if(s&&typeof t[s]==="function"){try{n.call(this,t[s].bind(t),t)}catch(t){o.error(`Error while attaching event ${e}`,t,"SpreadsheetUpload: Component")}}else{}}},triggerInitContext:async function e(){await this.spreadsheetUpload.initialSetup()},setPayload:function e(t){this.spreadsheetUpload._setPayload(t)},addArrayToMessages:function e(t){this.spreadsheetUpload.addToMessages(t)},getMessages:function e(){return this.spreadsheetUpload.getMessages()},getContentDensityClass:function e(){if(this._sContentDensityClass===undefined){if(document.body.classList.contains("sapUiSizeCozy")||document.body.classList.contains("sapUiSizeCompact")){this._sContentDensityClass=""}else if(!a.support.touch){this._sContentDensityClass="sapUiSizeCompact"}else{this._sContentDensityClass="sapUiSizeCozy"}}return this._sContentDensityClass},_getViewControllerOfControl:function e(t){var a=null;while(t&&!(t instanceof sap.ui.core.mvc.View)){t=t.getParent()}if(t){a=t;var s=a.getController();return s}else{return null}}});return d});
//# sourceMappingURL=Component.js.map