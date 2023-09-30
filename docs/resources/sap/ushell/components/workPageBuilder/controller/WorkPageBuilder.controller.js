//Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/Log","sap/ui/core/mvc/Controller","sap/base/util/uid","sap/ushell/EventHub","sap/ushell/components/workPageBuilder/controls/WorkPageWidgetContainer","sap/ushell/components/workPageBuilder/controls/WorkPageCell","sap/ushell/components/workPageBuilder/controls/WorkPageSection","sap/ui/integration/widgets/Card","sap/ui/core/Fragment","sap/ui/integration/Host","sap/base/util/ObjectPath"],function(e,t,o,i,n,r,a,s,l,g,d){"use strict";var h=4;var u=24;var c=2;var p=6;function C(){i.emit("WorkPageHasChanges",true)}return t.extend("sap.ushell.components.workPageBuilder.controller.WorkPageBuilder",{onInit:function(){this._fnDeleteRowHandler=this.deleteRow.bind(this);this._sModelRootPath=this.getOwnerComponent().getModelRootPath();this._sWorkPageRootPath=this._sModelRootPath+"/WorkPage";this._sVizRootPath=this._sModelRootPath+"/Visualizations";this._sCatalogRootPath=this._sModelRootPath+"/Catalog";this._saveHost();this.byId("sapCepWorkPage").bindElement({path:this._sWorkPageRootPath})},onAddColumn:function(e){var t=this.getView().getModel();var o=e.getSource();var i=o.getParent();var n=i.indexOfAggregation("columns",o);var r=i.getBindingContext().getPath();var a=r+"/Columns/";var s=o.getBindingContext().getPath()+"/Descriptor/colspan";var l=t.getProperty(a);var g=l.length;var d=e.getParameter("left");if(g>=p){return}var c=o.getProperty("colspan");var f=Math.floor(c/2)>=h?Math.floor(c/2):h;var v=f%2;t.setProperty(s,f+v);var P=i.indexOfAggregation("columns",o)+(d===true?0:1);l.splice(P,0,this._createEmptyColumn(f-v));var m=l.reduce(function(e,t){return e+this._getColSpan(t)}.bind(this),0);if(m>u){this._calculateColSpans(l,n,m)}t.setProperty(a,l);C()},onDeleteColumn:function(e){var t=this.getView().getModel();var o=e.getSource();var i=o.getColspan();var n=o.getParent();var r=n.indexOfAggregation("columns",o);var a=n.getBindingContext().getPath();var s=a+"/Columns/";var l=t.getProperty(s);l.splice(r,1);var g=i/2;var d=r-1<0?r:r-1;while(g>0){var h=l[d];this._setColSpan(h,this._getColSpan(h)+c);d=++d>=l.length?0:d++;g--}t.setProperty(s,l);C()},onAddFirstRow:function(){var e=this._sWorkPageRootPath+"/Rows/";this.getView().getModel().setProperty(e,[this._createEmptyRow()]);C()},onAddRow:function(e){var t=this.getView().getModel();var o=e.getSource();var i=this.byId("sapCepWorkPage");var n=this._sWorkPageRootPath+"/Rows/";var r=t.getProperty(n);var a=this._createEmptyRow();var s=i.indexOfAggregation("rows",o)+(e.getParameter("bottom")===true?1:0);r.splice(s,0,a);t.setProperty(n,r);C()},onResize:function(e){var t=e.getParameter("posXDiff");var o=e.getSource();var i=o.getParent();var n=i.getSingleColumnWidth();var r,a,s,l,g,d,h,u;if(n===0){return}r=t/n;if(r>-1&&r<1){return}a=r<0?Math.floor(t/n):Math.ceil(t/n);s=a>=0?"right":"left";l=i.indexOfAggregation("columns",o);g=l-1;d=this._getCurrentColSpan(i,g);h=this._getCurrentColSpan(i,l);u=this._doColumnResizeStep(i,g,l,d,h,s);if(u){this._updateModelWithColSpans(i,g,l,u.newLeftColSpan,u.newRightColSpan)}C()},onDeleteWidget:function(e,t){var o=this.getView().getModel();var i=t.getParent();var n=i.indexOfAggregation("cells",t);var r=i.getBindingContext().getPath()+"/Cells";var a=o.getProperty(r);a.splice(n,1);o.setProperty(r,a);C()},onDeleteVisualization:function(e){var t=e.getBindingContext();var o=t.getPath();var i=this.getView().getModel();var n=o.substring(0,o.lastIndexOf("/"));var r=i.getProperty(o);var a=i.getProperty(n).filter(function(e){return e.Visualization.Id!==r.Visualization.Id});i.setProperty(n,a);C()},onEditTitle:function(){C()},onWidgetAdded:function(){C()},onAddWidget:function(e){this._oColumn=e.getSource();if(!this._oPromise){this._oPromise=this._loadContentFinderDialog()}return this._oPromise.then(function(e){this.oContentFinderDialog=e;var t={oWorkPageBuilderView:this.getView(),sCatalogRootPath:this._sCatalogRootPath,sVizRootPath:this._sVizRootPath,oColumn:this._oColumn,fnOnWidgetAdded:this.onWidgetAdded};this.oContentFinderDialogController.connect(this.sFragmentId,e,t,{iCurrentPageIndex:0});this.oContentFinderDialog.open()}.bind(this))},onAddApplications:function(e){var t=e.getSource();if(!this._oPromise){this._oPromise=this._loadContentFinderDialog()}return this._oPromise.then(function(e){this.oContentFinderDialog=e;var o={oWorkPageBuilderView:this.getView(),sCatalogRootPath:this._sCatalogRootPath,sVizRootPath:this._sVizRootPath,oCell:t,fnOnWidgetAdded:this.onWidgetAdded};this.oContentFinderDialogController.connect(this.sFragmentId,e,o,{iCurrentPageIndex:1,bRestrictedMode:true,sWidgetType:"widgets-tiles"});this.oContentFinderDialog.open()}.bind(this))},_loadContentFinderDialog:function(){return new Promise(function(e,t){sap.ui.require(["sap/ushell/components/workPageBuilder/controller/ContentFinderDialog.controller"],function(o){this.oContentFinderDialogController=new o;this.sFragmentId=this.createId("ContentFinderDialog");this.oContentFinderDialogController.init();l.load({id:this.sFragmentId,fragmentName:"sap.ushell.components.workPageBuilder.view.ContentFinderDialog",controller:this.oContentFinderDialogController}).then(function(t){this.getView().addDependent(t);e(t)}.bind(this)).catch(t)}.bind(this),t)}.bind(this))},_getContentPickerController:function(){if(!this._oContentFinderController){return new Promise(function(e,o){t.create({name:"sap.ushell.components.workPageBuilder.controller.ContentPicker"}).then(function(t){this._oContentFinderController=t;t.setProvider({oWorkPageBuilderView:this.getView(),sCatalogRootPath:this._sCatalogRootPath,sVizRootPath:this._sVizRootPath,oColumn:this._oColumn});e(t)}.bind(this))}.bind(this))}this._oContentFinderController.getProvider().oColumn=this._oColumn;return Promise.resolve(this._oContentFinderController)},onDeleteRow:function(e){var t=this.getOwnerComponent().getRootControl();var o=e.getSource().getBindingContext();if(!this.oLoadDeleteDialog){this.oLoadDeleteDialog=l.load({id:t.createId("rowDeleteDialog"),name:"sap.ushell.components.workPageBuilder.view.WorkPageRowDeleteDialog",controller:this}).then(function(e){e.setModel(this.getView().getModel("i18n"),"i18n");return e}.bind(this))}this.oLoadDeleteDialog.then(function(e){e.getBeginButton().detachEvent("press",this._fnDeleteRowHandler);e.getBeginButton().attachEvent("press",{rowContext:o},this._fnDeleteRowHandler);e.open()}.bind(this))},deleteRow:function(e,t){var o=this.getView().getModel();var i=t.rowContext;var n=o.getProperty(this._sWorkPageRootPath+"/Rows");var r=n.indexOf(i.getObject());if(r<=-1){return}n.splice(r,1);o.setProperty(this._sWorkPageRootPath+"/Rows",n);C();this.oLoadDeleteDialog.then(function(e){e.close()})},onRowDeleteCancel:function(){this.oLoadDeleteDialog.then(function(e){e.close()})},_isSectionCell:function(e){var t=e.getProperty("Widgets");if(t.length===0){return false}if(e.getProperty("Descriptor/tileMode")){return true}if(t.length>1){return true}var o=t[0].Visualization.Id;var i=e.getModel().getProperty("/data/Visualizations/"+o);return i?["sap.ushell.StaticAppLauncher","sap.ushell.DynamicAppLauncher"].indexOf(i.Type)>-1:false},cellFactory:function(e,t){var o=new r(e,{});if(this._isSectionCell(t)){var i=this.createId("sapCepWorkPageSection")+e;var n=this.createId("sapCepWorkPageWidgetContainer")+i;var a=this._createSection(i,{});var s=this._createWidgetContainer(n,o);a.bindAggregation("visualizations",{path:"Widgets"});a.bindProperty("editMode",{path:"/editMode"});o.addAggregation("widgetContainers",s.setWidget(a))}else{o.bindAggregation("widgetContainers",{path:"Widgets",factory:this.widgetFactory.bind(this,o)})}return o},widgetFactory:function(t,o,i){var n=i.getProperty("Visualization/Id");var r=this.createId("sapCepWorkPageWidgetContainer")+o;var a=this._createWidgetContainer(r,t);if(!n){e.error("No vizId found");return a}var s=this.getView().getModel().getProperty(this._sVizRootPath+"/"+n);if(!s||!s.Type){e.error("No viz or vizType found for vizId "+n);return a}switch(s.Type){case"sap.card":return a.setWidget(this._createCard(o,s));default:return a}},_createWidgetContainer:function(e,t){var o=new n(e,{editMode:"{/editMode}",openWidgetSettingsTooltip:"{i18n>WorkPage.WidgetContainer.OpenWidgetSettingsButtonTooltip}",deleteWidgetTooltip:"{i18n>WorkPage.WidgetContainer.DeleteWidgetButtonTooltip}"}).attachEvent("deleteWidget",this._deleteWidget.bind(this,t));t.addDependent(o);return o},_createSection:function(e){var t=new a(e);t.attachEvent("deleteVisualization",this._deleteVisualization.bind(this));t.attachEvent("addApplications",this.onAddApplications.bind(this));return t},_deleteVisualization:function(e){var t=e.getParameters().getSource();this.onDeleteVisualization(t)},_deleteWidget:function(e,t){this.onDeleteWidget(t.getSource(),e)},_createCard:function(t,o){var i={};var n=o.Descriptor&&o.Descriptor["sap.card"];var r=o.DescriptorResources&&(o.DescriptorResources.BaseUrl||o.DescriptorResources.DescriptorPath);if(!n&&!r){e.error("No Descriptor or DescriptorResources for Card");return new s(t)}if(n){i.manifest=o.Descriptor;if(r){i.baseUrl=o.DescriptorResources.BaseUrl+o.DescriptorResources.DescriptorPath}}else if(r){i.manifest=o.DescriptorResources.BaseUrl+o.DescriptorResources.DescriptorPath+"/manifest.json"}if(i.baseUrl&&i.baseUrl.substr(-1)!=="/"){i.baseUrl+="/"}var a=new s(t,i).addStyleClass("sapCepWidget");a.attachAction(this.executeNavigation);a.setHost(this.oHost);return a},executeNavigation:function(e){var t=e.getParameter("parameters");if(e.getParameter("type")!=="Navigation"){return Promise.resolve()}return sap.ushell.Container.getServiceAsync("CrossApplicationNavigation").then(function(e){return e.toExternal({target:{semanticObject:t.ibnTarget.semanticObject,action:t.ibnTarget.action},params:t.ibnParams})})},saveEditChanges:function(){this.getOwnerComponent().fireEvent("closeEditMode",{saveChanges:true})},cancelEditChanges:function(){this.getOwnerComponent().fireEvent("closeEditMode",{saveChanges:false})},_updateModelWithColSpans:function(e,t,o,i,n){var r=this.getView().getModel();var a=e.getBindingContext();var s=a.getPath();var l=s+"/Columns/"+t+"/Descriptor/colspan";var g=s+"/Columns/"+o+"/Descriptor/colspan";r.setProperty(l,i);r.setProperty(g,n)},_updateColSpanClass:function(e,t,o){e.$().find(".sapCepWorkPageColumn").eq(t).removeClass(function(e,t){return(t.match(/sapCepColSpan.*/g)||[]).join(" ")}).addClass("sapCepColSpan"+o)},_doColumnResizeStep:function(t,o,i,n,r,a){var s=sap.ui.getCore().getConfiguration().getRTL();var l=0;if(!s){l=a==="right"?c:-c}else{l=a==="right"?-c:c}var g=n+l;var d=r-l;if(g<h||d<h){e.debug("new column value too small",g,d);return null}this._updateColSpanClass(t,o,g);this._updateColSpanClass(t,i,d);return{newLeftColSpan:g,newRightColSpan:d}},_getCurrentColSpan:function(e,t){var o=e.getBindingContext().getPath();var i=o+"/Columns/"+t+"/Descriptor/colspan";return this.getView().getModel().getProperty(i)},_getColSpan:function(e){return d.get("Descriptor.colspan",e)||u},_setColSpan:function(e,t){return d.set("Descriptor.colspan",t,e)},_calculateColSpans:function(e,t,o){var i=e[t];if(this._getColSpan(i)-c>=h){this._setColSpan(i,this._getColSpan(i)-c);o=o-c}if(o>u){var n=t-1>=0?t-1:e.length-1;this._calculateColSpans(e,n,o)}return e},_createEmptyColumn:function(e){return{Id:o(),Descriptor:{colspan:e},Configurations:[],Cells:[]}},_createEmptyRow:function(){return{Id:o(),Descriptor:{title:this.getView().getModel("i18n").getResourceBundle().getText("WorkPage.Row.OverflowToolbar.RowTitleLabel"),description:"this is not yet rendered",fillRowHeight:false,fullWidth:false},Columns:[this._createEmptyColumn(u)]}},_createEmptyCell:function(){return{Id:o(),Descriptor:{},Widgets:[]}},_saveHost:function(){this.oHost=sap.ui.getCore().byId("sap.shell.host.environment");if(!this.oHost){this.oHost=new g("sap.shell.host.environment",{resolveDestination:function(e){if(!e){return Promise.reject()}return Promise.resolve("/dynamic_dest/"+e)}})}}})});
//# sourceMappingURL=WorkPageBuilder.controller.js.map