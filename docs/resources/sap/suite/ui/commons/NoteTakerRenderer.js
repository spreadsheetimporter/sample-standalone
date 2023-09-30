/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(function(){"use strict";var e={};e.render=function(e,t){var i=t.getTooltip_AsString();e.write("<div");e.writeControlData(t);if(i){e.writeAttributeEscaped("title",i)}e.addClass("sapSuiteUiCommonsNoteTaker");e.writeClasses();e.writeAttribute("style","width:"+(t.getVisibleNotes()*350+50)+"px");e.write(">");e.write("<div");e.writeAttribute("id",t.getId()+"-filterPane");e.addClass("sapSuiteUiCommonsNoteTakerFilterPane");e.writeClasses();e.write(">");e.write("<div");e.addClass("suiteUiNtFilterPaneLeftSection");e.writeClasses();e.write(">");e.renderControl(t._oHomeButton);e.write("<span");e.writeAttribute("id",t.getId()+"-filterPane-header");e.addClass("suiteUiNtFilterTitle");e.writeClasses();e.write(">");e.writeEscaped(t._rb.getText("NOTETAKER_FILTER_TITLE")+":");e.write("</span>");e.renderControl(t._oFilterTagButton);e.renderControl(t._oFilterThumbUpButton);e.renderControl(t._oFilterThumbDownButton);e.renderControl(t._oFilterAllButton);e.write("</div>");e.write("<div");e.addClass("suiteUiNtFilterPaneRightSection");e.writeClasses();e.write(">");if(t.getVisibleNotes()>1){e.renderControl(t._oFilterSearchField)}else{e.renderControl(t._oSearchButton)}e.write("</div>");e.write("</div>");e.renderControl(t._carousel);if(t.getVisibleNotes()==1){this.searchTextRender(e,t)}e.write("<div");e.writeAttribute("id",t.getId()+"-filterTag-panel");e.addClass("sapSuiteUiCommonsNoteTakerFilterTagPanel");e.addClass("sapUiShd");e.writeClasses();e.write(">");e.write("<div");e.writeAttribute("id",t.getId()+"-filterTag-arrow");e.addClass("sapSuiteUiCommonsNoteTakerFilterTagArrow");e.writeClasses();e.write(">");e.write("</div>");e.write("<div");e.writeAttribute("id",t.getId()+"-filterTag-header");e.addClass("sapSuiteUiCommonsNoteTakerFilterTagHeader");e.writeClasses();e.write(">");e.writeEscaped(t._rb.getText("NOTETAKERFEEDER_TOOLPOPUP_TITLE"));e.write("</div>");e.write("<div>");e.renderControl(t._oFilterTagList);e.write("</div>");e.write("<div");e.addClass("sapSuiteUiCommonsNoteTakerFilterTagButtons");e.writeClasses();e.write(">");e.renderControl(t._oApplyFilterTagButton);e.renderControl(t._oCancelFilterTagButton);e.write("</div>");e.write("</div>");e.write("</div>")};e.searchTextRender=function(e,t){e.write("<div");e.writeAttribute("id",t.getId()+"-search-panel");e.addClass("sapSuiteUiCommonsNoteTakerSearchPanel");e.addClass("sapUiShd");e.writeClasses();e.write(">");e.write("<div");e.writeAttribute("id",t.getId()+"-search-arrow");e.addClass("sapSuiteUiCommonsNoteTakerSearchArrow");e.writeClasses();e.write(">");e.write("</div>");e.write("<div>");e.renderControl(t._oFilterSearchField);e.write("</div>");e.write("</div>")};return e},true);
//# sourceMappingURL=NoteTakerRenderer.js.map