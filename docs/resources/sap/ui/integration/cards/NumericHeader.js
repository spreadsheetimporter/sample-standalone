/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","sap/base/util/extend","sap/f/cards/NumericHeader","sap/f/cards/NumericHeaderRenderer","sap/f/cards/NumericSideIndicator","sap/ui/model/json/JSONModel","sap/ui/integration/util/BindingResolver","sap/ui/integration/util/LoadingProvider"],function(t,e,i,a,r,o,s,n){"use strict";var d=i.extend("sap.ui.integration.cards.NumericHeader",{constructor:function(t,a){t=t||{};var o={title:t.title,titleMaxLines:t.titleMaxLines,subtitle:t.subTitle,subtitleMaxLines:t.subTitleMaxLines,dataTimestamp:t.dataTimestamp,visible:t.visible};if(t.status&&t.status.text&&!t.status.text.format){o.statusText=t.status.text}e(o,{unitOfMeasurement:t.unitOfMeasurement,details:t.details,detailsMaxLines:t.detailsMaxLines,sideIndicatorsAlignment:t.sideIndicatorsAlignment});if(t.mainIndicator){o.number=t.mainIndicator.number;o.scale=t.mainIndicator.unit;o.trend=t.mainIndicator.trend;o.state=t.mainIndicator.state}if(t.sideIndicators){o.sideIndicators=t.sideIndicators.map(function(t){return new r(t)})}o.toolbar=a;i.call(this,o)},metadata:{library:"sap.ui.integration",properties:{interactive:{type:"boolean",defaultValue:false}},aggregations:{_loadingProvider:{type:"sap.ui.core.Element",multiple:false,visibility:"hidden"}},associations:{card:{type:"sap.ui.integration.widgets.Card",multiple:false}}},renderer:a});d.prototype.init=function(){i.prototype.init.call(this);this._bReady=false;this.setAggregation("_loadingProvider",new n);this._aReadyPromises=[];this._awaitEvent("_dataReady");Promise.all(this._aReadyPromises).then(function(){this._bReady=true;this.fireEvent("_ready")}.bind(this))};d.prototype.exit=function(){i.prototype.exit.call(this);this._oServiceManager=null;this._oDataProviderFactory=null;if(this._oDataProvider){this._oDataProvider.destroy();this._oDataProvider=null}if(this._oActions){this._oActions.destroy();this._oActions=null}};d.prototype._isInteractive=function(){return this.getInteractive()};d.prototype.isReady=function(){return this._bReady};d.prototype.isLoading=function(){var t=this.getAggregation("_loadingProvider"),e=this.getCardInstance(),i=e&&e.isA("sap.ui.integration.widgets.Card")?e.isLoading():false;return!t.isDataProviderJson()&&(t.getLoading()||i)};d.prototype._awaitEvent=function(t){this._aReadyPromises.push(new Promise(function(e){this.attachEventOnce(t,function(){e()})}.bind(this)))};d.prototype.setServiceManager=function(t){this._oServiceManager=t;return this};d.prototype.setDataProviderFactory=function(t){this._oDataProviderFactory=t;return this};d.prototype._setDataConfiguration=function(t){var e=this.getCardInstance(),i="/",a;if(t&&t.path){i=s.resolveValue(t.path,this.getCardInstance())}this.bindObject(i);if(this._oDataProvider){this._oDataProvider.destroy()}this._oDataProvider=e.getDataProviderFactory().create(t,this._oServiceManager);this.getAggregation("_loadingProvider").setDataProvider(this._oDataProvider);if(t&&t.name){a=e.getModel(t.name)}else if(this._oDataProvider){a=new o;this.setModel(a)}if(this._oDataProvider){this._oDataProvider.attachDataRequested(function(){this.showLoadingPlaceholders()}.bind(this));this._oDataProvider.attachDataChanged(function(t){a.setData(t.getParameter("data"));this.onDataRequestComplete()}.bind(this));this._oDataProvider.attachError(function(t){this._handleError(t.getParameter("message"));this.onDataRequestComplete()}.bind(this));this._oDataProvider.triggerDataUpdate()}else{this.fireEvent("_dataReady")}};d.prototype._handleError=function(t){this.fireEvent("_error",{logMessage:t})};d.prototype.refreshData=function(){if(this._oDataProvider){this._oDataProvider.triggerDataUpdate()}};d.prototype.showLoadingPlaceholders=function(){this.getAggregation("_loadingProvider").setLoading(true)};d.prototype.hideLoadingPlaceholders=function(){this.getAggregation("_loadingProvider").setLoading(false)};d.prototype.onDataRequestComplete=function(){this.fireEvent("_dataReady");this.hideLoadingPlaceholders()};d.prototype.getCardInstance=function(){return t.byId(this.getCard())};return d});
//# sourceMappingURL=NumericHeader.js.map