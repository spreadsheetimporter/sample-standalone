/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/core/Control","sap/m/Text","sap/m/Toolbar","sap/m/Link","sap/m/TextArea","sap/m/Popover","sap/m/ToolbarSpacer","sap/m/Button","sap/ui/Device","sap/suite/ui/commons/util/ManagedObjectRegister","sap/suite/ui/commons/util/DateUtils","sap/ui/core/Icon","sap/m/library","sap/ui/core/format/DateFormat","sap/ui/base/Object","sap/ui/dom/containsOrEquals","sap/base/security/encodeXML","./TimelineItemRenderer","sap/ui/events/KeyCodes"],function(jQuery,e,t,i,s,r,o,n,a,l,p,u,c,h,g,d,f,m,_,y){"use strict";var T=h.PlacementType;var x=h.ToolbarDesign;var C=h.Avatar;var I=h.AvatarShape;var v=h.AvatarSize;var b=e.extend("sap.suite.ui.commons.TimelineItem",{metadata:{library:"sap.suite.ui.commons",properties:{dateTime:{type:"any",group:"Misc",defaultValue:null},filterValue:{type:"string",group:"Misc",defaultValue:null},icon:{type:"string",group:"Misc",defaultValue:null},iconDisplayShape:{type:"sap.m.AvatarShape",defaultValue:I.Circle},iconInitials:{type:"string",defaultValue:""},iconSize:{type:"sap.m.AvatarSize",defaultValue:v.XS},iconTooltip:{type:"string",group:"Misc",defaultValue:null},useIconTooltip:{type:"boolean",group:"Accessibility",defaultValue:true},maxCharacters:{type:"int",group:"Behavior",defaultValue:null},replyCount:{type:"int",group:"Misc",defaultValue:null},status:{type:"string",group:"Misc",defaultValue:null},title:{type:"string",group:"Misc",defaultValue:null},text:{type:"string",group:"Misc",defaultValue:null},userName:{type:"string",group:"Misc",defaultValue:null},userNameClickable:{type:"boolean",group:"Misc",defaultValue:false},userPicture:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null}},defaultAggregation:"embeddedControl",aggregations:{customAction:{type:"sap.ui.core.CustomData",multiple:true,singularName:"customAction"},customReply:{type:"sap.ui.core.Control",multiple:false},embeddedControl:{type:"sap.ui.core.Control",multiple:false},replyList:{type:"sap.m.List",multiple:false},suggestionItems:{type:"sap.m.StandardListItem",multiple:true,singularName:"suggestionItem",deprecated:true}},events:{userNameClicked:{parameters:{uiElement:{type:"sap.ui.core.Control"}}},select:{},press:{},replyPost:{parameters:{value:{type:"string"}}},replyListOpen:{},customActionClicked:{parameters:{value:{type:"string"},key:{type:"string"},linkObj:{type:"sap.m.Link"}}},suggest:{deprecated:true,parameters:{suggestValue:{type:"string"}}},suggestionItemSelected:{deprecated:true,parameters:{selectedItem:{type:"sap.ui.core.Item"}}}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}}}});var S=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.commons"),E={Warning:"sapSuiteUiCommonsTimelineStatusWarning",Error:"sapSuiteUiCommonsTimelineStatusError",Success:"sapSuiteUiCommonsTimelineStatusSuccess",Information:"sapSuiteUiCommonsTimelineStatusInformation"};b.prototype.init=function(){this._customReply=false;this._objects=new p;this._nMaxCharactersMobile=500;this._nMaxCharactersDesktop=800;this._sTextShowMore=S.getText("TIMELINE_TEXT_SHOW_MORE");this._registerControls();this._registerPopup();this._orientation="V"};b.prototype.setCustomMessage=function(e){this._objects.getInfoText().setText(e);this._objects.getInfoBar().setVisible(e&&e.length>0);this.invalidate()};b.prototype.setDateTime=function(e){var t="";var i=RegExp(/^(?:[0-9]{4}-[0-9]{2}-[0-9]{2})?(?:[ T][0-9]{2}:[0-9]{2}:[0-9]{2})(?:[.][0-9]{1,12})?[Z]/);var s=RegExp(/^(?:[0-9]{4}-[0-9]{2}-[0-9]{2})?(?:[ T][0-9]{2}:[0-9]{2}:[0-9]{2})/);if(i.test(e)){if(e.indexOf(".")>0&&e.split(".")[1]){var r=e.split(".")[1].length-1;for(var o=0;o<r;o++){t=t+"S"}var n="yyyy-MM-dd'T'HH:mm:ss."+t+"X";var a=g.getDateTimeInstance({pattern:n});var l=a.parse(e);if(l instanceof Date){e=l}}else{e=e?u.parseDate(e):e}}else if(s.test(e)){e=e?u.parseDate(e):e}this.setProperty("dateTime",e);return this};b.prototype.applyFocusInfo=function(){this.focus();this.getParent()._moveScrollBar(true)};b.prototype.getFocusDomRef=function(){return this.$("outline")[0]};b.prototype._replyPost=function(){var e=this._objects.getReplyInputArea().getValue();this.fireReplyPost({value:e})};b.prototype._registerPopup=function(){var e=this;this._objects.register("fullText",function(){var i=new t(e.getId()+"-fullText",{text:e.getText()});i.addStyleClass("sapSuiteUiCommonsTimelineItemPopoverText");return i});this._objects.register("fullTextPopover",function(){var t=new o({placement:T.Bottom,showArrow:false,showHeader:false,contentMinWidth:"300px",contentWidth:"450px",resizable:true,content:[e._objects.getFullText()]});t.addStyleClass("sapSuiteUiCommonsTimelineItemShowMorePopover");return t})};b.prototype._openReplyDialog=function(){if(this._customReply){this.getCustomReply().openBy(this._objects.getReplyLink());this.fireReplyListOpen()}else{this.fireReplyListOpen();this._objects.getReplyInputArea().setValue("");this._oldReplyInputArea="";this._list=this.getReplyList();if(this._list!==null){this.setAggregation("replyList",null,true);this._objects.getReplyPop().addContent(this._list)}this._objects.getReplyPop().addContent(this._objects.getReplyInputArea());this._objects.getReplyPop().openBy(this._objects.getReplyLink())}};b.prototype._callParentFn=function(){var e=Array.prototype.slice.call(arguments),t=e.shift(),i=this.getParent();if(i&&typeof i[t]==="function"){return i[t].apply(i,e)}};b.prototype._getCorrectGroupIcon=function(){var e="",t=function(){return this.getParent()&&this.getParent()._renderDblSided}.bind(this),i=this._isGroupCollapsed();if(this._orientation==="H"){e="sap-icon://navigation-right-arrow";if(!i){e=this._callParentFn("_isLeftAlignment")||t()?"sap-icon://navigation-down-arrow":"sap-icon://navigation-up-arrow"}}else{e="sap-icon://navigation-down-arrow";if(i){e=this._callParentFn("_isLeftAlignment")||t()?"sap-icon://navigation-right-arrow":"sap-icon://navigation-left-arrow"}}return e};b.prototype.onclick=function(e){var t=this;var i=e.srcControl;if(f(this.$("outline").get(0),e.target)){if(this._isGroupHeader){t._performExpandCollapse(t._groupID)}}if(i&&(i instanceof c||i.getId().indexOf("userNameLink")>-1)||i instanceof sap.m.Avatar){return}if(i instanceof s){this.firePress()}else{this.fireSelect()}};b.prototype.onkeydown=function(e){if(e.which===y.ENTER||e.which===y.SPACE){if(e.srcControl.getId().indexOf("userNameLink")>-1){this.fireUserNameClicked({uiElement:this})}else if(e.srcControl instanceof s){this.firePress()}else{this.fireSelect()}}};b.prototype._performExpandCollapse=function(e){var t=false,i=this._isGroupCollapsed(e);var s=function(e,t){var i=e.find(".sapSuiteUiCommonsTimelineItemBarV"),s,r;if(t.get(0)){s=t.attr("groupId");r=!this._isGroupCollapsed(s);if(r){i.addClass("sapSuiteUiCommonsTimelineGroupNextExpanded")}else{i.removeClass("sapSuiteUiCommonsTimelineGroupNextExpanded")}}}.bind(this),r=function(){var e,i,s;if(!t){e=this._objects.getGroupCollapseIcon&&this._objects.getGroupCollapseIcon();i=this.$();s=this._isGroupCollapsed();if(!s){i.removeClass("sapSuiteUiCommonsTimelineGroupCollapsed");i.addClass("sapSuiteUiCommonsTimelineGroupExpanded")}else{i.addClass("sapSuiteUiCommonsTimelineGroupCollapsed");i.removeClass("sapSuiteUiCommonsTimelineGroupExpanded")}e.setSrc(this._getCorrectGroupIcon());t=true}}.bind(this),o=function(){if(this.getParent()){this.getParent()._collapsedGroups[e]=!i}}.bind(this),n=this.$(),a=this,l=n.parent(),p,u,c,h,g,d;o();if(this._orientation==="H"){p=this.$("line")}else{p=n.find(".sapSuiteUiCommonsTimelineGroupHeaderBarWrapper");u=l.next().children("li").first();c=l.prev().children(":visible:last");if(c.get(0)){s(c,n)}if(i){h=l.children().last();s(h,u)}else{s(n,u)}}if(i){p.hide()}else{p.show()}d=n.find(".sapSuiteUiCommonsTimelineGroupHeaderMainWrapper");d.attr("aria-expanded",!!i);n.attr("aria-expanded",!!i);if(i){d.attr("aria-label",S.getText("TIMELINE_ACCESSIBILITY_GROUP_HEADER")+": "+d.prevObject[0].outerText+" "+S.getText("TIMELINE_ACCESSIBILITY_GROUP_EXPAND"),true)}else{d.attr("aria-label",S.getText("TIMELINE_ACCESSIBILITY_GROUP_HEADER")+": "+d.prevObject[0].outerText+" "+S.getText("TIMELINE_ACCESSIBILITY_GROUP_COLLAPSE"),true)}if(this._orientation!=="H"||i){r()}g=this._callParentFn("_performExpandCollapse",e,i,this);if(g){return new Promise(function(e,t){g.then(function(){r();a._callParentFn("_performUiChanges");e()})})}};b.prototype._getStatusColorClass=function(){var e=this.getStatus();return E[e]||""};b.prototype._getLineIcon=function(){var e=this,t;this._objects.register("lineIcon",function(){var i="sap-icon://circle-task",s=e.getText()==="GroupHeader";if(!s){i=e.getIcon()?e.getIcon():"sap-icon://activity-items"}t=new c(e.getId()+"-icon",{src:i,tooltip:e.getIconTooltip(),useIconTooltip:e.getUseIconTooltip()});t.addStyleClass("sapSuiteUiCommonsTimelineBarIcon");return t});return this._objects.getLineIcon()};b.prototype._isGroupCollapsed=function(e){var t=this.getParent();e=e||this._groupID;return t&&t._collapsedGroups&&t._collapsedGroups[e]};b.prototype._getCollapsedText=function(){var e=this.getText().substring(0,this._nMaxCollapsedLength);var t=e.lastIndexOf(" ");if(t>0){this._sShortText=e.substr(0,t)}else{this._sShortText=e}return this._sShortText};b.prototype._toggleTextExpanded=function(e){var t=this,i=e.getSource(),s=i.$(),r=this.$("realtext"),o=s.height(),n=s.position().top,a=r.parent().position().top,l=s.parent().prev(),p,u,c=this.getParent()&&this.getParent()._noAnimation,h=8,g=function(){return t.getParent()&&t.getParent()._renderDblSided},d=function(e,i,s){l.css("-webkit-line-clamp",s+"px");if(g()||c){l.css("height",e+"px");t._callParentFn("_performUiChanges")}else{l.animate({height:i},250,t._callParentFn("_performUiChanges"))}};if(this._orientation==="V"){u=this.$("threeDots");p=l.children().first();if(!this._expanded){this._textProperties={height:l.css("height"),clamp:l.css("-webkit-line-clamp"),text:p.html()};l.attr("expanded",true);u.hide();p.html(this._encodeHTMLAndLineBreak(this.getText()));var f=S.getText("TIMELINE_TEXT_SHOW_LESS");i.setText(f);i.rerender();d("",p.height(),"")}else{l.attr("expanded",false);i.setText(this._sTextShowMore);i.rerender();u.show();p.html(this._textProperties.text);d(this._textProperties.height,this._textProperties.height,this._textProperties.clamp)}t._expanded=!t._expanded}else{var m=a-n-o-h,_=jQuery(window).height()-s.offset().top,y=200;if(_<y){m-=y-_}this._objects.getFullText().setText(this.getText());this._objects.getFullTextPopover().setOffsetY(Math.floor(m));this._objects.getFullTextPopover().openBy(this._objects.getExpandButton())}};b.prototype._getButtonExpandCollapse=function(){var e=this;this._objects.register("expandButton",function(){return new s(e.getId()+"-fullTextBtn",{text:e._sTextShowMore,press:e._toggleTextExpanded.bind(e)})});return this._objects.getExpandButton()};b.prototype._checkTextIsExpandable=function(){this._nMaxCollapsedLength=this.getMaxCharacters();if(this._nMaxCollapsedLength===0){this._nMaxCollapsedLength=l.system.phone?this._nMaxCharactersMobile:this._nMaxCharactersDesktop}return this.getText().length>this._nMaxCollapsedLength};b.prototype.onBeforeRendering=function(){var e=this;if(!this._list){this._list=this.getReplyList()}if(this.getReplyCount()>0){this._objects.getReplyLink().setText(S.getText("TIMELINE_REPLY")+" ("+this.getReplyCount()+")")}else if(this._list&&this._list.getItems().length>0){this._objects.getReplyLink().setText(S.getText("TIMELINE_REPLY")+" ("+this._list.getItems().length+")")}this._objects.getSocialBar().removeAllContent();if(this._callParentFn("getEnableSocial")){this._objects.getSocialBar().addContent(this._objects.getReplyLink())}this._actionList=this.getCustomAction();function t(t,i){e.fireCustomActionClicked({value:i.value,key:i.key,linkObj:this})}for(var i=0;i<this._actionList.length;i++){var r=this._actionList[i].getKey();var o=this._actionList[i].getValue();var n=new s({text:o,tooltip:r});n.addStyleClass("sapSuiteUiCommonsTimelineItemActionLink");n.attachPress({value:o,key:r},t);this._objects.getSocialBar().addContent(n)}};b.prototype._encodeHTMLAndLineBreak=function(e){return m(e).replace(/&#xa;/g,"<br>")};b.prototype._getUserPictureControl=function(){var e=this.getId()+"-userPictureControl",t=this.getUserPicture(),i=this.getIconInitials(),s=this.getIconDisplayShape(),r=this.getIconSize();if(!t){return null}this._objects.register("userPictureControl",function(){var o=new C({id:e,src:t,initials:i,displayShape:s,displaySize:r,tooltip:S.getText("TIMELINE_USER_PICTURE")});return o});return this._objects.getUserPictureControl()};b.prototype._getUserNameLinkControl=function(){var e=this;if(this.getUserNameClickable()){this._objects.register("userNameLink",function(){var t=new s(e.getId()+"-userNameLink",{text:e.getUserName(),press:function(t){e.fireUserNameClicked({uiElement:this})}});t.addStyleClass("sapUiSelectable");return t});return this._objects.getUserNameLink()}};b.prototype.onAfterRendering=function(){this._expanded=false;this._callParentFn("_itemRendered")};b.prototype._registerControls=function(){var e=this;this._objects.register("infoText",new t(this.getId()+"-infoText",{maxLines:1,width:"100%"}));this._objects.register("infoBar",new i(this.getId()+"-infoBar",{id:this.getId()+"-customMessageInfoBar",content:[this._objects.getInfoText()],design:x.Info,visible:false}));this._objects.register("replyLink",function(){var t=new s(e.getId()+"-replyLink",{text:S.getText("TIMELINE_REPLY"),press:[e._openReplyDialog,e]});t.addStyleClass("sapSuiteUiCommonsTimelineItemActionLink");return t});this._objects.register("socialBar",function(){var t=new i(e.getId()+"-socialBar",{});t.data("sap-ui-fastnavgroup",null);return t});this._objects.register("replyInputArea",new r(this.getId()+"-replyInputArea",{height:"4rem",width:"100%"}));this._objects.register("replyPop",function(){return new o(e.getId()+"-replyPop",{initialFocus:e._objects.getReplyInputArea(),title:S.getText("TIMELINE_REPLIES"),placement:T.Vertical,footer:new i({content:[new n,new a(e.getId()+"-replyButton",{text:S.getText("TIMELINE_REPLY"),press:function(){e._replyPost();e._objects.getReplyPop().close()}})]}),contentHeight:"15rem",contentWidth:"20rem"})})};b.prototype.exit=function(){this._objects.destroyAll()};b.prototype.getDateTimeWithoutStringParse=function(){var e=this.getProperty("dateTime");return u.parseDate(e,false)||""};b.prototype.setCustomReply=function(e){if(e){this._customReply=true;this.setAggregation("customReply",e,true)}else{this._customReply=false}return this};b.prototype.setReplyList=function(e){if(e===null){return this}this.setAggregation("replyList",e,true);var t=this;this.getReplyList().attachUpdateFinished(function(e){var i=t._objects.getReplyInputArea().getDomRef("inner");if(i){jQuery(i.id).focus()}});return this};b.prototype.getDateTime=function(){var e=this.getProperty("dateTime");e=u.parseDate(e);if(typeof e==="string"&&this instanceof sap.suite.ui.commons.TimelineItem&&this.getBinding("dateTime")){var t=this.getBinding("dateTime").getValue();if(t instanceof Date){return t}else{return u.parseDate(t)}}else{return e}};b.prototype.onkeyup=function(e){if(e.which==y.ENTER||e.which==y.SPACE){if(f(this.$("outline").get(0),e.target)){if(this._isGroupHeader){this._performExpandCollapse(this._groupID)}}}};return b});
//# sourceMappingURL=TimelineItem.js.map