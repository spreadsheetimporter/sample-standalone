"use strict";

sap.ui.define(["sap/ui/base/ManagedObject", "sap/ui/core/Fragment"], function (ManagedObject, Fragment) {
  "use strict";

  /**
   * @namespace cc.spreadsheetimporter.v0_26_1
   */
  const ODataMessageHandler = ManagedObject.extend("cc.spreadsheetimporter.v0_26_1.ODataMessageHandler", {
    constructor: function _constructor(spreadsheetUploadController) {
      ManagedObject.prototype.constructor.call(this);
      this.messages = [];
      this.messages = [];
      this.spreadsheetUploadController = spreadsheetUploadController;
    },
    displayMessages: async function _displayMessages() {
      if (!this.messageDialog) {
        this.messageDialog = await Fragment.load({
          name: "cc.spreadsheetimporter.v0_26_1.fragment.ODataMessagesDialog",
          type: "XML",
          controller: this
        });
      }
      this.messageDialog.setModel(this.spreadsheetUploadController.componentI18n, "i18n");
      this.messageDialog.setModel(sap.ui.getCore().getMessageManager().getMessageModel(), "message");
      this.messageDialog.open();
    },
    onCloseMessageDialog: function _onCloseMessageDialog() {
      this.messageDialog.close();
      // reset message manager messages
      sap.ui.getCore().getMessageManager().removeAllMessages();
    }
  });
  return ODataMessageHandler;
});
//# sourceMappingURL=ODataMessageHandler.js.map