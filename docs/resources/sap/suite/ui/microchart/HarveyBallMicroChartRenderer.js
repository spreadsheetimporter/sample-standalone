/*!
* SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
*/
sap.ui.define(["sap/m/library","./library","sap/base/security/encodeXML","sap/suite/ui/microchart/MicroChartRenderUtils","sap/ui/core/theming/Parameters"],function(e,t,a,r,i){"use strict";var s=e.ValueColor;var l=e.ValueCSSColor;var n;var o={apiVersion:2};o._iReferenceControlSize=72;o._iReferenceControlCenter=o._iReferenceControlSize/2;o.render=function(e,t){n=n||sap.ui.require("sap/suite/ui/microchart/HarveyBallMicroChart");if(!t._hasData()){this._renderNoData(e,t);return}if(!t._bThemeApplied){return}this._calculatePath(t);var r=t.getColorPalette();var o="";var c="";var h="";var u=false;var g=0;var p="";var d=function(e){if(s[e]){p="sapSuiteHBMCSemanticColor"+a(e)}else if(l.isValid(e)){return i.get(e)||e}return null};var v=r.length>0?d(r[0]):null;var S=this._oPath.center;if(t._isThemeHighContrast()){S-=1}if(t.getItems().length){var C=t.getItems()[0];g=C.getFraction();c=C.getFractionLabel()?C.getFractionLabel():c+C.getFraction();h=C.getFractionScale()?C.getFractionScale().substring(0,3):h;u=C.getFormattedLabel();if(!v&&!p){v=d(C.getColor())}}if(u){var f=t._parseFormattedValue(c);h=f.scale.substring(0,3);c=f.value}var _=t.getTotal();var M=t.getTotalLabel()?t.getTotalLabel():""+t.getTotal();if(t.getTotalScale()){o=t.getTotalScale().substring(0,3)}if(t.getFormattedLabel()){var b=t._parseFormattedValue(M);o=b.scale.substring(0,3);M=b.value}if(c){c=n._truncateValue(c,n.VALUE_TRUNCATION_DIGITS)}if(M){M=n._truncateValue(M,n.VALUE_TRUNCATION_DIGITS)}e.openStart("div",t);this._writeMainProperties(e,t);e.openEnd();e.openStart("div");e.class("sapSuiteHBMCAlign"+t.getAlignContent());e.class("sapSuiteHBMCVerticalAlignmentContainer");e.openEnd();e.openStart("div");e.class("sapSuiteHBMCChart");e.openEnd();e.openStart("svg",t.getId()+"-harvey-ball");e.class("sapSuiteHBMCChartSvg");e.attr("viewBox","0 0 72 72");e.attr("focusable",false);e.openEnd();e.openStart("g").openEnd();e.openStart("circle");e.attr("cx",this._oPath.center);e.attr("cy",this._oPath.center);e.attr("r",S);e.class("sapSuiteHBMCBackgroundCircle");e.openEnd();e.close("circle");if(g&&g>=_){e.openStart("circle");e.attr("cx",this._oPath.center);e.attr("cy",this._oPath.center);e.attr("r",S-this._oPath.border);e.class("sapSuiteHBMCSegment");if(v){e.style("fill",v)}else{e.class(p)}e.openEnd();e.close("circle")}else if(g>0){e.openStart("path",t.getId()+"-segment");e.class("sapSuiteHBMCSegment");if(v){e.style("fill",v)}else{e.class(p)}e.attr("d",this._serializePieChart());e.openEnd();e.close("path")}e.close("g");e.close("svg");e.close("div");e.openStart("div");e.class("sapSuiteHBMCTextContainer");e.openEnd();if(t.getShowFractions()){e.openStart("div");e.class("sapSuiteHBMCValueContainer");e.openEnd();this.renderLabel(e,t,[p,"sapSuiteHBMCValue"],c,v,"-fraction");this.renderLabel(e,t,[p,"sapSuiteHBMCValueScale"],h,v,"-fraction-scale");e.close("div")}if(t.getShowTotal()){e.openStart("div");e.class("sapSuiteHBMCTotalContainer");e.openEnd();this.renderLabel(e,t,[p,"sapSuiteHBMCTotal"],M,v,"-total");this.renderLabel(e,t,[p,"sapSuiteHBMCTotalScale"],o,v,"-total-scale");e.close("div")}e.close("div");e.close("div");e.close("div")};o._writeMainProperties=function(e,t){var a=t.hasListeners("press");this._renderActiveProperties(e,t);var r=t.getTooltip_AsString(a);e.attr("role","figure");if(t.getAriaLabelledBy().length){e.accessibilityState(t)}else{e.attr("aria-label",r)}e.class("sapSuiteHBMC");e.class("sapSuiteHBMCSize"+t.getSize());e.style("width",t.getWidth());e.style("height",t.getHeight())};o.renderLabel=function(e,t,a,r,i,s){var l=!(a.indexOf("sapSuiteHBMCTotal")>-1||a.indexOf("sapSuiteHBMCTotalScale")>-1);e.openStart("span",t.getId()+s);for(var n=0;n<a.length;n++){if(!(n===0&&i&&l)){e.class(a[n])}}e.openEnd();if(r){e.text(r)}e.close("span")};o._calculatePath=function(e){var t=e.getTotal();var a=0;if(e.getItems().length){a=e.getItems()[0].getFraction()}var r=o._iReferenceControlCenter;var i=5;this._oPath={initial:{x:r,y:r},lineTo:{x:r,y:i},arc:{x1:r-i,y1:r-i,largeArc:0,x2:"",y2:""},size:o._iReferenceControlSize,border:i,center:r};var s=a/t*360;var l=Math.PI/180;var n=this._oPath.center-this._oPath.border;var c=n*Math.cos((s-90)*l)+this._oPath.center;var h=this._oPath.size-(n*Math.sin((s+90)*l)+this._oPath.center);this._oPath.arc.x2=c.toFixed(2);this._oPath.arc.y2=h.toFixed(2);var u=t/a<2?1:0;this._oPath.arc.largeArc=u};o._serializePieChart=function(){var e=this._oPath;return["M",e.initial.x,",",e.initial.y," L",e.initial.x,",",e.lineTo.y," A",e.arc.x1,",",e.arc.y1," 0 ",e.arc.largeArc,",1 ",e.arc.x2,",",e.arc.y2," L",e.initial.x,",",e.initial.y," z"].join("")};r.extendMicroChartRenderer(o);return o},true);
//# sourceMappingURL=HarveyBallMicroChartRenderer.js.map