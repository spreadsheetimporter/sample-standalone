/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Element","sap/ui/core/Renderer","sap/ui/core/library","sap/ui/Device","sap/ui/thirdparty/jquery","sap/ui/core/InvisibleText"],function(e,t,i,r,n,jQuery,a){"use strict";var s=e.PopinDisplay;var o=r.VerticalAlign;var p=r.TextAlign;var h=r.SortOrder;var u=t.extend("sap.m.Column",{metadata:{library:"sap.m",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},hAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:p.Begin},vAlign:{type:"sap.ui.core.VerticalAlign",group:"Appearance",defaultValue:o.Inherit},styleClass:{type:"string",group:"Appearance",defaultValue:null},visible:{type:"boolean",group:"Appearance",defaultValue:true},minScreenWidth:{type:"string",group:"Behavior",defaultValue:null},demandPopin:{type:"boolean",group:"Behavior",defaultValue:false},popinHAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:p.Begin,deprecated:true},popinDisplay:{type:"sap.m.PopinDisplay",group:"Appearance",defaultValue:s.Block},mergeDuplicates:{type:"boolean",group:"Behavior",defaultValue:false},mergeFunctionName:{type:"string",group:"Misc",defaultValue:"getText"},sortIndicator:{type:"sap.ui.core.SortOrder",group:"Appearance",defaultValue:h.None},importance:{type:"sap.ui.core.Priority",group:"Behavior",defaultValue:"None"},autoPopinWidth:{type:"float",group:"Behavior",defaultValue:8}},defaultAggregation:"header",aggregations:{header:{type:"sap.ui.core.Control",multiple:false},footer:{type:"sap.ui.core.Control",multiple:false}},associations:{headerMenu:{type:"sap.ui.core.IColumnHeaderMenu",multiple:false,visibility:"hidden"}},designtime:"sap/m/designtime/Column.designtime"}});u.prototype._index=-1;u.prototype._screen="";u.prototype._media=null;u.prototype._bForcedColumn=false;u.prototype.exit=function(){this._clearMedia()};u.prototype.setParent=function(e){t.prototype.setParent.apply(this,arguments);if(!e){delete this._initialOrder}return this};u.prototype.getTable=function(){var e=this.getParent();if(e&&e.isA("sap.m.Table")){return e}};u.prototype.informTable=function(e,t,i){var r=this.getTable();if(r){var n="onColumn"+e;if(r[n]){r[n](this,t,i)}}};u.prototype.ontouchstart=function(e){this._bTouchStartMarked=e.isMarked()};u.prototype.ontap=function(e){if(!this._bTouchStartMarked&&!e.isMarked()){this.informTable("Press")}};u.prototype.onsapspace=function(e){if(e.srcControl===this){this.informTable("Press");e.preventDefault()}};u.prototype.onsapenter=u.prototype.onsapspace;u.prototype.invalidate=function(){var e=this.getParent();if(!e||!e.bOutput){return}t.prototype.invalidate.apply(this,arguments)};u.prototype._clearMedia=function(){if(this._media&&this._minWidth){this._detachMediaContainerWidthChange(this._notifyResize,this,this.getId());n.media.removeRangeSet(this.getId());this._media=null}};u.prototype._addMedia=function(){delete this._bShouldAddMedia;if(this._minWidth){n.media.initRangeSet(this.getId(),[parseFloat(this._minWidth)]);this._attachMediaContainerWidthChange(this._notifyResize,this,this.getId());this._media=this._getCurrentMediaContainerRange(this.getId());if(this._media){this._media.matches=!!this._media.from}}};u.prototype._notifyResize=function(e){if(this._media.from===e.from){return}this._media=e;this._media.matches=!!e.from;setTimeout(function(){if(!this.getVisible()){return}this.fireEvent("media",this);this.informTable("Resize")}.bind(this),0)};u.prototype._validateMinWidth=function(t){if(!t){return}if(Object.prototype.toString.call(t)!="[object String]"){throw new Error('expected string for property "minScreenWidth" of '+this)}if(Object.keys(e.ScreenSizes).indexOf(t.toLowerCase())!=-1){return}if(!/^\d+(\.\d+)?(px|em|rem)$/i.test(t)){throw new Error('invalid CSS size("px", "em", "rem" required) or sap.m.ScreenSize enumeration for property "minScreenWidth" of '+this)}};u.prototype._isWidthPredefined=function(t){var i=this,r=t.replace(/[^a-z]/gi,""),n=parseFloat(e.BaseFontSize)||16;jQuery.each(e.ScreenSizes,function(e,a){if(r!="px"){a/=n}if(a+r==t){i._minWidth=this+"px";i._screen=e;return false}});if(this._minWidth){return true}if(r=="px"){this._minWidth=t}else{this._minWidth=parseFloat(t)*n+"px"}};u.prototype.getCssAlign=function(e){e=e||this.getHAlign();if(e===p.Begin||e===p.End||e===p.Initial){e=i.getTextAlign(e)}return e.toLowerCase()};u.prototype.getStyleClass=function(e){var t=this.getProperty("styleClass");if(!e){return t}if(this._screen&&(!this.getDemandPopin()||!window.matchMedia)){t+=" sapMSize-"+this._screen}else if(this._media&&!this._media.matches){t+=" sapMListTblNone"}return t.trim()};u.prototype.setIndex=function(e){this._index=+e};u.prototype.getIndex=function(){return this._index};u.prototype.setOrder=function(e){this._order=+e};u.prototype.getOrder=function(){return this.hasOwnProperty("_order")?this._order:this.getInitialOrder()};u.prototype.setInitialOrder=function(e){this._initialOrder=+e};u.prototype.getInitialOrder=function(){if(this.hasOwnProperty("_initialOrder")){return this._initialOrder}var e=this.getTable();if(!e){return-1}return e.indexOfColumn(this)};u.prototype.setDisplay=function(e,t){if(!e||this._index<0){return}var i=this._index+1,r=this.getParent(),n=t&&!this.isHidden()?"table-cell":"none",a=e.querySelector("tr > th:nth-child("+i+")"),s=e.querySelectorAll("tr > td:nth-child("+i+")"),o=s.length;a.style.display=n;a.setAttribute("aria-hidden",!t);for(i=0;i<o;i++){s[i].style.display=n;s[i].setAttribute("aria-hidden",!t)}if(r&&r.setTableHeaderVisibility){setTimeout(function(){r.setTableHeaderVisibility(t)},0)}};u.prototype.setVisible=function(e){if(e==this.getVisible()){return this}var t=this.getParent(),i=t&&t.getTableDomRef&&t.getTableDomRef(),r=i&&this._index>=0&&!t.getAutoPopinMode()&&!this._bForcedColumn;if(r){this.setProperty("visible",e,r);this.setDisplay(i,e)}else{this.setProperty("visible",e)}return this};u.prototype._setMinScreenWidth=function(t){this._clearMedia();this._minWidth=0;this._screen="";if(t){t=t.toLowerCase();var i=e.ScreenSizes[t];if(i){this._screen=t;this._minWidth=i+"px"}else{this._isWidthPredefined(t)}var r=this.getTable();if(r&&r.isActive()){this._addMedia()}else{this._bShouldAddMedia=true}}};u.prototype.setMinScreenWidth=function(e){e=e||"";if(e==this.getMinScreenWidth()){return this}this._validateMinWidth(e);this._setMinScreenWidth(e);return this.setProperty("minScreenWidth",e)};u.prototype.setDemandPopin=function(e){if(e==this.getDemandPopin()){return this}if(!this.getMinScreenWidth()){return this.setProperty("demandPopin",e,true)}return this.setProperty("demandPopin",e)};u.prototype.setSortIndicator=function(e){this.setProperty("sortIndicator",e,true);this.$().attr("aria-sort",this.getSortIndicator().toLowerCase());return this};u.prototype.isPopin=function(){if(!this.getDemandPopin()){return false}var e=this.getTable();if(e){var t=e.getHiddenInPopin()||[];var i=t.some(function(e){return this.getImportance()===e},this);if(i){return false}}if(this._media){return!this._media.matches}return false};u.prototype.isHidden=function(){if(this._media){return!this._media.matches}if(this._screen&&this._minWidth){return parseFloat(this._minWidth)>window.innerWidth}return false};u.prototype.setLastValue=function(e){if(this.getMergeDuplicates()){this._lastValue=e}return this};u.prototype.clearLastValue=function(){return this.setLastValue(NaN)};u.prototype.getLastValue=function(){return this._lastValue};u.prototype.onItemsRemoved=function(){this.clearLastValue()};u.prototype.getFocusDomRef=function(){var e=this.getParent();if(e&&(e.bActiveHeaders||e.bFocusableHeaders||this.getAssociation("headerMenu"))){var i=this.getDomRef();if(i){return i.firstChild}}return t.prototype.getFocusDomRef.apply(this,arguments)};u.prototype.getCalculatedMinScreenWidth=function(){return parseInt(this._minWidth)||0};u.prototype.setForcedColumn=function(e){if(this._bForcedColumn==e){return}this._bForcedColumn=e;this._setMinScreenWidth(e?"":this.getMinScreenWidth())};u.prototype._getHeaderMenuInstance=function(){return sap.ui.getCore().byId(this.getAssociation("headerMenu"))};u.prototype.setHeader=function(e){var t=this.getHeader();if(t&&t.isA("sap.m.Label")){t.detachEvent("_change",this._onLabelPropertyChange,this);t.setIsInColumnHeaderContext(false)}this.setAggregation("header",e);var i=this.getHeader();if(i&&i.isA("sap.m.Label")){i.attachEvent("_change",this._onLabelPropertyChange,this);i.setIsInColumnHeaderContext(true)}return this};u.prototype._onLabelPropertyChange=function(e){if(e.getParameter("name")!="required"){return}if(this.getTable().bActiveHeaders||this._getHeaderMenuInstance()){this.$("ah")[e.getSource().getRequired()?"addAriaDescribedBy":"removeAriaDescribedBy"](a.getStaticId("sap.m","CONTROL_IN_COLUMN_REQUIRED"))}};return u});
//# sourceMappingURL=Column.js.map