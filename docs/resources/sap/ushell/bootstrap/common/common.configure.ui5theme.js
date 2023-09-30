// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["./common.read.ui5theme.from.config","sap/base/util/ObjectPath","sap/base/Log"],function(e,t,r){"use strict";function o(e){var r=t.get("services.Container.adapter.config.userProfile.metadata.ranges.theme",e);if(!r){return}t.create("services.UserInfo.adapter.config.themes",e);e.services.UserInfo.adapter.config.themes=Object.keys(r).map(function(e){return{id:e,name:r[e].displayName,root:r[e].themeRoot}})}function a(a){var i=t.get("services.Container.adapter.config",a),n=e(a);o(a);if(n.theme){i.userProfile.defaults.bootTheme=n}else{var s=t.get("userProfile.defaults.theme",i),f=t.get("userProfilePersonalization.theme",i);r.error("No valid boot theme could be determined: personalizedTheme = '"+f+"' default theme = '"+s+"'",null,"common.configure.ui5theme")}}return a});
//# sourceMappingURL=common.configure.ui5theme.js.map