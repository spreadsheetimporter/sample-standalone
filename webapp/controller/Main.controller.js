sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("exceluploadtotable.controller.Main", {
            onInit: function () {
                var oTableModel = new JSONModel();
                this.getView().setModel(oTableModel, "tableData");
            },

            uploadButtonPress(oEvent) {
                const model = this.getView().getModel("tableData");
                model.setData(oEvent.getParameter("payload"));
            }
        });
    });
