// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/Log","sap/ushell/User","sap/ui/thirdparty/jquery","sap/base/util/ObjectPath"],function(e,t,jQuery,r){"use strict";var s=function(s,o,i){var n,a,u,d,l,f;this.load=function(){var e;a=r.get("config.systemProperties.logoutUrl",i);u=r.get("config.systemProperties.logoutMethod",i)||"GET";d=r.get("config.systemProperties.csrfTokenUrl",i);l=r.get("config.systemProperties.sessionKeepAlive.url",i);f=r.get("config.systemProperties.sessionKeepAlive.method",i);e=jQuery.extend(true,{id:""},r.get("config.userProfile.defaults",i));n=new t(e);g(e);return(new jQuery.Deferred).resolve().promise()};this.getSystem=function(){return s};this.getUser=function(){return n};this._getLogoutUrl=function(){return a};this._setWindowLocation=function(e){window.location.href=e};this.logout=function(){var t=new jQuery.Deferred,r=this;if(u==="POST"){e.info("performing logout from system via POST",undefined,"sap.ushell.appRuntime.ui5.services.adapters.ContainerAdapter::logout");jQuery.ajax({type:"HEAD",url:d,headers:{"X-CSRF-Token":"Fetch"},success:function(s,o,i){jQuery.ajax({type:"POST",url:a,headers:{"X-CSRF-Token":i.getResponseHeader("X-CSRF-Token")},success:function(e){r._setWindowLocation(e);t.resolve()},error:function(){e.error("Logging out via POST failed",undefined,"sap.ushell.appRuntime.ui5.services.adapters.ContainerAdapter::logout");t.resolve()}})},error:function(){e.error("fetching X-CSRF-Token for logout via POST failed for system: "+s.getAlias(),undefined,"sap.ushell.appRuntime.ui5.services.adapters.ContainerAdapter::logout");t.resolve()}})}else{try{if(typeof a==="string"&&a.length>0){this._logoutViaHiddenIFrame(t,a);setTimeout(t.resolve,4e3)}else{t.resolve()}}catch(r){e.error("logout from iframe "+document.URL+" failed",r,"sap.ushell.appRuntime.ui5.SessionHandlerAgent");t.resolve()}}return t.promise()};this._logoutViaHiddenIFrame=function(e,t){var r=document.createElement("iframe"),s=t.replace(/"/g,'\\"');window.addEventListener("message",function(r){if((r.data&&r.data.url)===t){e.resolve()}});r.style.visibility="hidden";r.setAttribute("src",t);function o(){this.contentWindow.parent.postMessage({url:s,request_id:"dummy-logout-id"},"*")}r.addEventListener("load",o);r.addEventListener("error",o);document.body.appendChild(r)};this.sessionKeepAlive=function(){if(typeof l==="string"&&l.length>0&&typeof f==="string"&&f.length>0){var t=new XMLHttpRequest;t.open(f,l,true);t.onreadystatechange=function(){if(this.readyState===4){e.debug("Server session was extended")}};t.send()}};function g(e){var t=sap.ui.getCore(),r=t.getConfiguration(),s=r.getFormatSettings();if(e.sapDateFormat){s.setLegacyDateFormat(e.sapDateFormat)}if(e.sapDateCalendarCustomizing){s.setLegacyDateCalendarCustomizing(e.sapDateCalendarCustomizing)}if(e.sapNumberFormat){s.setLegacyNumberFormat(e.sapNumberFormat)}if(e.sapTimeFormat){s.setLegacyTimeFormat(e.sapTimeFormat)}if(typeof e.currencyFormats==="object"){s.addCustomCurrencies(e.currencyFormats)}}};return s},true);
//# sourceMappingURL=ContainerAdapter.js.map