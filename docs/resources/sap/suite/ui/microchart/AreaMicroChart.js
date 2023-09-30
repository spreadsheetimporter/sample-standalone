/*!
 * SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./library","sap/ui/core/Control","sap/ui/Device","sap/m/FlexBox","sap/suite/ui/microchart/MicroChartUtils","sap/base/Log","sap/ui/events/KeyCodes","sap/ui/core/theming/Parameters","sap/m/library","sap/ui/core/ResizeHandler","./AreaMicroChartRenderer"],function(jQuery,e,t,i,r,s,a,o,n,h,l){"use strict";var u=h.ValueColor;var p=h.Size;var d=e.AreaMicroChartViewType;var g=t.extend("sap.suite.ui.microchart.AreaMicroChart",{metadata:{library:"sap.suite.ui.microchart",properties:{size:{type:"sap.m.Size",group:"Misc",defaultValue:"Auto"},width:{type:"sap.ui.core.CSSSize",group:"Misc"},height:{type:"sap.ui.core.CSSSize",group:"Misc"},maxXValue:{type:"float",group:"Misc",defaultValue:null},minXValue:{type:"float",group:"Misc",defaultValue:null},maxYValue:{type:"float",group:"Misc",defaultValue:null},minYValue:{type:"float",group:"Misc",defaultValue:null},view:{type:"sap.suite.ui.microchart.AreaMicroChartViewType",group:"Appearance",defaultValue:"Normal"},colorPalette:{type:"string[]",group:"Appearance",defaultValue:[]},showLabel:{type:"boolean",group:"Misc",defaultValue:true},isResponsive:{type:"boolean",group:"Appearance",defaultValue:false},hideOnNoData:{type:"boolean",group:"Appearance",defaultValue:false}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{press:{}},defaultAggregation:"lines",aggregations:{chart:{multiple:false,type:"sap.suite.ui.microchart.AreaMicroChartItem",bindable:"bindable"},maxThreshold:{multiple:false,type:"sap.suite.ui.microchart.AreaMicroChartItem"},innerMaxThreshold:{multiple:false,type:"sap.suite.ui.microchart.AreaMicroChartItem"},innerMinThreshold:{multiple:false,type:"sap.suite.ui.microchart.AreaMicroChartItem"},minThreshold:{multiple:false,type:"sap.suite.ui.microchart.AreaMicroChartItem"},target:{multiple:false,type:"sap.suite.ui.microchart.AreaMicroChartItem",bindable:"bindable"},firstXLabel:{multiple:false,type:"sap.suite.ui.microchart.AreaMicroChartLabel"},firstYLabel:{multiple:false,type:"sap.suite.ui.microchart.AreaMicroChartLabel"},lastXLabel:{multiple:false,type:"sap.suite.ui.microchart.AreaMicroChartLabel"},lastYLabel:{multiple:false,type:"sap.suite.ui.microchart.AreaMicroChartLabel"},maxLabel:{multiple:false,type:"sap.suite.ui.microchart.AreaMicroChartLabel"},minLabel:{multiple:false,type:"sap.suite.ui.microchart.AreaMicroChartLabel"},lines:{multiple:true,type:"sap.suite.ui.microchart.AreaMicroChartItem",bindable:"bindable"}}}});g.THRESHOLD_LOOK_XS=1.125;g.THRESHOLD_LOOK_S=3.5;g.THRESHOLD_LOOK_M=4.5;g.THRESHOLD_LOOK_L=5.875;g.THRESHOLD_WIDTH_NO_LABEL=6;g.THRESHOLD_WIDE_HEIGHT_NO_LABEL=2.25;g.ITEM_NEUTRAL_COLOR="sapSuiteAMCSemanticColorNeutral";g.ITEM_NEUTRAL_NOTHRESHOLD_CSSCLASS="sapSuiteAMCNeutralNoThreshold";g._CHARTITEM_AGGREGATIONS=["chart","target","minThreshold","maxThreshold","innerMinThreshold","innerMaxThreshold"];g.prototype.init=function(){this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.microchart");this.setAggregation("tooltip","((AltText))",true);this._bThemeApplied=true;if(!sap.ui.getCore().isInitialized()){this._bThemeApplied=false;sap.ui.getCore().attachInit(this._handleCoreInitialized.bind(this))}else{this._handleCoreInitialized()}};g.prototype._handleCoreInitialized=function(){this._bThemeApplied=sap.ui.getCore().isThemeApplied();sap.ui.getCore().attachThemeChanged(this._handleThemeApplied,this);sap.ui.getCore().attachLocalizationChanged(this._handleThemeApplied,this)};g.prototype._handleThemeApplied=function(){this._bThemeApplied=true;this.invalidate()};g.prototype._getCssValues=function(){this._$CssHelper.className=Array.prototype.slice.call(arguments).join(" ");var e=window.getComputedStyle(this._$CssHelper);if(!e.backgroundColor){e.backgroundColor=e["background-color"]}if(!e.outlineStyle){e.outlineStyle=e["outline-style"]}if(!e.outlineWidth){e.outlineWidth=e["outline-width"]}return e};g.prototype.__fillThresholdArea=function(e,t,i,r){e.beginPath();e.moveTo(t[0].x,t[0].y);for(var s=1,a=t.length;s<a;s++){e.lineTo(t[s].x,t[s].y)}for(var o=i.length-1;o>=0;o--){e.lineTo(i[o].x,i[o].y)}e.closePath();e.fillStyle="white";e.fill();e.fillStyle=r;e.fill();e.lineWidth=1;e.strokeStyle="white";e.stroke();e.strokeStyle=r;e.stroke()};g.prototype._renderDashedLine=function(e,t,i){if(e.setLineDash){e.setLineDash(i);this._renderLine(e,t);e.setLineDash([])}else{e.beginPath();for(var r=0,s=t.length-1;r<s;r++){e._dashedLine(t[r].x,t[r].y,t[r+1].x,t[r+1].y,i)}e.stroke()}};g.prototype._renderLine=function(e,t){e.beginPath();e.moveTo(t[0].x,t[0].y);for(var i=1,r=t.length;i<r;i++){e.lineTo(t[i].x,t[i].y)}e.stroke()};g.prototype._getItemColor=function(e,t){var i;if(t&&this.getTarget()){i="sapSuiteAMCSemanticColor"+this.getTarget().getColor()}else if(!t&&this.getChart()){i="sapSuiteAMCSemanticColor"+this.getChart().getColor()}if(i===g.ITEM_NEUTRAL_COLOR&&!this._isThresholdPresent(e)){return g.ITEM_NEUTRAL_NOTHRESHOLD_CSSCLASS}else{return i}};g.prototype._isThresholdPresent=function(e){var t=[e.minThreshold.length,e.maxThreshold.length,e.innerMinThreshold.length,e.innerMaxThreshold.length];for(var i=0;i<t.length;i++){if(t[i]>1){return true}}return false};g.prototype._renderTarget=function(e,t){if(t.target.length>1){var i=this._getItemColor(t,true);var r=this._getCssValues("sapSuiteAMCTarget",i);e.strokeStyle=r.color;e.lineWidth=parseFloat(r.width);if(r.outlineStyle=="dotted"){this._renderDashedLine(e,t.target,[parseFloat(r.outlineWidth),3])}else{this._renderLine(e,t.target,t)}}else if(t.target.length==1){a.warning("Target is not rendered because only 1 point was given")}};g.prototype._renderThresholdLine=function(e,t){if(t&&t.length){var i=this._getCssValues("sapSuiteAMCThreshold");e.strokeStyle=i.color;e.lineWidth=i.width;this._renderLine(e,t)}};g.prototype._fillMaxThreshold=function(e,t){if(t.maxThreshold.length>1){var i=this._getCssValues("sapSuiteAMCThreshold","sapSuiteAMCSemanticColor"+this.getMaxThreshold().getColor());this.__fillThresholdArea(e,t.maxThreshold,[{x:t.maxThreshold[0].x,y:t.minY},{x:t.maxThreshold[t.maxThreshold.length-1].x,y:t.minY}],i.backgroundColor);this._renderThresholdLine(e,t.maxThreshold,t)}else if(t.maxThreshold.length==1){a.warning("Max Threshold is not rendered because only 1 point was given")}};g.prototype._fillMinThreshold=function(e,t){if(t.minThreshold.length>1){var i=this._getCssValues("sapSuiteAMCThreshold","sapSuiteAMCSemanticColor"+this.getMinThreshold().getColor());this.__fillThresholdArea(e,t.minThreshold,[{x:t.minThreshold[0].x,y:t.maxY},{x:t.minThreshold[t.minThreshold.length-1].x,y:t.maxY}],i.backgroundColor)}else if(t.minThreshold.length==1){a.warning("Min Threshold is not rendered because only 1 point was given")}};g.prototype._fillThresholdArea=function(e,t){if(t.minThreshold.length>1&&t.maxThreshold.length>1){var i=this._getCssValues("sapSuiteAMCThreshold","sapSuiteAMCSemanticColorCritical");this.__fillThresholdArea(e,t.maxThreshold,t.minThreshold,i.backgroundColor)}};g.prototype._fillInnerThresholdArea=function(e,t){if(t.innerMinThreshold.length>1&&t.innerMaxThreshold.length>1){var i=this._getCssValues("sapSuiteAMCThreshold","sapSuiteAMCSemanticColor"+this.getInnerMaxThreshold().getColor());this.__fillThresholdArea(e,t.innerMaxThreshold,t.innerMinThreshold,i.backgroundColor)}else if(t.innerMinThreshold.length||t.innerMaxThreshold.length){a.warning("Inner threshold area is not rendered because inner min and max threshold were not correctly set")}};g.prototype._renderChart=function(e,t){if(t.chart.length>1){var i=this._getItemColor(t);var r=this._getCssValues("sapSuiteAMCChart",i);e.strokeStyle=r.color;e.lineWidth=parseFloat(r.width);this._renderLine(e,t.chart,t)}else if(t.chart.length==1){a.warning("Actual values are not rendered because only 1 point was given")}};g.prototype._renderLines=function(e,t){var i=this.getColorPalette().length,r=0,s=this._getCssValues("sapSuiteAMCLine"),a=t.lines.length;var o=function(e){if(i){if(r===i){r=0}e=this.getColorPalette()[r++].trim()}if(u[e]){s=this._getCssValues("sapSuiteAMCLine","sapSuiteAMCSemanticColor"+e);return s.color}return n.get(e)||e}.bind(this);e.lineWidth=parseFloat(s.width);for(var h=0;h<a;h++){if(t.lines[h].length>1){e.strokeStyle=o(this.getLines()[h].getColor());this._renderLine(e,t.lines[h],t)}}};g.prototype._renderCanvas=function(){var e=this.getDomRef("canvas");if(!this._hasData()||!e){return}this._$CssHelper=this.getDomRef("css-helper");var t=this.$();var i=window.getComputedStyle(e);var r=parseFloat(i.width);e.setAttribute("width",r||360);var s=parseFloat(i.height);e.setAttribute("height",s||242);var a=e.getContext("2d");a.lineJoin="round";a._dashedLine=this._drawDashedLine;var o=this._calculateDimensions(e.width,e.height);if(this._isThresholdPresent(o)){t.find(".sapSuiteAMCCanvasContainer").addClass("sapSuiteAMCWithThreshold")}this._fillMaxThreshold(a,o);this._fillMinThreshold(a,o);this._fillThresholdArea(a,o);this._renderThresholdLine(a,o.minThreshold,o);this._renderThresholdLine(a,o.maxThreshold,o);this._fillInnerThresholdArea(a,o);this._renderThresholdLine(a,o.innerMinThreshold,o);this._renderThresholdLine(a,o.innerMaxThreshold,o);this._renderTarget(a,o);this._renderChart(a,o);this._renderLines(a,o)};g.prototype._drawDashedLine=function(e,t,i,r,s){var a=s.length;this.moveTo(e,t);var o=i-e,n=r-t,h=o?n/o:1e15,l=Math.sqrt(o*o+n*n),u=0,p=true;while(l>=.1){var d=s[u++%a];if(d>l){d=l}var g=Math.sqrt(d*d/(1+h*h));if(o<0){g=-g}e+=g;t+=h*g;this[p?"lineTo":"moveTo"](e,t);l-=d;p=!p}};g.prototype._calculateDimensions=function(e,t){var i,r,s,o;function n(){if(!this._isMinXValue||!this._isMaxXValue||!this._isMinYValue||!this._isMaxYValue){var e=this.getLines();if(this.getMaxThreshold()){e.push(this.getMaxThreshold())}if(this.getMinThreshold()){e.push(this.getMinThreshold())}if(this.getChart()){e.push(this.getChart())}if(this.getTarget()){e.push(this.getTarget())}if(this.getInnerMaxThreshold()){e.push(this.getInnerMaxThreshold())}if(this.getInnerMinThreshold()){e.push(this.getInnerMinThreshold())}for(var t=0,a=e.length;t<a;t++){var n=e[t].getPoints();for(var h=0,l=n.length;h<l;h++){var u=n[h].getXValue();if(u>i||i===undefined){i=u}if(u<s||s===undefined){s=u}var p=n[h].getYValue();if(p>r||r===undefined){r=p}if(p<o||o===undefined){o=p}}}}if(this._isMinXValue){s=this.getMinXValue()}if(this._isMaxXValue){i=this.getMaxXValue()}if(this._isMinYValue){o=this.getMinYValue()}if(this._isMaxYValue){r=this.getMaxYValue()}}n.call(this);var h={minY:0,minX:0,maxY:t,maxX:e,lines:[]};var l;var u=i-s;if(u>0){l=e/u}else if(u==0){l=0;h.maxX/=2}else{a.warning("Min X is greater than max X.")}var p;var d=r-o;if(d>0){p=t/(r-o)}else if(d==0){p=0;h.maxY/=2}else{a.warning("Min Y is greater than max Y.")}function g(e){var t=sap.ui.getCore().getConfiguration().getRTL();var i=function(e){var i=l*(e-s);if(t){i=h.maxX-i}return i};var r=function(e){return h.maxY-p*(e-o)};var n=[];if(e&&l!==undefined&&p!==undefined){var u=e.getPoints();var d=u.length;var g,f,_,c;if(d==1){_=u[0].getXValue();c=u[0].getYValue();if(_==undefined^c==undefined){var C,T;if(_==undefined){T=f=r(c);g=h.minX;C=h.maxX}else{C=g=i(_);f=h.minY;T=h.maxY}n.push({x:g,y:f},{x:C,y:T})}else{a.warning("Point with coordinates ["+_+" "+c+"] ignored")}}else{for(var M=0;M<d;M++){_=u[M].getXValue();c=u[M].getYValue();if(_!=undefined&&c!=undefined){g=i(_);f=r(c);n.push({x:g,y:f})}else{a.warning("Point with coordinates ["+_+" "+c+"] ignored")}}}}return n}h.maxThreshold=g(this.getMaxThreshold());h.minThreshold=g(this.getMinThreshold());h.chart=g(this.getChart());h.target=g(this.getTarget());h.innerMaxThreshold=g(this.getInnerMaxThreshold());h.innerMinThreshold=g(this.getInnerMinThreshold());var f=this.getLines().length;for(var _=0;_<f;_++){h.lines.push(g(this.getLines()[_]))}return h};g.prototype.setMinXValue=function(e,t){this._isMinXValue=this._isNumber(e);return this.setProperty("minXValue",this._isMinXValue?e:NaN,t)};g.prototype.setMaxXValue=function(e,t){this._isMaxXValue=this._isNumber(e);return this.setProperty("maxXValue",this._isMaxXValue?e:NaN,t)};g.prototype.setMinYValue=function(e,t){this._isMinYValue=this._isNumber(e);return this.setProperty("minYValue",this._isMinYValue?e:NaN,t)};g.prototype.setMaxYValue=function(e,t){this._isMaxYValue=this._isNumber(e);return this.setProperty("maxYValue",this._isMaxYValue?e:NaN,t)};g.prototype._isNumber=function(e){return typeof e==="number"&&!isNaN(e)&&isFinite(e)};g.prototype.onBeforeRendering=function(){if(this._bUseIndex){this._indexChartItems()}if(this._sChartResizeHandlerId){l.deregister(this._sChartResizeHandlerId)}this._unbindMouseEnterLeaveHandler()};g.prototype.onAfterRendering=function(){e._checkControlIsVisible(this,this._onControlIsVisible);this._bindMouseEnterLeaveHandler()};g.prototype.setSize=function(e){if(this.getSize()!==e){if(e===p.Responsive){this.setProperty("isResponsive",true)}else{this.setProperty("isResponsive",false)}this.setProperty("size",e)}return this};g.prototype.setIsResponsive=function(e){var t,i=this.getSize();this.setProperty("isResponsive",e);if(e){t=p.Responsive}else{t=i===p.Responsive?p.Auto:i}this.setProperty("size",t);return this};g.prototype._onControlIsVisible=function(){this._onResize();this._sChartResizeHandlerId=l.register(this,this._onResize.bind(this))};g.prototype._indexChartItems=function(){var e,t=g._CHARTITEM_AGGREGATIONS.length;for(var i=0;i<t;i++){e=this.getAggregation(g._CHARTITEM_AGGREGATIONS[i]);if(e){this._indexChartItemPoints(e)}}};g.prototype._indexChartItemPoints=function(e){var t=e.getPoints();for(var i=0;i<t.length;i++){t[i].setProperty("x",i,true)}};g.prototype.enableXIndexing=function(e){this._bUseIndex=e};g.prototype._onResize=function(){var e=this.$(),t=parseInt(e.width()),i=parseInt(e.height()),r=e.find(".sapSuiteAMCPositionCenter"),s=e.find(".sapSuiteAMCPositionTop .sapSuiteAMCPositionLeft, .sapSuiteAMCPositionTop .sapSuiteAMCPositionRight,"+".sapSuiteAMCSideLabels .sapSuiteAMCLbl:first-child");e.removeClass("sapSuiteAMCNoLabels sapSuiteAMCLookM sapSuiteAMCLookS sapSuiteAMCLookXS sapSuiteAMCNoMinMaxLabels sapSuiteAMCNoTopLabels");if(t<=this.convertRemToPixels(g.THRESHOLD_WIDTH_NO_LABEL)){e.addClass("sapSuiteAMCNoLabels")}if(i<this.convertRemToPixels(g.THRESHOLD_WIDE_HEIGHT_NO_LABEL)){e.addClass("sapSuiteAMCLookXS")}else if(i<this.convertRemToPixels(g.THRESHOLD_LOOK_S)&&this.getView()===d.Normal){e.addClass("sapSuiteAMCLookXS")}else if(i<this.convertRemToPixels(g.THRESHOLD_LOOK_M)){e.addClass("sapSuiteAMCLookS")}else if(i<this.convertRemToPixels(g.THRESHOLD_LOOK_L)){e.addClass("sapSuiteAMCLookM")}if(this._isAnyLabelTruncated(s)||this._isAnyLabelVerticallyTruncated(s)){e.addClass("sapSuiteAMCNoMinMaxLabels");if(this._isAnyLabelTruncated(s)){e.removeClass("sapSuiteAMCNoMinMaxLabels");e.addClass("sapSuiteAMCNoTopLabels")}}if(this._isAnyLabelTruncated(r)){e.addClass("sapSuiteAMCNoMinMaxLabels")}this._renderCanvas()};g.prototype._isLabelTruncated=function(e){var t;if(i.browser.msie||i.browser.edge){t=1}else{t=0}return e.offsetWidth<e.scrollWidth-t};g.prototype.ontap=function(e){if(i.browser.msie){this.$().trigger("focus")}this.firePress()};g.prototype.onkeydown=function(e){if(e.which==o.SPACE){e.preventDefault()}};g.prototype.onkeyup=function(e){if(e.which==o.ENTER||e.which==o.SPACE){this.firePress();e.preventDefault()}};g.prototype.attachEvent=function(){t.prototype.attachEvent.apply(this,arguments);if(this.hasListeners("press")){this.$().attr("tabindex",0).addClass("sapSuiteUiMicroChartPointer")}return this};g.prototype.detachEvent=function(){t.prototype.detachEvent.apply(this,arguments);if(!this.hasListeners("press")){this.$().removeAttr("tabindex").removeClass("sapSuiteUiMicroChartPointer")}return this};g.prototype._getLocalizedColorMeaning=function(e){return u[e]?this._oRb.getText(("SEMANTIC_COLOR_"+e).toUpperCase()):""};g.prototype._getAltHeaderText=function(e){var t=this._oRb.getText("AREAMICROCHART");if(e){t+=" "+this._oRb.getText("IS_ACTIVE")}if(!this._hasData()){t+="\n"+this._oRb.getText("NO_DATA");return t}var i=this.getFirstXLabel();var r=this.getFirstYLabel();var s=this.getLastXLabel();var a=this.getLastYLabel();var o=this.getMinLabel();var n=this.getMaxLabel();var h=this.getChart();var l=this.getTarget();if(i&&i.getLabel()||r&&r.getLabel()){t+="\n"+this._oRb.getText("AREAMICROCHART_START")+": "+(i?i.getLabel():"")+" "+(r?r.getLabel()+" "+this._getLocalizedColorMeaning(r.getColor()):"")}if(s&&s.getLabel()||a&&a.getLabel()){t+="\n"+this._oRb.getText("AREAMICROCHART_END")+": "+(s?s.getLabel():"")+" "+(a?a.getLabel()+" "+this._getLocalizedColorMeaning(a.getColor()):"")}if(o&&o.getLabel()){t+="\n"+this._oRb.getText("AREAMICROCHART_MINIMAL_VALUE")+": "+o.getLabel()+" "+this._getLocalizedColorMeaning(o.getColor())}if(n&&n.getLabel()){t+="\n"+this._oRb.getText("AREAMICROCHART_MAXIMAL_VALUE")+": "+n.getLabel()+" "+this._getLocalizedColorMeaning(n.getColor())}if(h&&h.getPoints()&&h.getPoints().length>0){t+="\n"+this._oRb.getText("AREAMICROCHART_ACTUAL_VALUES")+":";var u=h.getPoints();for(var p=0;p<u.length;p++){t+=" "+u[p].getY()}}if(l&&l.getPoints()&&l.getPoints().length>0){t+="\n"+this._oRb.getText("AREAMICROCHART_TARGET_VALUES")+":";var d=l.getPoints();for(var g=0;g<d.length;g++){t+=" "+d[g].getY()}}return t};g.prototype._getAltSubText=function(e){var t="";for(var i=0;i<this.getLines().length;i++){var r=this.getLines()[i],s=r.getTooltip_AsString(),a="",o="";if(!s){continue}if(r.getPoints()&&r.getPoints().length>0){o+=(e?"":"\n")+(r.getTitle()?r.getTitle():this._oRb.getText("AREAMICROCHART_LINE",[i+1]))+":";var n=r.getPoints();for(var h=0;h<n.length;h++){a+=" "+n[h].getY()}if(this.getColorPalette().length===0){a+=" "+this._getLocalizedColorMeaning(r.getColor())}}a=s.split("((AltText))").join(a);if(a){t+=o+a;e=false}}return t};g.prototype._getAccessibilityControlType=function(){return this._oRb.getText("ACC_CTR_TYPE_AREAMICROCHART")};g.prototype.clone=function(){var e=t.prototype.clone.apply(this,arguments);e._isMinXValue=this._isMinXValue;e._isMaxXValue=this._isMaxXValue;e._isMinYValue=this._isMinYValue;e._isMaxYValue=this._isMaxYValue;return e};g.prototype.exit=function(){l.deregister(this._sChartResizeHandlerId);sap.ui.getCore().detachThemeChanged(this._handleThemeApplied,this);sap.ui.getCore().detachLocalizationChanged(this._handleThemeApplied,this)};g.prototype._addTitleAttribute=function(){if(!this.$().attr("title")&&this._hasData()){this.$().attr("title",this.getTooltip_AsString())}};g.prototype._removeTitleAttribute=function(){if(this.$().attr("title")){this.$().removeAttr("title")}};g.prototype._bindMouseEnterLeaveHandler=function(){if(!this._oMouseEnterLeaveHandler){this._oMouseEnterLeaveHandler={mouseEnterChart:this._addTitleAttribute.bind(this),mouseLeaveChart:this._removeTitleAttribute.bind(this)}}this.$().on("mouseenter",this._oMouseEnterLeaveHandler.mouseEnterChart);this.$().on("mouseleave",this._oMouseEnterLeaveHandler.mouseLeaveChart)};g.prototype._unbindMouseEnterLeaveHandler=function(){if(this._oMouseEnterLeaveHandler){this.$().off("mouseenter",this._oMouseEnterLeaveHandler.mouseEnterChart);this.$().off("mouseleave",this._oMouseEnterLeaveHandler.mouseLeaveChart)}};g.prototype._hasData=function(){return this.getLines().length>0||!!this.getChart()};g.prototype.firePress=function(){if(this._hasData()){t.prototype.fireEvent.call(this,"press",arguments)}};s.extendMicroChart(g);return g});
//# sourceMappingURL=AreaMicroChart.js.map