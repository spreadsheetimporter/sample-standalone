sap.ui.define(["sap/ui/core/mvc/ControllerExtension","sap/suite/ui/generic/template/detailTemplates/detailUtils","sap/suite/ui/generic/template/Canvas/extensionAPI/ExtensionAPI","sap/base/util/extend","sap/suite/ui/generic/template/genericUtilities/FeError"],function(e,t,n,a,r){"use strict";var o="Canvas.controller.ControllerImplementation";return{getMethods:function(s,i,l){var u=t.getControllerBase(s,i,l);var c={onInit:function(){var e=l.getOwnerComponent();var t=e.getRequiredControls();u.onInit(t)},handlers:{},extensionAPI:new n(i,l,u)};c.handlers=a(u.handlers,c.handlers);s.onComponentActivate=u.onComponentActivate;c.getCurrentState=function(){var t=Object.create(null);var n=true;var a=function(a,s){if(!(a instanceof e)){throw new r(o,"State must always be set with respect to a ControllerExtension")}if(!n){throw new r(o,"State must always be provided synchronously")}var i=a.getMetadata().getNamespace();if(s){for(var l in s){t["$extension$"+i+"$"+l]=s[l]}}};l.templateBaseExtension.provideExtensionStateData(a);n=false;return t};c.applyState=function(t,n){var a=Object.create(null);var s=true;var i=function(t){if(!(t instanceof e)){throw new r(o,"State must always be retrieved with respect to a ControllerExtension")}if(!s){throw new r(o,"State must always be restored synchronously")}var n=t.getMetadata().getNamespace();return a[n]};l.templateBaseExtension.restoreExtensionStateData(i,n);s=false};return c}}});
//# sourceMappingURL=ControllerImplementation.js.map