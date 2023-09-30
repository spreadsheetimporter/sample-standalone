/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/fl/descriptorRelated/internal/Utils","sap/ui/fl/write/_internal/connectors/LrepConnector","sap/base/util/merge","sap/base/Log","sap/base/util/isPlainObject"],function(e,i,t,n,o,r){"use strict";var s=e.extend("sap.ui.fl.write._internal.appVariant.AppVariant",{constructor:function(i){e.apply(this);if(!r(i)){o.error("Constructor : sap.ui.fl.write._internal.appVariant.AppVariant: mPropertyBag is not defined")}this._oDefinition=i;return this},metadata:{library:"sap.ui.fl",properties:{mode:{type:"string"}}}});s.modes={NEW:"NEW",EXISTING:"EXISTING",DELETION:"DELETION"};s.prototype._isValidMode=function(e){var i=false;Object.keys(s.modes).some(function(t){if(s.modes[t]===e){i=true}});return i};s.prototype.setMode=function(e){if(this._isValidMode(e)){this.setProperty("mode",e)}else{throw new Error("Provide a correct operation mode")}};s.prototype.setTransportRequest=function(e){try{i.checkTransportRequest(e)}catch(e){return Promise.reject(e)}this._oDefinition.transport=e;return Promise.resolve()};s.prototype.setReference=function(e){if(e===undefined||typeof e!=="string"){throw new Error("No parameter sReference of type string provided")}this._oDefinition.reference=e};s.prototype.setPackage=function(e){try{i.checkPackage(e)}catch(e){return Promise.reject(e)}this._oDefinition.packageName=e;return Promise.resolve()};s.prototype.getDefinition=function(){return this._oDefinition};s.prototype.getId=function(){return this._oDefinition.id};s.prototype.getNamespace=function(){return this._oDefinition.namespace||i.getNameAndNameSpace(this._oDefinition.id,this._oDefinition.reference).namespace};s.prototype.getFileName=function(){return this._oDefinition.fileName||i.getNameAndNameSpace(this._oDefinition.id,this._oDefinition.reference).fileName};s.prototype.getReference=function(){return this._oDefinition.reference};s.prototype.getPackage=function(){return this._oDefinition.packageName};s.prototype.getVersion=function(){return this._oDefinition.version};s.prototype.getTransportRequest=function(){return this._oDefinition.transport};s.prototype.getJson=function(){return n({},this._getMap())};s.prototype._getMap=function(){var e={};switch(this.getMode()){case s.modes.NEW:e={fileName:this.getFileName(),fileType:"appdescr_variant",namespace:this.getNamespace(),layer:this._oDefinition.layer,packageName:this._oDefinition.packageName?this._oDefinition.packageName:"",reference:this._oDefinition.reference,id:this._oDefinition.id,content:this._oDefinition.content||[]};if(this._oDefinition.referenceVersion){e.referenceVersion=this._oDefinition.referenceVersion}if(this._oDefinition.version){e.version=this._oDefinition.version}break;case s.modes.EXISTING:e={fileName:this._oDefinition.fileName,fileType:this._oDefinition.fileType,namespace:this._oDefinition.namespace,layer:this._oDefinition.layer,packageName:this._oDefinition.packageName,reference:this._oDefinition.reference,id:this._oDefinition.id,content:this._oDefinition.content};if(this._oDefinition.referenceVersion){e.referenceVersion=this._oDefinition.referenceVersion}if(this._oDefinition.version){e.version=this._oDefinition.version}break;case s.modes.DELETION:e={id:this._oDefinition.id};break;default:}return e};s.prototype.addDescriptorInlineChange=function(e){return new Promise(function(i){var t=function(e,i){if(e["setHostingIdForTextKey"]){e.setHostingIdForTextKey(i)}};t(e,this.getId());this._oDefinition.content.push(e.getMap());i(null)}.bind(this))};s.prototype.submit=function(){var e=this._getMap();var i={flexObject:{},appVariant:this};if(this._oDefinition.transport){i.transport=this._oDefinition.transport}if(this._oDefinition.skipIam){i.skipIam=this._oDefinition.skipIam}if(this._oDefinition.isForSmartBusiness){i.isForSmartBusiness=this._oDefinition.isForSmartBusiness}if(this._oDefinition.parentVersion){i.parentVersion=this._oDefinition.parentVersion}if(e.layer){i.layer=e.layer}i.url="/sap/bc/lrep";var n;switch(this.getMode()){case s.modes.NEW:Object.assign(i.flexObject,e);n=t.appVariant.create(i);break;case s.modes.EXISTING:i.reference=e.id;Object.assign(i.flexObject,e);n=t.appVariant.update(i);break;case s.modes.DELETION:i.reference=e.id;n=t.appVariant.remove(i);break;default:return Promise.reject("Please provide a valid operation.")}return n.then(function(e){return e})};return s});
//# sourceMappingURL=AppVariant.js.map