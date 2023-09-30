/*
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2017 SAP SE. All rights reserved
 */
sap.ui.define(["sap/ui/base/Object"],function(e){"use strict";var a=e.extend("sap.collaboration.components.socialtimeline.annotations.Metadata",{constructor:function(e){this._oIncludedSchemaAliasMap={};this._oSchemaAliasMap={};this._oODataMetadata=e;this._parseODataMetadata()},_parseODataMetadata:function(){this._parseReferenceElements(this._oODataMetadata.extensions);this._parseDataServicesElement(this._oODataMetadata.dataServices)},_parseReferenceElements:function(e){for(var a in e){this._parseReferenceElement(e[a])}},_parseReferenceElement:function(e){for(var a in e.children){this._parseReferenceElementChild(e.children[a])}},_parseReferenceElementChild:function(e){if(e.name==="Include"){this._parseIncludeElement(e)}else{return}},_parseIncludeElement:function(e){var a=null;var t=null;for(var n in e.attributes){if(e.attributes[n].name==="Namespace"){a=e.attributes[n].value}else{t=e.attributes[n].value}}this._oIncludedSchemaAliasMap[a]=t},_parseDataServicesElement:function(e){this._parseSchemaElements(e.schema)},_parseSchemaElements:function(e){for(var a in e){this._parseSchemaElement(e[a])}},_parseSchemaElement:function(e){if(e.alias===undefined){this._oSchemaAliasMap[e.namespace]=null}else{this._oSchemaAliasMap[e.namespace]=e.alias}this._parseEntityTypeElements(e.entityType)},_parseEntityTypeElements:function(e){for(var a in e){this._parseEntityTypeElement(e[a])}},_parseEntityTypeElement:function(){},isSchemaIncluded:function(e){return this._oIncludedSchemaAliasMap[e]!==undefined}});return a});
//# sourceMappingURL=Metadata.js.map