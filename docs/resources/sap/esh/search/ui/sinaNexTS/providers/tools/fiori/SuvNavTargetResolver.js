/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["../../../sina/SinaObject"],function(e){function t(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function r(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||false;n.configurable=true;if("value"in n)n.writable=true;Object.defineProperty(e,n.key,n)}}function n(e,t,n){if(t)r(e.prototype,t);if(n)r(e,n);Object.defineProperty(e,"prototype",{writable:false});return e}function i(e,t){if(typeof t!=="function"&&t!==null){throw new TypeError("Super expression must either be null or a function")}e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:true,configurable:true}});Object.defineProperty(e,"prototype",{writable:false});if(t)a(e,t)}function a(e,t){a=Object.setPrototypeOf||function e(t,r){t.__proto__=r;return t};return a(e,t)}function u(e){var t=l();return function r(){var n=s(e),i;if(t){var a=s(this).constructor;i=Reflect.construct(n,arguments,a)}else{i=n.apply(this,arguments)}return o(this,i)}}function o(e,t){if(t&&(typeof t==="object"||typeof t==="function")){return t}else if(t!==void 0){throw new TypeError("Derived constructors may only return object or undefined")}return f(e)}function f(e){if(e===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return e}function l(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true}catch(e){return false}}function s(e){s=Object.setPrototypeOf?Object.getPrototypeOf:function e(t){return t.__proto__||Object.getPrototypeOf(t)};return s(e)}
/*!
   * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
   */var c=e["SinaObject"];var v=function e(){var t=[];$.each(document.styleSheets,function(e,r){if(r.href){var n=r.href.toString();var i=/themes\/(.+)\/library.css/;var a=i.exec(n);if(a!==null){t.push(a[1]);return false}}return true});return t[0]};var p=function e(t){var r=t;var n=v();if(!n){return r}n="sap-theme="+n+"&";if(t.indexOf("sap-theme=")===-1){if(t.indexOf("?")!==-1){r=t.replace("?","?"+n)}}return r};var h=function(e){i(a,e);var r=u(a);function a(e){var n;t(this,a);n=r.call(this,e);n.suvMimeType="application/vnd.sap.universal-viewer+suv";n.suvViewerBasePath="/sap/bc/ui5_ui5/ui2/ushell/resources/sap/fileviewer/viewer/web/viewer.html?file=";return n}n(a,[{key:"addHighlightTermsToUrl",value:function e(t,r){if(!r){return t}t+="&searchTerms="+encodeURIComponent(JSON.stringify({terms:r}));return t}},{key:"resolveSuvNavTargets",value:function e(t,r,n){for(var i in r){var a=void 0;var u=r[i];var o=u.suvThumbnailAttribute;if(u.suvTargetMimeTypeAttribute.value===this.suvMimeType){a=this.suvViewerBasePath+encodeURIComponent(u.suvTargetUrlAttribute.value);a=this.addHighlightTermsToUrl(a,n);a=p(a);o.defaultNavigationTarget=this.sina._createNavigationTarget({label:u.suvTargetUrlAttribute.value,targetUrl:a,target:"_blank"})}else{a=u.suvTargetUrlAttribute.value;o.defaultNavigationTarget=this.sina._createNavigationTarget({label:u.suvTargetUrlAttribute.value,targetUrl:a,target:"_blank"})}}}}]);return a}(c);var b={__esModule:true};b.SuvNavTargetResolver=h;return b})})();
//# sourceMappingURL=SuvNavTargetResolver.js.map