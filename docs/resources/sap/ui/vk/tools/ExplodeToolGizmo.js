/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["../getResourceBundle","../thirdparty/three","./Gizmo","./AxisColours","./ExplodeAxis","./ExplodeDirection","./ExplodeType","../AnimationTrackType","sap/base/assert","sap/base/Log","sap/ui/core/Core"],function(t,e,i,o,r,s,a,n,h,u,d){"use strict";var l=i.extend("sap.ui.vk.tools.ExplodeToolGizmo",{metadata:{library:"sap.ui.vk"}});var c=96;var p=48;var _={PositiveX:0,PositiveY:1,PositiveZ:2,NegativeX:3,NegativeY:4,NegativeZ:5,ResetAdjustment:6,AdjustUp:7,AdjustDown:8,MoveUp:9,MoveDown:10};l.prototype.init=function(){if(i.prototype.init){i.prototype.init.apply(this)}this._createEditingForm(t().getText("TOOL_UNITS_MM"),84);this._moveDelta=new THREE.Vector3;this._anchorPosition=new THREE.Vector3;this._axisDirection=new THREE.Vector3;this._axisColor=0;this._magnitude=0;this._viewport=null;this._tool=null;this._groups=[];this._nodes=[];this._groupsMap=new Map;this._sceneGizmo=new THREE.Scene;var e=new THREE.AmbientLight(16777215,.5);e.layers.enableAll();this._sceneGizmo.add(e);var r=new THREE.DirectionalLight(16777215,.5);r.position.set(1,3,2);r.layers.enableAll();this._sceneGizmo.add(r);this._gizmo=new THREE.Group;this._touchAreas=new THREE.Group;this._touchAreas2=new THREE.Group;this._sceneGizmo.add(this._gizmo);this._matViewProj=new THREE.Matrix4;var s=new THREE.MeshLambertMaterial({color:33023,transparent:true,opacity:.2});function a(t,e,i,o){var r=1,a=4,n=24;var h=new THREE.MeshLambertMaterial({color:i});var u=new THREE.CylinderBufferGeometry(r,r,t-n,4);var d=new THREE.Vector3(e.y,e.z,e.x);var l=new THREE.Vector3(e.z,e.x,e.y);var c=e.x<0||e.y<0||e.z<0?(new THREE.Matrix4).makeBasis(l,e,d):(new THREE.Matrix4).makeBasis(d,e,l);c.setPosition(e.clone().multiplyScalar((t-n)*.5));u.applyMatrix4(c);var _=new THREE.Mesh(u,h);_.matrixAutoUpdate=false;_.userData.color=i;var m=new THREE.CylinderBufferGeometry(0,a,n,12,1);c.setPosition(e.clone().multiplyScalar(t-n*.5));m.applyMatrix4(c);var g=new THREE.Mesh(m,h);g.matrixAutoUpdate=false;_.add(g);if(o){var f=new THREE.CylinderGeometry(p*.5,p*.5,t-p+n*.5,12,1);c.setPosition(e.clone().multiplyScalar(p+f.parameters.height*.5));f.applyMatrix4(c);var E=new THREE.CylinderGeometry(p*.5,0,p,12,1);c.setPosition(e.clone().multiplyScalar(p*.5));f.merge(E,c);o.add(new THREE.Mesh(f,s))}return _}this._gizmo.add(a(c,new THREE.Vector3(1,0,0),o.x,this._touchAreas));this._gizmo.add(a(c,new THREE.Vector3(0,1,0),o.y,this._touchAreas));this._gizmo.add(a(c,new THREE.Vector3(0,0,1),o.z,this._touchAreas));this._gizmo.add(a(c,new THREE.Vector3(-1,0,0),o.x,this._touchAreas));this._gizmo.add(a(c,new THREE.Vector3(0,-1,0),o.y,this._touchAreas));this._gizmo.add(a(c,new THREE.Vector3(0,0,-1),o.z,this._touchAreas));this._axisTitles=this._createAxisTitles(undefined,undefined,false,true);this._sceneGizmo.add(this._axisTitles);var n=32;var h=n*1.75;this._groupGizmo=new THREE.Group;this._sceneGizmo.add(this._groupGizmo);var u=new THREE.Mesh(new THREE.IcosahedronBufferGeometry(8,1),new THREE.MeshLambertMaterial);this._groupGizmo.add(u);this._groupGizmo.add(a(n*1.5,new THREE.Vector3(0,1,0),16777215));this._groupGizmo.add(a(n*1.5,new THREE.Vector3(0,-1,0),16777215));var d=16;var l=new THREE.CylinderGeometry(0,6,d,16).applyMatrix4((new THREE.Matrix4).setPosition(0,h+d*.5,0));l.merge(new THREE.CylinderGeometry(0,6,d,16),(new THREE.Matrix4).setPosition(0,h+d*1.5,0));this._groupGizmo.add(new THREE.Mesh((new THREE.BufferGeometry).fromGeometry(l),new THREE.MeshLambertMaterial));this._groupGizmo.add(new THREE.Mesh((new THREE.BufferGeometry).fromGeometry(l.rotateX(Math.PI)),new THREE.MeshLambertMaterial));this._groupGizmo.add(new THREE.Mesh(new THREE.CylinderGeometry(16,16,n*6,12,1),new THREE.MeshBasicMaterial({color:16777215,transparent:true,opacity:.5,side:THREE.BackSide})));function _(t,e,i){var o=new THREE.IcosahedronGeometry(p*.5,1);o.applyMatrix4((new THREE.Matrix4).setPosition(0,(t+e)*.5,0));i.add(new THREE.Mesh(o,s))}_(n*-.5,n*.5,this._touchAreas2);_(n*.5,n*1.5,this._touchAreas2);_(n*-1.5,n*-.5,this._touchAreas2);_(h,h+n,this._touchAreas2);_(-h-n,-h,this._touchAreas2);function m(t){t.traverse(function(t){t.layers.enableAll()})}function g(t){t.children.forEach(function(t,e){t.traverse(function(t){t.layers.enable(Math.min(e,6)+1)})})}g(this._gizmo);g(this._axisTitles);g(this._touchAreas);m(this._groupGizmo);m(this._touchAreas2)};l.prototype.hasDomElement=function(){return false};l.prototype.show=function(t,e){this._viewport=t;this._tool=e;this._nodes.length=0;this._handleGroupsChanged()};l.prototype.hide=function(){this._cleanTempData();this._viewport=null;this._tool=null;this._updateEditingForm(false)};l.prototype.getGizmoCount=function(){if(!this._groups.length){return 0}return this._getActiveAxisIndex()>=0&&this._magnitude>0&&this._getSelectedItem()?2:1};l.prototype.getTouchObject=function(t){if(t===0){this._updateGizmoObjectTransformation(this._touchAreas);return this._touchAreas}else{this._updateGroupGizmoTransformation(this._touchAreas2);return this._touchAreas2}};l.prototype._handleGroupsChanged=function(t){this._setMagnitude(0);var e=this._groupsMap;e.clear();this._groups=this._tool.getItems().slice();var i=this._nodes=[];this._groups.forEach(function(t){var o=t.getItems();for(var r=0;r<o.length;r++){var s=o[r].getNodeRef();e.set(s,t);var a=new THREE.Box3;s._expandBoundingBox(a,false,true,true);i.push({node:s,center:a.getCenter(new THREE.Vector3),group:t,local:(new THREE.Vector3).setFromMatrixPosition(s.matrix),origin:(new THREE.Vector3).setFromMatrixPosition(s.matrixWorld),matParentInv:s.parent?(new THREE.Matrix4).getInverse(s.parent.matrixWorld):new THREE.Matrix4})}});this._calculateGroupOffsets();this._setMagnitude(this._tool.getMagnitude())};l.prototype._getSelectedItem=function(){return d.byId(this._tool.getSelectedItem())};l.prototype._handleSelectedItemChanged=function(){var t=this._viewport._viewStateManager;var e=new Set;var i=this._getSelectedItem();if(i){i.getItems().forEach(function(t){e.add(t.getNodeRef())})}var o=[];t.enumerateOutlinedNodes(function(t){if(!e.has(t)){o.push(t)}});t.setOutliningStates(Array.from(e),o,false)};l.prototype.highlightHandle=function(t,e){this._handleIndex=t;this._gizmo.children.forEach(function(e,i){var o=t===i;var r=o?16776960:e.userData.color;e.material.color.setHex(r);this._axisTitles.children[i].material.color.setHex(r)}.bind(this));for(var i=0;i<5;i++){this._groupGizmo.children[i].material.color.setHex(i+6===t?16776960:this._axisColor)}};l.prototype._calculateGroupOffsets=function(){var t=this._axisDirection;if(this._tool.getType()===a.Linear){var e=new THREE.Vector3(Math.abs(t.x),Math.abs(t.y),Math.abs(t.z));var i=new THREE.Vector3;var o=0,r=0;this._groups.forEach(function(t,s){var a=t.getBoundingBox();a.getCenter(t._center);a.getSize(i);o=e.dot(i);if(s>0){r+=o*.5}t._offset=r;t._deltaOffset=o*.5;r+=o*.5});r+=o*.5;var s=r>0?1/r:1;this._groups.forEach(function(t){t._offset=1-t._offset*s;t._deltaOffset*=s})}else{var n=1/this._groups.length;this._groups.forEach(function(t,e){var i=t.getBoundingBox();i.getCenter(t._center);t._offset=1-e*n;t._deltaOffset=n*.5;var o=-1;var r=new THREE.Vector3;var s=t.getItems();for(var a=0;a<s.length;a++){var h=s[a].getNodeRef();var u=new THREE.Box3;h._expandBoundingBox(u,false,true,true);var d=u.getSize(new THREE.Vector3).manhattanLength();if(o<d){o=d;u.getCenter(r)}}})}};l.prototype._getActiveAxisIndex=function(){var t=this._tool.getAxis();var e=this._tool.getDirection();var i=t&&e?[r.X,r.Y,r.Z].indexOf(t):-1;if(i>=0&&e===s.Negative){i+=3}return i};l.prototype._recalculateOffsets=function(){this._setMagnitude(0);this._calculateGroupOffsets();this._setMagnitude(this._tool.getMagnitude());this._viewport.setShouldRenderFrame()};l.prototype._updateAxis=function(){var t=this._getActiveAxisIndex();if(t>=0){this._updateGizmoObjectTransformation(this._gizmo);this._axisDirection.setFromMatrixColumn(this._gizmo.matrixWorld,t%3).normalize().multiplyScalar(t<3?1:-1);this._anchorPosition.setFromMatrixPosition(this._gizmo.matrixWorld);this._axisColor=this._gizmo.children[t].userData.color;for(var e=0;e<5;e++){this._groupGizmo.children[e].material.color.setHex(this._axisColor)}this._recalculateOffsets()}else{this._setMagnitude(0);this._viewport.setShouldRenderFrame()}};l.prototype._moveSelectedGroup=function(t){var e=this._tool;var i=this._getSelectedItem();var o=e.getItems();var r=o.indexOf(i);if(r>=0&&r+t>=0&&r+t<o.length){e.removeItem(i);e.insertItem(i,r+t);e.fireItemSequenceChangePressed({item:i,moveUp:t<0})}};l.prototype._setMagnitudeAdjustmentMultiplier=function(t,e){var i=this._getSelectedItem();if(i){i.setMagnitudeAdjustmentMultiplier(t);this._updatePositions();this._tool[e?"fireItemPositionAdjusted":"fireItemPositionAdjusting"]({item:i,magnitudeAdjustmentMultiplier:i.getMagnitudeAdjustmentMultiplier()})}};l.prototype._beginGesture=function(){this._moveDelta.setScalar(0);this._beginMagnitude=this._magnitude;var t=this._tool;switch(this._handleIndex){case _.ResetAdjustment:this._setMagnitudeAdjustmentMultiplier(0,true);break;case _.AdjustUp:case _.AdjustDown:var e=this._getSelectedItem();this._magnitudeAdjustmentMultiplier=e?e.getMagnitudeAdjustmentMultiplier():0;break;case _.MoveUp:this._moveSelectedGroup(-1);break;case _.MoveDown:this._moveSelectedGroup(+1);break;default:if(this._handleIndex<6&&(!t.getAxis()||!t.getDirection())){t.setAxis([r.X,r.Y,r.Z][this._handleIndex%3]);t.setDirection(this._handleIndex<3?s.Positive:s.Negative);t.fireAxisSelected({axis:t.getAxis(),direction:t.getDirection()})}break}};l.prototype._setMagnitude=function(t){this._magnitude=t;this._groups.forEach(function(e){e._magnitude=t});this._updatePositions()};l.prototype._setOffset=function(t){var e=this._tool;if(this._handleIndex<6){e.setMagnitude(this._beginMagnitude+t);e.fireMagnitudeChanging({type:e.getType(),axis:e.getAxis(),direction:e.getDirection(),magnitude:e.getMagnitude()})}else if(this._handleIndex===_.AdjustUp||this._handleIndex===_.AdjustDown){var i=this._magnitude>0?this._getSelectedItem():null;if(i){this._setMagnitudeAdjustmentMultiplier(this._magnitudeAdjustmentMultiplier+t/(this._magnitude*i._deltaOffset))}}};l.prototype._updatePositions=function(){var t=this._tool.getType()===a.Linear;var e=new THREE.Vector3;var i=new THREE.Vector3;var o=new THREE.Vector3;this._nodes.forEach(function(r){var s=r.node;if(t){i.copy(this._axisDirection)}else{i.copy(r.center).sub(this._anchorPosition);o.copy(this._axisDirection).multiplyScalar(i.dot(o));i.sub(o).normalize()}i.multiplyScalar(r.group.getMagnitude());e.copy(r.origin).add(i);s.matrixWorld.setPosition(e);s.matrix.multiplyMatrices(r.matParentInv,s.matrixWorld);s.position.setFromMatrixPosition(s.matrix);s.updateMatrixWorld(true);if(s.parent!==this._getEffectiveParent(s)){this._viewport._viewStateManager._setJointNodeOffsets(s,n.Translate)}}.bind(this));this._viewport.setShouldRenderFrame()};l.prototype._endGesture=function(){var t=this._tool;if(this._handleIndex<6){t.fireMagnitudeChanged({type:t.getType(),axis:t.getAxis(),direction:t.getDirection(),magnitude:t.getMagnitude()})}else if(this._handleIndex===_.AdjustUp||this._handleIndex===_.AdjustDown){var e=this._magnitude>0?this._getSelectedItem():null;if(e){t.fireItemPositionAdjusted({item:e,magnitudeAdjustmentMultiplier:e.getMagnitudeAdjustmentMultiplier()})}}};l.prototype.expandBoundingBox=function(t){if(this._viewport){this._expandBoundingBox(t,this._viewport.getCamera().getCameraRef(),true)}};l.prototype._updateGizmoObjectTransformation=function(t){t.matrix.fromArray(this._tool.getAnchor());t.matrix.decompose(t.position,t.quaternion,t.scale);var e=this._getGizmoScale(t.position);t.scale.setScalar(e);t.matrixAutoUpdate=true;t.updateMatrixWorld(true);return e};l.prototype._updateGroupGizmoTransformation=function(t){var e=this._getActiveAxisIndex();var i=e>=0&&this._magnitude>0?this._getSelectedItem():null;t.visible=!!i;if(i){if(this._tool.getType()===a.Linear){t.position.copy(this._axisDirection).multiplyScalar(i.getMagnitude()).add(i._center)}else{t.position.copy(i._center)}t.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),this._axisDirection);t.scale.setScalar(this._getGizmoScale(t.position));t.updateMatrix();t.updateMatrixWorld()}};l.prototype._updateGizmoTransformation=function(t,e){this._updateGizmoObjectTransformation(this._gizmo)};l.prototype._getCameraLayersMask=function(){var t=0|0;var e=this._getActiveAxisIndex();t=1<<e+1;if(e>=0&&this._magnitude>0&&this._getSelectedItem()){t|=1<<7}return t};l.prototype.render=function(){h(this._viewport&&this._viewport.getMetadata().getName()==="sap.ui.vk.threejs.Viewport","Can't render gizmo without sap.ui.vk.threejs.Viewport");if(this._tool&&this._groups.length>0){var t=this._viewport.getRenderer(),e=this._viewport.getCamera().getCameraRef();this._matViewProj.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse);t.clearDepth();var i=this._updateGizmoObjectTransformation(this._gizmo);this._updateAxisTitles(this._axisTitles,this._gizmo,e,c+18,i);this._updateGroupGizmoTransformation(this._groupGizmo);var o=e.layers.mask;e.layers.mask=this._getCameraLayersMask();t.render(this._sceneGizmo,e);e.layers.mask=o}};return l});
//# sourceMappingURL=ExplodeToolGizmo.js.map