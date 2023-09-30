sap.ui.define(["sap/ui/comp/smartfilterbar/SmartFilterBar","sap/m/SegmentedButton","sap/m/SegmentedButtonItem"],function(e,t,r){"use strict";var a=e.extend("sap.suite.ui.generic.template.AnalyticalListPage.control.SmartFilterBarExt",{metadata:{events:{switchToVisualFilter:{}}},renderer:{}});a.prototype.getSuppressValueListsAssociation=function(){return true};a.prototype.checkSearchAllowed=function(t){if(t&&t.oSmartFilterbar){var r=t.oSmartFilterbar.determineMandatoryFilterItems(),a=t.oSmartFilterbar.getFiltersWithValues(),i=t.oController.getView().getModel("_templPriv"),l=true,o=0;if(r.length){if(!a.length||a.length<r.length){l=false}else{for(var n=0;n<r.length;n++){for(var s=0;s<a.length;s++){if(a[s].getName()===r[n].getName()){o++}}}l=o===r.length}}if(l){var p=e.prototype.verifySearchAllowed.apply(this,arguments);if(p.hasOwnProperty("error")||p.hasOwnProperty("mandatory")){l=false}}i.setProperty("/alp/searchable",l)}};return a},true);
//# sourceMappingURL=SmartFilterBarExt.js.map