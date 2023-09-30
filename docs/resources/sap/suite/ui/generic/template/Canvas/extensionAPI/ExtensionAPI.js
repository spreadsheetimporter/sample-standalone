sap.ui.define(["sap/ui/base/Object","sap/suite/ui/generic/template/extensionAPI/NavigationController","sap/base/util/extend"],function(e,t,n){"use strict";function o(e,t,n){return{getTransactionController:n.extensionAPI.getTransactionControllerFunction(),attachToView:function(t){e.oCommonUtils.attachControlToView(t)},invokeActions:function(t,n,o,i){return e.oCommonUtils.invokeActionsForExtensionAPI(t,n,o,i)},attachPageDataLoaded:function(n){e.oComponentUtils.attach(t,"PageDataLoaded",n)},detachPageDataLoaded:function(n){e.oComponentUtils.detach(t,"PageDataLoaded",n)},registerMessageFilterProvider:function(e){n.state.messageButtonHelper.registerMessageFilterProvider(e)},getNavigationController:n.extensionAPI.getNavigationControllerFunction(),getCommunicationObject:function(t){return e.oComponentUtils.getCommunicationObject(t)},securedExecution:function(t,o){return e.oCommonUtils.securedExecution(t,o,n.state)},addFooterBarToPage:function(e,n){var o=t.byId("template::ObjectPage::FooterToolbar");var i=t.byId("canvasFooterInvisibleText");if(o){var a=t.getView().getModel("i18n");o.setModel(a,"i18n");e.setFooter(o);var r=o.indexOfContent(i);if(n){for(var s=0;s<n.length;s++){o.insertContent(n[s],r+s)}}}},refreshAncestors:function(n){var o=t.getOwnerComponent();if(n<0){n=null}e.oServices.oViewDependencyHelper.setParentToDirty(o,undefined,n)},getPaginatorButtons:function(){var e=t.byId("template::UpAndDownNavigation");if(e){var n=t.getView().getModel("i18n");e.setModel(n,"i18n");return e}},getFlexibleColumnLayoutActionButtons:function(){var e=t.byId("template::FCLActionButtons");if(e){var n=t.getView().getModel("i18n");e.setModel(n,"i18n");return e}},onCustomStateChange:function(){e.oComponentUtils.stateChanged()}}}return e.extend("sap.suite.ui.generic.template.Canvas.extensionAPI.ExtensionAPI",{constructor:function(e,t,i){n(this,o(e,t,i))}})});
//# sourceMappingURL=ExtensionAPI.js.map