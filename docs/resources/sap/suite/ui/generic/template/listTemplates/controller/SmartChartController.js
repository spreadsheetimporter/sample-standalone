sap.ui.define(["sap/ui/core/mvc/Controller","sap/suite/ui/generic/template/listTemplates/listUtils","sap/suite/ui/generic/template/genericUtilities/FeLogger","sap/base/util/merge","sap/base/util/deepExtend","sap/ui/Device"],function(t,e,a,i,r,o){"use strict";var s=new a("listTemplates.controller.SmartChartController").getLogger();var n={};var l={};var h=false;var c=t.extend("sap.suite.ui.generic.template.listTemplates.controller.SmartChartController",{setState:function(t){this.triggeredByTableSort=false;this._selectFilterByMeasure=false;this.oState=t;t.oSmartChart.attachInitialized(this._onSmartChartInit,this);t.oSmartChart.attachBeforeRebindChart(this._onBeforeRebindChart,this)},_onBeforeRebindChart:function(t){if(this.triggeredByTableSort&&this.tableSortSelection){var e=this.oState.oSmartChart.fetchVariant();if(this.tableSortSelection.length>0){e.sort={};e.sort.sortItems=[];for(var a=0;a<this.tableSortSelection.length;a++){t.mParameters.bindingParams.sorter.push(this.tableSortSelection[a]);e.sort.sortItems.push({columnKey:this.tableSortSelection[a].sPath,operation:this.tableSortSelection[a].bDescending?"Descending":"Ascending"})}}else{t.mParameters.bindingParams.sorter=this.tableSortSelection;if(e.sort){delete e.sort}}this.oState.oSmartChart.applyVariant(e);this.triggeredByTableSort=false}if(this.oState.oSmartFilterbar&&this.oState.oSmartFilterbar.getAnalyticBindingPath&&this.oState.oSmartFilterbar.getConsiderAnalyticalParameters()){try{var i=this.oState.oSmartFilterbar.getAnalyticBindingPath();if(i){this.oState.oSmartChart.setChartBindingPath(i)}}catch(t){s.warning("Mandatory parameters have no values")}}},_onSmartChartInit:function(t){var e=this.oState;var a=i({},t);e.oSmartChart.getChartAsync().then(function(t){this.oChart=t;if(o.browser.safari){e.oSmartChart.setHeight("50vH")}else{e.oSmartChart.setHeight("100%")}t.setHeight("100%");this._chartInfo={};this._chartInfo.drillStack=this.oChart.getDrillStack();e.oSmartChart.attachShowOverlay(function(t){e.oSmartChart.getToolbar().setEnabled(!t.getParameter("overlay").show)},this);this.oState.oTemplateUtils.oCommonUtils.setEnabledToolbarButtons(a.getSource());this.oState.oTemplateUtils.oCommonUtils.checkToolbarIntentsSupported(a.getSource());this.oChart.attachSelectData(this._onChartSelectData,this);this.oChart.attachDeselectData(this._onChartDeselectData,this);this.oState.oSmartChart.attachChartDataChanged(this._onPersonalisationDimeasureChange,this);if(this.oState._pendingChartToolbarInit&&this.oState.oSmartTable){if(!this.oState.oSmartFilterableKPI&&!this.oState.oMultipleViewsHandler.getMode()){this.oState.oSmartChart.getToolbar().insertContent(this.oState.alr_viewSwitchButtonOnChart,this.oState.oSmartChart.getToolbar().getContent().length)}}delete this.oState._pendingChartToolbarInit;this._changeValueAxisTitleVisibility();var i=this.oState.oController.getOwnerComponent();var r=i&&i.getChartSettings()&&i.getChartSettings().showDataLabel;h=i&&i.getChartSettings()&&i.getChartSettings().enableStableColors;n={legendGroup:{layout:{position:"bottom"}},categoryAxis:{layout:{maxHeight:.5}}};l={plotArea:{dataLabel:{visible:false}}};if(r){l.plotArea.dataLabel.visible=true;Object.assign(n,l)}if(h){this.applyStableColoringToChart()}else{this.oChart.setVizProperties(n)}this.oState.oSmartChart.attachSelectionDetailsActionPress(function(t){var a=t.getSource();var i=t.getParameter("itemContexts")&&t.getParameter("itemContexts")[0];e.oTemplateUtils.oCommonUtils.fnProcessDataLossOrDraftDiscardConfirmation(function(){if(!i){s.error("Binding context for the selected chart item is missing");return}if(a.data("CrossNavigation")){e.oTemplateUtils.oCommonEventHandlers.onEditNavigateIntent(a,i,e.oSmartFilterbar,e.oSmartChart.oChart);return}e.oTemplateUtils.oCommonUtils.navigateFromListItem(i)},Function.prototype)});s.info("Smart Chart Annotation initialized")}.bind(this))},_onChartSelectData:function(t){this.oState.oController.getOwnerComponent().getModel("_templPriv").setProperty("/alp/_ignoreChartSelections",t.getId()==="chartDataChanged");var e=this.oChart;this._chartInfo.drillStack=e.getDrillStack();var a=e._getVizFrame().vizSelection();if(a){this._chartInfo.vizSelection=a;this._chartInfo.chartSelectionBehavior=this.oChart.getSelectionBehavior();this._chartInfo.chartSelection=this.oState.oTemplateUtils.oCommonUtils.getSelectionPoints(e,this._chartInfo.chartSelectionBehavior);var i=this._chartInfo.chartSelection.dataPoints;this._lastSelected=this._getLastSel(i,this._lastSelectedList);this._lastSelectedList=i}this._updateTable();this.oState.oTemplateUtils.oCommonUtils.setEnabledToolbarButtons(t.getSource(),this._chartInfo.chartSelectionBehavior,this._chartInfo.chartSelection);this.oState.oIappStateHandler.fnStoreCurrentAppStateAndAdjustURL()},_onPersonalisationDimeasureChange:function(t){if(h){this.applyStableColoringToChart()}this._changeValueAxisTitleVisibility()},applyStableColoringToChart:function(){var t=this.oState.oController.getOwnerComponent();var e=[];var a=t.getChartSettings().dimensionSettings;var i=Object.keys(a);var r={};for(var o=0;o<i.length;o++){var s=i[o];var h=Object.keys(a[i[o]]);if(this.oChart.getVisibleDimensions().indexOf(s)>-1){for(var c=0;c<h.length;c++){var S={properties:{},dataContext:{},displayName:""};var g=h[c];S.dataContext[s]=g;S.displayName=g;if(a[s][h[c]].color){S.properties["color"]=a[s][h[c]].color}e.push(S)}}if(s==="default"){r["others"]={properties:{color:a[s].color}}}}l.plotArea.dataPointStyle=l.plotArea.dataPointStyle||{};l.plotArea.dataPointStyle=r;l.plotArea.dataPointStyle["rules"]=e;Object.assign(n,l);this.oChart.setVizProperties(n)},_getLastSel:function(t,e){var a=this.oChart;var i=this.oState.detailController&&this.oState.detailController._getSelParamsFromDPList(t);var r=this.oState.detailController&&this.oState.detailController._getSelParamsFromDPList(e);if(i){for(var o=0;o<i.length;o++){var s=i[o];var n=false;for(var l=0;l<r.length;l++){var h=r[l];n=true;for(var c in h){if(c.indexOf("__")!=-1){continue}if(s[c]!=h[c]){n=false;break}}if(n){break}}if(!n){var S=a.getVisibleDimensions();var g={};for(var l=0;l<S.length;l++){var m=S[l];g[m]=s[m]}return g}}}return null},_onChartDeselectData:function(t){var e=this;this._lastSelected=null;var a=r({},t);setTimeout(function(){var t=e.oChart;if(t.getSelectedDataPoints().count==0){e._updateTable()}else if(t.getSelectionMode()=="MULTIPLE"){e._onChartSelectData(a)}},1);var i=t.getParameter("oSource");if(i&&i instanceof sap.m.Link&&i.getParent()instanceof sap.m.Breadcrumbs){e._onChartDrilledUp(t)}this.oState.oTemplateUtils.oCommonUtils.setEnabledToolbarButtons(t.getSource());this.oState.oTemplateUtils.oCommonUtils.setEnabledFooterButtons(t.getSource())},_onChartDrilledUp:function(t){this._updateTable()},_onChartDrilledDown:function(t){this._updateTable()},_updateTable:function(){var t=this.oChart;if(!t){return}var e=[];var a=this._chartInfo.vizSelection;a=a||t._getVizFrame().vizSelection();if(a&&a.length){e=this._chartInfo.chartSelection.dataPoints}if(!e||e.length==0){this._lastSelected=null}if(this.oState.detailController){this.oState.detailController.applyParamsToTable()}},_changeValueAxisTitleVisibility:function(t){if(this.oChart.getChartType().indexOf("dual_")==0){this.oChart.setVizProperties({valueAxis:{title:{visible:true}}})}else{this.oChart.setVizProperties({valueAxis:{title:{visible:false}}})}}});return c});
//# sourceMappingURL=SmartChartController.js.map