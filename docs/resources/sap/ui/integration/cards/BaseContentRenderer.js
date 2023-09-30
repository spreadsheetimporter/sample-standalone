/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer"],function(e){"use strict";var t=e.extend("sap.ui.integration.cards.BaseContentRenderer",{apiVersion:2});t.DEFAULT_MIN_HEIGHT="5rem";t.render=function(e,t){var n="sapFCard",a=t.getMetadata().getName(),i=a.slice(a.lastIndexOf(".")+1),r=t.getParent(),s=r&&r.isA("sap.f.ICard"),o=i!=="AdaptiveContent"&&s&&t.isLoading(),g=t.getAggregation("_messageContainer");n+=i;e.openStart("div",t).class(n).class("sapFCardBaseContent");if(t.hasListeners("press")){e.class("sapFCardClickable")}if(s&&r.getHeight()==="auto"){var d=this.getMinHeight(t.getParsedConfiguration(),t,r);e.style("min-height",d)}if(o){e.class("sapFCardContentLoading")}e.openEnd();if(o){e.renderControl(t.getAggregation("_loadingPlaceholder"))}if(g){e.renderControl(g)}this.renderContent(e,t);e.close("div")};t.renderContent=function(e,t){e.renderControl(t.getAggregation("_content"))};t.getMinHeight=function(e,t){return this.DEFAULT_MIN_HEIGHT};t.isCompact=function(e){var t=e,n=e.getParent();if(!e.getDomRef()&&n&&n.isA("sap.f.ICard")){t=n}return t.$().closest(".sapUiSizeCompact").hasClass("sapUiSizeCompact")};return t});
//# sourceMappingURL=BaseContentRenderer.js.map