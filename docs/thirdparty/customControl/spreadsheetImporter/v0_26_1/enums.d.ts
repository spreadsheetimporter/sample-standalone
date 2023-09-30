declare module "cc/spreadsheetimporter/v0_26_1/enums" {
    import { CustomMessageType } from "cc/spreadsheetimporter/v0_26_1/types";
    enum AvailableOptions {
        /**
         * Option for `strict` mode
         * @public
         */
        Strict = "strict",
        /**
         * Changing the field match type
         * @public
         */
        FieldMatchType = "fieldMatchType",
        /**
         * Changing the decimal seperator for number fields
         * @public
         */
        DecimalSeperator = "decimalSeperator"
    }
    enum FieldMatchType {
        /**
         * Default match type, property names in square brackets
         * @public
         */
        LabelTypeBrackets = "labelTypeBrackets",
        /**
         * match type with only labels
         * @public
         */
        Label = "label"
    }
    const CustomMessageTypes: {
        [key: string]: CustomMessageType;
    };
}
//# sourceMappingURL=enums.d.ts.map