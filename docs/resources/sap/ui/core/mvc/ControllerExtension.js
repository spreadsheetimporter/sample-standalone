/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/base/Metadata","sap/ui/core/mvc/ControllerMetadata","sap/ui/core/mvc/OverrideExecution","sap/base/util/uid","sap/base/Log"],function(e,t,n,i,a,r){"use strict";var o=e.extend("sap.ui.core.mvc.ControllerExtension",{metadata:{stereotype:"controllerextension",methods:{byId:{public:true,final:true},getView:{public:true,final:true},getInterface:{public:false,final:true}}},_setController:function(e){this.base=e},byId:function(e){var t=this.getMetadata().getNamespace();e=t+"."+e;return this.base?this.base.byId(e):undefined},getView:function(){return this.base.getView()},getInterface:function(){var e={};var t=this.getMetadata();var n=t.getAllPublicMethods();n.forEach(function(t){var n=this[t];if(typeof n==="function"){e[t]=function(){var e=n.apply(this,arguments);return e instanceof o?e.getInterface():e}.bind(this)}}.bind(this));this.getInterface=function(){return e};return e}},n);o.override=function(e){var i=t.createClass(this,"anonymousExtension~"+a(),{},n);i.getMetadata()._staticOverride=e;i.getMetadata()._override=this.getMetadata()._override;return i};o.overrideMethod=function(e,t,n,a,o){var s=t[e];var f=n[e];o=o||i.Instead;function u(n){(function(n,i,a,r){t[e]=function(){if(r){n.apply(a,arguments);return i.apply(t,arguments)}else{i.apply(t,arguments);return n.apply(a,arguments)}}})(f,s,a,n)}if(typeof f==="function"&&a){f=f.bind(a)}switch(o){case i.Before:if(s&&typeof s==="function"){u(true)}else if(typeof f==="function"){t[e]=f}else{r.error("Controller extension failed: lifecycleMethod '"+e+"', is not a function")}break;case i.After:if(s&&typeof s==="function"){u(false)}else if(typeof f==="function"){t[e]=f}else{r.error("Controller extension failed: lifecycleMethod '"+e+"', is not a function")}break;case i.Instead:default:if(e in t){r.debug("Overriding  member '"+e+"' of extension "+this.getMetadata().getName());if(!this.getMetadata().isMethodFinal(e)){t[e]=f}else{r.error("Error in ControllerExtension.override: Method '"+e+"' of extension '"+this.getMetadata().getName()+"' is flagged final and cannot be overridden!")}}else{t[e]=f}break}};return o});
//# sourceMappingURL=ControllerExtension.js.map