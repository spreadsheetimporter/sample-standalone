"use strict";sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/core/Fragment"],function(e,s){"use strict";const a=e.extend("cc.spreadsheetimporter.v0_26_1.ODataMessageHandler",{constructor:function s(a){e.prototype.constructor.call(this);this.messages=[];this.messages=[];this.spreadsheetUploadController=a},displayMessages:async function e(){if(!this.messageDialog){this.messageDialog=await s.load({name:"cc.spreadsheetimporter.v0_26_1.fragment.ODataMessagesDialog",type:"XML",controller:this})}this.messageDialog.setModel(this.spreadsheetUploadController.componentI18n,"i18n");this.messageDialog.setModel(sap.ui.getCore().getMessageManager().getMessageModel(),"message");this.messageDialog.open()},onCloseMessageDialog:function e(){this.messageDialog.close();sap.ui.getCore().getMessageManager().removeAllMessages()}});return a});
//# sourceMappingURL=ODataMessageHandler.js.map