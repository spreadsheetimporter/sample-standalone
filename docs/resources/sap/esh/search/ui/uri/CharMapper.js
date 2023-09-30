/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define([],function(){function e(e,t){var n=typeof Symbol!=="undefined"&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=r(e))||t&&e&&typeof e.length==="number"){if(n)e=n;var a=0;var i=function(){};return{s:i,n:function(){if(a>=e.length)return{done:true};return{done:false,value:e[a++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o=true,c=false,f;return{s:function(){n=n.call(e)},n:function(){var e=n.next();o=e.done;return e},e:function(e){c=true;f=e},f:function(){try{if(!o&&n.return!=null)n.return()}finally{if(c)throw f}}}}function r(e,r){if(!e)return;if(typeof e==="string")return t(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor)n=e.constructor.name;if(n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return t(e,r)}function t(e,r){if(r==null||r>e.length)r=e.length;for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function n(e,r){if(!(e instanceof r)){throw new TypeError("Cannot call a class as a function")}}function a(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||false;n.configurable=true;if("value"in n)n.writable=true;Object.defineProperty(e,n.key,n)}}function i(e,r,t){if(r)a(e.prototype,r);if(t)a(e,t);Object.defineProperty(e,"prototype",{writable:false});return e}
/*!
   * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
   */var o=function(){function r(t){n(this,r);this.charsToReplace=t;if(t.length===0){throw new Error("No characters to replace given")}if(t.length>10){throw new Error("Max number of chars to replace is 10")}this.charsToReplaceRegExp=[];var a=e(t),i;try{for(a.s();!(i=a.n()).done;){var o=i.value;this.charsToReplaceRegExp.push(new RegExp(o,"g"))}}catch(e){a.e(e)}finally{a.f()}this.replaceWithChars=["0","1","2","3","4","5","6","7","8","9"];this.replaceWithCharsRegExp=[];var c=e(this.replaceWithChars),f;try{for(c.s();!(f=c.n()).done;){var l=f.value;this.replaceWithCharsRegExp.push(new RegExp(l,"g"))}}catch(e){c.e(e)}finally{c.f()}}i(r,[{key:"map",value:function e(r){for(var t=0;t<this.charsToReplaceRegExp.length;t++){r=r.replace(this.charsToReplaceRegExp[t],this.replaceWithChars[t])}return r}},{key:"unmap",value:function e(r){for(var t=0;t<this.charsToReplaceRegExp.length;t++){r=r.replace(this.replaceWithCharsRegExp[t],this.charsToReplace[t])}return r}}]);return r}();return o})})();
//# sourceMappingURL=CharMapper.js.map