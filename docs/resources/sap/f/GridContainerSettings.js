/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/dom/units/Rem","sap/base/Log"],function(e,t,i){"use strict";function n(e){if(e===null||e===undefined){return e}if(e===0||e==="0"){return 0}var n=e.match(/^(\d+(\.\d+)?)(px|rem)$/),r;if(n){if(n[3]==="px"){r=parseFloat(n[1])}else{r=t.toPx(parseFloat(n[1]))}}else{i.error("Css size '"+e+"' is not supported for some features in GridContainer. Only 'px' and 'rem' are supported.");r=NaN}return Math.ceil(r)}var r=e.extend("sap.f.GridContainerSettings",{metadata:{library:"sap.f",properties:{columns:{type:"int"},columnSize:{type:"sap.ui.core.CSSSize",defaultValue:"80px"},minColumnSize:{type:"sap.ui.core.CSSSize"},maxColumnSize:{type:"sap.ui.core.CSSSize"},rowSize:{type:"sap.ui.core.CSSSize",defaultValue:"80px"},gap:{type:"sap.ui.core.CSSSize",defaultValue:"16px"}}}});r.prototype.getColumnSizeInPx=function(){return n(this.getColumnSize())};r.prototype.getRowSizeInPx=function(){return n(this.getRowSize())};r.prototype.getGapInPx=function(){return n(this.getGap())};r.prototype.getComputedColumnsCount=function(e){if(this.getColumns()){return this.getColumns()}var t=this.getGapInPx(),i=this.getColumnSizeInPx();return Math.floor((e+t)/(i+t))};r.prototype.calculateRowsForItem=function(e){var t=this.getGapInPx(),i=this.getRowSizeInPx();return Math.ceil((e+t)/(i+t))};return r});
//# sourceMappingURL=GridContainerSettings.js.map