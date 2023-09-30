// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/Control","sap/base/util/deepExtend","sap/ui/comp/smartform/SmartForm"],function(e,t,r){"use strict";var o=["sap.ui.comp.smartfield.SmartField","sap.m.Input"];var a=e.extend("sap.ushell.components.shell.Settings.userDefaults.UserDefaultsForm",{metadata:{properties:{persistencyKey:{type:"string"}},aggregations:{_smartForm:{type:"sap.ui.comp.smartform.SmartForm",multiple:false,visibility:"hidden"}},events:{}},renderer:{apiVersion:2,render:function(e,t){e.openStart("div",t);e.openEnd();e.renderControl(t.getAggregation("_smartForm"));e.close("div")}}});a.prototype.init=function(){this.setAggregation("_smartForm",new r({editable:true}).addStyleClass("sapUshellShellDefaultValuesForm"))};a.prototype.fetchVariant=function(){var e=this.getAggregation("_smartForm").getModel("MdlParameter"),t,r;return this._getFieldControls().reduce(function(o,a){t=a.getName();o[t]={value:a.getValue()};r=e.getProperty("/"+t+"/valueObject/extendedValue/");if(r){o[t].additionalValues=r}return o},{})};a.prototype.applyVariant=function(e){if(e){var r=this.getAggregation("_smartForm").getModel("MdlParameter"),o=this._getFieldControls(),a,n;for(var i=0;i<o.length;i++){a=o[i].getName();if(e[a]!==undefined){o[i].setValue(e[a].value);n=r.getProperty("/"+a+"/valueObject/");n.extendedValue=null;if(e[a].additionalValues){n=t(n,{extendedValue:e[a].additionalValues})}r.setProperty("/"+a+"/valueObject",n)}}}};a.prototype._getFieldControls=function(){return this.getControlsByFieldGroupId("UserDefaults").filter(function(e){var t=e.getMetadata().getName();return o.indexOf(t)!==-1})};a.prototype.addGroup=function(e){this.getAggregation("_smartForm").addGroup(e)};a.prototype.getGroups=function(){return this.getAggregation("_smartForm").getGroups()};a.prototype.removeGroup=function(e){this.getAggregation("_smartForm").removeGroup(e)};a.prototype.removeAllGroups=function(){this.getAggregation("_smartForm").removeAllGroups()};return a});
//# sourceMappingURL=UserDefaultsForm.js.map