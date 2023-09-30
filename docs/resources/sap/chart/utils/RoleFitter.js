/*!
 * SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/viz/ui5/data/DimensionDefinition","sap/viz/ui5/data/MeasureDefinition","sap/viz/ui5/controls/common/feeds/FeedItem","sap/viz/ui5/controls/common/feeds/AnalysisObject","sap/chart/TimeUnitType","sap/chart/data/TimeDimension","sap/chart/utils/DateFormatUtil","sap/chart/utils/ChartUtils","sap/chart/utils/RoleMapper","sap/chart/ChartLog","sap/ui/model/type/String","sap/ui/thirdparty/jquery"],function(e,t,i,n,a,r,s,o,u,c,l,jQuery){"use strict";var f=function(){return sap.viz.vizservices.BVRService.suggestFeeds.apply(null,arguments)};var d=function(e,t){var i=sap.viz.vizservices.FeedService.validate(e,t);if(!i.valid){var n=i.results?i.results.bindings:null;if(n&&Object.keys(n).every(function(e){return n[e].allowMND&&(!n[e].missing||n[e].missing===1)&&!n[e].incorrect})){return{valid:true}}}return i};var m=[{types:"*",toViz:{"category|category2":"categoryAxis",series:"color","axis1|axis2|axis3|axis4":"valueAxis"}},{types:"column|bar|stacked_bar|stacked_column|line|combination|100_stacked_bar|100_stacked_column|stacked_combination|horizontal_stacked_combination",toViz:{}},{types:"scatter|bubble|time_bubble|timeseries_scatter|timeseries_bubble",toViz:{"category|category2":"@context",axis1:"valueAxis",axis2:"valueAxis2"}},{types:"bubble|time_bubble",toViz:{axis3:"bubbleWidth"}},{types:"pie|donut|100_donut",toViz:{"category|series|category2":"color","axis1|axis2|axis3|axis4":"size"}},{types:"bullet|vertical_bullet",toViz:{"axis1|axis2|axis3|axis4":"@semanticBulletMsrs"}},{types:"dual_combination|dual_horizontal_combination|dual_stacked_bar|100_dual_stacked_bar|dual_stacked_column|100_dual_stacked_column|dual_bar|dual_column|dual_line|dual_stacked_combination|dual_horizontal_stacked_combination",toViz:{axis1:"valueAxis","axis2|axis3|axis4":"valueAxis2"}},{types:"timeseries_line|timeseries_column|timeseries_combination|timeseries_stacked_column|timeseries_100_stacked_column",toViz:{category:"timeAxis"}},{types:"timeseries_scatter",toViz:{category:u,"axis2|axis3":false}},{types:"timeseries_bubble",toViz:{category:u,axis2:false,axis3:"bubbleWidth"}},{types:"dual_timeseries_combination",toViz:{category:"timeAxis",axis1:"valueAxis","axis2|axis3|axis4":"valueAxis2"}},{types:"heatmap",toViz:{category:"categoryAxis","category2|series":"categoryAxis2","axis1|axis2|axis3|axis4":"color"}},{types:"waterfall|horizontal_waterfall",toViz:{series:"waterfallType"}},{types:"timeseries_bullet",toViz:{"category|series":"timeAxis","axis1|axis2|axis3|axis4":"@semanticBulletMsrs"}},{types:"timeseries_waterfall",toViz:{"category|series":"timeAxis"}}].reduce(function(e,t){var i=Object.keys(t.toViz).reduce(function(e,i){i.split("|").forEach(function(n){e[n]=t.toViz[i];return e});return e},{});t.types.split("|").forEach(function(t){if(!e.hasOwnProperty(t)){e[t]=[]}e[t].push(i)});return e},{});var p=Object.keys(m).reduce(function(e,t){if(t!=="*"){e[t]=jQuery.extend.apply(null,[true,{}].concat(m["*"].concat(m[t])))}return e},{});function v(e,t,i){var n=typeof t==="function"?t:function(e){return e[t]};return e.reduce(function(e,t){var a=n(t),r=typeof i==="function"?i(t):t;if(a&&!e[a]){e[a]=[r]}else if(a){e[a].push(r)}return e},{})}function _(e,t){var i={},n;t.forEach(function(t){var a=t._sFixedRole||t.getRole();if(e.hasOwnProperty(a)){var r=e[a];if(r){if(typeof r==="function"){if(!n){n=new r}r=n.toFeedingId(t)}if(!i[r]){i[r]=[]}i[r].push(t)}}});return i}var g={from:i.fromLightWeightFmt,build:function(e){var t=[];jQuery.each(e.dims,function(e,i){t.push({id:e,type:"Dimension",values:i.map(y("Dimension"))})});jQuery.each(e.msrs,function(e,i){t.push({id:e,type:"Measure",values:i.map(y("Measure"))})});return t}};function y(e){return function(t){var i=t.getName();if(i==="MND"){return{id:"MND",type:"MND"}}var n={id:i,name:i,type:e};if(t instanceof r){n.dataType="Date"}return n}}function b(t,i){var n=t.getName(),a=t.getLabel(),o=t.getTextProperty(),u=t.getTextFormatter(),c=t.getDisplayText();var f={identity:n,name:a||n,value:"{"+n+"}"};if(typeof u==="function"){f.displayValue={formatter:u,parts:[{path:n,type:new l}]};if(o){f.displayValue.parts.push({path:o,type:new l})}}else if(c&&o){f.displayValue="{"+o+"}"}var d=new e(f);if(i&&t instanceof r){var m=s.getInstance(t.getTimeUnit());if(m){var p=m.parse.bind(m);var v=t._getIsUTC();d.getBindingInfo("value").formatter=function(e){return p(e,v)}}d.setDataType("Date");d._setTimeUnit(t.getTimeUnit())}return d}function x(e){var i=e.getName();var n=new t({identity:i,name:e.getLabel()||i,value:"{"+i+"}"});n._setUnitBinding(e.getUnitBinding());return n}function h(e,t){var i=sap.viz.api.metadata.Viz.get("info/"+e),n=v(i.bindings,"role"),a=v(t,"id"),r=n["layout.category"]||[],s=n["mark.color"]||[];if(r.length===0){return[]}else{var o=[];jQuery.each(r.concat(s),function(e,t){var i=a[t.id];if(i&&i.length>0){jQuery.each(i[0].values,function(e,t){o.push(t.id)})}});return o}}function z(e){return o.CONFIG.timeChartTypes.indexOf(e)>-1}function k(e){return e&&e.indexOf("bullet")>-1}function T(e){jQuery.each(e,function(e,t){if(t&&(t.getSemantics&&t.getSemantics()!=="actual"||t.getSemanticallyRelatedMeasures&&!jQuery.isEmptyObject(t.getSemanticallyRelatedMeasures()))){new c("error","Semantic Pattern"," Semantic pattern rule defined in invisible measures doesn't work.").display()}})}function D(e,t,i,n,a){var r=p[e];var s={dims:_(r,t),msrs:_(r,i)};if(k(e)){s.invisibleMsrs=a}else{T(a)}var l=null,f=null;if(s.dims["@context"]){l=s.dims["@context"];delete s.dims["@context"]}var d=false;if(!n){if(u.semantics.hasSemanticMeasures(s)){var m;if(o.CONFIG.nonSemanticPatternChartType.indexOf(e)===-1){m=new c("error","Semantic Pattern","Semantic pattern doesn't work when there is dataPointStyle or seriesStyle defined.");d=true}else{m=new c("error","Semantic Pattern",e+" doesn't support semantic pattern feature.");d=true}m.display()}}f=u.semantics.semanticPatternMsrs(s,e,d);l=(l||[]).concat(f.contexts);var v=g.build(s);v.contexts=l;v.semanticTuples=f.semanticTuples;return v}var V=[{chartTypes:"bar,column,line,combination,heatmap,bullet,vertical_bullet,stacked_bar,stacked_column,stacked_combination,horizontal_stacked_combination,dual_bar,dual_column,dual_line,dual_stacked_bar,dual_stacked_column,dual_combination,dual_horizontal_combination,dual_stacked_combination,dual_horizontal_stacked_combination,100_stacked_bar,100_stacked_column,100_dual_stacked_bar,100_dual_stacked_column,waterfall,horizontal_waterfall".split(","),feed:"categoryAxis"},{chartTypes:"donut,100_donut,pie,scatter,bubble".split(","),feed:"color"}];function w(e,t,i){var n,a;for(n=0;n<V.length;n++){if(V[n].chartTypes.indexOf(e)!==-1){a=V[n].feed;break}}var r=t.some(function(e){return e.id===a});if(!r){var s=f("info/"+e,t,[{id:"MND",type:"MND"}]).feedItems;t.splice(0,t.length);s.forEach(function(e){if(e.values.length>0){t.push(e)}});t=j(e,t)}for(n=0;n<t.length;n++){if(t[n].id===a&&t[n].type==="Dimension"){t[n].values=t[n].values.concat(i.map(function(e){return{id:e.getName(),name:e.getName(),type:"Dimension",inResult:true}}))}}return d("info/"+e,t)}function N(e){e.forEach(function(e){e._sFixedRole=e.getRole()})}function M(e,t,i){t.forEach(function(t){t.values.forEach(function(n){var a=i.filter(function(e){return e.getName()===n.id})[0];if(a){jQuery.each(p[e],function(e,i){if(i===t.id){a._sFixedRole=e;return false}})}})})}function O(e,t){var i=true;if(e.indexOf("timeseries_bullet")>-1){i=t.length>1&&t.every(function(e){return e.actual&&e.reference||e.projected&&e.reference})}else if(e.indexOf("timeseries_combination")>-1){i=t.length>0&&t.some(function(e){return e.projected||e.reference})}return i}function A(e,t,i,n,a,r,s){var o=t.concat(i).concat(n);N(o);var u=D(e,t,i,a,r);e=e.indexOf("donut")>-1?"donut":e;var c=d("info/"+e,u);var l=u.contexts,f=u.semanticTuples,m=[];if(!c.valid){if(e.indexOf("dual_timeseries_combination")>-1){u.contexts=[]}u=E(e,c,u,t,i);c=d("info/"+e,u);M(e,u,o);if(a){if(O(e,f)){u=D(e,t,i,a,r);l=u.contexts;f=u.semanticTuples}}}else{M(e,u,o)}if(f){m=f.filter(function(e){return e.projectedValueStartTime})}if(c.valid&&n&&n.length>0){var p=v(t,function(e){return e.getName()});w(e,u,n.filter(function(e){return!p[e.getName()]}))}var _=u.reduce(function(e,t){t.values.forEach(function(t){e[t.id]=true});return e},{});var y=g.from(u);if(l){l.forEach(function(e){_[e.getName()]=true});y._context=l.map(function(e){var t=e.getName();var i=true;for(var n=0;n<m.length;n++){if(t===m[n].actual||t===m[n].projected){i=false;break}}return{id:t,showInTooltip:i}})}y._unused=F(u,t,i).filter(function(e){return!_[e]});y._def=I(t,c.valid?n:[],i,_,f,z(e));if(s){y._def.dim.forEach(function(e){e.setBindingContext(null)});y._def.msr.forEach(function(e){e.setBindingContext(null)})}y._order=h(e,u);y._valid=c.valid;y._semanticTuples=f;return y}function S(e){return v(sap.viz.api.metadata.Viz.get("info/"+e).bindings,"id")}function j(e,t,i){i=i||S(e);t.forEach(function(e){e.type=i[e.id][0].type});return t}function E(e,t,i,n,a){var r=S(e),s=false,o=false;var u=t.results.bindings;Object.keys(u).forEach(function(e){if(!r[e]){return}if(r[e][0].type==="Measure"){o=true}if(r[e][0].type==="Dimension"&&!(u[e].allowMND&&(!u[e].missing||u[e].missing===1))){s=true}});var c=i.filter(function(e){return!(e.type==="Dimension"?s:o)}),l=c.reduce(function(e,t){(t.values||[]).forEach(function(t){e[t.id]=true});return e},{});if(i.contexts){i.contexts.forEach(function(e){l[e.getName()]=true})}var d=n.map(y("Dimension")),m=a.map(y("Measure"));var p=f("info/"+e,c,d.concat(m).filter(function(e){return!l[e.id]})).feedItems;j(e,p,r);return p}function F(e,t,i){var n=e.reduce(function(e,t){t.values.forEach(function(t){e[t.id]=true});return e},{});return t.concat(i).filter(function(e){return!n[e.getName()]}).map(function(e){return e.getName()})}function I(e,i,n,a,o,u){var c;if(u){var l;for(var f=0;f<e.length;f++){if(e[f]instanceof r){l=e[f];break}}c=s.getInstance(l.getTimeUnit())}return{dim:e.reduce(function(e,t){if(a[t.getName()]){e.push(b(t,u))}return e},[]).concat(i.map(function(e){var t=b(e);t._setInResult(true);return t})),msr:n.reduce(function(e,t){if(a[t.getName()]){e.push(x(t))}return e},[]).concat((o||[]).reduce(function(e,i){if(i.timeAxis&&i.projectedValueStartTime){e.push(new t({identity:i.actual+"-"+i.projected,name:(i.labels&&i.labels.actual||i.actual)+"-"+(i.labels&&i.labels.projected||i.projected),value:{parts:[i.timeAxis,i.actual,i.projected],formatter:function(e){var t=e,n;if(e&&e.length>1){var a=e[0];if(a){if(c){var r=c.parse(a);if(r){n=r.getTime()}}else{n=new Date(a).getTime()}if(n&&n<i.projectedValueStartTime){t=e[1]}else{t=e[2]}}}return t}}}))}return e},[]))}}return{fit:A,compatible:function(e,t,i){var n="info/"+e,a={used:{},error:null,compatible:true};var r=D(e,t,i),s=d(n,r);if(!s.valid){r=E(e,s,r,t,i);s=d(n,r);a.needFix=true}if(s.valid){a.used=v(r,function(e){return e.type},function(e){return e.values.filter(function(e){return e.type==="Dimension"||e.type==="Measure"}).map(function(e){return e.id})});jQuery.each(a.used,function(e,t){a.used[e]=t.reduce(function(e,t){return e.concat(t)},[])})}else{a.compatible=false;var o=sap.viz.api.metadata.Viz.get(n).bindings,u=v(o,"type",function(e){return e.id}),c={dim:0,msr:0,time:0};jQuery.each(s.results.bindings,function(e,t){if(!t.missing){return}if(u.Dimension.indexOf(e)!==-1&&!(t.allowMND&&t.missing===1)){c[e==="timeAxis"?"time":"dim"]+=t.missing}else if(u.Measure.indexOf(e)!==-1){c.msr+=t.missing}});a.error={missing:c}}return a}}});
//# sourceMappingURL=RoleFitter.js.map