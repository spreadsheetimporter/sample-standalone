sap.ui.define(["sap/suite/ui/microchart/InteractiveDonutChart","sap/suite/ui/microchart/InteractiveDonutChartSegment","sap/ui/model/json/JSONModel","sap/suite/ui/generic/template/AnalyticalListPage/control/visualfilterbar/FilterItemMicroChart","sap/suite/ui/generic/template/AnalyticalListPage/util/CriticalityUtil","sap/suite/ui/generic/template/AnalyticalListPage/util/FilterUtil","sap/suite/ui/generic/template/js/StableIdHelper","sap/base/util/deepExtend"],function(e,t,i,a,s,l,r,n){"use strict";var u="__IS_OTHER__";var o=a.extend("sap.suite.ui.generic.template.AnalyticalListPage.control.visualfilterbar.FilterItemMicroDonut",{metadata:{properties:{labelWidthPercent:{type:"float",group:"Misc",defaultValue:1/2}},aggregations:{control:{type:"sap.suite.ui.microchart.InteractiveDonutChart",multiple:false}}},renderer:{}});o.prototype.init=function(){var t=this.getId()+"-innerChart";this._chart=new e({id:t,selectionEnabled:true,segments:[]});this.setControl(this._chart);this.setModel(new i,"__alp_chartJSONModel");this._otherField="__IS_OTHER__";this._sorters=[];a.prototype.init.apply(this,arguments)};o.prototype._applyDonutChartSelections=function(e,t){var i=this._chart.getSegments(),a=this.getParentProperty(),s=[],l,r;if(e.dimValue===u){i.forEach(function(e){l=e.getCustomData()[0].getValue();if(l!==u){if(e.getSelected()){s.push(l)}r={exclude:true,operation:"EQ"};r.keyField=a;r.value1=l;t.ranges.push(r)}});if(s.length>0){t.items=t.items.filter(function(e){return s.indexOf(e.key)===-1});t.ranges=t.ranges.filter(function(e){return!(e.exclude===false&&e.operation==="EQ"&&e.keyField===a&&s.indexOf(e.value1)>-1)})}}else{if(e.dimValue instanceof Date){t.ranges.push({exclude:false,keyField:this.getDimensionField(),operation:"EQ",value1:e.dimValue,value2:null})}else{t.items.push({key:e.dimValue,text:e.dimValueDisplay})}var n=false;i.forEach(function(e){l=e.getCustomData()[0].getValue();if(l===u&&e.getSelected()){n=true}if(l!==u){s.push(l)}});if(n){t.ranges=t.ranges.filter(function(e){return!(e.exclude===true&&e.operation==="EQ"&&e.keyField===a&&s.indexOf(e.value1)>-1)})}}return t};o.prototype._onDataReceived=function(e,i){var s=[],r=this.getDimensionFieldDisplay(),u=this.getMeasureField(),o=this.getDimensionField(),h=l.IsNavigationProperty(this.getModel(),this.getEntitySet(),r)?r.split("/"):null;if(!i){e.results.forEach(function(e,t){e["dimensionValue"]=e[o];s.push(e)})}else{var c=0,p=0;e.results.forEach(function(e,t){if(t<2){e["dimensionValue"]=e[o];s.push(e);c+=parseFloat(e[u])}});if(i){i.results.forEach(function(t){var i=this.getModel("i18n"),a=n({},t);a["dimensionValue"]=this._otherField;a[o]=this._otherField;if(this.getUnitField()){a[this.getUnitField()]=e.results.length>1?e.results[0][this.getUnitField()]:""}if(h&&h.length>0){a[h[0]]={};a[h[0]][h[1]]=i?i.getResourceBundle().getText("VIS_FILTER_DONUT_OTHER"):""}else{a[r]=i?i.getResourceBundle().getText("VIS_FILTER_DONUT_OTHER"):""}if(c<0){p=parseFloat(t[u])+c}else{p=parseFloat(t[u])-c}a[u]=p;s.push(a)}.bind(this))}}a.prototype._onDataReceived.call(this,s);this.getModel("__alp_chartJSONModel").setData(s);this._chart.setModel(this.getModel("__alp_chartJSONModel"));var d=3,g={path:"/",template:new t(this._getChartAggregationSettings("Donut")),startIndex:0,length:d};this._chart.bindSegments(g);this._chart.setBusy(false)};return o},true);
//# sourceMappingURL=FilterItemMicroDonut.js.map