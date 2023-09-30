/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/commons/CalloutBaseRenderer","sap/ui/core/Renderer","sap/ui/core/IconPool","sap/ui/core/Configuration"],function(t,e,i,r){"use strict";var a=e.extend(t);a.renderContent=function(t,e){var a=r.getAccessibility();var s=e.getType(),n=e.getFirstTitle(),d=e.getFirstTitleHref(),o=e.getIcon(),w=e.getSecondTitle(),l=e.getWidth(),c=e.getId(),u=e.getTooltip_AsString(),f;t.write("<div");if(u){t.writeAttributeEscaped("title",u)}if(a){t.writeAttribute("role","dialog");t.writeAttribute("aria-labelledby",c+"-title")}t.addClass("sapUiUx3QV");t.writeClasses();if(l){t.addStyle("width",l);t.writeStyles()}t.write(">");t.write("<div");t.writeAttribute("id",c+"-title");t.writeAttribute("tabindex","-1");t.addClass("sapUiUx3QVHeader");t.writeClasses();t.write(">");t.writeEscaped(s);t.write("</div>");if(o||n||w){t.write("<div");if(a){t.writeAttribute("role","heading")}t.addClass("sapUiUx3QVHeading");t.writeClasses();t.write(">");if(o){if(i.isIconURI(o)){f={title:n,tabindex:"-1"}}t.writeIcon(o,"sapUiUx3QVIcon",f)}t.write("<span");t.writeAttribute("id",c+"-name");if(a&&w){t.writeAttribute("aria-describedby",c+"-descr")}t.addClass("sapUiUx3QVTitle1");t.writeClasses();t.write(">");if(d){t.write("<a");t.writeAttribute("id",c+"-link");t.writeAttributeEscaped("href",d);t.writeAttribute("tabindex","-1");t.write(">")}t.writeEscaped(n||"");if(d){t.write("</a>")}t.write("</span>");if(w){t.write("<br><span");t.writeAttribute("id",c+"-descr");t.writeAttribute("tabindex","-1");t.addClass("sapUiUx3QVTitle2");t.writeClasses();t.write(">");t.writeEscaped(w);t.write("</span>")}t.write("</div>")}t.write('<div id="'+c+'-content">');this.renderBody(t,e);t.write("</div>");t.write("</div>");if(e.getShowActionBar()&&e.getActionBar()){t.renderControl(e.getActionBar())}};a.renderBody=function(t,e){var i=e.getContent();for(var r=0;r<i.length;r++){t.write('<div class="sapUiUx3QVBody">');if(i[r]instanceof sap.ui.core.Control){t.renderControl(i[r])}else if(i[r].getContent&&typeof i[r].getContent=="function"){var a=i[r].getContent();for(var s=0;s<a.length;s++){if(a[s]instanceof sap.ui.core.Control){t.renderControl(a[s])}}}t.write("</div>")}};return a},true);
//# sourceMappingURL=QuickViewRenderer.js.map