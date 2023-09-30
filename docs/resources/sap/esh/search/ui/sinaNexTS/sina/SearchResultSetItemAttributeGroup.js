/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["./SearchResultSetItemAttributeBase"],function(t){function e(t){return i(t)||n(t)||o(t)||r()}function r(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function n(t){if(typeof Symbol!=="undefined"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function i(t){if(Array.isArray(t))return a(t)}function u(t,e){var r=typeof Symbol!=="undefined"&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=o(t))||e&&t&&typeof t.length==="number"){if(r)t=r;var n=0;var i=function(){};return{s:i,n:function(){if(n>=t.length)return{done:true};return{done:false,value:t[n++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var u=true,a=false,l;return{s:function(){r=r.call(t)},n:function(){var t=r.next();u=t.done;return t},e:function(t){a=true;l=t},f:function(){try{if(!u&&r.return!=null)r.return()}finally{if(a)throw l}}}}function o(t,e){if(!t)return;if(typeof t==="string")return a(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);if(r==="Object"&&t.constructor)r=t.constructor.name;if(r==="Map"||r==="Set")return Array.from(t);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return a(t,e)}function a(t,e){if(e==null||e>t.length)e=t.length;for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function l(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}function f(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||false;n.configurable=true;if("value"in n)n.writable=true;Object.defineProperty(t,n.key,n)}}function s(t,e,r){if(e)f(t.prototype,e);if(r)f(t,r);Object.defineProperty(t,"prototype",{writable:false});return t}function c(t,e){if(typeof e!=="function"&&e!==null){throw new TypeError("Super expression must either be null or a function")}t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:true,configurable:true}});Object.defineProperty(t,"prototype",{writable:false});if(e)b(t,e)}function b(t,e){b=Object.setPrototypeOf||function t(e,r){e.__proto__=r;return e};return b(t,e)}function y(t){var e=v();return function r(){var n=h(t),i;if(e){var u=h(this).constructor;i=Reflect.construct(n,arguments,u)}else{i=n.apply(this,arguments)}return p(this,i)}}function p(t,e){if(e&&(typeof e==="object"||typeof e==="function")){return e}else if(e!==void 0){throw new TypeError("Derived constructors may only return object or undefined")}return d(t)}function d(t){if(t===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return t}function v(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true}catch(t){return false}}function h(t){h=Object.setPrototypeOf?Object.getPrototypeOf:function t(e){return e.__proto__||Object.getPrototypeOf(e)};return h(t)}function m(t,e,r){if(e in t){Object.defineProperty(t,e,{value:r,enumerable:true,configurable:true,writable:true})}else{t[e]=r}return t}
/*!
   * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
   */var A=t["SearchResultSetItemAttributeBase"];var w=function(t){c(n,t);var r=y(n);function n(t){var e,i,u,o;var a;l(this,n);a=r.call(this,t);m(d(a),"attributes",[]);m(d(a),"displayAttributes",[]);a.label=(e=t.label)!==null&&e!==void 0?e:a.label;a.template=(i=t.template)!==null&&i!==void 0?i:a.template;a.attributes=(u=t.attributes)!==null&&u!==void 0?u:a.attributes;a.displayAttributes=(o=t.displayAttributes)!==null&&o!==void 0?o:a.displayAttributes;return a}s(n,[{key:"toString",value:function t(){var e="",r=0;var n;var i=RegExp("{[a-z]+}","gi");while((n=i.exec(this.template))!==null){e+=this.template.substring(r,n.index);var u=n[0].slice(1,-1);e+=this.attributes[u]&&this.attributes[u].valueFormatted||"";r=i.lastIndex}e+=this.template.substring(r);return this.label+":"+e}},{key:"isAttributeDisplayed",value:function t(e){if(Array.isArray(this.displayAttributes)){return this.displayAttributes.includes(e)}return false}},{key:"getSubAttributes",value:function t(){var r=[];var n=u(this.attributes),i;try{for(n.s();!(i=n.n()).done;){var o=i.value;r.push.apply(r,e(o.attribute.getSubAttributes()))}}catch(t){n.e(t)}finally{n.f()}return r}}]);return n}(A);var g={__esModule:true};g.SearchResultSetItemAttributeGroup=w;return g})})();
//# sourceMappingURL=SearchResultSetItemAttributeGroup.js.map