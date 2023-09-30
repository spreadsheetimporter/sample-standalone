// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/EventHub","sap/ui/core/mvc/Controller","sap/ui/core/Fragment","sap/ui/core/CustomData","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/base/util/uid"],function(e,t,o,i,n,r,s){"use strict";return t.extend("sap.ushell.components.workPageBuilder.controller.ContentPicker",{_getDialog:function(){if(!this._oContentPickerDialog){return new Promise(function(e,t){o.load({name:"sap.ushell.components.workPageBuilder.view.ContentPicker",controller:this}).then(function(t){var o=new i("rowBindingContext",{key:"columnControl",value:this._oProvider.oColumn});this._oContentPickerDialog=t;this._oContentPickerDialog.setModel(this._oProvider.oWorkPageBuilderView.getModel());this._oContentPickerDialog.setModel(this._oProvider.oWorkPageBuilderView.getModel("i18n"),"i18n");this._oContentPickerDialog.bindElement({path:this._oProvider.sCatalogRootPath});this._oContentPickerDialog.addCustomData(o);e(this._oContentPickerDialog)}.bind(this))}.bind(this))}return Promise.resolve(this._oContentPickerDialog)},openDialog:function(){return this._getDialog().then(function(e){e.getCustomData()[0].setValue(this._oProvider.oColumn);e.open()}.bind(this))},onSearch:function(e){var t=e.getSource().getValue();var o=new n("Descriptor/sap.app/title",r.Contains,t);var i=new n("Descriptor/sap.app/subTitle",r.Contains,t);var s=new n([o,i],false);var a=this._oContentPickerDialog.getContent()[0];a.getBinding("items").filter(s)},onConfirm:function(){var t=this._oProvider.oWorkPageBuilderView.getModel(),o=this._oContentPickerDialog.getContent()[0],i=this._oContentPickerDialog.getCustomData()[0].getValue(),n=i.getBindingContext().getPath(),r=t.getProperty(n),a=false,l=o.getSelectedItem(),g=l.getBindingContext().getObject(),u={Id:s(),Descriptor:{},Visualization:{Id:g.Id}},c=this._oProvider.sVizRootPath+"/"+g.Id;if(!t.getProperty(c)){t.setProperty(c,g)}if(!r.Cells){r.Cells=[]}r.Cells.push({Id:s(),Widgets:[u]});t.setProperty(n,r);e.emit("WorkPageHasChanges",true);if(a){i.rerender()}this.closeDialog()},closeDialog:function(){var e=this._oContentPickerDialog.getContent()[0];var t=this._oContentPickerDialog.getCustomHeader().getContent()[2];e.removeSelections(true);e.getBinding("items").filter(null);t.setValue("");this._oContentPickerDialog.close()},onCancel:function(){this.closeDialog()},setProvider:function(e){this._oProvider=e},getProvider:function(){return this._oProvider}})});
//# sourceMappingURL=ContentPicker.controller.js.map