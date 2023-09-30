"use strict";

sap.ui.define([], function () {
  "use strict";

  var AvailableOptions = /*#__PURE__*/function (AvailableOptions) {
    AvailableOptions["Strict"] = "strict";
    AvailableOptions["FieldMatchType"] = "fieldMatchType";
    AvailableOptions["DecimalSeperator"] = "decimalSeperator";
    return AvailableOptions;
  }(AvailableOptions || {});
  var FieldMatchType = /*#__PURE__*/function (FieldMatchType) {
    FieldMatchType["LabelTypeBrackets"] = "labelTypeBrackets";
    FieldMatchType["Label"] = "label";
    return FieldMatchType;
  }(FieldMatchType || {});
  const CustomMessageTypes = {
    MandatoryFieldNotFilled: {
      title: "MandatoryFieldNotFilled",
      group: true
    },
    ColumnNotFound: {
      title: "ColumnNotFound",
      group: false
    },
    ParsingError: {
      title: "ParsingError",
      group: true
    },
    CustomErrorGroup: {
      title: "CustomErrorGroup",
      group: true
    },
    CustomError: {
      title: "CustomError",
      group: false
    },
    Formatting: {
      title: "Formatting",
      group: true
    }
  };
  var __exports = {
    __esModule: true
  };
  __exports.AvailableOptions = AvailableOptions;
  __exports.FieldMatchType = FieldMatchType;
  __exports.CustomMessageTypes = CustomMessageTypes;
  return __exports;
});
//# sourceMappingURL=enums.js.map