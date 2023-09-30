/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../../TableDelegate","../../table/V4AnalyticsPropertyHelper","../../util/loadModules","../../library","sap/m/ColumnPopoverSelectListItem","sap/m/MessageBox","sap/ui/core/Item","sap/ui/core/Core","sap/ui/core/library","sap/ui/core/format/ListFormat","sap/ui/base/ManagedObjectObserver"],function(e,t,r,n,a,i,o,u,s,g,l){"use strict";var f=n.TableType;var p=n.TableP13nMode;var c=new window.WeakMap;var T=Object.assign({},e);T.getPropertyHelperClass=function(){return t};T.preInit=function(e){if(!c.has(e)){c.set(e,{})}return h(e).then(function(){I(e)})};T.validateState=function(t,r,n){var a=e.validateState.apply(this,arguments);var i;var o=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");if(n=="Sort"&&r.sorters){if(E(t)&&!G(t,r.items,r.sorters)){i={validation:s.MessageType.Information,message:o.getText("table.PERSONALIZATION_DIALOG_SORT_RESTRICTION")}}}else if(n=="Group"){if(r.aggregations){var u=Object.keys(r.aggregations);var l=[];var f=g.getInstance();u.forEach(function(e){var r=t.getPropertyHelper().getProperty(e);if(r&&r.groupable){l.push(e)}});if(l.length){i={validation:s.MessageType.Information,message:o.getText("table.PERSONALIZATION_DIALOG_GROUP_RESTRICTION_TOTALS",[f.format(l)])}}}else if(t._bMobileTable){if(!G(t,r.items,r.groupLevels)){i={validation:s.MessageType.Information,message:o.getText("table.PERSONALIZATION_DIALOG_GROUP_RESTRICTION_VISIBLE")}}}}else if(n=="Column"){var p;var u=r.aggregations&&Object.keys(r.aggregations);if(!G(t,r.items,u)){p=o.getText("table.PERSONALIZATION_DIALOG_TOTAL_RESTRICTION")}if(E(t)&&!G(t,r.items,r.sorters)){p=p?p+"\n"+o.getText("table.PERSONALIZATION_DIALOG_SORT_RESTRICTION"):o.getText("table.PERSONALIZATION_DIALOG_SORT_RESTRICTION")}if(p){i={validation:s.MessageType.Information,message:p}}}return N(a,i)};T.updateBinding=function(e,t,r){if(!r||r.getPath()!=t.path){this.rebind(e,t);return}var n=r.getRootBinding();var a=n&&!n.isSuspended();try{if(a){n.suspend()}I(e,t);r.changeParameters(t.parameters);r.filter(t.filters,"Application");r.sort(t.sorter)}catch(i){this.rebind(e,t);if(n==r){a=false}}finally{if(a&&n.isSuspended()){n.resume()}}};T.rebind=function(t,r){I(t,r);e.rebind(t,r)};T.addColumnMenuItems=function(e,t){var r=e.getPropertyHelper();var n=r.getProperty(t.getDataProperty());var a=[];if(!n){return[]}if(e.isGroupingEnabled()){var i=n.getGroupableProperties();if(i.length>0){a.push(m(i,t))}}if(e.isAggregationEnabled()){var o=n.getAggregatableProperties().filter(function(e){return e.extension.customAggregate!=null});if(o.length>0){a.push(d(o,t))}}var s=e._oPopover;if(s){s.getItems().forEach(function(e,t,r){var n=e.getLabel();var a=u.getLibraryResourceBundle("sap.ui.mdc");if(n===a.getText("table.SETTINGS_GROUP")||n===a.getText("table.SETTINGS_TOTALS")){r[t].destroy()}if(r.length==0){s.destroy()}})}return a};T.getSupportedP13nModes=function(t){var r=e.getSupportedP13nModes(t);if(t._getStringType()===f.Table){if(!r.includes(p.Group)){r.push(p.Group)}if(!r.includes(p.Aggregate)){r.push(p.Aggregate)}}return r};T.getGroupSorter=function(t,r){var n=t.getPropertyHelper();var a=t._getVisibleProperties().find(function(e){var t=n.getProperty(e.name);return t.getSimpleProperties().find(function(e){return e.name===r})});if(!a){return undefined}return e.getGroupSorter.apply(this,arguments)};function m(e,t){var r=e.map(function(e){return new o({text:e.label,key:e.name})});if(r.length>0){return new a({items:r,label:u.getLibraryResourceBundle("sap.ui.mdc").getText("table.SETTINGS_GROUP"),icon:"sap-icon://group-2",action:[{sName:"Group",oMDCColumn:t},v,this]})}}function d(e,t){var r=e.map(function(e){return new o({text:e.label,key:e.name})});if(r.length>0){return new a({items:r,label:u.getLibraryResourceBundle("sap.ui.mdc").getText("table.SETTINGS_TOTALS"),icon:"sap-icon://sum",action:[{sName:"Aggregate",oMDCColumn:t},v,this]})}}function v(e,t){var r=t.sName,n=t.oMDCColumn.getParent(),a=n.getCurrentState().groupLevels||[],o=n.getCurrentState().aggregations||{},s=Object.keys(o),g=false,l=e.getParameter("property"),f=r==="Aggregate"?a:s,p=f.filter(function(e){return r==="Aggregate"?e.name===l:e===l}).length>0;if(p){var c=u.getLibraryResourceBundle("sap.ui.mdc");var T;var m;var d;if(r==="Aggregate"){T=c.getText("table.SETTINGS_WARNING_TITLE_TOTALS");m=c.getText("table.SETTINGS_MESSAGE2");d=c.getText("table.SETTINGS_WARNING_BUTTON_TOTALS")}else{T=c.getText("table.SETTINGS_WARNING_TITLE_GROUPS");m=c.getText("table.SETTINGS_MESSAGE1");d=c.getText("table.SETTINGS_WARNING_BUTTON_GROUP")}g=true;i.warning(m,{id:n.getId()+"-messageBox",title:T,actions:[d,c.getText("table.SETTINGS_WARNING_BUTTON_CANCEL")],onClose:function(e){if(e===d){S(r,n,l)}}})}if(r==="Aggregate"&&!g){b(r,n,l)}else if(r==="Group"&&!g){b(r,n,l)}}function b(e,t,r){if(e==="Group"){t._onCustomGroup(r)}else{t._onCustomAggregate(r)}}function S(e,t,r){if(e==="Aggregate"){t._onCustomGroup(r);t._onCustomAggregate(r)}else if(e==="Group"){t._onCustomAggregate(r);t._onCustomGroup(r)}}function I(e,t){var r=c.get(e).plugin;if(!r||r.isDestroyed()){return}var n=e._getGroupedProperties().map(function(e){return e.name});var a=Object.keys(e._getAggregatedProperties());var i=t?t.parameters["$search"]:undefined;if(i){delete t.parameters["$search"]}var o={visible:P(e),groupLevels:n,grandTotal:a,subtotals:a,columnState:_(e,a),search:i};r.setAggregationInfo(o)}function P(e){var t=new Set;e.getColumns().forEach(function(r){var n=e.getPropertyHelper().getProperty(r.getDataProperty());if(!n){return}n.getSimpleProperties().forEach(function(e){t.add(e.name)})});return Array.from(t)}function _(e,t){var r={};e.getColumns().forEach(function(n){var a=n.getId()+"-innerColumn";var i=A(e,n,t);var o=i.length>0;if(a in r){r[a].subtotals=o||r[a].subtotals;r[a].grandTotal=o||r[a].grandTotal;return}r[a]={subtotals:o,grandTotal:o};O(e,i).forEach(function(e){a=e.getId()+"-innerColumn";if(a in r){r[a].subtotals=o||r[a].subtotals;r[a].grandTotal=o||r[a].grandTotal}else{r[a]={subtotals:o,grandTotal:o}}})});return r}function y(e,t){var r=e.getPropertyHelper().getProperty(t.getDataProperty());if(!r){return[]}else{return r.getSimpleProperties()}}function A(e,t,r){return y(e,t).filter(function(e){return r.includes(e.name)})}function O(e,t){var r=[];t.forEach(function(e){if(e.unitProperty){r.push(e.unitProperty)}});return e.getColumns().filter(function(t){return y(e,t).some(function(e){return r.includes(e)})})}function G(e,t,r){var n=[];if(t){t.forEach(function(t){e.getPropertyHelper().getProperty(t.name).getSimpleProperties().forEach(function(e){n.push(e.name)})})}var a=r?r.every(function(e){return n.find(function(t){return e.name?e.name===t:e===t})}):true;return a}function N(e,t){var r={Error:1,Warning:2,Information:3,None:4};if(!t||r[t.validation]-r[e.validation]>0){return e}else{return t}}function E(e){return(e.isGroupingEnabled()||e.isAggregationEnabled())&&e._isOfType(f.Table)}function h(e){if(e._isOfType(f.Table)){return(E(e)?R(e):C(e)).then(function(){return L(e)})}return Promise.resolve()}function R(e){var t=c.get(e);var n=t.plugin;if(n&&!n.isDestroyed()){n.activate();return Promise.resolve()}return Promise.all([e.awaitPropertyHelper(),r("sap/ui/table/plugins/V4Aggregation")]).then(function(r){var a=r[1][0];var i=e.getControlDelegate();n=new a({groupHeaderFormatter:function(t,r){return i.formatGroupHeader(e,t,r)}});n.setPropertyInfos(e.getPropertyHelper().getPropertiesForPlugin());e._oTable.addDependent(n);t.plugin=n})}function C(e){var t=c.get(e);if(t.plugin){t.plugin.deactivate()}return Promise.resolve()}function L(e){var t=c.get(e);if(!t.observer){t.observer=new l(function(t){h(e)});t.observer.observe(e,{properties:["p13nMode"]})}}return T});
//# sourceMappingURL=TableDelegate.js.map