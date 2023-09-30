// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/Log","sap/ui/core/mvc/XMLView","sap/ushell/resources"],function(e,n,i){"use strict";return{getProfiling:function(){var t;return{id:"usageAnalytics",entryHelpID:"usageAnalytics",title:i.i18n.getText("usageAnalytics"),contentFunc:function(){return n.create({id:"userPrefUsageAnalyticsSelector",viewName:"sap.ushell.components.shell.Settings.userProfiling.UsageAnalyticsSelector"}).then(function(e){t=e;return e})},onSave:function(){if(t){return t.getController().onSave()}e.warning("Save operation for user profiling was not executed, because the userProfiling view was not initialized");return Promise.resolve()},onCancel:function(){if(t){t.getController().onCancel();return}e.warning("Cancel operation for user profiling was not executed, because the userProfiling view was not initialized")}}}}});
//# sourceMappingURL=UsageAnalyticsProfiling.js.map