// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/services/LaunchPage","sap/ushell/appRuntime/ui5/AppRuntimeService"],function(e,s){"use strict";function t(t,r,o){e.call(this,t,r,o);this.getGroupsForBookmarks=function(){return s.sendMessageToOuterShell("sap.ushell.services.LaunchPage.getGroupsForBookmarks")}}t.prototype=e.prototype;t.hasNoAdapter=e.hasNoAdapter;return t});
//# sourceMappingURL=LaunchPage.js.map