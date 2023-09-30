sap.ui.define(["sap/suite/ui/generic/template/lib/TemplateAssembler","sap/suite/ui/generic/template/genericUtilities/FeLogger","sap/ui/core/mvc/Controller"],function(e,t){"use strict";var n=new t("extensionAPI.extensionAPI").getLogger();return{getExtensionAPI:function(t){return e.getExtensionAPI(t)},getExtensionAPIPromise:function(t){return e.getExtensionAPIPromise(t)},registerControllerExtensions:function(e,t){var i={onInit:function(){var e=this.getOwnerComponent().getEntitySet();var n=t[e];var i=n&&n.onInit||Function.prototype;i.call(n,this)}};var r=Object.create(null);var o,a;for(var s in t){var u=t[s];for(o in u){if(o!=="onInit"&&o!=="getMetadata"){var c=u[o];if(typeof c==="function"){a=r[o];if(!a){a=Object.create(null);r[o]=a}a[s]=c.bind(u)}}}}var l=function(e){var t=r[e];return function(){var i=this.getOwnerComponent().getEntitySet();var r=t[i]||function(){n.error("No implementation for function "+e+" for entity set "+i)};return r.apply(null,arguments)}};for(o in r){i[o]=l(o)}sap.ui.controller(e,i)}}});
//# sourceMappingURL=extensionAPI.js.map