sap.ui.define(["sap/ui/base/Object","sap/suite/ui/generic/template/AnalyticalListPage/util/V4Terms","sap/ui/core/Locale","sap/ui/core/format/NumberFormat","sap/ui/model/FilterOperator","sap/suite/ui/generic/template/genericUtilities/FeLogger"],function(e,t,i,r,a,n){"use strict";var s=new n("AnalyticalListPage.util.KpiUtil").getLogger();var u=e.extend("sap.suite.ui.generic.template.AnalyticalListPage.util.KpiUtil");u.getNumberValue=function(e){if(e){var t=Object.keys(e)[0];return e&&t&&["String","Int","Decimal","Double","Single"].indexOf(t)!==-1?Number(e[t]):undefined}};u.getBooleanValue=function(e,t){if(e&&e.Bool){if(e.Bool.toLowerCase()==="true"){return true}else if(e.Bool.toLowerCase()==="false"){return false}}return t};u.getPrimitiveValue=function(e){var t;if(e){if(e.String!==undefined){t=e.String;t=t.indexOf(">")>0?t.split("{")[1].split("}")[0]:t}else if(e.Bool){t=u.getBooleanValue(e)}else if(e.EnumMember){t=e.EnumMember.split("/")[1]}else{t=u.getNumberValue(e)}}return t};u.getPathOrPrimitiveValue=function(e){if(e){return e.Path?"{path:'"+e.Path+"'}":u.getPrimitiveValue(e)}else{return""}};u.isBindingValue=function(e){return typeof e==="string"&&e.charAt(0)==="{"};u.getNumberFormatter=function(e,t,i){var a=r.getIntegerInstance({style:"short",minFractionDigits:0,maxFractionDigits:i,showScale:e,shortRefNumber:t});return a};u.determineThousandsRefNumber=function(e){var t=e;if(e>=1e3){var i=0;while(t>=1e3){t/=1e3;i++}return i==0?undefined:i*1e3}else{return undefined}};u.formatNumberForPresentation=function(e,t,a){var n=Number(e);var s=sap.ui.getCore().getConfiguration().getLanguage();var u=new i(s);var o=r.getFloatInstance({style:a?undefined:"short",showScale:a?undefined:true,minFractionDigits:0,maxFractionDigits:1,decimals:t},u).format(n);return o};u.getUnitofMeasure=function(e,t){return t&&(t["Org.OData.Measures.V1.ISOCurrency"]||t["Org.OData.Measures.V1.Unit"])?t["Org.OData.Measures.V1.ISOCurrency"]||t["Org.OData.Measures.V1.Unit"]:""};u.isRelative=function(e){var t=e.TrendCalculation;var i=false;if(t){var r=t.IsRelativeDifference.DefaultValue;i=u.getBooleanValue(t.IsRelativeDifference,r?{true:true,false:false}[r.toLowerCase()]:false)}return i};u.getFilter=function(e,i,r){var n;if(!r){n={path:i.PropertyName.PropertyPath,operator:e.Option.EnumMember.split("/")[1],value1:e.Low.String,value2:e.High?e.High.String:"",sign:e.Sign.EnumMember===t.SelectionRangeSignType+"/I"?"I":"E"}}else{n={path:r,operator:e.Option,value1:e.Low,value2:e.High,sign:e.Sign}}if(n.sign==="E"&&n.operator!==a.EQ){s.error("Exclude sign is supported only with EQ operator");return}else{if(n.sign==="E"&&n.operator===a.EQ){n.operator=a.NE;n.sign="I"}}if(n.operator==="CP"&&!i){var u=a.Contains;var o=n.value1;if(o){var l=o.indexOf("*");var g=o.lastIndexOf("*");if(l>-1){if(l===0&&g!==o.length-1){u=a.EndsWith;o=o.substring(1,o.length)}else if(l!==0&&g===o.length-1){u=a.StartsWith;o=o.substring(0,o.length-1)}else{o=o.substring(1,o.length-1)}}}n.operator=u;n.value1=o}return n};u.updateKpiList=function(e,t){try{var i=this.getKpiList(e.getModelName(),e.getGroupId(),e.getId());i.bProcessed=t}catch(t){s.error("KPI processing failed: "+e.getId()+" : "+t)}};u.addToKpiList=function(e,t){try{var i,r,a;r=e.modelName;i=e.groupId||t.getGroupId();a=e.id;this.oKpiList=this.oKpiList||{};var n=this.oKpiList[r]=this.oKpiList[r]||{};n[i]=n[i]||{};n[i][a]={bProcessed:false}}catch(e){s.error("KPI processing failed: "+a+" : "+e)}};u.getKpiList=function(e,t,i){var r=this.oKpiList;if(e||e===""){r=r[e];if(t){r=r[t];if(i){r=r[i]}}}return r};return u},true);
//# sourceMappingURL=KpiUtil.js.map