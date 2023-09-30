// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/mvc/XMLView","sap/base/Log","sap/ushell/Config","sap/ushell/resources"],function(e,t,n,i){"use strict";function s(){var n="userActivitiesSetting",s="sap.ushell.components.shell.Settings.userActivities.UserActivitiesSetting",r;return{id:"userActivitiesEntry",entryHelpID:"userActivitiesEntry",title:i.i18n.getText("userActivities"),valueResult:null,contentResult:null,icon:"sap-icon://laptop",valueArgument:null,contentFunc:function(){return e.create({id:n,viewName:s}).then(function(e){r=e;return e})},onSave:function(){if(r){return r.getController().onSave()}t.warning("Save operation for user account settings was not executed, because the userActivities view was not initialized");return Promise.resolve()},onCancel:function(){if(r){r.getController().onCancel();return}t.warning("Cancel operation for user account settings was not executed, because the userActivities view was not initialized")}}}return{getEntry:s}});
//# sourceMappingURL=UserActivitiesEntry.js.map