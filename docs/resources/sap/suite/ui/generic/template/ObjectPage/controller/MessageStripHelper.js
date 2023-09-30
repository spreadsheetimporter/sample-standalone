sap.ui.define(["sap/ui/base/Object","sap/base/util/extend","sap/ui/model/Filter","sap/suite/ui/generic/template/lib/MessageStripHelper","sap/suite/ui/generic/template/lib/MessageUtils"],function(e,t,r,i,n){"use strict";function a(e,t,r,a){var s=Object.create(null);var l=t.getOwnerComponent().getModel("ui");l.bindProperty("/editable").attachChange(v);a.registerExternalListener(v);function o(e){var t=s[e];if(!t){t={maxBackendSeverity:-1,customSeverity:-2,waiting:[]};s[e]=t}return t}function u(e,t,r,i){var n=o(t);if(n.implementingHelper){n.customSeverity=-2;n.implementingHelper.setCustomMessage(e,r,i)}else{n.waiting.push({message:e,tabKey:r,onClose:i})}}function m(n,a){var s=n.getId();var l=o(s);var u=e.getKeyToPresentationControlHandler(n);var m=!!u;if(!m){u={"":function(){return r.oServices.oPresentationControlHandlerFactory.getPresentationControlHandler(n)}}}l.implementingHelper=new i(u,t,r);if(m){var g=a;e.getInitializationPromise(g).then(function(){l.implementingHelper.setCurrentTab(e.getSelectedKey(g));e.registerKeyChange(n,l.implementingHelper.setCurrentTab)})}else{l.implementingHelper.setCurrentTab("")}l.waiting.forEach(function(e){l.implementingHelper.setCustomMessage(e.message,e.tabKey,e.onClose)});delete l.waiting}function g(e){var t=e.getSource();var r=t.getId();var i=s[r];if(i){i.implementingHelper.onBeforeRebindControl(e)}}function p(e){if(e.maxBackendSeverity!==-1){e.refreshTriggered=true;setTimeout(function(){if(e.refreshTriggered){e.refreshTriggered=false;var t=e.implementingHelper.getCurrentCustomMessage();e.customSeverity=t?n.getSeverityAsNumber(t):-2;e.implementingHelper.refresh()}},0)}}function f(e,t){var r=t.getId();var i=s[r];if(i.refreshTriggered){return false}if(l.getProperty("/editable")){var a=i.implementingHelper.getCurrentCustomMessage();var o=e===a;var u=!o&&e.persistent;if(u){return false}if(!a){return true}var m=n.getSeverityAsNumber(e);if(o){var g=m!==i.customSeverity;if(g){p(i)}return m>=i.maxBackendSeverity}else{if(i.maxBackendSeverity>i.customSeverity){i.maxBackendSeverity=Math.max(i.maxBackendSeverity,m);return true}if(m<=i.customSeverity){i.maxBackendSeverity=Math.max(i.maxBackendSeverity,m);return false}p(i);i.maxBackendSeverity=m;return true}}else{return i.implementingHelper.dataStateFilter(e,t)}}function c(e){if(e.implementingHelper){e.maxBackendSeverity=-1;var t=e.implementingHelper.getCurrentCustomMessage();e.customSeverity=t?n.getSeverityAsNumber(t):-2;e.refreshTriggered=false;e.implementingHelper.refresh()}}function v(){for(var e in s){var t=s[e];c(t)}}function d(e){for(var t in s){var r=s[t];if(r.implementingHelper&&r.implementingHelper.isCustomMessage(e)){return true}}return false}function S(e){var t=e.getSource();var r=t.getParent();var i=r.getId();var n=s[i];n.implementingHelper.onClose()}return{setCustomMessage:u,initSmartTable:m,onBeforeRebindControl:g,dataStateFilter:f,isCustomMessage:d,onClose:S}}return e.extend("sap.suite.ui.generic.template.listTemplates.controller.MessageStripHelper",{constructor:function(e,r,i,n){t(this,a(e,r,i,n))}})});
//# sourceMappingURL=MessageStripHelper.js.map