// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/m/Label","sap/ui/core/Control","sap/ui/core/Icon","sap/ui/core/Popup","sap/ushell/library","sap/ushell/resources","sap/ushell/ui/launchpad/AccessibilityCustomData","./LoadingDialogRenderer"],function(e,t,i,s,o,a,n){"use strict";var l=t.extend("sap.ushell.ui.launchpad.LoadingDialog",{metadata:{library:"sap.ushell",properties:{iconUri:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},text:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},loadAnimationWithInterval:{type:"boolean",group:"Appearance",defaultValue:true}}}});l.prototype.init=function(){this._oPopup=new s;this._oPopup.restoreFocus=false;this._oPopup.setShadow(false);this._oPopup.setModal(true,"sapUshellLoadingDialog");this.oIcon=new i;this._oLabel=new e(this.getId()+"loadingLabel").addStyleClass("sapUshellLoadingDialogLabel");this.sState="idle";this.sLoadingString=a.i18n.getText("genericLoading").replace("..."," ")};l.prototype.exit=function(){this._oPopup.close();this._oPopup.destroy();this.oIcon.destroy();this._oLabel.destroy()};l.prototype.isOpen=function(){return this._oPopup.isOpen()};l.prototype.openLoadingScreen=function(){if(this.sState==="idle"){this.sState="busy"}if(this.getLoadAnimationWithInterval()){this.addStyleClass("sapUshellVisibilityHidden");this._iTimeoutId=setTimeout(function(){this.removeStyleClass("sapUshellVisibilityHidden");this.focus()}.bind(this),3e3)}else{this.removeStyleClass("sapUshellVisibilityHidden");this.focus()}if(!this.getVisible()){this.setVisible(true);this.$().show()}if(!this.isOpen()){this._oPopup.setContent(this);this._oPopup.setPosition("center center","center center",document,"0 0","fit");this._oPopup.open()}};l.prototype.showAppInfo=function(e,t,i){this.setText(e);this.setIconUri(t);this.oIcon.setSrc(t);this._oLabel.setText(e);this._oLabel.addCustomData(new n({key:"aria-hidden",value:"true",writeToDom:true}));var s=this.getDomRef("accessibility-helper");if(s&&i){s.innerText=this.sLoadingString}};l.prototype.closeLoadingScreen=function(){if(this._iTimeoutId){clearTimeout(this._iTimeoutId)}if(this.getVisible()){this.sState="idle";this.setVisible(false);this.$().hide();this._oPopup.close()}};return l});
//# sourceMappingURL=LoadingDialog.js.map