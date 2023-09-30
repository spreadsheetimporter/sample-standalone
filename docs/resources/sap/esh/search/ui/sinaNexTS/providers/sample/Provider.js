/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["../../../UIUtil","../../core/errors","../../sina/UserCategoryDataSource","../AbstractProvider","./template","./template2"],function(e,t,r,a,i,n){function u(e){"@babel/helpers - typeof";return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u(e)}function s(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function o(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||false;a.configurable=true;if("value"in a)a.writable=true;Object.defineProperty(e,a.key,a)}}function l(e,t,r){if(t)o(e.prototype,t);if(r)o(e,r);Object.defineProperty(e,"prototype",{writable:false});return e}function c(e,t){if(typeof t!=="function"&&t!==null){throw new TypeError("Super expression must either be null or a function")}e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:true,configurable:true}});Object.defineProperty(e,"prototype",{writable:false});if(t)f(e,t)}function f(e,t){f=Object.setPrototypeOf||function e(t,r){t.__proto__=r;return t};return f(e,t)}function h(e){var t=m();return function r(){var a=g(e),i;if(t){var n=g(this).constructor;i=Reflect.construct(a,arguments,n)}else{i=a.apply(this,arguments)}return v(this,i)}}function v(e,t){if(t&&(typeof t==="object"||typeof t==="function")){return t}else if(t!==void 0){throw new TypeError("Derived constructors may only return object or undefined")}return d(e)}function d(e){if(e===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return e}function m(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true}catch(e){return false}}function g(e){g=Object.setPrototypeOf?Object.getPrototypeOf:function e(t){return t.__proto__||Object.getPrototypeOf(t)};return g(e)}var p=e["registerHandler"];var y=t["ForcedBySearchTermTestError"];var S=t["NotImplementedError"];var b=r["UserCategoryDataSource"];var C=a["AbstractProvider"];var F=i["createTemplate"];var I=n["createTemplate"];function O(e,t,r){if(r){return t?t(e):e}if(!e||!e.then){e=Promise.resolve(e)}return t?e.then(t):e}function R(e,t,r){if(r){return t?t(e()):e()}try{var a=Promise.resolve(e());return t?a.then(t):a}catch(e){return Promise.reject(e)}}var V=function(e){c(r,e);var t=h(r);function r(){var e;s(this,r);e=t.call(this);e.id="sample";return e}l(r,[{key:"initAsync",value:function e(t){var r=this;return R(function(){r.sina=t.sina;r.templateProvider=F;if(document.location.href.indexOf("use=sample1")>0){r.templateProvider=I}var e=r.templateProvider(r);e._init(e);var a=Promise.resolve({capabilities:r.sina._createCapabilities({fuzzy:false})});return O(a)})}},{key:"getSuggestionList",value:function e(t){var r=this._stringify(t);var a=new RegExp('"valueFormatted":"([^{/]+?)","valueHighlighted',"g");var i=r.match(a);var n=i.toString().split(" ");n=n.toString().split(",");i=i.concat(n);i=i.filter(function(e,t){if(e!==""){return i.indexOf(e)==t}});return i}},{key:"_stringify",value:function e(t){var r=[];var a=JSON.stringify(t,function(e,t){if(u(t)==="object"&&t!==null){if(r.indexOf(t)!==-1){return undefined}r.push(t)}return t});r=null;return a}},{key:"adjustImageViewing",value:function e(){var t,r,a;try{p("image-mouseenter",$(".sapUshellSearchResultListItem-Image"),"mouseenter",function(){t=$(this).clone();$("body").append(t);r=($(window).height()-$(t).outerHeight())*.33;a=($(window).width()-$(t).outerWidth())*.33;t.css({position:"absolute",top:r+"px",left:a+"px"}).show()});p("image-mouseleave",$(".sapUshellSearchResultListItem-Image"),"mouseleave",function(){t.remove()})}catch(e){}}},{key:"applyFilters",value:function e(t,r){var a=[];if(r.filter.rootCondition.conditions.length===0||r.filter.rootCondition.conditions[0].conditions.length===0){if(r.filter.dataSource instanceof b){var i=r.filter.dataSource.subDataSources;if(i){return t.filter(function(e){return i.find(function(t){return t.id===e.dataSource.id})})}}return t}var n=[];var u=[];for(var s=0;s<r.filter.rootCondition.conditions.length;s++){var o=r.filter.rootCondition.conditions[s].conditions;for(var l=0;l<o.length;l++){n.push([o[l].attribute,o[l].value]);u.push(o[l].attribute)}}var c=false;for(var f=0;f<t.length;f++){var h=t[f];var v=[];for(var d=0;d<n.length;d++){c=false;for(var m=0;m<h.detailAttributes.length;m++){var g=h.detailAttributes[m];if(g.id===n[d][0]&&g.value===n[d][1]){c=true}}for(var p=0;p<h.titleAttributes.length;p++){var y=h.titleAttributes[p];if(y.id===n[d][0]&&y.value===n[d][1]){c=true}}n[d][2]=c;v.push(c)}if(v.toString().match(/false/)===null){a.push(h)}else{var S=[];var C=u.filter(function(e,t){return u.indexOf(e)==t});for(var F=0;F<C.length;F++){c=false;var I=C[F];for(var O=0;O<n.length;O++){if(n[O][0]===I&&n[O][2]===true){c=true;break}}S.push(c)}if(S.toString().match(/false/)===null){a.push(h)}}}return a}},{key:"adjustHighlights",value:function e(t,r){var a=[];var i="";for(var n=0;n<t.length;n++){var u=t[n];var s=true;i="";u.titleHighlighted=this.addHighlight(u.title,r);if(u.titleHighlighted!==u.title){s=false}for(var o=0;o<u.detailAttributes.length;o++){var l=u.detailAttributes[o];i=l.metadata.type;if(i==="String"||i==="Integer"){l.valueHighlighted=this.addHighlight(l.valueFormatted,r);if(l.valueHighlighted!==l.valueFormatted){s=false}}}for(var c=0;c<u.titleAttributes.length;c++){var f=u.titleAttributes[c];i=f.metadata.type;if(i==="String"||i==="Integer"||i==="ImageUrl"){f.valueHighlighted=this.addHighlight(f.valueFormatted,r);if(f.valueHighlighted!==f.valueFormatted){s=false}}}if(s===false||r==="*"||r===""){a.push(u)}}return a}},{key:"addHighlight",value:function e(t,r){if(typeof t!=="string"||typeof r!=="string"){return t}var a=t.toLowerCase().indexOf(r.toLowerCase());if(a>-1){var i=a+r.length;var n=t.substring(0,a)+"<b>"+t.substring(a,i)+"</b>"+t.substring(i);return n}return t}},{key:"addSuvLinkToSearchResultItem",value:function e(t,r,a){var i=this.sina._createSuvNavTargetResolver();if(!r){r="/resources/sap/esh/search/ui/sinaNexTS/providers/sample/docs/folklorist_authors_and_publications.suv"}if(!a){a=[]}var n={};n.obj={suvThumbnailAttribute:t,suvTargetMimeTypeAttribute:{value:"application/vnd.sap.universal-viewer+suv"},suvTargetUrlAttribute:{value:r}};i.resolveSuvNavTargets(null,n,a)}},{key:"executeSearchQuery",value:function e(t){var r=this;return R(function(){r.searchQuery=t;return O(new Promise(function(e){var a;var i=r.templateProvider(r);var n=i.searchResultSetItemArray;var u=i.searchResultSetItemArray2;var s=n.concat(u);var o;if(i.searchResultSetItemArray3){o=i.searchResultSetItemArray3;s=s.concat(o)}var l=t.filter.searchTerm;var c=t.filter.dataSource.id;var f=t.filter.dataSource.type;var h=r.generateFacets(t);if(l===y.forcedBySearchTerm){throw new y}var v;if(c==="Scientists"||c==="Folklorists"){v=r.adjustHighlights(n,l);v=r.applyFilters(v,t);a=r.sina._createSearchResultSet({items:v,facets:h,query:t,title:"",totalCount:v.length})}else if(c==="Mysterious_Sightings"||c==="Urban_Legends"){v=r.adjustHighlights(u,l);v=r.applyFilters(v,t);a=r.sina._createSearchResultSet({items:v,facets:h,query:t,title:"",totalCount:v.length})}else if(c==="Publications"){v=r.adjustHighlights(o,l);v=r.applyFilters(v,t);a=r.sina._createSearchResultSet({items:v,facets:h,query:t,title:"",totalCount:v.length})}else if(c==="All"||f===r.sina.DataSourceType.UserCategory){h[0].items.forEach(function(e){e.measureValue=0;e.measureValueFormatted=""});v=r.adjustHighlights(n,l);v=r.applyFilters(v,t);var d=v.length;v=r.adjustHighlights(u,l);v=r.applyFilters(v,t);var m=v.length;var g=0;if(o){v=r.adjustHighlights(o,l);v=r.applyFilters(v,t);g=v.length}h[0].items[0].measureValue=d;h[0].items[0].measureValueFormatted=""+d;h[0].items[1].measureValue=m;h[0].items[1].measureValueFormatted=""+m;if(o&&h[0].items.length>2){h[0].items[2].measureValue=g;h[0].items[2].measureValueFormatted=""+g}h[0].items=h[0].items.filter(function(e){return e.measureValue>0});v=r.adjustHighlights(s,l);v=r.applyFilters(v,t);var p=[];for(var S=t.skip;S<t.skip+t.top&&S<v.length;S++){p.push(v[S])}a=r.sina._createSearchResultSet({items:p,facets:h,query:t,title:"",totalCount:v.length})}e(a)}))})}},{key:"executeHierarchyQuery",value:function e(t){throw new S}},{key:"executeSuggestionQuery",value:function e(t){var r=this;return R(function(){var e=t.filter.searchTerm;var a=r.templateProvider(r);var i=a.searchResultSetItemArray.concat(a.searchResultSetItemArray2).concat(a.searchResultSetItemArray3);var n=r.getSuggestionList(i);var u=n.filter(function(t){var r=new RegExp("^"+e,"gi");return t.match(r)});if(u.length===0){u=n}var s=[];var o=function e(a){var i=r.sina.SuggestionCalculationMode.Data;var n=t.filter.clone();n.setSearchTerm(a);return r.sina._createSearchTermSuggestion({searchTerm:a,calculationMode:i,filter:n,label:a})};for(var l=0;l<u.length;l++){s.push(o(u[l]))}var c=r.sina._createSuggestionResultSet({title:"Suggestions",query:t,items:s});return O(new Promise(function(e){e(c)}))})}},{key:"executeChartQuery",value:function e(t){var r=this;return R(function(){var e=r.generateFacets(t);var a=1;if(t.dimension==="LOCATION"||e.length===1){a=0}return O(new Promise(function(t){t(e[a])}))})}},{key:"getChartResultSetItemsForLocations",value:function e(t){var r=[];var a;var i=[];var n,u,s,o,l;for(u=0;u<t.length;u++){l=t[u].detailAttributes;for(s=0;s<l.length;s++){if(l[s].id==="LOCATION"){a=l[s].value;if(i.indexOf(a)===-1){i.push(a);n=this.sina._createChartResultSetItem({filterCondition:this.sina.createSimpleCondition({attribute:"LOCATION",operator:this.sina.ComparisonOperator.Eq,value:a}),dimensionValueFormatted:a,measureValue:1,measureValueFormatted:"1"});r.push(n)}else{for(o=0;o<r.length;o++){if(r[o].filterCondition.value===a){r[o].measureValue=r[o].measureValue+1;r[o].measureValueFormatted=""+r[o].measureValue}}}}}}return r}},{key:"getChartResultSetItemsForPublications",value:function e(t){var r=[];var a;var i=[];var n,u,s,o,l;for(u=0;u<t.length;u++){l=t[u].detailAttributes;for(s=0;s<l.length;s++){if(l[s].id==="PUBLICATION"){a=l[s].value;if(i.indexOf(a)===-1){i.push(a);n=this.sina._createChartResultSetItem({filterCondition:this.sina.createSimpleCondition({attribute:"PUBLICATION",operator:this.sina.ComparisonOperator.Eq,value:a}),dimensionValueFormatted:a,measureValue:1,measureValueFormatted:"1"});r.push(n)}else{for(o=0;o<r.length;o++){if(r[o].filterCondition.value===a){r[o].measureValue=r[o].measureValue+1;r[o].measureValueFormatted=""+r[o].measureValue}}}}}}return r}},{key:"getSientistOrFolkloristFacet",value:function e(t,r){var a;var i=[];var n,u,s,o,l,c;var f=[];for(u=0;u<r.length;u++){l=r[u].titleAttributes;if(t.filter.dataSource.id==="Mysterious_Sightings"||t.filter.dataSource.id==="Urban_Legends"||t.filter.dataSource.id==="Publications"){l=r[u].detailAttributes}for(s=0;s<l.length;s++){if(l[s].id==="SCIENTIST"||l[s].id==="FOLKLORIST"){a=l[s].value;c=l[s].id;if(i.indexOf(a)===-1){i.push(a);n=this.sina._createChartResultSetItem({filterCondition:this.sina.createSimpleCondition({attribute:l[s].id,operator:this.sina.ComparisonOperator.Eq,value:a}),dimensionValueFormatted:a,measureValue:1,measureValueFormatted:"1"});f.push(n)}else{for(o=0;o<f.length;o++){if(f[o].filterCondition.value===a){f[o].measureValue=f[o].measureValue+1;f[o].measureValueFormatted=""+f[o].measureValue}}}}}}return[f,c]}},{key:"getTopFacetOnly",value:function e(t){var r=t.filter.sina.allDataSource;var a=[this.sina._createDataSourceResultSetItem({dataSource:t.filter.sina.dataSources[1],dimensionValueFormatted:r.labelPlural,measureValue:4,measureValueFormatted:"4"}),this.sina._createDataSourceResultSetItem({dataSource:t.filter.sina.dataSources[2],dimensionValueFormatted:r.labelPlural,measureValue:5,measureValueFormatted:"5"})];if(t.filter.sina.dataSources[3]){a[2]=this.sina._createDataSourceResultSetItem({dataSource:t.filter.sina.dataSources[3],dimensionValueFormatted:r.labelPlural,measureValue:1,measureValueFormatted:"1"})}var i=[this.sina._createDataSourceResultSet({title:t.filter.dataSource.label,items:a,query:t})];return i}},{key:"generateFacets",value:function e(t){if(t.filter.dataSource.id==="All"||t.filter.dataSource.type===this.sina.DataSourceType.UserCategory){return this.getTopFacetOnly(t)}var r=[];var a;var i=this.templateProvider(this);var n=this.sina.createFilter({searchTerm:this.searchQuery.filter.searchTerm,dataSource:this.searchQuery.filter.dataSource,rootCondition:this.searchQuery.filter.rootCondition.clone()});var u=[];var s;if(t.filter.dataSource.id==="Publications"){s=i.searchResultSetItemArray3}else if(t.filter.dataSource.id==="Scientists"||t.filter.dataSource.id==="Folklorists"){s=i.searchResultSetItemArray}else if(t.filter.dataSource.id==="Urban_Legends"||t.filter.dataSource.id==="Mysterious_Sightings"){s=i.searchResultSetItemArray2}if(t.filter.dataSource.id==="Scientists"||t.filter.dataSource.id==="Mysterious_Sightings"){u=this.getChartResultSetItemsForLocations(s);a=this.sina._createChartResultSet({items:u,query:this.sina.createChartQuery({filter:n,dimension:"LOCATION"}),title:"Locations"});r.push(a)}var o=this.getSientistOrFolkloristFacet(t,s);u=o[0];var l=o[1];a=this.sina._createChartResultSet({items:u,query:this.sina.createChartQuery({filter:n,dimension:l}),title:l.charAt(0).toUpperCase()+l.slice(1).toLowerCase()+"s"});r.push(a);return r}}]);return r}(C);var _={__esModule:true};_.Provider=V;return _})})();
//# sourceMappingURL=Provider.js.map