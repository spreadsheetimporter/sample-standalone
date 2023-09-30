/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["sap/m/Image"],function(e){var a=e.extend("sap.esh.search.ui.controls.SearchObjectSuggestionImage",{renderer:{apiVersion:2},metadata:{properties:{isCircular:{type:"boolean",multiple:false}}},constructor:function a(r,s){e.prototype.constructor.call(this,r,s);this.attachBrowserEvent("load",function(){this.wrapImage()}.bind(this));this.attachBrowserEvent("error",function(){this.wrapImage(true)}.bind(this));this.addStyleClass("sapUshellSearchObjectSuggestionImage-Initial")},wrapImage:function e(a){var r=this.getDomRef();if(jQuery(r.parentNode).hasClass("sapUshellSearchObjectSuggestionImage-Wrapper-Portrait")||jQuery(r.parentNode).hasClass("sapUshellSearchObjectSuggestionImage-Wrapper-Landscape")){this.adaptContainer(a)}else{this.createContainer(a)}},createContainer:function e(a){var r=document.createElement("div");var s=this.getDomRef();jQuery(r).addClass("sapUshellSearchObjectSuggestionImage-Wrapper");if(s.offsetHeight>s.offsetWidth){jQuery(r).addClass("sapUshellSearchObjectSuggestionImage-Wrapper-Portrait")}else{jQuery(r).addClass("sapUshellSearchObjectSuggestionImage-Wrapper-Landscape")}if(this.getProperty("isCircular")){r.style.borderRadius="50%"}s.parentNode.insertBefore(r,s);s.parentNode.removeChild(s);r.appendChild(s);jQuery(s).removeClass("sapUshellSearchObjectSuggestionImage-Initial");if(a){jQuery(r).addClass("sapUshellSearchObjectSuggestionImage-Wrapper-Error")}},adaptContainer:function e(a){var r=this.getDomRef();var s=r.parentNode;if(r.offsetHeight>r.offsetWidth){jQuery(s).addClass("sapUshellSearchObjectSuggestionImage-Wrapper-Portrait");jQuery(s).removeClass("sapUshellSearchObjectSuggestionImage-Wrapper-Landscape")}else{jQuery(s).addClass("sapUshellSearchObjectSuggestionImage-Wrapper-Landscape");jQuery(s).removeClass("sapUshellSearchObjectSuggestionImage-Wrapper-Protrait")}if(a){jQuery(s).addClass("sapUshellSearchObjectSuggestionImage-Wrapper-Error")}else{jQuery(s).removeClass("sapUshellSearchObjectSuggestionImage-Wrapper-Error")}}});return a})})();
//# sourceMappingURL=SearchObjectSuggestionImage.js.map