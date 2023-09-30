/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/base/EventProvider","sap/m/Menu","sap/m/MenuItem","../getResourceBundle","../thirdparty/three","./CoordinateSystem"],function(e,t,i,s,n,r){"use strict";var o=e.extend("sap.ui.vk.tools.ScaleToolHandler",{metadata:{library:"sap.ui.vk"},constructor:function(e){this._priority=11;this._tool=e;this._gizmo=e.getGizmo();this._rect=null;this._rayCaster=new THREE.Raycaster;this._handleIndex=-1;this._gizmoIndex=-1;this._handleAxis=new THREE.Vector3;this._handleDirection=new THREE.Vector3;this._gizmoOrigin=new THREE.Vector3;this._mouse=new THREE.Vector2;this._mouseOrigin=new THREE.Vector2;this._originScale=1;this._objectSize=1}});o.prototype._updateMouse=function(e){var t=this.getViewport().getRenderer().getSize(new THREE.Vector2);this._mouse.x=(e.x-this._rect.x)/t.width*2-1;this._mouse.y=(e.y-this._rect.y)/t.height*-2+1;this._rayCaster.setFromCamera(this._mouse,this.getViewport().getCamera().getCameraRef())};o.prototype._updateHandles=function(e,t){var i=this._handleIndex;this._handleIndex=-1;if(e.n===1||e.event&&e.event.type==="contextmenu"){for(var s=0,n=this._gizmo.getGizmoCount();s<n;s++){var r=this._gizmo.getTouchObject(s);var o=this._rayCaster.intersectObjects(r.children,false);if(o.length>0){this._handleIndex=r.children.indexOf(o[0].object);if(this._handleIndex>=0){this._gizmoIndex=s;this._gizmoOrigin.setFromMatrixPosition(r.matrixWorld);this._handleAxis.setFromMatrixColumn(r.matrixWorld,this._handleIndex%3).normalize();this._originScale=this._gizmo._getObjectScale(s).x;this._objectSize=this._gizmo._getObjectSize(s)/r.scale.x||1;var h=(new THREE.Vector3).setFromMatrixColumn(r.matrixWorld,(this._handleIndex+1)%3).normalize();var a=(new THREE.Vector3).setFromMatrixColumn(r.matrixWorld,(this._handleIndex+2)%3).normalize();this._handleDirection.addVectors(h,a).normalize()}}}}this._gizmo.highlightHandle(this._handleIndex,t||this._handleIndex===-1);if(i!==this._handleIndex){this.getViewport().setShouldRenderFrame()}};o.prototype.hover=function(e){if(this._inside(e)&&!this._gesture){this._updateMouse(e);this._updateHandles(e,true);e.handled|=this._handleIndex>=0}};o.prototype.click=function(e){if(this._inside(e)&&!this._gesture){this._updateMouse(e);this._updateHandles(e,true);this._gizmo.selectHandle(this._handleIndex,this._gizmoIndex);e.handled|=this._handleIndex>=0}};o.prototype._getAxisOffset=function(){var e=this._rayCaster.ray;var t=this._handleAxis.clone().cross(e.direction).cross(e.direction).normalize();var i=e.origin.clone().sub(this._gizmoOrigin);return t.dot(i)/t.dot(this._handleAxis)};o.prototype._getPlaneOffset=function(){var e=this._rayCaster.ray;var t=this._gizmoOrigin.clone().sub(e.origin);var i=this._handleAxis.dot(t)/this._handleAxis.dot(e.direction);return e.direction.clone().multiplyScalar(i).sub(t)};o.prototype.beginGesture=function(e){if(this._inside(e)&&!this._gesture){this._updateMouse(e);this._updateHandles(e,false);if(this._handleIndex>=0){this._gesture=true;e.handled=true;this._mouseOrigin.set(e.x,e.y);this._gizmo.selectHandle(this._handleIndex,this._gizmoIndex);this._gizmo.beginGesture();if(this._handleIndex<3){this._dragOrigin=this._getAxisOffset()}else if(this._handleIndex<6){this._dragOrigin=this._handleDirection.dot(this._getPlaneOffset())}}}};o.prototype.move=function(e){if(this._gesture){if(this._tool.getEnableSnapping()){this._tool.getDetector().detect({viewport:this._tool._viewport,gizmo:this._gizmo,detectType:"scale"})}e.handled=true;this._updateMouse(e);var t=(new THREE.Vector3).setScalar(1);if(this._handleIndex<3){if(this._tool.getNonUniformScaleEnabled()){t.setComponent(this._handleIndex,this._getAxisOffset()/this._dragOrigin)}else{t.setScalar(this._getAxisOffset()/this._dragOrigin)}}else if(this._handleIndex<6){t.setScalar(this._handleDirection.dot(this._getPlaneOffset())/this._dragOrigin).setComponent(this._handleIndex-3,1)}else{var i=(this._mouseOrigin.y-e.y)/60;t.setScalar(i>=0?1+i:1/(1-i))}if(t.x&&t.y&&t.z&&isFinite(t.x)&&isFinite(t.y)&&isFinite(t.z)){if(this._tool.getEnableStepping()){var s=Math.pow(10,Math.round(Math.log10(this._originScale/this._objectSize)))/this._originScale;if(s>0&&isFinite(s)){t.setScalar(Math.max(Math.round(t.x/s),1)*s)}}this._gizmo._setScale(t)}}};o.prototype.endGesture=function(e){if(this._gesture){this._gesture=false;e.handled=true;this._updateMouse(e);this._gizmo.endGesture();this._dragOrigin=undefined;this._updateHandles(e,true);this.getViewport().setShouldRenderFrame()}};o.prototype.contextMenu=function(e){if(!this._tool.getAllowContextMenu()){return}if(this._inside(e)){this._updateMouse(e);this._updateHandles(e,true);if(this._handleIndex>=0){e.handled=true;var n=new t({items:[new i({text:s().getText("TOOL_COORDINATE_SYSTEM_WORLD"),key:r.World}),new i({text:s().getText("TOOL_COORDINATE_SYSTEM_LOCAL"),key:r.Local}),new i({text:s().getText("TOOL_COORDINATE_SYSTEM_SCREEN"),key:r.Screen}),new i({text:s().getText("TOOL_COORDINATE_SYSTEM_CUSTOM"),key:r.Custom})],itemSelected:function(e){var t=e.getParameters("item").item;this._tool.setCoordinateSystem(t.getKey())}.bind(this)});n.openAsContextMenu(e.event,this.getViewport())}}};o.prototype.getViewport=function(){return this._tool._viewport};o.prototype._getOffset=function(e){var t=e.getBoundingClientRect();var i={x:t.left+window.pageXOffset,y:t.top+window.pageYOffset};return i};o.prototype._inside=function(e){if(this._rect===null||true){var t=this._tool._viewport.getIdForLabel();var i=document.getElementById(t);if(i===null){return false}var s=this._getOffset(i);this._rect={x:s.x,y:s.y,w:i.offsetWidth,h:i.offsetHeight}}return e.x>=this._rect.x&&e.x<=this._rect.x+this._rect.w&&e.y>=this._rect.y&&e.y<=this._rect.y+this._rect.h};return o});
//# sourceMappingURL=ScaleToolHandler.js.map