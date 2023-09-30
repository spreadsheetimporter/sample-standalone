/*!
 * SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["./library","sap/ui/core/Element"],function(t,e){"use strict";var i=e.extend("sap.suite.ui.microchart.InteractiveBarChartBar",{metadata:{library:"sap.suite.ui.microchart",properties:{label:{type:"string",group:"Misc",defaultValue:null},selected:{type:"boolean",group:"Appearance",defaultValue:false},displayedValue:{type:"string",group:"Data",defaultValue:null},color:{type:"sap.m.ValueColor",group:"Misc",defaultValue:"Neutral"},value:{type:"float",group:"Data"}}}});i.prototype.init=function(){this._bNullValue=true;this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.microchart")};i.prototype.validateProperty=function(t,i){if(t==="value"&&(i===null||i===undefined||isNaN(i))){this._bNullValue=true}else if(t==="value"){this._bNullValue=false}return e.prototype.validateProperty.apply(this,arguments)};i.prototype.getTooltip_AsString=function(){var e=this.getTooltip_Text();this._bCustomTooltip=true;if(!e){e=this._createTooltipText();this._bCustomTooltip=false}else if(t._isTooltipSuppressed(e)){e=null}return e};i.prototype._createTooltipText=function(){var t="",e=this.getLabel(),i=this.getParent()&&this.getParent()._bUseSemanticTooltip,a,l;if(e&&e.length>0){t=e+":\n"}if(this._bNullValue){t+=this._oRb.getText("INTERACTIVECHART_NA")}else{t+=this.getValue()}if(i){a=this.getColor();l=this._oRb.getText(("SEMANTIC_COLOR_"+a).toUpperCase());t+=" "+l}return t};i.prototype._getBarTooltip=function(){var t=this.getTooltip_AsString();if(t&&!this._bCustomTooltip){t=t.replace("\n"," ")}return t};return i});
//# sourceMappingURL=InteractiveBarChartBar.js.map