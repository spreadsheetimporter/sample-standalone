// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/Component","sap/ui/thirdparty/jquery","sap/base/Log"],function(t,jQuery,e){"use strict";return t.extend("sap.ushell.appRuntime.ui5.plugins.scriptAgent.Component",{init:function(){var t=this.getComponentData();jQuery.ajaxSetup({cache:true});try{jQuery.getScript(t.config.url)}catch(t){e.error(t)}jQuery.ajaxSetup({cache:false})}})});
//# sourceMappingURL=Component.js.map