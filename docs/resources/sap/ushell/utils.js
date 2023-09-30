// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/Log","sap/base/util/ObjectPath","sap/base/util/uid","sap/base/util/UriParameters","sap/ui/Device","sap/ui/thirdparty/jquery","sap/ui/thirdparty/URI","sap/ushell/utils/clone","sap/ushell/utils/UrlParsing","sap/ushell/utils/objectOperations","sap/ushell/utils/type"],function(e,t,r,n,i,jQuery,a,o,s,u,l){"use strict";var c={};c.isArray=l.isArray;c.isPlainObject=l.isPlainObject;c.isDefined=l.isDefined;c.clone=o;c.getMember=u.getMember;c.updateProperties=u.updateProperties;c.getNestedObjectProperty=u.getNestedObjectProperty;c.removeDuplicatedActions=function(e){if(Array.isArray(e)){var t=e.reduce(function(e,t){if(e.indexOf(t)<0){e.push(t)}return e},[]);return t}return e};c.storeSapSystemData=function(t,r){var n,i,a,o=[t.id];if(arguments.length>1){o.unshift(r)}try{a=JSON.stringify(t)}catch(t){e.error("Cannot stringify and store expanded system data: "+t)}if(a){i=c.getLocalStorage();n=c.generateLocalStorageKey("sap-system-data",o);i.setItem(n,a)}};c.getLocalSystemInSidFormat=function(){var e=sap.ushell.Container.getLogonSystem(),t=e.getName(),r=e.getClient();return"sid("+t+"."+r+")"};c.matchesLocalSid=function(e){return c.getLocalSystemInSidFormat().toLowerCase()===e.toLowerCase()};c.storeSapSystemToLocalStorage=function(e){var t=(e||{}).params;if(!t||!t.hasOwnProperty("sap-system")){return}if(c.isPlainObject(t["sap-system"])){var r=t["sap-system"],n=t["sap-system-src"];if(typeof n==="string"){c.storeSapSystemData(r,n);t["sap-system-src"]=n}else{c.storeSapSystemData(r)}t["sap-system"]=r.id}else if(c.matchesLocalSid(t["sap-system"])){delete t["sap-system"]}};c.setPerformanceMark=function(e,t){if(performance&&performance.mark){if(!t){t={}}if(t.bUseUniqueMark){if(t.bUseLastMark){performance.clearMarks(e)}else if(performance.getEntriesByName(e,"mark").length>0){return}}performance.mark(e)}};c.setPerformanceMeasure=function(e,t,r){if(performance&&performance.measure&&t&&r){performance.measure(e,t,r)}};c.Error=function(t,r){this.name="sap.ushell.utils.Error";this.message=t;e.error(t,null,r)};c.Error.prototype=new Error;c.localStorageSetItem=function(t,r,n){var i;try{localStorage.setItem(t,r);if(n){i=document.createEvent("StorageEvent");i.initStorageEvent("storage",false,false,t,"",r,"",localStorage);dispatchEvent(i)}}catch(t){e.warning("Error calling localStorage.setItem(): "+t,null,"sap.ushell.utils")}};c.getLocalStorage=function(){return window.localStorage};c.getLocalStorageItem=function(e){return window.localStorage.getItem(e)};c.generateUniqueId=function(e){var t,r,n;if(Array.isArray(e)){r=e;n=function(e){return r.indexOf(e)===-1}}else{n=e}do{t=c._getUid()}while(!n(t));return t};c._getUid=function(){return r()};c.reload=function(){location.reload()};c.calculateOrigin=function(e){var t;if(e.origin){return e.origin}if(e.protocol&&e.hostname){return e.protocol+"//"+e.hostname+(e.port?":"+e.port:"")}if(e.href){t=new a(e.href);return t.protocol()+"://"+t.hostname()+(t.port()?":"+t.port():"")}return undefined};c.getPrivateEpcm=function(){if(window.external&&window.external&&typeof window.external.getPrivateEpcm!=="undefined"){return window.external.getPrivateEpcm()}return undefined};c.hasNativeNavigationCapability=function(){return c.isFeatureBitEnabled(1)};c.getShellType=function(){return c.isFeatureBitEnabled(1)?"NWBC":"FLP"};c.hasNativeLogoutCapability=function(){return c.isFeatureBitEnabled(2)};c.hasNavigationModeCapability=function(){return c.isFeatureBitEnabled(4)};c.hasFLPReadyNotificationCapability=function(){return c.isFeatureBitEnabled(8)};c.hasFLPReady2NotificationCapability=function(){return c.isFeatureBitEnabled(16)};c.isFeatureBitEnabled=function(t){var r="0",n;n=c.getPrivateEpcm();if(n){try{r=n.getNwbcFeatureBits();e.debug("Detected epcm getNwbcFeatureBits returned feature bits: "+r)}catch(t){e.error("failed to get feature bit vector via call getNwbcFeatureBits on private epcm object",t.stack,"sap.ushell.utils")}}return(parseInt(r,16)&t)>0};c.isApplicationTypeEmbeddedInIframe=function(e){return e==="NWBC"||e==="TR"||e==="WCF"};c.appendSapShellParam=function(e,t){var r=t==="TR"?"":"-NWBC",n=c.getUi5Version();if(n){e+=e.indexOf("?")>=0?"&":"?";e+="sap-shell="+encodeURIComponent("FLP"+n+r)}return e};function f(e){var t=/\d+\.\d+\.\d+/.exec(e);if(t&&t[0]){return t[0]}return undefined}c.getUi5VersionAsync=function(){return new Promise(function(t,r){sap.ui.require(["sap/ui/VersionInfo"],function(r){r.load().then(function(e){t(f(e.version))}).catch(function(){e.error("sap ui version could not be determined, using sap.ui.version (core version) as fallback");t(f(sap.ui.version))})})})};c.getUi5Version=function(){var t;try{t=sap.ui.getVersionInfo().version}catch(r){e.error("sap ui version could not be determined, using sap.ui.version (core version) as fallback "+r);t=sap.ui.version}return f(t)};c.isNativeWebGuiNavigation=function(e){var r=t.get("applicationType",e);var n=t.get("appCapabilities.nativeNWBCNavigation",e);if(this.hasNativeNavigationCapability()&&(r==="TR"||n)){return true}return false};c.Map=function(){this.entries={}};c.Map.prototype.put=function(e,t){var r=this.get(e);this.entries[e]=t;return r};c.Map.prototype.containsKey=function(e){if(typeof e!=="string"){throw new c.Error("Not a string key: "+e,"sap.ushell.utils.Map")}return Object.prototype.hasOwnProperty.call(this.entries,e)};c.Map.prototype.get=function(e){if(this.containsKey(e)){return this.entries[e]}};c.Map.prototype.keys=function(){return Object.keys(this.entries)};c.Map.prototype.remove=function(e){delete this.entries[e]};c.Map.prototype.toString=function(){var e=["sap.ushell.utils.Map("];e.push(JSON.stringify(this.entries));e.push(")");return e.join("")};c.getParameterValueBoolean=function(e,t){var r=n.fromQuery(t||window.location.search),i=r.getAll(e),a=["true","x"],o=["false",""],s;if(!i||i.length===0){return undefined}s=i[0].toLowerCase();if(a.indexOf(s)>=0){return true}if(o.indexOf(s)>=0){return false}return undefined};c.call=function(t,r,n){var i;if(n){setTimeout(function(){c.call(t,r,false)},0);return}try{t()}catch(t){i=t.message||t.toString();e.error("Call to success handler failed: "+i,t.stack,"sap.ushell.utils");if(r){r(i)}}};c.handleTilesVisibility=function(){c.getVisibleTiles()};c.refreshTiles=function(){sap.ui.getCore().getEventBus().publish("launchpad","refreshTiles")};c.setTilesNoVisibility=function(){sap.ui.getCore().getEventBus().publish("launchpad","setTilesNoVisibility")};c.getBasicHash=function(t){if(!c.validHash(t)){e.debug("Utils ; getBasicHash ; Got invalid hash");return false}var r=s.parseShellHash(t);return r?r.semanticObject+"-"+r.action:t};c.validHash=function(e){return e&&e.constructor===String&&jQuery.trim(e)!==""};c.getFormFactor=function(){var e=sap.ui.Device.system;if(e.desktop){return e.SYSTEMTYPE.DESKTOP}if(e.tablet){return e.SYSTEMTYPE.TABLET}if(e.phone){return e.SYSTEMTYPE.PHONE}return undefined};c.getVisibleTiles=function(){var e=document.body.clientHeight,t=sap.ui.getCore().byId("dashboardGroups"),r=sap.ui.getCore().byId("viewPortContainer"),n,i,a,o,s,u,l,f,p,d,g,h=jQuery("#shell-hdr").height(),m=[],y,v,b=[],w=sap.ui.getCore().getEventBus(),S,E,C,T;if(window.document.hidden){w.publish("launchpad","onHiddenTab")}if(t&&t.getGroups()&&r){y=jQuery(t.getDomRef());v=y?y.is(":visible"):false;S=t.getGroups();for(n=0;n<S.length;n=n+1){o=S[n];s=o.getTiles();u=o.getLinks();E=[s,u];for(a=0;a<E.length;a++){C=E[a];if(C){for(i=0;i<C.length;i++){l=C[i];if(!v||window.document.hidden){m.push(l)}else{f=jQuery(l.getDomRef());p=f.offset();if(p){d=f.offset().top;g=d+f.height();T=o.getVisible()&&g>h-300&&d<e+300;if(T){b.push({oTile:c.getTileModel(l),iGroup:n,bIsExtanded:!(g>h)||!(d<e)})}else if(b.length>0){w.publish("launchpad","visibleTilesChanged",b);return m}m.push(l)}}}}}}}if(b.length>0){w.publish("launchpad","visibleTilesChanged",b)}return m};c.getTileModel=function(e){var t;if(e.isA("sap.ui.integration.widgets.Card")){t=e.getBindingContext("ushellCardModel")}else{t=e.getBindingContext()}return t.getObject()?t.getObject():null};c.getTileObject=function(e){var t;if(e.isA("sap.ui.integration.widgets.Card")){t=e.getBindingContext("ushellCardModel")}else{t=e.getBindingContext()}return t.getObject()?t.getObject().object:null};c.recalculateBottomSpace=function(){var e=jQuery("#dashboardGroups").find(".sapUshellTileContainer:visible"),t=e.last(),r=jQuery(".sapUshellShellHead > header").height(),n=t.parent().height(),i=parseInt(t.find(".sapUshellContainerTitle").css("margin-top"),10),a=parseInt(jQuery(".sapUshellDashboardGroupsContainer").css("padding-bottom"),10),o;if(e.length===1){o=0}else{o=jQuery(window).height()-r-n-i-a;o=o<0?0:o}jQuery(".sapUshellDashboardGroupsContainer").css("margin-bottom",o+"px")};c.calcVisibilityModes=function(e,t){var r=true,n=true,a=e.pendingLinks&&e.pendingLinks.length?e.pendingLinks:e.links,o=c.groupHasVisibleTiles(e.tiles,a);if(!o&&(!t||e.isGroupLocked||e.isDefaultGroup||i.system.phone||i.system.tablet&&!i.system.desktop)){r=false}if(!o&&!t){n=false}return[r,n]};c.groupHasVisibleTiles=function(e,t){var r=false,n,i,a=!e?[]:e,o=!t?[]:t;a=a.concat(o);if(!a.length){return false}for(n=0;n<a.length;n=n+1){i=a[n];if(i.isTileIntentSupported){r=true;break}}return r};c.invokeUnfoldingArrayArguments=function(t,r){var n=this,i,a,o,s,u;if(!Array.isArray(r[0])){return t.apply(this,r)}i=r[0];if(i.length===0){return(new jQuery.Deferred).resolve([]).promise()}a=new jQuery.Deferred;o=[];s=[];u=(new jQuery.Deferred).resolve();i.forEach(function(r,i){if(!Array.isArray(r)){var a="Expected Array as nTh Argument of multivalue invocation: "+"first Argument must be array of array of arguments: single valued f(p1,p2), f(p1_2,p2_2), f(p1_3,p2_3) : "+"multivalued : f([[p1,p2],[p1_2,p2_2],[p1_3,p2_3]]";e.error(a);throw new Error(a)}var l=t.apply(n,r),c=new jQuery.Deferred;l.done(function(){var e=Array.prototype.slice.call(arguments);s[i]=e;c.resolve()}).fail(c.reject.bind(c));o.push(c.promise());u=jQuery.when(u,c)});jQuery.when.apply(jQuery,o).done(function(){a.resolve(s)}).fail(function(){a.reject("failure")});return a.promise()};c._getCurrentDate=function(){return new Date};c._convertToUTC=function(e){return Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds(),e.getUTCMilliseconds())};c.formatDate=function(e){var t,r,n,i,a,o;var s=sap.ui.require("sap/ushell/resources");t=c._convertToUTC(new Date(e));r=c._convertToUTC(c._getCurrentDate());n=r-t;i=parseInt(n/(1e3*60*60*24),10);if(i>0){if(i===1){return s.i18n.getText("time_day",i)}return s.i18n.getText("time_days",i)}a=parseInt(n/(1e3*60*60),10);if(a>0){if(a===1){return s.i18n.getText("time_hour",a)}return s.i18n.getText("time_hours",a)}o=parseInt(n/(1e3*60),10);if(o>0){if(o===1){return s.i18n.getText("time_minute",o)}return s.i18n.getText("time_minutes",o)}return s.i18n.getText("just_now")};c.toExternalWithParameters=function(e,t,r){return Promise.all([sap.ushell.Container.getServiceAsync("URLParsing"),sap.ushell.Container.getServiceAsync("CrossApplicationNavigation")]).then(function(n){var i=n[0];var a=n[1];var o={};var s=t.split("&/");if(s.length>1){o.appSpecificRoute="&/"+s[1]}o.target={semanticObject:e,action:s[0]};if(r&&r.length>0){o.params={};r.forEach(function(e){o.params[e.Key]=e.Value})}return a.toExternal({target:{shellHash:i.constructShellHash(o)}})})};c.moveElementInsideOfArray=function(e,t,r){if(!c.isArray(e)||t===undefined||r===undefined){throw new Error("Incorrect input parameters passed")}if(t>=e.length||r>=e.length||r<0||t<0){throw new Error("Index out of bounds")}var n=e.splice(t,1)[0];e.splice(r,0,n);return e};c.shallowMergeObject=function(e){return Array.prototype.slice.call(arguments,1,arguments.length).map(function(e){return{sourceObject:e,properties:Object.keys(e)}}).reduce(function(e,t){t.properties.forEach(function(r){e[r]=t.sourceObject[r]});return e},e)};c.getLocationHref=function(){return window.location.href};c.generateLocalStorageKey=function(e,t){var r=t.length;if(r===0){throw new Error("At least one id should be provided when generating the local storage key")}var n="$";if(r===2){n="#"}else if(r>2){n="@"+r+"@"}return e+n+t.join(":")};c.urlParametersToString=function(e,t,r){return s.privparamsToString(e,t,r)};c.isRootIntent=function(e){if(typeof e!=="string"){throw new Error("The given intent must be a string")}var r="renderers.fiori2.componentData.config.rootIntent";var n=t.get(r,window["sap-ushell-config"])||"#Shell-home";var i=n.replace("#","");var a=e.replace("#","");return a===""||a===i};c.isFlpHomeIntent=function(e){if(!e){e=window.location.hash;if(!e){e=t.get("renderers.fiori2.componentData.config.rootIntent",window["sap-ushell-config"])||"Shell-home"}}else if(typeof e!=="string"){throw new Error("The given intent must be a string")}var r=e.replace("#","");return r.indexOf("Shell-home")===0||r.indexOf("Launchpad-openFLPPage")===0||r.indexOf("Launchpad-openWorkPage")===0};c.generateRandomKey=function(){var e="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";var t="";var r=new window.Uint32Array(40);window.crypto.getRandomValues(r);var n=function(t){var n=r[t]%e.length;return e[n]};while(t.length<40){t+=n(t.length)}return t};c.copyToClipboard=function(e){var t;var r=document.createElement("textarea");try{r.contentEditable=true;r.readonly=false;r.textContent=e;document.documentElement.appendChild(r);r.select();document.execCommand("copy");t=true}catch(e){t=false}finally{r.parentNode.removeChild(r)}return t};c._getUserSettingPersContainer=function(){return sap.ushell.Container.getServiceAsync("Personalization").then(function(e){var t={container:"sap.ushell.usersettings.personalization",item:"data"};var r={validity:"Infinity",keyCategory:e.constants.keyCategory.GENERATED_KEY,writeFrequency:e.constants.writeFrequency.HIGH,clientStorageAllowed:false};return e.getPersonalizer(t,r)})};c.getHideEmptySpacesEnabled=function(){return new Promise(function(e){sap.ui.require(["sap/ushell/Config"],function(t){e(t)})}).then(function(e){var t=e.last("/core/spaces/hideEmptySpaces/enabled");if(!t){return Promise.resolve(false)}return c._getUserSettingPersContainer().then(function(e){return new Promise(function(t,r){e.getPersData().done(t).fail(r)})}).then(function(t){var r=(t||{}).hideEmptySpaces!==false;if(e.last("/core/spaces/hideEmptySpaces/userEnabled")!==r){e.emit("/core/spaces/hideEmptySpaces/userEnabled",r)}return r})})};c.setHideEmptySpacesEnabled=function(e){return new Promise(function(e){sap.ui.require(["sap/ushell/Config"],function(t){e(t)})}).then(function(t){var r=t.last("/core/spaces/hideEmptySpaces/enabled");if(!r){return Promise.resolve()}return c._getUserSettingPersContainer().then(function(r){return new Promise(function(e,t){r.getPersData().done(e).fail(t)}).then(function(n){n=n||{};var i=n.hideEmptySpaces!==false;if(i===!!e){return Promise.resolve()}n.hideEmptySpaces=e;return new Promise(function(e,t){r.setPersData(n).done(e).fail(t)}).then(function(){t.emit("/core/spaces/hideEmptySpaces/userEnabled",e)})})})})};c.sanitizeTimeoutDelay=function(e){if(typeof e!=="number"){throw new Error("Invalid type! Expected type 'number'.")}var t=2147483647;return e>t?t:e};return c},false);
//# sourceMappingURL=utils.js.map