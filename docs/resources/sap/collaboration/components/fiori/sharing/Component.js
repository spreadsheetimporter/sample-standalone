/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2017 SAP SE. All rights reserved
 */
sap.ui.define(["sap/base/Log","sap/collaboration/components/utils/CommonUtil","sap/collaboration/library","sap/ui/core/UIComponent","sap/ui/core/mvc/View","sap/ui/core/library"],function(e,t,i,a,o,n){"use strict";var s=n.mvc.ViewType;var r=a.extend("sap.collaboration.components.fiori.sharing.Component",{metadata:{includes:["../../resources/css/Sharing.css"],properties:{width:{type:"sap.ui.core.CSSSize",defaultValue:"100%"},height:{type:"sap.ui.core.CSSSize",defaultValue:"100%"},oDataServiceUrl:{type:"sap.ui.core.URI",defaultValue:"/sap/opu/odata/sap/SM_INTEGRATION_V2_SRV"},collaborationHostODataServiceUrl:{type:"sap.ui.core.URI",defaultValue:"/sap/bc/ui2/smi/rest_tunnel/Jam/api/v1/OData"},tunnelServiceUrl:{type:"sap.ui.core.URI",defaultValue:"/sap/bc/z_sail_httproxy/Jam/api/v1/OData"},object:{type:"object"},attachments:{type:"object"},externalObject:{type:"object"}}},init:function(){this.oCommonUtil=new t;this.oLangBundle=this.oCommonUtil.getLanguageBundle();this.sODataServiceUrl=undefined;this.sTunnelServiceUrl=undefined;this.sJamUrl=undefined;this.oODataUtil=undefined;this.oSharingView=undefined;this.oView=undefined;this.aJamGroups=[];this.bOdataOn=true},onBeforeRendering:function(){},onAfterRendering:function(){this.logComponentProperties();if(this.bStopRendering===undefined||this.bStopRendering===false){this.oSharingView=this.getSharingView();this.oSharingView.placeAt(this.getId())}},exit:function(){this.oSharingView.destroy()},setSettings:function(e){this.setODataServiceUrl(e.oDataServiceUrl);this.setTunnelServiceUrl(e.tunnelServiceUrl);this.setObject(e.object);this.setAttachments(e.attachments);this.setExternalObject(e.externalObject)},render:function(e){e.openStart("div",this.getId());e.style("width",this.getWidth());e.style("height",this.getHeight());e.openEnd();e.close("div")},getSharingView:function(){var e;var t;var i;var a=this.getObject();if(a){i=a.id;e=a.display;t=a.share}var o=this.getComponentData();if(o){this.oDialogComponent=o.dialogComponent}var n=this;var r=function(){if(!n.oNoGroupsView){n.oNoGroupsView=sap.ui.view({id:n.getId()+"_NoGroupsView",viewData:{controlId:n.getId(),langBundle:n.oLangBundle,jamUrl:n.oSharingView.getController().sJamUrl},type:s.JS,viewName:"sap.collaboration.components.fiori.sharing.NoGroups"})}n.oSharingView.destroy();n.oSharingView=undefined;n.oNoGroupsView.placeAt(n.getId())};if(!this.oSharingView){this.oSharingView=sap.ui.view({id:this.getId()+"_SharingView",viewData:{controlId:this.getId(),odataServiceUrl:this.systemSettings.oDataServiceUrl,collaborationHostODataServiceUrl:this.systemSettings.collaborationHostODataServiceUrl,collaborationHostRestService:this.systemSettings.collaborationHostRestService,langBundle:this.oLangBundle,jamGroups:this.aJamGroups,sharingDialog:undefined,noGroupsCallBack:r,objectDisplay:e,objectShare:t,objectId:i,attachments:this.getAttachments(),externalObject:this.getExternalObject()},type:s.JS,viewName:"sap.collaboration.components.fiori.sharing.Sharing"})}else{this.oSharingView.getViewData().objectId=i;this.oSharingView.getViewData().objectShare=t;this.oSharingView.getViewData().objectDisplay=e;this.oSharingView.getViewData().externalObject=this.getExternalObject()}if(this.oNoGroupsView){this.oNoGroupsView.destroy();this.oNoGroupsView=undefined}return this.oSharingView},shareToJam:function(){this.oSharingView.getController().shareToJam()},logComponentProperties:function(){e.debug("Share Component properties:","","sap.collaboration.components.fiori.sharing.Component.logComponentProperties()");e.debug("width: "+this.getWidth());e.debug("height: "+this.getHeight());e.debug("oDataServiceUrl: "+this.getODataServiceUrl());e.debug("tunnelServiceUrl: "+this.getTunnelServiceUrl());if(this.getObject()){e.debug("object->id: "+this.getObject().id);e.debug("object->display: "+this.getObject().display);e.debug("object->share: "+this.getObject().share)}else{e.debug("object: undefined")}if(this.getAttachments()&&this.getAttachments().attachmentsArray){e.debug("Attachments:");var t=this.getAttachments().attachmentsArray;for(var i=0;i<t.length;i++){e.debug("Attachments"+(i+1)+":");e.debug(t[i].mimeType);e.debug(t[i].name);e.debug(t[i].url)}}else{e.debug("attachments: undefined")}if(this.getExternalObject()){e.debug("externalObject->appContext: "+this.getObject().appContext);e.debug("externalObject->odataServicePath: "+this.getObject().odataServicePath);e.debug("externalObject->collection: "+this.getObject().collection);e.debug("externalObject->key: "+this.getObject().key);e.debug("object->name: "+this.getObject().name);e.debug("object->summary: "+this.getObject().summary)}else{e.debug("externalObject: undefined")}}});return r});
//# sourceMappingURL=Component.js.map