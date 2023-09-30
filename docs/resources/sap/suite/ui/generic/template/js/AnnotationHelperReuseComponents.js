sap.ui.define(["sap/suite/ui/generic/template/extensionAPI/UIMode","sap/base/util/extend","sap/suite/ui/generic/template/js/AnnotationHelper"],function(e,t,n){"use strict";var i="{_templPriv>/generic/isActive}";function r(e){return"!${_templPriv>/generic/embeddedComponents/"+e.id+"/hidden}"}function a(e,t,r){return"{= $"+i+" && !!${_templPriv>/generic/embeddedComponents/"+e.id+"/isInVisibleArea} && "+n.getControlVisibleTerm(t)+" && "+n.getControlVisibleTerm(r)+" }"}function o(n,r,o,s,c,u,p){var l=n.getInterface(0),m=l.getModel(),d=r.entityType?m.getODataEntityType(r.entityType):s.oEntityType;var g=o.binding;if(g){var v=m.getODataAssociationSetEnd(d,g);if(v&&v.entitySet){r=m.getODataEntitySet(v.entitySet);d=m.getODataEntityType(r.entityType)}}var f=r?sap.ui.model.odata.AnnotationHelper.format(l,r["com.sap.vocabularies.Common.v1.SemanticObject"]):s.semanticObject;var y={uiMode:"{= ${ui>/createMode} ? '"+e.Create+"' : ( ${ui>/editable} ? '"+e.Edit+"' : '"+e.Display+"') }",semanticObject:f||"",stIsAreaVisible:c?a(o,u,p):i};t(y,o.settings);var b=JSON.stringify(y);b=b.replace(/\}/g,"\\}").replace(/\{/g,"\\{");return b}function s(e,t,n,i,r,a){return o(e,t,n,i,true,r,a)}s.requiresIContext=true;function c(e,t,n,i){return o(e,t,n,i,false)}c.requiresIContext=true;function u(e,t,n,i){var r=e&&(e.ID&&e.RecordType==="com.sap.vocabularies.UI.v1.CollectionFacet")?e.ID.String:!e.ID&&e.RecordType==="com.sap.vocabularies.UI.v1.ReferenceFacet"&&e.Target.AnnotationPath;var a=r&&t[r]||[];var o=a.map(function(e){var t=n[e];t.sectionId=i;return t});return o}return{formatVisibleComponentSection:function(e){return"{= "+r(e)+" }"},formatComponentSettingsSubSection:s,formatComponentSettingsCanvas:c,getFollowingComponentsForFacet:u}},true);
//# sourceMappingURL=AnnotationHelperReuseComponents.js.map