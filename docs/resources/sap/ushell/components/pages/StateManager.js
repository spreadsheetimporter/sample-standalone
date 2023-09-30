// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/utils","sap/ushell/EventHub"],function(i,e){"use strict";var t={};t.init=function(i,t){this.aRefreshVisualizations=[];this.oPagesVisibility={};this.oPagesRuntimeNavContainer=i;this.oPagesNavContainer=t;this._oURLParsingService=sap.ushell.Container.getServiceAsync("URLParsing");this.oPagesRuntimeNavContainer.attachNavigate(this._onErrorPageNavigated,this);this.oPagesNavContainer.attachNavigate(this._onPageNavigated,this);this._onTabNavigatedBind=this._onTabNavigated.bind(this);document.addEventListener("visibilitychange",this._onTabNavigatedBind);this.oEventBus=sap.ui.getCore().getEventBus();this.oEventBus.subscribe("launchpad","setConnectionToServer",this._onEnableRequests,this);this.oEventBus.subscribe("sap.ushell","navigated",this._onShellNavigated,this);this.oEventHubListener=e.once("PagesRuntimeRendered").do(function(){this._setCurrentPageVisibility(true,false)}.bind(this))};t._onEnableRequests=function(i,e,t){if(!t||t.active===undefined){return}this._setCurrentPageVisibility(t.active,false)};t._setCurrentPageVisibility=function(i,e,t){if(this.oPagesRuntimeNavContainer.getCurrentPage().isA("sap.m.MessagePage")&&!t){return}var s=this.oPagesNavContainer.getCurrentPage();if(s){this._setPageVisibility(s,i,e)}};t._setPageVisibility=function(i,e,t){if(!i){return}if(i.getContent()[0].isA("sap.ushell.ui.launchpad.Page")){var s=i.getBindingContext().getPath();this.oPagesVisibility[s]=e;this._visitVisualizations(i,function(i){i.setActive(e,t)})}};t._visitVisualizations=function(i,e){if(!e){return}i.getContent()[0].getSections().forEach(function(i){i.getVisualizations().forEach(e)})};t._onShellNavigated=function(){var e=window.hasher.getHash();if(i.isFlpHomeIntent(e)){this._setCurrentPageVisibility(true,false);this._refreshVisualizations()}else{this._setCurrentPageVisibility(false,false)}return Promise.resolve()};t.addVisualizationForRefresh=function(i){this.aRefreshVisualizations.push(i)};t._refreshVisualizations=function(){this.aRefreshVisualizations.forEach(function(i){i.setActive(i.getActive(),true)});this.aRefreshVisualizations=[]};t._onTabNavigated=function(){var e=window.hasher.getHash();if(i.isFlpHomeIntent(e)){this._setCurrentPageVisibility(!document.hidden,false)}return Promise.resolve()};t._onPageNavigated=function(i){var e=i.getParameters();this._setPageVisibility(e.from,false,false);this._setPageVisibility(e.to,true,false)};t._onErrorPageNavigated=function(i){var e=i.getParameter("to");this._setCurrentPageVisibility(e.isA("sap.m.NavContainer"),false,true)};t.getPageVisibility=function(i){return this.oPagesVisibility[i]};t.exit=function(){this.oEventBus.unsubscribe("sap.ushell","navigated",this._onPageNavigated,this);document.removeEventListener("visibilitychange",this._onTabNavigatedBind);this.oPagesNavContainer.detachNavigate(this._onPageNavigated,this);this.oPagesRuntimeNavContainer.detachNavigate(this._onErrorPageNavigated,this);this.oEventBus.unsubscribe("launchpad","setConnectionToServer",this._onEnableRequests,this);this.oEventHubListener.off()};return t});
//# sourceMappingURL=StateManager.js.map