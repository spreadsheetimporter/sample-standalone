/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/ui/core/Core","sap/ui/core/theming/Parameters","sap/m/IllustratedMessage","sap/m/Button"],function(t,a,e,r,n){"use strict";var i={};var o="";var u=parseFloat(t.BaseFontSize);i.measureText=function(){var t=.05;var r=document.createElement("canvas").getContext("2d");var n=function(){o=[parseFloat(e.get({name:"sapMFontMediumSize"})||"0.875rem")*u+"px",e.get({name:"sapUiFontFamily"})||"Arial"].join(" ");return o};a.attachThemeChanged(n);return function(a,e){r.font=e||o||n();return r.measureText(a||"").width/u+t}}();i.calcTypeWidth=function(){var t=0;var e=[2023,9,26,22,47,58,999];var r=new Date(Date.UTC.apply(0,e));var n=new(Function.prototype.bind.apply(Date,[null].concat(e)));var o={Byte:3,SByte:3,Int16:5,Int32:9,Int64:12,Single:6,Float:12,Double:13,Decimal:15,Integer:9};a.attachThemeChanged(function(){t=0});return function(e,u){var m=e.getMetadata().getName().split(".").pop();var s=u&&u.maxWidth||19;var l=u&&u.gap||0;var c=function(t){return Math.min(t+l,s)};if(m=="Boolean"){if(!t){var d=a.getLibraryResourceBundle("sap.ui.core");var h=i.measureText(d.getText("YES"));var p=i.measureText(d.getText("NO"));t=Math.max(h,p)}return c(t)}if(m=="String"||e.isA("sap.ui.model.odata.type.String")){var g=parseInt(e.getConstraints().maxLength)||0;if(!g||g*.25>s){return s}var v=i.measureText("A".repeat(g));if(g<s||s<10){return c(v)}var f=Math.log(v-s*.16)/Math.log(s/3)*(s/2)*Math.pow(s/19,1/v);return c(Math.min(f,v))}if(m.startsWith("Date")||m.startsWith("Time")){var T=e.getFormatOptions();var M=T.UTC?r:n;var x=M.toLocaleDateString();if(m=="TimeOfDay"){x=new Intl.DateTimeFormat("de",{hour:"numeric",minute:"numeric",second:"numeric"}).format(M);x=e.formatValue(x,"string")}else if(e.isA("sap.ui.model.odata.type.Time")){x=e.formatValue({__edmType:"Edm.Time",ms:r.valueOf()},"string")}else{x=e.formatValue(T.interval?[M,new Date(M*1.009)]:M,"string");(e.oFormat&&e.oFormat.oFormatOptions&&e.oFormat.oFormatOptions.pattern||"").replace(/[MELVec]{3,4}/,function(t){x+=t.length==4?"---":"-"})}return c(i.measureText(x))}if(o[m]){var y=parseInt(e.getConstraints().scale)||0;var W=parseInt(e.getConstraints().precision)||20;W=Math.min(W,o[m]);var C=2*Math.pow(10,W-y-1);C=e.formatValue(C,"string");return c(i.measureText(C))}return u&&u.defaultWidth||8}}();i.calcHeaderWidth=function(){var t="";var r=function(){if(!t){t=[e.get({name:"sapUiColumnHeaderFontWeight"})||"normal",o].join(" ")}return t};a.attachThemeChanged(function(){t=""});return function(t,a,e,n){var o=t.length;e=e||19;n=n||2;if(a>e){return e}if(n>o){return n}if(!a){return i.measureText(t,r())}a=Math.max(a,n);if(a>o){return a}var u=i.measureText(t,r());u=Math.min(u,e*.7);var m=Math.max(1,1-Math.log(Math.max(a-1.7,.2))/Math.log(e*.5)+1);var s=m*a;var l=Math.max(0,u-s);var c=l<.15?u:s+l*(1-1/a)/Math.E;return c}}();i.calcColumnWidth=function(t,a,e){if(!Array.isArray(t)){t=[t]}e=Object.assign({minWidth:2,maxWidth:19,defaultWidth:8,truncateLabel:true,padding:1,gap:0},e);var r=0;var n=Math.max(1,e.minWidth);var o=Math.max(n,e.maxWidth);var m=e.gap+t.reduce(function(t,a){var r=a,n={defaultWidth:e.defaultWidth,maxWidth:e.maxWidth};if(Array.isArray(a)){r=a[0];n=a[1]||n}var o=i.calcTypeWidth(r,n);return e.verticalArrangement?Math.max(t,o):t+o+(t&&.5)},0);if(a){r=i.calcHeaderWidth(a,e.truncateLabel?m:0,o,n);r+=e.headerGap?(8+14)/u:0}m=Math.max(n,m,r);m=Math.min(m,o);m=Math.round(m*100)/100;return m+e.padding+"rem"};i.getNoColumnsIllustratedMessage=function(e){var i=a.getLibraryResourceBundle("sap.m");var o=new r({illustrationType:t.IllustratedMessageType.AddColumn,title:i.getText("TABLE_NO_COLUMNS_TITLE"),description:i.getText("TABLE_NO_COLUMNS_DESCRIPTION")});if(e){var u=new n({icon:"sap-icon://action-settings",press:e});o.addAdditionalContent(u)}return o};return i});
//# sourceMappingURL=Util.js.map