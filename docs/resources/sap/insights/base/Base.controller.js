/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","../utils/MetadataAnalyser","../utils/SelectionVariantHelper","sap/fe/navigation/SelectionVariant","sap/m/Token","../utils/oDataModelProvider","sap/ui/core/CustomData","sap/m/DynamicDateUtil","sap/ui/comp/util/DateTimeUtil","sap/ui/core/format/DateFormat","../utils/AppConstants","../utils/UrlGenerateHelper","sap/ui/core/IconPool"],function(e,t,a,r,i,n,o,s,l,d,g,u,c,f){"use strict";var h="smartForm";var p="copyCardSmartForm";return e.extend("sap.insights.base.BaseController",{constructor:function(){this._oParentViewModel=new t({oCard:{}});this.oSmartFormMap={};this.oDraftCardParams={};this.bEnableCardEdit=true},_createOdataModelsforDialog:function(e){var t=[];e.forEach(function(e){t.push(o.getOdataModel(e.descriptorContent["sap.app"].dataSources))});if(t.length){return Promise.all(t)}},setFilterTextForNoData:function(e,t,a){sap.ui.getCore().loadLibrary("sap.ui.comp",{async:true}).then(function(){sap.ui.require(["sap/ui/comp/smartform/Group","sap/ui/comp/smartform/GroupElement","sap/ui/comp/smartform/Layout","sap/m/Text"],function(r,i,n,o){e.removeAllGroups();var s=new r;var l=new i;var d=new o({text:t?this.i18Bundle.getText("noFilterMsg"):this.i18Bundle.getText("noFilterLoaded"),textAlign:"Center"});l.addElement(d);s.addGroupElement(l);e.setLayout(new n);e.addGroup(s);if(a){e.getAggregation("content").getLayout().setBackgroundDesign("Transparent")}}.bind(this))}.bind(this))},_setSmartFormForCardEdit:function(e){this._oParentViewModel.setProperty("/oCard",e);var t=e.descriptorContent["sap.app"].id,a=this.oSmartFormMap[t]&&!this.smartFormEditable?Promise.resolve(this.oSmartFormMap[t]):this._createSmartFormForCardEdit(e,this.smartFormEditable);a.then(function(t){if(this.smartFormEditable){t.setEditable(true)}var a=this.byId(h)||this.byId(p);a.removeAllItems();var r=e.descriptorContent["sap.app"].dataSources;o.getOdataModel(r).then(function(e){var r=e&&e.loaded;var i=false;if(t.getGroups()&&t.getGroups().length&&t.getGroups()[0].getGroupElements()){i=t.getGroups()[0].getGroupElements().some(function(e){return e.getElements().some(function(e){return e.getVisible()})})}if(t.getAggregation("content").getFormContainers().length&&r&&i){t.setVisible(true);setTimeout(function(){var e=t.getAggregation("content").getLayout();if(e){e.setBackgroundDesign("Transparent")}a.addItem(t)},0)}else{this.setFilterTextForNoData(t,r,true);a.addItem(t)}}.bind(this))}.bind(this))},_createSmartFormForCardEdit:function(e){return new Promise(function(t){sap.ui.getCore().loadLibraries(["sap.ui.comp","sap.m"],{async:true}).then(function(){sap.ui.require(["sap/ui/comp/smartmultiinput/SmartMultiInput","sap/ui/comp/smartform/SmartForm","sap/ui/comp/smartform/Group","sap/ui/comp/smartform/GroupElement","sap/ui/comp/smartform/Layout","sap/m/Title","sap/m/Toolbar"],function(l,d,g,u,f,h,p){var m=e.descriptorContent;var v=m["sap.card"].configuration.parameters;var y=m["sap.insights"].filterEntitySet;var S=v&&v._entitySet.value;var C=m["sap.app"].dataSources;o.getOdataModel(C).then(function(o){var C=o&&o.loaded;this._oParentViewModel.setProperty("/oCard",e);var b={layout:new f({labelSpanS:6}),customToolbar:new p({content:[new h({text:this.i18Bundle.getText("filterBy"),titleStyle:"H5"})],style:"Clear"})};var D=new d(b);var P=new g;var T=[],E=[],_=[],F=[],I,O,k=[];if(v){T=v._mandatoryODataParameters.value||[];E=v._mandatoryODataFilters.value||[];_=v._relevantODataParameters.value||[];F=v._relevantODataFilters.value||[];O=v._semanticDateRangeSetting;if(O){I=JSON.parse(O.value);k=Object.keys(I)||[]}}D.attachEditToggled(function(e){var t=e.getParameters().editable;var a=e.getSource().getGroups()&&e.getSource().getGroups().length?e.getSource().getGroups()[0]:null;if(t&&a){a.getGroupElements().forEach(function(e){e.getFields().forEach(function(e){e.attachInnerControlsCreated(function(e){var t=e.getSource(),a=t.getBindingPath("value");if((T.includes(a)||E.includes(a))&&t.getProperty("editable")){t.setMandatory(true)}else if(t.getMandatory()){t.setMandatory(false)}t.checkClientError()})})})}});var V=function(e,t){if(t){var a=new s({key:"date",value:t});e.insertCustomData(a)}};var x=o&&a.getParameterisedEntitySetByEntitySet(o.oData,y);var A=x?a.getPropertyNamesOfEntitySet(o.oData,x):[];if(C){if(_.length){_.forEach(function(e){var t=x;var r=true;if(A.indexOf(e)===-1){t=S;r=false}var i=a.isValueListWithFixedValues(o.oData,t,e);var s=a.isDate(o.oData,t,e);var d=k.includes(e);var g=new u;var f=new l({entitySet:t,value:"{"+e+"}",editable:r,visible:r,singleTokenMode:true,supportRanges:false,innerControlsCreated:this._handleVisibilityChange.bind(this,d,true)});if(i){f.attachInnerControlsCreated(function(e){var t=e.getSource();if(t.getMode()==="edit"){var a=t.getInnerControls();if(Array.isArray(a)&&a.length){var r=t.getAggregation("_initialTokens");if(t.getSingleTokenMode()){var i=a[0],n=Array.isArray(r)&&r.length?r[0]:null;if(i.setForceSelection){i.setForceSelection(false);if(n){i.setSelectedKey(n.getKey())}else{i.setSelectedItem(null)}}}else{var o=a[0];if(Array.isArray(r)&&r.length){o.setSelectedKeys(r.map(function(e){return e.getKey()}))}}if(t.getMandatory()){t.checkClientError()}}}});f.checkClientError=function(){return this._checkClientError(f)}.bind(this);f.attachSelectionChange(this._handleParameterSelectionChange.bind(this))}else{if(d){f.addStyleClass("semanticDateInsight")}f.attachTokenUpdate(this._handleParameterTokenUpdate.bind(this,null,d))}var h=v[e].value;var p=v[e].label;if(h){var m=new n({key:h,text:p?p:h});if(s){if(!k.includes(e)){V(m,new Date(h))}else{if(I&&this.smartFormEditable){var y=this._getOptionsForDynamicDate(I,e);var C=this.byId("hiddenDDR");C.setOptions(y)}h=c.formatSemanticDateTime(h,"Parameter")[0];V(m,h)}}if(i&&f.getInnerControls().length){var b=f.getInnerControls()[0];b.setSelectedKey(m.getKey())}f.addAggregation("_initialTokens",m)}if(h&&f.getVisible()){g.addElement(f);P.addGroupElement(g)}else if(this.bEnableCardEdit&&f.getVisible()){g.addElement(f);P.addGroupElement(g)}this._attachInitialiseToGroupElement(g)}.bind(this))}var M=a.getPropertyNamesOfEntitySet(o.oData,y);F.forEach(function(e){var t=e;if(!(t==="DisplayCurrency"&&_.indexOf("P_DisplayCurrency")>-1)){var n=y;var s=true;if(M.indexOf(t)===-1){var d="P_"+t;if(A.indexOf(d)>-1){n=x;t=d}else{n=S;s=false}}var g=a.isValueListWithFixedValues(o.oData,n,t);var f=a.isDate(o.oData,n,t);var h=k.includes(t);var p=new u;var m;if(t.indexOf("P_")===0){m=true}else{m=a.getPropertyFilterRestrictionByEntitySet(o.oData,n,t)}var C=new l({entitySet:n,value:"{"+t+"}",editable:s,visible:s,supportRanges:!m,singleTokenMode:m,innerControlsCreated:this._handleVisibilityChange.bind(this,h,false)});if(g){C.attachInnerControlsCreated(function(e){var t=e.getSource();if(t.getMode()==="edit"){var a=t.getInnerControls();if(Array.isArray(a)&&a.length){var r=t.getAggregation("_initialTokens");if(t.getSingleTokenMode()){var i=a[0],n=Array.isArray(r)&&r.length?r[0]:null;if(i.setForceSelection){i.setForceSelection(false);if(n){i.setSelectedKey(n.getKey())}else{i.setSelectedItem(null)}}}else{var o=a[0];if(Array.isArray(r)&&r.length){o.setSelectedKeys(r.map(function(e){return e.getKey()}))}}if(t.getMandatory()){t.checkClientError()}}}});C.checkClientError=function(){return this._checkClientError(C)}.bind(this);C.attachSelectionChange(this._handleFilterSelectionChange.bind(this))}else{if(h){C.setSingleTokenMode(true);C.addStyleClass("semanticDateInsight")}C.attachTokenUpdate(this._handleFilterTokenUpdate.bind(this,null,h))}var b=new i(v[e].value);var D=b.getSelectOption(e);if(D&&D.length){var T=[],E=[];T=r.getTokenFromSelectOptions(D,e);T.forEach(function(t,a){if(f){if(!k.includes(e)){V(t,new Date(t.getKey()))}else{if(I&&this.smartFormEditable){var r=this._getOptionsForDynamicDate(I,e);var i=this.byId("hiddenFilterDDR");i.setOptions(r)}E=c.formatSemanticDateTime(null,D[a],"Filter");E=c.formatSemanticDateTime(D[a],"Filter");E.forEach(function(e){V(t,e)})}}if(g&&C.getInnerControls().length){var n=C.getInnerControls()[0];n.setSelectedKey(t.getKey())}C.addAggregation("_initialTokens",t)}.bind(this));p.addElement(C);P.addGroupElement(p)}else if(this.bEnableCardEdit){p.addElement(C);P.addGroupElement(p)}this._attachInitialiseToGroupElement(p)}}.bind(this))}if(P.getAggregation("formElements")&&P.getAggregation("formElements").length){D.addGroup(P)}var w=m["sap.app"].id;if(C){D.setModel(o.oData)}this.oSmartFormMap[w]=D;t(D)}.bind(this))}.bind(this))}.bind(this))}.bind(this))},_handleVisibilityChange:function(e,t,a){var r=a.getSource();var i=this.byId(h);var n=i&&i.getItems()[0];var o=false;if(e&&r.getMode()==="edit"){var s=t?this.byId("hiddenDDR"):this.byId("hiddenFilterDDR");s.setValue(null);var l=r.getBinding("value").sPath;var d=r.getInnerControls();if(d.length){var g=d[0];r.setShowValueHelp(false);r.setShowSuggestion(false);if(!sap.ui.getCore().byId(g.getId()+"-dynamicDateIcon")){g.addEndIcon({id:g.getId()+"-dynamicDateIcon",src:f.getIconURI("check-availability"),press:t?this._handleParameterTokenUpdate.bind(this,r,true):this._handleFilterTokenUpdate.bind(this,r,true)});g.attachLiveChange(function(){g.setValue("");s.attachChange(t?this._onSemanticParameterDateChange.bind(this,l,r):this._onSemanticFilterDateChange.bind(this,l,r));s.openBy(r.getDomRef())}.bind(this))}}}setTimeout(function(){if(n){var e=n.getGroups()&&n.getGroups().length?n.getGroups()[0]:null;var t=e&&e.getGroupElements();if(t&&t.length){t.forEach(function(t){var a=t.getFields();a.forEach(function(e){if(!this.smartFormEditable&&e.getId()===r.getId()&&(e.getTokens&&e.getTokens().length===0)){t.removeField(e)}if(t.getVisible()&&e.getTokens&&e.getTokens().length){o=true}}.bind(this));if(!t.getFields().length){e.removeGroupElement(t)}}.bind(this))}}if(!o&&i){i.removeAllItems();this.setFilterTextForNoData(n,true,false);i.addItem(n)}}.bind(this),0)},_handleFilterTokenUpdate:function(e,t,n){var o=e?e:n.getSource();if(o.getMandatory()){o.checkClientError()}var s=o.getBinding("value").sPath;var l=o.getTokens();var d=this._oParentViewModel.getProperty("/oCard");var g=d.descriptorContent["sap.app"].id;var u=o.getModel();var c=a.isDate(u,o.getEntitySet(),s);var f,h="";if(t&&(!l.length||e)){f=this.byId("hiddenFilterDDR");f.attachChange(this._onSemanticFilterDateChange.bind(this,s,o));f.openBy(o.getDomRef());if(!l.length){this.oDraftCardParams[g][s]=r.getEmptySVStringforProperty(s)}else{h=f._parseValue(l[0].getKey());if(h){f.setValue(h)}}}else if(l.length){var p=new i;var m=[];var v="";l.forEach(function(e){v="";if(t){f=f?f:this.byId("hiddenFilterDDR");h=f._parseValue(l[0].getKey());if(h){f.setValue(h)}}if(e.data("selectOption")){var a=e.data("selectOption");if(!a.Text){a.Text=e.getText?e.getText():null}m.push(a)}else if(e.data("range")){var i=e.data("range");var n=r.getSelectOptionFromRange(i,e.getText());m.push(n)}else if(c){var d=u.formatValue(e.getKey(),"Edm.DateTime");p.addSelectOption(s,"I","EQ",d,null,d)}else if(o._parseValue){var g=o._parseValue(e.getKey());v=e.getText()?e.getText():e.getKey();p.addSelectOption(s,"I","EQ",g,null,v)}else{v=e.getText()?e.getText():e.getKey();p.addSelectOption(s,"I","EQ",e.getKey(),null,v)}});p.massAddSelectOption(s,m);this.oDraftCardParams[g][s]=p.toJSONString()}else{this.oDraftCardParams[g][s]=r.getEmptySVStringforProperty(s)}},getLabelForField:function(e,t,a,r){if(e&&t){var i=r==="Parameter"?this.byId("hiddenDDR"):this.byId("hiddenFilterDDR");var n=i.getIdForLabel()||"";n=n.substring(0,n.lastIndexOf("-"));if(n){var o=sap.ui.getCore().byId(n);return o&&o.getValue()}else if(i&&i.getProperty("value")){return i.getProperty("value")}else if(a&&typeof a.getTokens==="function"){var s=a.getTokens()||[],l=s.map(function(e){return e.getText()});return{type:"filters",value:l}}}},_handleFilterSelectionChange:function(e){var t=e.getParameters();var a=e.getSource().getBinding("value").getPath();var o=this._oParentViewModel.getProperty("/oCard");var s=o.descriptorContent["sap.app"].id;var l=e.getSource();var d=new i;var g="";if(t.selectedItem){l.setValueState("None");var u=e.getParameter("selectedItem");if(u){g=u.getText()?u.getText():u.getKey();l.removeAllAggregation("_initialTokens");l.addAggregation("_initialTokens",new n({key:u.getKey(),text:g}));d.addSelectOption(a,"I","EQ",u.getKey(),null,g);this.oDraftCardParams[s][a]=d.toJSONString()}else{this.oDraftCardParams[s][a]=r.getEmptySVStringforProperty(a)}}else{var c=e.getSource().getInnerControls()[0].getSelectedItems();if(c.length){l.setValueState("None");l.removeAllAggregation("_initialTokens");c.forEach(function(e){g=e.getText()?e.getText():e.getKey();l.addAggregation("_initialTokens",new n({key:e.getKey(),text:g}));d.addSelectOption(a,"I","EQ",e.getKey(),null,g)});this.oDraftCardParams[s][a]=d.toJSONString()}else{this.oDraftCardParams[s][a]=r.getEmptySVStringforProperty(a)}}},_handleParameterSelectionChange:function(e){var t=e.getParameter("selectedItem");var a=e.getSource(),r="";var i={value:"",label:""};if(t){a.setValueState("None");r=t.getText()?t.getText():t.getKey();i.value=t.getKey();i.label=r}a.removeAllAggregation("_initialTokens");a.addAggregation("_initialTokens",new n({key:i.value,text:i.label}));var o=e.getSource().getBinding("value").getPath();var s=this._oParentViewModel.getProperty("/oCard").descriptorContent["sap.app"].id;this.oDraftCardParams[s][o]=i},_handleParameterTokenUpdate:function(e,t,r){var i=e?e:r.getSource();if(i.getMandatory()){i.checkClientError()}var n=i.getBinding("value").sPath;var o=i.getTokens();var s=this._oParentViewModel.getProperty("/oCard").descriptorContent["sap.app"].id;var l={value:"",label:""};var d=i.getModel();var g=a.isDate(d,i.getEntitySet(),n);var u,f;if(t&&(!o.length||e)){f=this.byId("hiddenDDR");f.attachChange(this._onSemanticParameterDateChange.bind(this,n,i));f.openBy(i.getDomRef())}if(o.length){l.label=o[0].getText()?o[0].getText():o[0].getKey();if(t&&!f){f=this.byId("hiddenDDR")}if(f&&f._parseValue){u=f._parseValue(o[0].getKey());if(u){f.setValue(u);l.value=c.getDateRangeValue(u,true);var h=this.getLabelForField(n,u,e,"Parameter");var p="";var m=u.operator==="DATE";if(h&&typeof h==="string"){p=h.substring(0,h.indexOf("(")-1);if(!p&&m){p=h}}l.label=p?p:u.operator}else{l.value=o[0].getKey()}}else{u=i._parseValue&&i._parseValue(o[0].getKey());if(g&&u){u=i.getModel().formatValue(u,i.getDataType());l.value=u}else if(u){l.value=u}else{u=o[0].getKey();l.value=u}}}this.oDraftCardParams[s][n]=l},_mergeDraftParamsIncard:function(e){var t=e.descriptorContent["sap.card"].configuration.parameters;var a=e.descriptorContent["sap.app"].id;var r=this.oDraftCardParams[a];Object.keys(r).forEach(function(e){if(t[e]){if(t[e].type==="datetime"&&typeof t[e].value==="string"&&t[e].value.includes("operation")){var a=JSON.parse(t[e].value);a.operation=r[e];t[e].value=JSON.stringify(a)}else{t[e].value=r[e].value?r[e].value:r[e];if(r[e].label){t[e].label=r[e].label}}}else if(e.indexOf("P_")===0&&t[e.replace("P_","")]){r[e.replace("P_","")]=r[e].replace("P_","");t[e.replace("P_","")].value=r[e].replace("P_","");delete r[e]}});c.processPrivateParams(e,r);Object.keys(t).forEach(function(e){var a=t[e].value;if(t[e].type==="datetime"&&typeof a==="string"&&a.includes("datetime")){a=a.split("datetime");a=a[a.length-1];a=a.replace(/["']/g,"");t[e].value=a}});return e},_checkClientError:function(e){var t=e.getSingleTokenMode()?!e.getInnerControls()[0].getSelectedKey():!e.getInnerControls()[0].getSelectedKeys().length,a=e.getMandatory()&&t;e.setValueState(a?"Error":"None");return a},_attachInitialiseToGroupElement:function(e){if(e.getFields()&&e.getFields().length){e.getFields()[0].attachInitialise(function(){if(e.getFields().length&&e.getLabelControl()&&!e.getLabelControl().getText()){var t=e.getFields()[0].getBindingPath("value");if(t&&e.getFields()[0].getVisible()){e.getFields()[0].setTextLabel(t)}}})}},_onSemanticParameterDateChange:function(e,t,a){var r=a.getParameter("value");var i=this._oParentViewModel.getProperty("/oCard");var o=i.descriptorContent["sap.app"].id;var s=this.getLabelForField(e,r,t,"Parameter");var l="";var d=r.operator==="DATE";if(s&&typeof s==="string"){l=s.substring(0,s.indexOf("(")-1);if(!l&&d){l=s}}if(!this.oDraftCardParams[o][e]){this.oDraftCardParams[o][e]={}}this.oDraftCardParams[o][e].value=d?r.values[0]:r.operator;this.oDraftCardParams[o][e].label=d?r.values[0]:r.operator;t.getInnerControls()[0].setTokens([]);if(l){this.oDraftCardParams[o][e].label=l}var g=new n({key:this.oDraftCardParams[o][e].value,text:this.oDraftCardParams[o][e].label});t.getInnerControls()[0].setTokens([g]);var u=a.getParameter("valid");t.setValueState(u?"None":"Error")},_onSemanticFilterDateChange:function(e,t,a){var n=a.getParameter("value");var o=this.getLabelForField(e,n,t,"Filter");var s=c.getDateRangeValue(n,false,o);var l=this._oParentViewModel.getProperty("/oCard");var d=l.descriptorContent["sap.app"].id;var g=new i;if(!s.High){s.High=""}g.addSelectOption(e,"I",s.Option,s.Low,s.High,s.Text);this.oDraftCardParams[d][e]=g.toJSONString();t.getInnerControls()[0].setTokens([]);var u=r.getTokenFromSelectOptions(g.getSelectOption(e),e);t.getInnerControls()[0].setTokens(u);var f=a.getParameter("valid");t.setValueState(f?"None":"Error")},_getOptionsForDynamicDate:function(e,t){var a;if(e[t]["sap:filter-restriction"]==="single-value"){a=u.DATE_OPTIONS.SINGLE_OPTIONS}else if(e[t]["sap:filter-restriction"]==="interval"){a=u.DATE_OPTIONS.RANGE_OPTIONS;a=a.concat(u.DATE_OPTIONS.SINGLE_OPTIONS)}if(e&&e[t].exclude){a=a.filter(function(a){return!e[t].selectedValues.includes(a)})}return a}})});
//# sourceMappingURL=Base.controller.js.map