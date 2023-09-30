/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["./FacetItem"],function(e){function t(e){return e&&e.__esModule&&typeof e.default!=="undefined"?e.default:e}function r(e,t){var r=typeof Symbol!=="undefined"&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=n(e))||t&&e&&typeof e.length==="number"){if(r)e=r;var a=0;var i=function(){};return{s:i,n:function(){if(a>=e.length)return{done:true};return{done:false,value:e[a++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o=true,u=false,l;return{s:function(){r=r.call(e)},n:function(){var e=r.next();o=e.done;return e},e:function(e){u=true;l=e},f:function(){try{if(!o&&r.return!=null)r.return()}finally{if(u)throw l}}}}function n(e,t){if(!e)return;if(typeof e==="string")return a(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if(r==="Object"&&e.constructor)r=e.constructor.name;if(r==="Map"||r==="Set")return Array.from(e);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return a(e,t)}function a(e,t){if(t==null||t>e.length)t=e.length;for(var r=0,n=new Array(t);r<t;r++){n[r]=e[r]}return n}var i=t(e);function o(e,t,r){if(r){return t?t(e):e}if(!e||!e.then){e=Promise.resolve(e)}return t?e.then(t):e}function u(e){return function(){for(var t=[],r=0;r<arguments.length;r++){t[r]=arguments[r]}try{return Promise.resolve(e.apply(this,t))}catch(e){return Promise.reject(e)}}}var l=u(function(e,t,n){function a(t,r,n){var a=t.getData().facet;var i=f(a,n);if(r){e.addFilter(i)}else{e.removeFilter(i)}}var i=t.sina.createFilter({dataSource:e.getDataSource()});var u=r(n),l;try{for(u.s();!(l=u.n()).done;){var c=l.value;i.autoInsertCondition(c.filterCondition)}}catch(e){u.e(e)}finally{u.f()}t.setFilter(i);t.setHandleSetFilter(a);return o(t.treeNodeFactory.updateRecursively(),function(){t.updateNodesFromHierarchyNodePaths(e.getProperty("/hierarchyNodePaths"));t.mixinFilterNodes();t.treeNodeFactory.updateUI()})});function f(e,t){return new i({selected:false,level:0,filterCondition:t,value:t.value,valueLabel:t.valueLabel,label:e.title,facetTitle:e.title,facetAttribute:e.attributeId,advanced:true,listed:true,icon:null,visible:true})}var c={__esModule:true};c.updateDetailPageforDynamicHierarchy=l;c.createFilterFacetItemForDynamicHierarchy=f;return c})})();
//# sourceMappingURL=SearchFacetDialogHelperDynamicHierarchy.js.map