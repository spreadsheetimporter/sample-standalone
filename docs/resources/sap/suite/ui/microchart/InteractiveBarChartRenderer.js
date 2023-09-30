/*!
 * SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/m/library"],function(e){"use strict";var a={apiVersion:2};a.BAR_DIRECTION_POSITIVE={NAME:"positive",WRAPPER_CSSCLASS:"sapSuiteIBCBarWrapperPositive",CSSCLASS:"sapSuiteIBCBarPositive"};a.BAR_DIRECTION_NEGATIVE={NAME:"negative",WRAPPER_CSSCLASS:"sapSuiteIBCBarWrapperNegative",CSSCLASS:"sapSuiteIBCBarNegative"};a.render=function(e,a){if(!a._bThemeApplied){return}if(a.getShowError()){e.openStart("div",a);e.class("sapSuiteUiMicroChartNoData");e.openEnd();e.renderControl(a._oIllustratedMessageControl);e.close("div");return}var t=a.getBars(),i=Math.min(a.getDisplayedBars(),t.length);e.openStart("div",a);e.class("sapSuiteIBC");if(!a._isChartEnabled()){var s=a.getTooltip_AsString();if(typeof s==="string"||s instanceof String){e.attr("title",s)}}var r={};r.role="listbox";r.roledescription=a._oRb.getText("INTERACTIVEBARCHART");r.multiselectable=true;r.disabled=!a._isChartEnabled();r.labelledby=a.getAriaLabelledBy();e.accessibilityState(a,r);e.openEnd();if(!a.getSelectionEnabled()){this.renderDisabledOverlay(e,a)}for(var l=0;l<i;l++){this._renderBar(e,a,t[l],l,i)}e.close("div")};a._renderBar=function(t,i,s,r,l){var n,o,d,p,S,u;t.openStart("div",i.getId()+"-interactionArea-"+r);t.attr("data-sap-ui-ibc-selection-index",r);t.class("sapSuiteIBCBarInteractionArea");if(s.getSelected()){t.class("sapSuiteIBCBarSelected")}if(r===0&&i._isChartEnabled()){t.attr("tabindex","0")}o=s.getLabel();p=o;if(i._bMinMaxValid){n=this._getDisplayValue(s,i);d=s.getTooltip_Text();if(d&&d.trim()){p=d}else{if(p){p=p+" "+n}else{p=n}if(i._bUseSemanticTooltip){S=s.getColor();u=i._oRb.getText("SEMANTIC_COLOR_"+S.toUpperCase());p+=" "+u}}}var c={};c.role="option";c.label=p;c.selected=s.getSelected();c.posinset=r+1;c.setsize=l;t.accessibilityState(s,c);t.openEnd();o=s.getLabel();if(s.getColor()!==e.ValueColor.Neutral){t.openStart("div");t.class("sapSuiteIBCSemanticMarker");t.class("sapSuiteIBCSemantic"+s.getColor());t.openEnd();t.close("div")}t.openStart("div",i.getId()+"-label-"+r);t.class("sapSuiteIBCBarLabel");t.openEnd();t.openStart("div");t.class("sapSuiteIBCBarLabelText");t.openEnd();t.text(o);t.close("div");t.close("div");if(i._bMinMaxValid){t.openStart("div");t.class("sapSuiteIBCBarWrapper");t.openEnd();this._renderBarDirection(t,i,s,r,n,a.BAR_DIRECTION_NEGATIVE);t.openStart("div");t.class("sapSuiteIBCDivider");t.openEnd();t.close("div");this._renderBarDirection(t,i,s,r,n,a.BAR_DIRECTION_POSITIVE);t.close("div")}t.close("div")};a._renderBarDirection=function(e,a,t,i,s,r){var l=t.getValue();e.openStart("div");e.class(r.WRAPPER_CSSCLASS);e.openEnd();e.openStart("div",a.getId()+"-bar-"+r.NAME+"-"+i);e.class("sapSuiteIBCBar");e.class(r.CSSCLASS);if(l>0){e.class("sapSuiteIBCValuePositive")}else if(l===0||t._bNullValue){e.class("sapSuiteIBCBarValueNull")}else{e.class("sapSuiteIBCValueNegative")}e.openEnd();this._renderDisplayedValue(e,a,t,a.getId(),i,s,r);e.close("div");e.close("div")};a._renderDisplayedValue=function(e,t,i,s,r,l,n){var o=i.getValue()===0,d;if(i._bNullValue||o){if(t._fMin<0&&t._fMax>0){d=Math.abs(t._fMax)>=Math.abs(t._fMin)}else{d=t._fMin>=0}}else{d=i.getValue()>=0}if(n===a.BAR_DIRECTION_POSITIVE&&d||n===a.BAR_DIRECTION_NEGATIVE&&!d){e.openStart("span",s+"-displayedValue-"+r);e.class("sapSuiteIBCBarValue");if(i._bNullValue||o){e.class("sapSuiteIBCBarValueAutoAlignment");e.class("sapSuiteIBCBarValueOutside")}e.openEnd();e.text(l);e.close("span")}};a.renderDisabledOverlay=function(e,a){e.openStart("div");e.class("sapSuiteIBCDisabledOverlay");e.openEnd();e.close("div")};a._getDisplayValue=function(e,a){var t,i;t=e.getDisplayedValue();i=e.getValue();if(e._bNullValue){t=a._oRb.getText("INTERACTIVECHART_NA")}else if(!t){t=i.toString()}return t};a._getAriaDescribedBy=function(e,a){var t=[];for(var i=0;i<a;i++){t.push(e.getId()+"-interactionArea-"+i)}return t.join(",")};return a},true);
//# sourceMappingURL=InteractiveBarChartRenderer.js.map