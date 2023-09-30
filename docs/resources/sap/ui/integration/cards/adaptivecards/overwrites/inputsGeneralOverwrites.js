/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/InvisibleText","sap/ui/core/Core"],function(e,r){"use strict";var t={};t.overwriteRequired=function(t){var n=t._renderedInputControlElement.getAttribute("role");if(n==="radiogroup"){return}t.renderedInputControlElement.removeAttribute("aria-required");if(!n){t.renderedInputControlElement.required=t.isRequired;return}if(n==="group"&&t.isRequired){var i=new e({id:t._renderedInputControlElement.id+"-InvisibleText",text:r.getLibraryResourceBundle("sap.ui.integration").getText("ADAPTIVE_CARDS_REQUIRED_FIELD")}).toStatic().getId();t.renderedInputControlElement.setAttribute("aria-describedby",i)}};t.overwriteLabel=function(e){if(!e._renderedLabelElement){return}var r=document.createElement("ui5-label");r.id=e._renderedLabelElement.id;r.innerText=e.label;r.for=e._renderedInputControlElement.id;r.required=e.isRequired;r.style.marginBottom=e.hostConfig.getEffectiveSpacing(e.hostConfig.inputs.label.inputSpacing)+"px";e._renderedLabelElement.remove();e._renderedLabelElement=r;e._outerContainerElement.insertBefore(e._renderedLabelElement,e.inputControlContainerElement)};t.overwriteAriaLabelling=function(e,r){if(!e._renderedInputControlElement){return}if(e._renderedLabelElement){e._renderedInputControlElement.setAttribute(r,e._renderedLabelElement.id)}else{e._renderedInputControlElement.removeAttribute(r)}};t.createValueStateElement=function(e,r){if(!e.errorMessage){return}var t=document.createElement("div");t.setAttribute("slot","valueStateMessage");t.innerText=e.errorMessage;r.appendChild(t)};return t});
//# sourceMappingURL=inputsGeneralOverwrites.js.map