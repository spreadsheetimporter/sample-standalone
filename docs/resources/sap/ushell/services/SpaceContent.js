// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/Config","sap/base/util/deepClone","sap/ushell/library","sap/ui/thirdparty/hasher","sap/ushell/utils/WindowUtils","sap/base/Log"],function(e,t,n,a,i,r){"use strict";var o=n.AppType;var u=function(){};u.prototype.isPersonalizationEnabled=function(){return e.last("/core/shell/enablePersonalization")};u.prototype.getPage=function(e){var n;return sap.ushell.Container.getServiceAsync("Pages").then(function(t){n=t;return n.loadPage(e)}).then(function(e){return t(n.getModel().getProperty(e),20)})};u.prototype.getPages=function(e){var n;return sap.ushell.Container.getServiceAsync("Pages").then(function(t){n=t;return n.loadPages(e)}).then(function(e){var a={};Object.keys(e).forEach(function(i){a[i]=t(n.getModel().getProperty(e[i]),20)});return a})};u.prototype.addSection=function(e,t,n){return sap.ushell.Container.getServiceAsync("Pages").then(function(a){var i=a.getPageIndex(e);return a.addSection(i,t,n)})};u.prototype.addVisualization=function(e,t,n){return sap.ushell.Container.getServiceAsync("Pages").then(function(a){return a.addVisualization(e,t,n)})};u.prototype.moveVisualization=function(e,t,n,a,i){return sap.ushell.Container.getServiceAsync("Pages").then(function(r){var o=r.getPageIndex(e);return r.moveVisualization(o,t,n,a,i)})};u.prototype.updateVisualization=function(e,t,n,a){var i={displayFormatHint:a.displayFormatHint,title:a.title,subtitle:a.subtitle,info:a.info};return sap.ushell.Container.getServiceAsync("Pages").then(function(a){var r=a.getPageIndex(e);return a.updateVisualization(r,t,n,i)})};u.prototype.deleteVisualization=function(e,t,n){return sap.ushell.Container.getServiceAsync("Pages").then(function(a){var i=a.getPageIndex(e);return a.deleteVisualization(i,t,n)})};u.prototype.instantiateVisualization=function(e){return sap.ushell.Container.getServiceAsync("VisualizationInstantiation").then(function(t){return t.instantiateVisualization(e)})};u.prototype.launchTileTarget=function(t,n){if(typeof t!=="string"){r.error("Invalid target URL",null,"sap.ushell.services.SpaceContent");return}if(t.indexOf("#")===0){a.setHash(t)}else{if(n){var u=e.last("/core/shell/enableRecentActivity")&&e.last("/core/shell/enableRecentActivityLogging");if(u){var s={title:n,appType:o.URL,url:t,appId:t};sap.ushell.Container.getRenderer("fiori2").logRecentActivity(s)}}i.openURL(t,"_blank")}};u.prototype.getUserDefaultParameter=function(e){var t;var n;return Promise.all([sap.ushell.Container.getServiceAsync("ClientSideTargetResolution"),sap.ushell.Container.getServiceAsync("UserDefaultParameters")]).then(function(e){n=e[0];t=e[1];return n.getSystemContext("")}).then(function(n){return new Promise(function(a,i){t.getValue(e,n).done(a).fail(i)})}).then(function(e){if(!e.value&&!e.extendedValue){return null}var t={};if(e.value){t.value=e.value}if(e.extendedValue){t.extendedValue=e.extendedValue}return t})};u.hasNoAdapter=true;return u});
//# sourceMappingURL=SpaceContent.js.map