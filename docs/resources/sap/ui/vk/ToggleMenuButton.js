/*!
* SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
*/
sap.ui.define(["./library","sap/ui/core/Core","sap/ui/core/Control","sap/m/library","sap/m/Button","sap/m/ButtonRenderer","sap/m/ToggleButton","sap/m/Menu","sap/ui/core/EnabledPropagator","sap/ui/core/IconPool","sap/ui/core/library","sap/ui/core/Popup","sap/ui/Device","sap/ui/events/KeyCodes","./ToggleMenuButtonRenderer"],function(e,t,o,r,i,n,s,a,p,u,l,g,h,d,f){"use strict";var c=l.TextDirection;var m=r.ButtonType;var y=g.Dock;var B=o.extend("sap.ui.vk.ToggleMenuButton",{metadata:{interfaces:["sap.m.IOverflowToolbarContent"],library:"sap.ui.vk",properties:{type:{type:"sap.m.ButtonType",group:"Appearance",defaultValue:m.Default},width:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},enabled:{type:"boolean",group:"Behavior",defaultValue:true},iconDensityAware:{type:"boolean",group:"Misc",defaultValue:true},menuPosition:{type:"sap.ui.core.Popup.Dock",group:"Misc",defaultValue:y.BeginBottom},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:c.Inherit},pressed:{type:"boolean",group:"Data",defaultValue:false}},aggregations:{_menu:{type:"sap.m.Menu",multiple:false,visibility:"hidden"},_toggleButton:{type:"sap.m.ToggleButton",multiple:false,visibility:"hidden"},_arrowButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},items:{type:"sap.ui.vk.ToggleMenuItem",multiple:true,forwarding:{getter:"_getMenu",aggregation:"items",forwardBinding:true}}},associations:{defaultItem:{type:"sap.ui.vk.ToggleMenuItem",multiple:false},ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{beforeMenuOpen:{},itemToggled:{parameters:{oldItem:{type:"sap.ui.vk.ToggleMenuItem"},newItem:{type:"sap.ui.vk.ToggleMenuItem"}}},itemSelected:{parameters:{item:{type:"sap.ui.vk.ToggleMenuItem"}}}}}});p.call(B.prototype);B.prototype.init=function(){if(o.init){o.init.call(this)}var e=new a({id:this.getId()+"-menu"});e.attachClosed(this._menuClosed,this);e.attachItemSelected(this._menuItemSelected,this);this.setAggregation("_menu",e);var r=new s({id:this.getId()+"-toggleButton",width:"100%",tooltip:this.getTooltip(),press:function(){var e=t.byId(this.getDefaultItem());if(e){this.fireItemToggled(this.getPressed()?{newItem:e,oldItem:null}:{newItem:null,oldItem:e})}}.bind(this)}).addStyleClass("sapUiVkTMBText");this.setAggregation("_toggleButton",r);var n=new i({id:this.getId()+"-arrowButton",icon:"sap-icon://slim-arrow-down",tooltip:this.getTooltip(),ariaHasPopup:l.aria.HasPopup.Menu,press:function(){this._handleArrowPress()}.bind(this)}).addStyleClass("sapUiVkTMBArrow");this.setAggregation("_arrowButton",n)};B.prototype._getMenu=function(){return this.getAggregation("_menu")};B.prototype._getToggleButton=function(){return this.getAggregation("_toggleButton")};B.prototype._getArrowButton=function(){return this.getAggregation("_arrowButton")};B.prototype.onAfterRendering=function(){var e=this._getToggleButton().$(),t=this._getArrowButton().$();e.attr("tabindex","-1");t.attr("tabindex","-1");e.removeAttr("title");t.removeAttr("title");e.removeAttr("aria-describedby");t.removeAttr("aria-describedby")};B.prototype._handleArrowPress=function(e){var t=this._getMenu(),o={zero:"0 0",plus2_right:"0 +2",minus2_right:"0 -2",plus2_left:"+2 0",minus2_left:"-2 0"};this.fireBeforeMenuOpen();if(this._popupOpened){this._getMenu().close();this._popupOpened=false;return}if(!t.getTitle()){t.setTitle(this.getText())}var r=[this,e];switch(this.getMenuPosition()){case y.BeginTop:r.push(y.BeginBottom,y.BeginTop,o.plus2_right);break;case y.BeginCenter:r.push(y.BeginCenter,y.BeginCenter,o.zero);break;case y.LeftTop:r.push(y.RightBottom,y.LeftBottom,o.plus2_left);break;case y.LeftCenter:r.push(y.RightCenter,y.LeftCenter,o.plus2_left);break;case y.LeftBottom:r.push(y.RightTop,y.LeftTop,o.plus2_left);break;case y.CenterTop:r.push(y.CenterBottom,y.CenterTop,o.plus2_left);break;case y.CenterCenter:r.push(y.CenterCenter,y.CenterCenter,o.zero);break;case y.CenterBottom:r.push(y.CenterTop,y.CenterBottom,o.minus2_right);break;case y.RightTop:r.push(y.LeftBottom,y.RightBottom,o.minus2_left);break;case y.RightCenter:r.push(y.LeftCenter,y.RightCenter,o.minus2_left);break;case y.RightBottom:r.push(y.LeftTop,y.RightTop,o.minus2_left);break;case y.EndTop:r.push(y.EndBottom,y.EndTop,o.plus2_right);break;case y.EndCenter:r.push(y.EndCenter,y.EndCenter,o.zero);break;case y.EndBottom:r.push(y.EndTop,y.EndBottom,o.minus2_right);break;case y.BeginBottom:default:r.push(y.BeginTop,y.BeginBottom,o.minus2_right);break}t.openBy.apply(t,r);if(this._getMenu()){this._popupOpened=true}this._writeAriaAttributes();if(!h.system.phone){this.setArrowState(true)}};B.prototype._menuClosed=function(){this._popupOpened=false;this.setArrowState(false);var e=this._getArrowButton();e.$().removeAttr("aria-controls");e.$().attr("aria-expanded","false")};B.prototype._writeAriaAttributes=function(){var e=this._getArrowButton(),t=this._getMenu();if(t){e.$().attr("aria-controls",t.getDomRefId());e.$().attr("aria-expanded","true")}};B.prototype.setArrowState=function(e){this._getArrowButton().$()[e?"addClass":"removeClass"]("sapMSBActive")};B.prototype.getPressed=function(){return this._getToggleButton().getPressed()};B.prototype.setProperty=function(e,t,r){if(e==="type"&&(t===m.Up||t===m.Back||t===m.Unstyled)){return this}var n=o.prototype.setProperty.apply(this,arguments);function a(e){return e.charAt(0).toUpperCase()+e.slice(1)}if(e==="iconDensityAware"||e==="textDirection"){s.prototype.setProperty.apply(this._getToggleButton(),arguments)}else if(e==="text"||e==="type"||e==="icon"||e==="pressed"){var p="set"+a(e);s.prototype[p].call(this._getToggleButton(),t);if(e==="type"){i.prototype[p].call(this._getArrowButton(),t)}}return n};B.prototype.onkeydown=function(e){if(e.which===d.SPACE){e.preventDefault()}this._getToggleButton().onkeydown(e)};B.prototype.onkeyup=function(e){this._getToggleButton().onkeyup(e)};B.prototype.onsapup=function(e){this._handleArrowPress()};B.prototype.onsapdown=function(e){this._handleArrowPress()};B.prototype.onsapupmodifiers=function(e){this._handleArrowPress()};B.prototype.onsapdownmodifiers=function(e){this._handleArrowPress()};B.prototype.onsapshow=function(e){this._handleArrowPress();e.preventDefault()};B.prototype.getButtonTypeAriaLabelId=function(){var e=this._getToggleButton().getType();return n.getButtonTypeAriaLabelId(e)};B.prototype.getTitleAttributeValue=function(){var e=this.getTooltip_AsString(),t=u.getIconInfo(this.getIcon()),o;if(e||t&&t.text&&!this.getText()){o=e||t.text}return o};B.prototype.getOverflowToolbarConfig=function(){return{canOverflow:true,propsUnrelatedToSize:["enabled","type","icon"],autoCloseEvents:["press"]}};B.prototype._menuItemSelected=function(e){var o=e.getParameter("item");if(o.getToggleable()){var r=this._getToggleButton();var i=r.getPressed()?t.byId(this.getDefaultItem()):null;if(o!==i){this.setDefaultItem(o);r.setPressed(true);r.rerender();this.fireItemToggled({newItem:o,oldItem:i})}else{r.setPressed(!r.getPressed());this.fireItemToggled(r.getPressed()?{newItem:o,oldItem:null}:{newItem:null,oldItem:o})}}else{this.fireItemSelected({item:o})}this._popupOpened=false};B.prototype.getIcon=function(){return this._getToggleButton().getIcon()};B.prototype.getText=function(){return this._getToggleButton().getText()};B.prototype.setDefaultItem=function(e){this.setAssociation("defaultItem",e);if(e==null){return this}if(typeof e==="string"){e=t.byId(e)}var o=e.getIcon();var r=this._getToggleButton();r.setIcon(o);r.setText(o?null:e.getText());this.rerender()};B.prototype.onBeforeRendering=function(){if(!this.getDefaultItem()){var e=this.getItems().find(function(e){return e.getToggleable()});if(e){this.setDefaultItem(e)}}};return B});
//# sourceMappingURL=ToggleMenuButton.js.map