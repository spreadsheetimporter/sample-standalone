//Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/model/json/JSONModel"],function(t){"use strict";function e(){throw new Error("sap.ushell.utils.RestrictedJSONModel : Function not supported")}return t.extend("sap.ushell.utils.RestrictedJSONModel",{constructor:function(){t.prototype.constructor.apply(this,arguments);this.setDefaultBindingMode("OneWay");this.setDefaultBindingMode=e;this.setData=e;this.setJSON=e;this.setProperty=e;this.loadData=e},_setData:function(){t.prototype.setData.apply(this,arguments)},_setJSON:function(){this.setData=t.prototype.setData;t.prototype.setJSON.apply(this,arguments);this.setData=e},_setProperty:function(){this.setData=t.prototype.setData;t.prototype.setProperty.apply(this,arguments);this.setData=e}})});
//# sourceMappingURL=RestrictedJSONModel.js.map