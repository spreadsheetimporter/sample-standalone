// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/Log","sap/m/FlexBox","sap/m/Label","sap/m/List","sap/m/StandardListItem","sap/m/VBox","sap/ui/core/Control","sap/ui/Device","sap/ui/thirdparty/jquery","sap/ui/events/KeyCodes","sap/ushell/library","sap/ushell/resources","sap/ushell/ui/launchpad/AccessibilityCustomData"],function(e,t,i,s,o,n,a,r,jQuery,l,p,h,d){"use strict";var u=a.extend("sap.ushell.ui.shell.ShellNavigationMenu",{metadata:{library:"sap.ushell",properties:{title:{type:"string",group:"Misc",defaultValue:null},description:{type:"string",group:"Misc",defaultValue:null},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},showRelatedApps:{type:"boolean",defaultValue:true}},aggregations:{items:{type:"sap.m.ListItem",group:"Misc",defaultValue:null,singularName:"item"},miniTiles:{type:"sap.ushell.ui.shell.NavigationMiniTile",group:"Misc",defaultValue:null,singularName:"miniTile"}},events:{}},renderer:{apiVersion:2,render:function(e,t){var i,s;e.openStart("div",t);e.openEnd();i=t.oTitle;i.setIcon(t.getIcon());i.setTitle(t.getTitle());i.setDescription(t.getDescription());e.openStart("div");e.attr("id","sapUshellNavTitle");e.openEnd();e.renderControl(i);e.close("div");if(t.oItemsList){e.renderControl(t.oItemsList)}if(t.getShowRelatedApps()){s=t.getMiniTiles();if(s&&s.length>0){e.renderControl(t.oRelatedAppsVbox)}}e.close("div")}}});var m=function(e){this.init(e)};m.prototype.init=function(e){this.keyCodes=l;this.jqElement=e.$();this.jqElement.on("keydown.keyboardNavigation",this.keydownHandler.bind(this))};m.prototype.destroy=function(){if(this.jqElement){this.jqElement.off(".keyboardNavigation")}delete this.jqElement};m.prototype.keydownHandler=function(e){switch(e.keyCode){case this.keyCodes.ARROW_UP:this.upDownHandler(e,true);break;case this.keyCodes.ARROW_DOWN:this.upDownHandler(e,false);break;case this.keyCodes.ARROW_LEFT:this.leftRightHandler(e,false);break;case this.keyCodes.ARROW_RIGHT:this.leftRightHandler(e,true);break;case this.keyCodes.HOME:this.homeEndHandler(e,true);break;case this.keyCodes.END:this.homeEndHandler(e,false);break;case this.keyCodes.PAGE_UP:this.homeEndHandler(e,true);break;case this.keyCodes.PAGE_DOWN:this.homeEndHandler(e,false);break;default:break}};m.prototype.upDownHandler=function(e,t){var i=jQuery(document.activeElement);if(!i.hasClass("sapUshellNavMiniTile")){return false}var s=i.parent().parent();var o=i.parent().index();var n=s.children();var a;if(t){a=o-3;if(a<0){a+=9}}else{a=(o+3)%n.length}var r=n[a].children[0];this._setItemFocus(e,jQuery(r))};m.prototype.leftRightHandler=function(e,t){var i=t?"next":"prev",s,o,n,a,r,l,p=jQuery(document.activeElement);if(!p.hasClass("sapUshellNavMiniTile")){return false}s=p.parent();o=s[i]();n=o.index();a=s.parent();if(n===-1){r=t?0:a.children().length-1}else{r=n}l=a.children()[r].children[0];if(!l){return false}this._setItemFocus(e,jQuery(l))};m.prototype.homeEndHandler=function(e,t){var i=t?"first":"last";var s=jQuery(document.activeElement);if(!s.hasClass("sapUshellNavMiniTile")){return false}e.preventDefault();var o=this.jqElement.find(".sapUshellNavMiniTile")[i]();this._setItemFocus(e,o)};m.prototype._setItemFocus=function(e,t){e.preventDefault();e.stopImmediatePropagation();jQuery(".sapUshellNavMiniTile").attr("tabindex",-1);t.attr("tabindex",0);t.focus()};m.prototype.setFocusToLastFocusedMiniTile=function(e){var t=jQuery(".sapUshellNavMiniTile[tabindex='0']");if(t&&t[0]){this._setItemFocus(e,jQuery(t))}else{this._setItemFocus(e,jQuery(jQuery(".sapUshellNavMiniTile")[0]))}};u.prototype.init=function(){};u.prototype._createItemsList=function(){this.oItemsList=new s("sapUshellNavHierarchyItems")};u.prototype._createMiniTilesBox=function(){this.oMiniTilesBox=new t("sapUshellNavRelatedAppsFlexBox")};u.prototype._beforeOpen=function(){if(!this.bInitialized){this.oTitle=new o("navMenuInnerTitle",{wrapping:true}).addStyleClass("sapUshellNavigationMenuTitleItem");this.oRelatedAppsTitle=new i("sapUshellRelatedAppsLabel",{text:h.i18n.getText("shellNavMenu_relatedApps")});if(!this.oMiniTilesBox){this._createMiniTilesBox()}this.oRelatedAppsVbox=new n("sapUshellRelatedAppsItems",{items:[this.oRelatedAppsTitle,this.oMiniTilesBox]});this._extendInnerControlsForAccKeyboard();this.bInitialized=true}};u.prototype._afterOpen=function(){if(r.system.desktop){if(this.keyboardNavigation){this.keyboardNavigation.destroy()}this.keyboardNavigation=new m(this.oMiniTilesBox)}};u.prototype._extendInnerControlsForAccKeyboard=function(){this.oTitle.addCustomData(new d({key:"aria-level",value:"1",writeToDom:true}));if(r.system.desktop){this.oTitle.addCustomData(new d({key:"tabindex",value:"0",writeToDom:true}));this.oItemsList.addEventDelegate({onsaptabprevious:function(e){e.preventDefault();e.stopImmediatePropagation();jQuery("#navMenuInnerTitle").focus()},onsaptabnext:function(e){if(jQuery(".sapUshellNavMiniTile").length){this.keyboardNavigation.setFocusToLastFocusedMiniTile(e)}else{var t=sap.ui.getCore().byId("allMyAppsButton");this.keyboardNavigation._setItemFocus(e,jQuery(t.getDomRef()))}}.bind(this)})}};u.prototype.getMiniTiles=function(){if(this.oMiniTilesBox){return this.oMiniTilesBox.getItems()}return[]};u.prototype.insertMiniTile=function(e,t){if(!this.oMiniTilesBox){this._createMiniTilesBox()}this.oMiniTilesBox.insertItem(e,t);return this};u.prototype.addMiniTile=function(t){if(!this.oMiniTilesBox){this._createMiniTilesBox()}if(this.oMiniTilesBox.getItems().length<9){this.oMiniTilesBox.addItem(t)}else{e.warning("ShellNavigationMenu.addMiniTile - miniTiles aggregation is already at maximum size of 9 elements "+"- current item was not added.")}return this};u.prototype.removeMiniTile=function(e){if(this.oMiniTilesBox){this.oMiniTilesBox.removeItem(e)}return this};u.prototype.removeAllMiniTiles=function(){if(this.oMiniTilesBox){this.oMiniTilesBox.removeAllItems()}return this};u.prototype.destroyMiniTiles=function(){if(this.oMiniTilesBox){this.oMiniTilesBox.destroyItems()}return this};u.prototype.indexOfMiniTile=function(e){if(this.oMiniTilesBox){return this.oMiniTilesBox.indexOfItem(e)}return-1};u.prototype.getItems=function(){if(this.oItemsList){return this.oItemsList.getItems()}return[]};u.prototype.insertItem=function(e,t){if(!this.oItemsList){this._createItemsList()}e=this._extendHierarchyItemForAcc(e);this.oItemsList.insertItem(e,t);return this};u.prototype.addItem=function(e){if(!this.oItemsList){this._createItemsList()}e=this._extendHierarchyItemForAcc(e);this.oItemsList.addItem(e);return this};u.prototype.removeItem=function(e){if(this.oItemsList){this.oItemsList.removeItem(e)}return this};u.prototype.removeAllItems=function(){if(this.oItemsList){this.oItemsList.removeAllItems()}return this};u.prototype.destroyItems=function(){if(this.oItemsList){this.oItemsList.destroyItems()}return this};u.prototype.indexOfItem=function(e){if(this.oItemsList){return this.oItemsList.indexOfItem(e)}return-1};u.prototype._extendHierarchyItemForAcc=function(e){if(r.system.desktop){e.addEventDelegate({onsapspace:function(e){this.firePress()}.bind(e)})}return e};u.prototype.exit=function(){if(this.oItemsList){this.oItemsList.destroy()}if(this.oMiniTilesBox){this.oMiniTilesBox.destroy()}if(this.bInitialized){this.oTitle.destroy();this.oRelatedAppsVbox.destroy();this.oRelatedAppsTitle.destroy()}if(this.keyboardNavigation){this.keyboardNavigation.destroy()}};u.prototype.onAfterRendering=function(){jQuery("#sapUshellAppTitlePopover-intHeader").css("height",0);var e=jQuery("#navMenuInnerTitle");e.attr("aria-readonly","true");e.attr("readonly","readonly");if(r.system.desktop){e.attr("tabindex","0")}var t=jQuery("#sapUshellNavHierarchyItems ul");t.attr("role","group");t.attr("aria-label",h.i18n.getText("ShellNavigationMenu_HierarchyItemsAriaLabel"));var i=jQuery("#sapUshellNavRelatedAppsFlexBox");i.attr("role","list");i.attr("aria-labelledBy","sapUshellRelatedAppsLabel");var s=jQuery(".sapUshellNavMiniTile");for(var o=0;o<s.length;o++){jQuery(s[o]).attr("aria-setsize",s.length);jQuery(s[o]).attr("aria-posinset",o+1)}};return u});
//# sourceMappingURL=ShellNavigationMenu.js.map