'use strict';
sap.ui.define([
    'sap/ui/base/ManagedObject',
    'sap/ui/core/Fragment',
    'sap/m/MessageToast',
    '../Preview',
    '../Util',
    'cc/spreadsheetimporter/v0_26_1/thirdparty/xlsx',
    './OptionsDialog',
    'sap/base/Log',
    '../SheetHandler',
    '../Parser',
    'sap/ui/model/json/JSONModel'
], function (ManagedObject, Fragment, MessageToast, __Preview, __Util, XLSX, __OptionsDialog, Log, __SheetHandler, __Parser, JSONModel) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule && typeof obj.default !== 'undefined' ? obj.default : obj;
    }
    const Preview = _interopRequireDefault(__Preview);
    const Util = _interopRequireDefault(__Util);
    const OptionsDialog = _interopRequireDefault(__OptionsDialog);
    const SheetHandler = _interopRequireDefault(__SheetHandler);
    const Parser = _interopRequireDefault(__Parser);
    const SpreadsheetUploadDialog = ManagedObject.extend('cc.spreadsheetimporter.v0_26_1.SpreadsheetUploadDialog', {
        constructor: function _constructor(spreadsheetUploadController, component, componentI18n, messageHandler) {
            ManagedObject.prototype.constructor.call(this);
            this.spreadsheetUploadController = spreadsheetUploadController;
            this.component = component;
            this.componentI18n = componentI18n;
            this.util = new Util(componentI18n.getResourceBundle());
            this.previewHandler = new Preview(this.util);
            this.optionsHandler = new OptionsDialog(spreadsheetUploadController);
            this.messageHandler = messageHandler;
        },
        createSpreadsheetUploadDialog: async function _createSpreadsheetUploadDialog() {
            if (!this.spreadsheetUploadDialog) {
                this.spreadsheetOptionsModel = new JSONModel({
                    dataRows: 0,
                    strict: this.component.getStrict(),
                    hidePreview: this.component.getHidePreview(),
                    showOptions: this.component.getShowOptions()
                });
                this.spreadsheetUploadDialog = await Fragment.load({
                    name: 'cc.spreadsheetimporter.v0_26_1.fragment.SpreadsheetUpload',
                    type: 'XML',
                    controller: this
                });
                this.spreadsheetUploadDialog.setComponent(this.component);
                this.spreadsheetUploadDialog.setBusyIndicatorDelay(0);
                this.spreadsheetUploadDialog.setModel(this.componentI18n, 'i18n');
                this.spreadsheetUploadDialog.setModel(this.spreadsheetOptionsModel, 'info');
                this.spreadsheetUploadDialog.setModel(this.component.getModel('device'), 'device');
                this.spreadsheetUploadDialog.attachDecimalSeparatorChanged(this.onDecimalSeparatorChanged.bind(this));
                this.spreadsheetUploadDialog.attachAvailableOptionsChanged(this.onAvailableOptionsChanged.bind(this));
            }
            if (this.component.getStandalone() && this.component.getColumns().length === 0) {
                this.spreadsheetUploadDialog.getSubHeader().setVisible(false);
                this.spreadsheetUploadDialog.getSubHeader().getContentLeft()[0].setVisible(false);
            }
        },
        onFileUpload: async function _onFileUpload(event) {
            try {
                this.messageHandler.setMessages([]);
                const file = event.getParameter('files')[0];
                const workbook = await this._readWorkbook(file);
                const isStandalone = this.component.getStandalone();
                const readAllSheets = this.component.getReadAllSheets();
                let spreadsheetSheetsData = [];
                let columnNames = [];
                if (isStandalone && readAllSheets) {
                    for (const sheetName of Object.keys(workbook.Sheets)) {
                        let currSheetData = SheetHandler.sheet_to_json(workbook.Sheets[sheetName]);
                        for (const dataVal of currSheetData) {
                            Object.keys(dataVal).forEach(key => {
                                dataVal[key].sheetName = sheetName;
                            });
                        }
                        spreadsheetSheetsData = spreadsheetSheetsData.concat(currSheetData);
                        columnNames = columnNames.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 })[0]);
                    }
                } else {
                    const sheetName = workbook.SheetNames[0];
                    spreadsheetSheetsData = SheetHandler.sheet_to_json(workbook.Sheets[sheetName]);
                    columnNames = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 })[0];
                }
                if (!spreadsheetSheetsData || spreadsheetSheetsData.length === 0) {
                    throw new Error(this.util.geti18nText('emptySheet'));
                }
                for (const object of spreadsheetSheetsData) {
                    for (const key in object) {
                        object[key].rawValue = typeof object[key].rawValue === 'string' ? object[key].rawValue.trim() : object[key].rawValue;
                    }
                }
                if (!isStandalone) {
                    this.messageHandler.checkFormat(spreadsheetSheetsData);
                    this.messageHandler.checkMandatoryColumns(spreadsheetSheetsData, columnNames, this.spreadsheetUploadController.odataKeyList, this.component.getMandatoryFields(), this.spreadsheetUploadController.typeLabelList);
                    this.messageHandler.checkColumnNames(columnNames, this.component.getFieldMatchType(), this.spreadsheetUploadController.typeLabelList);
                }
                this.spreadsheetUploadController.payload = spreadsheetSheetsData;
                this.component.fireCheckBeforeRead({ sheetData: spreadsheetSheetsData });
                this.spreadsheetUploadController.payloadArray = isStandalone ? this.spreadsheetUploadController.payload : Parser.parseSpreadsheetData(this.spreadsheetUploadController.payload, this.spreadsheetUploadController.typeLabelList, this.component, this.messageHandler, this.util, this.spreadsheetUploadController.isODataV4);
                if (this.messageHandler.areMessagesPresent()) {
                    this.messageHandler.displayMessages();
                    return;
                }
                this.setDataRows(this.spreadsheetUploadController.payloadArray.length);
            } catch (error) {
                Util.showError(error, 'SpreadsheetUpload.ts', 'onFileUpload');
                this.resetContent();
            }
        },
        onUploadSet: async function _onUploadSet(event) {
            const isDefaultNotPrevented = this.component.fireUploadButtonPress({
                payload: this.spreadsheetUploadController.payloadArray,
                rawData: this._extractRawValues(this.spreadsheetUploadController.payloadArray),
                parsedData: this._extractParsedValues(this.spreadsheetUploadController.payloadArray)
            });
            if (!isDefaultNotPrevented || this.component.getStandalone()) {
                this.onCloseDialog();
                return;
            }
            if (!this.spreadsheetUploadController.payloadArray.length) {
                MessageToast.show(this.util.geti18nText('selectFileUpload'));
                return;
            }
            var that = this;
            const source = event.getSource();
            const sourceParent = source.getParent();
            sourceParent.setBusyIndicatorDelay(0);
            sourceParent.setBusy(true);
            await Util.sleep(50);
            var fnAddMessage = function () {
                return new Promise((fnResolve, fnReject) => {
                    that.spreadsheetUploadController.getODataHandler().callOdata(fnResolve, fnReject, that.spreadsheetUploadController);
                });
            };
            var mParameters = {
                busy: {
                    set: true,
                    check: false
                },
                dataloss: {
                    popup: false,
                    navigation: false
                },
                sActionLabel: this.util.geti18nText('uploadingFile')
            };
            if (this.spreadsheetUploadController.isODataV4) {
                await this.spreadsheetUploadController.context.editFlow.securedExecution(fnAddMessage, mParameters);
            } else {
                try {
                    if (this.spreadsheetUploadController.context.extensionAPI) {
                        await this.spreadsheetUploadController.context.extensionAPI.securedExecution(fnAddMessage, mParameters);
                    } else {
                        await fnAddMessage();
                    }
                } catch (error) {
                    Log.error('Error while calling the odata service', error, 'SpreadsheetUpload: onUploadSet');
                    this.resetContent();
                }
            }
            sourceParent.setBusy(false);
            this.onCloseDialog();
        },
        openSpreadsheetUploadDialog: function _openSpreadsheetUploadDialog() {
            this.spreadsheetUploadDialog.open();
        },
        onCloseDialog: function _onCloseDialog() {
            this.resetContent();
            this.spreadsheetUploadDialog.close();
        },
        onDecimalSeparatorChanged: function _onDecimalSeparatorChanged(event) {
            this.component.setDecimalSeparator(event.getParameter('decimalSeparator'));
        },
        onAvailableOptionsChanged: function _onAvailableOptionsChanged(event) {
            const availableOptions = event.getParameter('availableOptions');
            if (availableOptions.length > 0) {
                this.component.setShowOptions(true);
                this.spreadsheetOptionsModel.setProperty('/showOptions', true);
            } else {
                this.component.setShowOptions(false);
                this.spreadsheetOptionsModel.setProperty('/showOptions', true);
            }
            this.component.setAvailableOptions(availableOptions);
        },
        resetContent: function _resetContent() {
            this.spreadsheetUploadDialog.getModel('info').setProperty('/dataRows', 0);
            var fileUploader = this.spreadsheetUploadDialog.getContent()[0].getItems()[1];
            fileUploader.setValue();
        },
        setDataRows: function _setDataRows(length) {
            this.spreadsheetUploadDialog.getModel('info').setProperty('/dataRows', length);
        },
        getDialog: function _getDialog() {
            return this.spreadsheetUploadDialog;
        },
        showPreview: async function _showPreview() {
            this.previewHandler.showPreview(this.spreadsheetUploadController.getPayloadArray());
        },
        onTempDownload: function _onTempDownload() {
            let fieldMatchType = this.component.getFieldMatchType();
            var worksheet = {};
            let colWidths = [];
            let sampleData = this.component.getSampleData();
            if (!sampleData || sampleData.length === 0) {
                sampleData = [{}];
            }
            const colWidthDefault = 15;
            const colWidthDate = 20;
            let col = 0;
            let rows = 1;
            if (this.component.getStandalone()) {
                for (let column of this.component.getColumns()) {
                    worksheet[XLSX.utils.encode_cell({
                        c: col,
                        r: 0
                    })] = {
                        v: column,
                        t: 's'
                    };
                    col++;
                }
            } else {
                for (let [key, value] of this.spreadsheetUploadController.typeLabelList.entries()) {
                    let cell = {
                        v: '',
                        t: 's'
                    };
                    let label = '';
                    if (fieldMatchType === 'label') {
                        label = value.label;
                    }
                    if (fieldMatchType === 'labelTypeBrackets') {
                        label = `${ value.label }[${ key }]`;
                    }
                    worksheet[XLSX.utils.encode_cell({
                        c: col,
                        r: 0
                    })] = {
                        v: label,
                        t: 's'
                    };
                    for (const [index, data] of sampleData.entries()) {
                        let sampleDataValue;
                        rows = index + 1;
                        if (data[key]) {
                            sampleDataValue = data[key];
                        }
                        if (value.type === 'Edm.Boolean') {
                            cell = {
                                v: sampleDataValue ? sampleDataValue.toString() : 'true',
                                t: 'b'
                            };
                            colWidths.push({ wch: colWidthDefault });
                        } else if (value.type === 'Edm.String') {
                            let newStr;
                            if (value.maxLength) {
                                newStr = sampleDataValue ? sampleDataValue : 'test string'.substring(0, value.maxLength);
                            } else {
                                newStr = sampleDataValue ? sampleDataValue : 'test string';
                            }
                            cell = {
                                v: newStr,
                                t: 's'
                            };
                            colWidths.push({ wch: colWidthDefault });
                        } else if (value.type === 'Edm.DateTimeOffset' || value.type === 'Edm.DateTime') {
                            let format;
                            const currentLang = sap.ui.getCore().getConfiguration().getLanguage();
                            if (currentLang.startsWith('en')) {
                                format = 'mm/dd/yyyy hh:mm AM/PM';
                            } else {
                                format = 'dd.mm.yyyy hh:mm';
                            }
                            cell = {
                                v: sampleDataValue ? sampleDataValue : new Date(),
                                t: 'd',
                                z: format
                            };
                            colWidths.push({ wch: colWidthDate });
                        } else if (value.type === 'Edm.Date') {
                            cell = {
                                v: sampleDataValue ? sampleDataValue : new Date(),
                                t: 'd'
                            };
                            colWidths.push({ wch: colWidthDefault });
                        } else if (value.type === 'Edm.TimeOfDay' || value.type === 'Edm.Time') {
                            cell = {
                                v: sampleDataValue ? sampleDataValue : new Date(),
                                t: 'd',
                                z: 'hh:mm'
                            };
                            colWidths.push({ wch: colWidthDefault });
                        } else if (value.type === 'Edm.UInt8' || value.type === 'Edm.Int16' || value.type === 'Edm.Int32' || value.type === 'Edm.Integer' || value.type === 'Edm.Int64' || value.type === 'Edm.Integer64') {
                            cell = {
                                v: sampleDataValue ? sampleDataValue : 85,
                                t: 'n'
                            };
                            colWidths.push({ wch: colWidthDefault });
                        } else if (value.type === 'Edm.Double' || value.type === 'Edm.Decimal') {
                            const decimalSeparator = this.component.getDecimalSeparator();
                            cell = {
                                v: sampleDataValue ? sampleDataValue : `123${ decimalSeparator }4`,
                                t: 'n'
                            };
                            colWidths.push({ wch: colWidthDefault });
                        }
                        if (!this.component.getHideSampleData()) {
                            worksheet[XLSX.utils.encode_cell({
                                c: col,
                                r: rows
                            })] = cell;
                        }
                    }
                    col++;
                }
            }
            worksheet['!ref'] = XLSX.utils.encode_range({
                s: {
                    c: 0,
                    r: 0
                },
                e: {
                    c: col,
                    r: sampleData.length
                }
            });
            worksheet['!cols'] = colWidths;
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, worksheet, 'Tabelle1');
            XLSX.writeFile(wb, this.component.getSpreadsheetFileName());
            MessageToast.show(this.util.geti18nText('downloadingTemplate'));
        },
        onOpenOptionsDialog: function _onOpenOptionsDialog() {
            this.optionsHandler.openOptionsDialog();
        },
        _readWorkbook: async function _readWorkbook(file) {
            return new Promise(async (resolve, reject) => {
                try {
                    const data = await this.buffer_RS(file.stream());
                    let workbook = XLSX.read(data, {
                        cellNF: true,
                        cellDates: true,
                        cellText: true,
                        cellFormula: true
                    });
                    resolve(workbook);
                } catch (error) {
                    Log.error('Error while reading the uploaded workbook', error, 'SpreadsheetUpload: _readWorkbook');
                    reject(error);
                }
            });
        },
        buffer_RS: async function _buffer_RS(stream) {
            const buffers = [];
            const reader = stream.getReader();
            for (;;) {
                const res = await reader.read();
                if (res.value)
                    buffers.push(res.value);
                if (res.done)
                    break;
            }
            const out = new Uint8Array(buffers.reduce((acc, v) => acc + v.length, 0));
            let off = 0;
            for (const u8 of buffers) {
                out.set(u8, off);
                off += u8.length;
            }
            return out;
        },
        _extractRawValues: function _extractRawValues(data) {
            return data.map(item => {
                const newObj = {};
                for (const key in item) {
                    if (item[key].hasOwnProperty('rawValue')) {
                        newObj[key] = item[key].rawValue;
                    }
                }
                return newObj;
            });
        },
        _extractParsedValues: function _extractParsedValues(data) {
            return data.map(item => {
                const newObj = {};
                for (const key in item) {
                    if (item[key].hasOwnProperty('formattedValue')) {
                        newObj[key] = item[key].formattedValue;
                    }
                }
                return newObj;
            });
        }
    });
    return SpreadsheetUploadDialog;
});