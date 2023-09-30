/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["./NavError","sap/ui/base/Object","sap/base/util/each","sap/base/Log"],function(t,e,i,n){"use strict";return e.extend("sap.fe.navigation.SelectionVariant",{_rVALIDATE_SIGN:new RegExp("[E|I]"),_rVALIDATE_OPTION:new RegExp("EQ|NE|LE|GE|LT|GT|BT|CP"),constructor:function(e){this._mParameters={};this._mSelectOptions={};this._sId="";if(e!==undefined){if(typeof e==="string"){this._parseFromString(e)}else if(typeof e==="object"){this._parseFromObject(e)}else{throw new t("SelectionVariant.INVALID_INPUT_TYPE")}}},getID:function(){return this._sId},setID:function(t){this._sId=t},setText:function(e){if(typeof e!=="string"){throw new t("SelectionVariant.INVALID_INPUT_TYPE")}this._sText=e},getText:function(){return this._sText},setParameterContextUrl:function(e){if(typeof e!=="string"){throw new t("SelectionVariant.INVALID_INPUT_TYPE")}this._sParameterCtxUrl=e},getParameterContextUrl:function(){return this._sParameterCtxUrl},getFilterContextUrl:function(){return this._sFilterCtxUrl},setFilterContextUrl:function(e){if(typeof e!=="string"){throw new t("SelectionVariant.INVALID_INPUT_TYPE")}this._sFilterCtxUrl=e},addParameter:function(e,i){if(typeof e!=="string"){throw new t("SelectionVariant.INVALID_INPUT_TYPE")}if(typeof i!=="string"){throw new t("SelectionVariant.INVALID_INPUT_TYPE")}if(e===""){throw new t("SelectionVariant.PARAMETER_WITHOUT_NAME")}if(this._mSelectOptions[e]){throw new t("SelectionVariant.PARAMETER_SELOPT_COLLISION")}this._mParameters[e]=i;return this},removeParameter:function(e){if(typeof e!=="string"){throw new t("SelectionVariant.INVALID_INPUT_TYPE")}if(e===""){throw new t("SelectionVariant.PARAMETER_WITHOUT_NAME")}delete this._mParameters[e];return this},renameParameter:function(e,i){if(typeof e!=="string"||typeof i!=="string"){throw new t("SelectionVariant.INVALID_INPUT_TYPE")}if(e===""||i===""){throw new t("SelectionVariant.PARAMETER_WITHOUT_NAME")}if(this._mParameters[e]!==undefined){if(this._mSelectOptions[i]){throw new t("SelectionVariant.PARAMETER_SELOPT_COLLISION")}if(this._mParameters[i]){throw new t("SelectionVariant.PARAMETER_COLLISION")}this._mParameters[i]=this._mParameters[e];delete this._mParameters[e]}return this},getParameter:function(e){if(typeof e!=="string"){throw new t("SelectionVariant.INVALID_INPUT_TYPE")}return this._mParameters[e]},getParameterNames:function(){return Object.keys(this._mParameters)},addSelectOption:function(e,i,n,r,a,o,s){if(typeof e!=="string"){throw new t("SelectionVariant.INVALID_INPUT_TYPE")}if(e===""){throw new t("SelectionVariant.INVALID_PROPERTY_NAME")}if(typeof i!=="string"){throw new t("SelectionVariant.INVALID_INPUT_TYPE")}if(typeof n!=="string"){throw new t("SelectionVariant.INVALID_INPUT_TYPE")}if(typeof r!=="string"){throw new t("SelectionVariant.INVALID_INPUT_TYPE")}if(n==="BT"&&typeof a!=="string"){throw new t("SelectionVariant.INVALID_INPUT_TYPE")}if(!this._rVALIDATE_SIGN.test(i.toUpperCase())){throw new t("SelectionVariant.INVALID_SIGN")}if(!this._rVALIDATE_OPTION.test(n.toUpperCase())){throw new t("SelectionVariant.INVALID_OPTION")}if(this._mParameters[e]){throw new t("SelectionVariant.PARAMETER_SELOPT_COLLISION")}if(n!=="BT"){if(a!==undefined&&a!==""&&a!==null){throw new t("SelectionVariant.HIGH_PROVIDED_THOUGH_NOT_ALLOWED")}}if(this._mSelectOptions[e]===undefined){this._mSelectOptions[e]=[]}var _={Sign:i.toUpperCase(),Option:n.toUpperCase(),Low:r};if(o){_.Text=o}if(n==="BT"){_.High=a}else{_.High=null}if(s){_.SemanticDates=s}for(var l=0;l<this._mSelectOptions[e].length;l++){var f=this._mSelectOptions[e][l];if(f.Sign===_.Sign&&f.Option===_.Option&&f.Low===_.Low&&f.High===_.High){return this}}this._mSelectOptions[e].push(_);return this},removeSelectOption:function(e){if(typeof e!=="string"){throw new t("SelectionVariant.SELOPT_WRONG_TYPE")}if(e===""){throw new t("SelectionVariant.SELOPT_WITHOUT_NAME")}delete this._mSelectOptions[e];return this},renameSelectOption:function(e,i){if(typeof e!=="string"||typeof i!=="string"){throw new t("SelectionVariant.SELOPT_WRONG_TYPE")}if(e===""||i===""){throw new t("SelectionVariant.SELOPT_WITHOUT_NAME")}if(this._mSelectOptions[e]!==undefined){if(this._mSelectOptions[i]){throw new t("SelectionVariant.SELOPT_COLLISION")}if(this._mParameters[i]){throw new t("SelectionVariant.PARAMETER_SELOPT_COLLISION")}this._mSelectOptions[i]=this._mSelectOptions[e];delete this._mSelectOptions[e]}return this},getSelectOption:function(e){if(typeof e!=="string"){throw new t("SelectionVariant.INVALID_INPUT_TYPE")}if(e===""){throw new t("SelectionVariant.INVALID_PROPERTY_NAME")}var i=this._mSelectOptions[e];if(!i){return undefined}return JSON.parse(JSON.stringify(i))},getSelectOptionsPropertyNames:function(){return Object.keys(this._mSelectOptions)},getPropertyNames:function(){return this.getParameterNames().concat(this.getSelectOptionsPropertyNames())},massAddSelectOption:function(e,i){if(!Array.isArray(i)){throw new t("SelectionVariant.INVALID_INPUT_TYPE")}for(var n=0;n<i.length;n++){var r=i[n];this.addSelectOption(e,r.Sign,r.Option,r.Low,r.High,r.Text,r.SemanticDates)}return this},getValue:function(t){var e=this.getSelectOption(t);if(e!==undefined){return e}var i=this.getParameter(t);if(i!==undefined){e=[{Sign:"I",Option:"EQ",Low:i,High:null}];return e}return undefined},isEmpty:function(){return this.getParameterNames().length===0&&this.getSelectOptionsPropertyNames().length===0},toJSONObject:function(){var t={Version:{Major:"1",Minor:"0",Patch:"0"},SelectionVariantID:this._sId};if(this._sParameterCtxUrl){t.ParameterContextUrl=this._sParameterCtxUrl}if(this._sFilterCtxUrl){t.FilterContextUrl=this._sFilterCtxUrl}if(this._sText){t.Text=this._sText}else{t.Text="Selection Variant with ID "+this._sId}this._determineODataFilterExpression(t);this._serializeParameters(t);this._serializeSelectOptions(t);return t},toJSONString:function(){return JSON.stringify(this.toJSONObject())},_determineODataFilterExpression:function(t){t.ODataFilterExpression=""},_serializeParameters:function(t){if(this._mParameters.length===0){return}t.Parameters=[];i(this._mParameters,function(e,i){var n={PropertyName:e,PropertyValue:i};t.Parameters.push(n)})},_serializeSelectOptions:function(t){if(this._mSelectOptions.length===0){return}t.SelectOptions=[];i(this._mSelectOptions,function(e,i){var n={PropertyName:e,Ranges:i};t.SelectOptions.push(n)})},_parseFromString:function(e){if(e===undefined){throw new t("SelectionVariant.UNABLE_TO_PARSE_INPUT")}if(typeof e!=="string"){throw new t("SelectionVariant.INVALID_INPUT_TYPE")}var i=JSON.parse(e);this._parseFromObject(i)},_parseFromObject:function(t){if(!t){t={}}if(t.SelectionVariantID===undefined){n.warning("SelectionVariantID is not defined");t.SelectionVariantID=""}this.setID(t.SelectionVariantID);if(t.ParameterContextUrl!==undefined&&t.ParameterContextUrl!==""){this.setParameterContextUrl(t.ParameterContextUrl)}if(t.FilterContextUrl!==undefined&&t.FilterContextUrl!==""){this.setFilterContextUrl(t.FilterContextUrl)}if(t.Text!==undefined){this.setText(t.Text)}if(t.Parameters){this._parseFromStringParameters(t.Parameters)}if(t.SelectOptions){this._parseFromStringSelectOptions(t.SelectOptions)}},_parseFromStringParameters:function(t){i(t,function(t,e){this.addParameter(e.PropertyName,e.PropertyValue)}.bind(this))},_parseFromStringSelectOptions:function(e){i(e,function(e,r){if(!r.Ranges){n.warning("Select Option object does not contain a Ranges entry; ignoring entry");return true}if(!Array.isArray(r.Ranges)){throw new t("SelectionVariant.SELECT_OPTION_RANGES_NOT_ARRAY")}i(r.Ranges,function(t,e){this.addSelectOption(r.PropertyName,e.Sign,e.Option,e.Low,e.High,e.Text,e.SemanticDates)}.bind(this))}.bind(this))}})},true);
//# sourceMappingURL=SelectionVariant.js.map