/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/core/ResizeHandler","../abgrToColor","../CameraFOVBindingType","../CameraProjectionType","../colorToABGR","../colorToCSSColor","../Core","../cssColorToColor","../getResourceBundle","../glMatrix","../Loco","../Messages","../SelectionMode","../Smart2DHandler","../ViewportBase","../ViewportHandler","../VisibilityMode","../ZoomTo","../OutputSettings","./getJSONObject","./Scene","./ViewportRenderer","sap/base/Log"],function(e,t,i,r,o,n,a,s,d,l,h,v,p,c,_,f,u,m,R,y,g,I,C){"use strict";var V;var S=function(){if(V){return}V={encodedProjectionType:{},decodedProjectionType:{},encodedBindingType:{},decodedBindingType:{},decodedZoomTo:{}};V.decodedProjectionType[r.Perspective]=sap.ve.dvl.DVLCAMERAPROJECTION.PERSPECTIVE;V.decodedProjectionType[r.Orthographic]=sap.ve.dvl.DVLCAMERAPROJECTION.ORTHOGRAPHIC;V.encodedProjectionType[sap.ve.dvl.DVLCAMERAPROJECTION.PERSPECTIVE]=r.Perspective;V.encodedProjectionType[sap.ve.dvl.DVLCAMERAPROJECTION.ORTHOGRAPHIC]=r.Orthographic;V.decodedBindingType[i.Minimum]=sap.ve.dvl.DVLCAMERAFOVBINDING.MIN;V.decodedBindingType[i.Maximum]=sap.ve.dvl.DVLCAMERAFOVBINDING.Max;V.decodedBindingType[i.Horizontal]=sap.ve.dvl.DVLCAMERAFOVBINDING.HORZ;V.decodedBindingType[i.Vertical]=sap.ve.dvl.DVLCAMERAFOVBINDING.VERT;V.encodedBindingType[sap.ve.dvl.DVLCAMERAFOVBINDING.MIN]=i.Minimum;V.encodedBindingType[sap.ve.dvl.DVLCAMERAFOVBINDING.MAX]=i.Maximum;V.encodedBindingType[sap.ve.dvl.DVLCAMERAFOVBINDING.HORZ]=i.Horizontal;V.encodedBindingType[sap.ve.dvl.DVLCAMERAFOVBINDING.VERT]=i.Vertical;V.decodedZoomTo[m.All]=sap.ve.dvl.DVLZOOMTO.DVLZOOMTO_ALL;V.decodedZoomTo[m.Visible]=sap.ve.dvl.DVLZOOMTO.DVLZOOMTO_VISIBLE;V.decodedZoomTo[m.Selected]=sap.ve.dvl.DVLZOOMTO.DVLZOOMTO_SELECTED;V.decodedZoomTo[m.Node]=sap.ve.dvl.DVLZOOMTO.DVLZOOMTO_NODE;V.decodedZoomTo[m.NodeSetIsolation]=sap.ve.dvl.DVLZOOMTO.DVLZOOMTO_NODE_SETISOLATION;V.decodedZoomTo[m.Restore]=sap.ve.dvl.DVLZOOMTO.DVLZOOMTO_RESTORE;V.decodedZoomTo[m.RestoreRemoveIsolation]=sap.ve.dvl.DVLZOOMTO.DVLZOOMTO_RESTORE_REMOVEISOLATION;V.decodedZoomTo[m.ViewLeft]=sap.ve.dvl.DVLZOOMTO.VIEW_LEFT;V.decodedZoomTo[m.ViewRight]=sap.ve.dvl.DVLZOOMTO.VIEW_RIGHT;V.decodedZoomTo[m.ViewTop]=sap.ve.dvl.DVLZOOMTO.VIEW_TOP;V.decodedZoomTo[m.ViewBottom]=sap.ve.dvl.DVLZOOMTO.VIEW_BOTTOM;V.decodedZoomTo[m.ViewBack]=sap.ve.dvl.DVLZOOMTO.VIEW_BACK;V.decodedZoomTo[m.ViewFront]=sap.ve.dvl.DVLZOOMTO.VIEW_FRONT};var T=_.extend("sap.ui.vk.dvl.Viewport",{metadata:{library:"sap.ui.vk",properties:{backgroundColorTopABGR:{type:"int",defaultValue:4278190080},backgroundColorBottomABGR:{type:"int",defaultValue:4294967295}},events:{pan:{parameters:{dx:"int",dy:"int"}},zoom:{parameters:{zoomFactor:"float"}},rotate:{parameters:{dx:"int",dy:"int"}},frameRenderingFinished:{}}}});var O=T.getMetadata().getParent().getClass().prototype;T.prototype.init=function(){if(O.init){O.init.call(this)}this._eventBus=a.getEventBus();this._graphicsCore=null;this._dvl=null;this._dvlRendererId=null;this._viewStateManager=null;this._canvas=null;this._resizeListenerId=null;this._is2D=false;this._viewportHandler=new f(this);this._loco=new h(this);this._loco.addHandler(this._viewportHandler,-1);this._smart2DHandler=null;this._lastPlayedStep=null;this._contentConnector=null};T.prototype.exit=function(){this._loco.removeHandler(this._viewportHandler);this._viewportHandler.destroy();if(this._resizeListenerId){e.deregister(this._resizeListenerId);this._resizeListenerId=null}this.setViewStateManager(null);this.setScene(null);this.setGraphicsCore(null);if(O.exit){O.exit.call(this)}};T.prototype.setGraphicsCore=function(e){S();if(e!=this._graphicsCore){if(this._graphicsCore){this._dvl.Client.detachFrameFinished(this._handleFrameFinished,this);this._dvl.Client.detachStepEvent(this._updateLastPlayedStep,this);this._dvl.Renderer.SetViewStateManager(null,this._dvlRendererId);this._graphicsCore._deregisterViewport(this);this._dvl=null}this._graphicsCore=e;if(this._graphicsCore){this._dvl=this._graphicsCore._getDvl();this._graphicsCore._registerViewport(this);this.setShowDebugInfo(this.getShowDebugInfo());this._dvl.Client.attachStepEvent(this._updateLastPlayedStep,this);this._dvl.Client.attachFrameFinished(this._handleFrameFinished,this);this._dvl.Renderer.SetViewStateManager(this._viewStateManager,this._dvlRendererId)}}return this};T.prototype.getGraphicsCore=function(){return this._graphicsCore};T.prototype._setCanvas=function(e){var t=this.getDomRef()&&this._canvas!==e;this._canvas=e;if(t){this.invalidate()}return this};T.prototype._setRenderer=function(e){this._dvlRendererId=e;return this};T.prototype._updateLastPlayedStep=function(e){if(e.type===sap.ve.dvl.DVLSTEPEVENT.DVLSTEPEVENT_STARTED){this._lastPlayedStep=e.stepId;this._updateOutputSettings()}};T.prototype.setScene=function(e){if(this._dvlRendererId){this._dvl.Renderer.AttachScene(e&&e.getSceneRef()||null,this._dvlRendererId);this._dvlSceneRef=e?e.getSceneRef():null;if(e){this._dvl.Client.attachUrlClicked(this._fireUrlClicked,this);var t=this._isSmart2DContent()||this._isSmart2DContentLegacy();if(t){this._dvl.Renderer.SetBackgroundColor(1,1,1,1,1,1,1,1,this._dvlRendererId)}else{var i=this._getDecomposedABGR(this.getBackgroundColorTopABGR());var r=this._getDecomposedABGR(this.getBackgroundColorBottomABGR());this._dvl.Renderer.SetBackgroundColor(i.red,i.green,i.blue,i.alpha,r.red,r.green,r.blue,r.alpha,this._dvlRendererId)}this._updateOutputSettings();this.fireViewActivated({type:t?"2D":"3D"})}else{this._dvl.Client.detachUrlClicked(this._fireUrlClicked,this);if(this._smart2DHandler){this._loco.removeHandler(this._smart2DHandler)}this.invalidate()}}return this};T.prototype._updateOutputSettings=function(){var e=this._dvl.Scene.RetrieveSceneInfo(this._dvlSceneRef,sap.ve.dvl.DVLSCENEINFO.DVLSCENEINFO_STEP_INFO);var t=this._dvl.Scene.RetrieveOutputSettings(this._dvlSceneRef,e.StepId);var i=new R({width:t.width,height:t.height,dpi:t.dpi});this.setOutputSettings(i)};T.prototype._isSmart2DContent=function(){var e=y(this._dvl.Scene.RetrieveSceneInfo(this._dvlSceneRef,sap.ve.dvl.DVLSCENEINFO.DVLSCENEINFO_HOTSPOTS).ChildNodes);return e&&e.length>0};T.prototype._isSmart2DContentLegacy=function(){var e=this._dvl.Scene.GetCurrentCamera(this._dvlSceneRef),t=this._dvl.Camera.GetRotation(e),i=this._dvl.Camera.GetProjection(e);return t[0]===90&&t[1]===-90&&t[2]===0&&i===sap.ve.dvl.DVLCAMERAPROJECTION.ORTHOGRAPHIC};T.prototype._initializeSmart2DHandler=function(){if(this._viewStateManager){if(this._smart2DHandler){this._loco.removeHandler(this._smart2DHandler)}this._smart2DHandler=new c(this,this._viewStateManager);this._loco.addHandler(this._smart2DHandler,0)}if(this.getShowAllHotspots()){var e=this._viewStateManager.getNodeHierarchy(),t=e.getHotspotNodeIds();this.showHotspots(t,true)}};T.prototype._fireUrlClicked=function(e){this.fireUrlClicked({url:e.url,nodeRef:e.nodeId})};T.prototype.setHotspotColorABGR=function(e){this.setProperty("hotspotColorABGR",e,true);this.setProperty("hotspotColor",n(t(this.getProperty("hotspotColorABGR"))),true);return this};T.prototype.setHotspotColor=function(e){this.setProperty("hotspotColor",e,true);this.setProperty("hotspotColorABGR",o(s(this.getProperty("hotspotColor"))),true);return this};T.prototype._getStepAndProcedureIndexes=function(e,t){var i=-1,r=-1,o=false;for(var n=0;n<e.length;n++){if(!o){for(var a=0;a<e[n].steps.length;a++){if(e[n].steps[a].id===t){r=a;i=n;o=true;break}}}else{break}}return{stepIndex:r,procedureIndex:i}};T.prototype._getStepVeIdById=function(e){if(e){var t=this._dvl.Scene.RetrieveVEIDs(this._dvlSceneRef,e);if(Array.isArray(t)){for(var i=0,r=t.length;i<r;++i){var o=t[i];if(o.source==="SAP"&&o.type==="VE_VIEWPORT"&&Array.isArray(o.fields)){for(var n=0,a=o.fields.length;n<a;++n){var s=o.fields[n];if(s.name==="ID"){return s.value}}}}}}return null};T.prototype._getStepIdByVeId=function(e,t){for(var i=0,r=e.length;i<r;++i){var o=e[i].steps;for(var n=0,a=o.length;n<a;++n){var s=o[n].id;if(this._getStepVeIdById(s)===t){return s}}}return null};var D=function(e){e.camera={}};var E=function(e){if(typeof e.camera==="object"&&e.camera!==null){e.camera.matrices=false}};var P=function(e){if(typeof e.camera==="object"&&e.camera!==null){e.camera.useTransitionCamera=false}};var b=function(e){e.animation=true};var w=function(e){e.visibility=false};var N=function(e){if(typeof e.visibility==="object"&&e.visibility!==null){e.visibility.mode=u.Complete}};T.prototype.getViewInfo=function(e){if(!this._dvlSceneRef){return null}var t={};if(typeof e!=="object"||e===null){D(t);E(t);P(t);b(t);w(t);N(t)}else{if(typeof e.camera==="object"&&e.camera!==null){t.camera={};if(typeof e.camera.matrices==="boolean"){t.camera.matrices=e.camera.matrices}else if("matrices"in e.camera){t.camera.matrices=false}else{E(t)}if(typeof e.camera.useTransitionCamera==="boolean"){t.camera.useTransitionCamera=e.camera.useTransitionCamera}else if("useTransitionCamera"in e.camera){t.camera.useTransitionCamera=false}else{P(t)}}else if(typeof e.camera==="boolean"){if(e.camera===true){t.camera={};E(t);P(t)}else{t.camera=false}}else if("camera"in e){t.camera=false}else{D(t);E(t);P(t)}if(typeof e.animation==="boolean"){t.animation=e.animation}else if("animation"in e){t.animation=false}else{b(t)}if(typeof e.visibility==="object"&&e.visibility!==null){t.visibility={};if(e.visibility.mode===u.Complete||e.visibility.mode===u.Differences){t.visibility.mode=e.visibility.mode}else{N(t)}}else if(typeof e.visibility==="boolean"){if(e.visibility===true){t.visibility={};N(t)}else{t.visibility=false}}else if("visibility"in e){t.visibility=false}else{w(t);N(t)}}var i={};if(t.camera){var o=null;if(t.camera.useTransitionCamera){o=this._dvl.Renderer.GetTransitionCamera(this._dvlRendererId);if(o===sap.ve.dvl.DVLID_INVALID){o=null}}if(o===null){o=this._dvl.Renderer.GetCurrentCamera(this._dvlRendererId)}var n=this._dvl.Camera.GetRotation(o),a=this._dvl.Camera.GetOrigin(o);i.camera={rotation:{yaw:n[0],pitch:n[1],roll:n[2]},position:{x:a[0],y:a[1],z:a[2]},projectionType:V.encodedProjectionType[this._dvl.Camera.GetProjection(o)],bindingType:V.encodedBindingType[this._dvl.Camera.GetFOVBinding(o)]};if(this._matView){i.viewMatrix=this._matView.slice()}if(this._matProj){i.projectionMatrix=this._matProj.slice()}if(i.camera.projectionType===r.Perspective){i.camera.fieldOfView=this._dvl.Camera.GetFOV(o)}else if(i.camera.projectionType===r.Orthographic){i.camera.zoomFactor=this._dvl.Camera.GetOrthoZoomFactor(o)}if(t.camera.matrices){var s=this._dvl.Renderer.GetCameraMatrices(this._dvlRendererId);i.camera.matrices={view:s.view,projection:s.projection}}}if(t.animation){var l=this._dvl.Scene.RetrieveSceneInfo(this._dvlSceneRef,sap.ve.dvl.DVLSCENEINFO.DVLSCENEINFO_STEP_INFO),h=l.StepId!==sap.ve.dvl.DVLID_INVALID;var p=h?l.StepId:this._lastPlayedStep,c=h?l.StepTime:0,_=this._dvl.Scene.RetrieveProcedures(this._dvlSceneRef),f=this._getStepAndProcedureIndexes(_.procedures,p),m=this._getStepVeIdById(p);i.animation={animationTime:c,stepIndex:f.stepIndex,procedureIndex:f.procedureIndex};if(m){i.animation.stepVeId=m}}if(t.visibility&&this._viewStateManager){i.visibility={mode:t.visibility.mode};if(t.visibility.mode===u.Complete){var R=this._viewStateManager.getVisibilityComplete();i.visibility.visible=R.visible;i.visibility.hidden=R.hidden}else if(this._viewStateManager.getShouldTrackVisibilityChanges()){i.visibility.changes=this._viewStateManager.getVisibilityChanges()}else{C.warning(d().getText(v.VIT32.summary),v.VIT32.code,"sap.ui.vk.dvl.Viewport")}}return i};T.prototype.setViewInfo=function(e,t){var i=false;if(e.animation){var o=this._dvl.Scene.RetrieveProcedures(this._dvlSceneRef),n=e.animation.procedureIndex,a=e.animation.stepIndex,s=e.animation.stepVeId,l,h=e.animation.animationTime||0;if(s||a>=0&&n>=0){if(s){l=this._getStepIdByVeId(o.procedures,e.animation.stepVeId)}else if(n>=0&&n<o.procedures.length){if(a>=0&&a<o.procedures[n].steps.length){l=o.procedures[n].steps[a].id}else{C.error(d().getText(v.VIT26.summary),v.VIT26.code,"sap.ui.vk.dvl.Viewport")}}else{C.error(d().getText(v.VIT27.summary),v.VIT27.code,"sap.ui.vk.dvl.Viewport")}if(l){this._dvl.Renderer.ActivateStep(this._dvlRendererId,l,false,false,h);this._dvl.Renderer.PauseCurrentStep(this._dvlRendererId)}}else{i=true}}if(e.camera){var p;if(e.camera.projectionType===r.Perspective||e.camera.projectionType===r.Orthographic){p=V.decodedProjectionType[e.camera.projectionType]}else{C.error(d().getText(v.VIT19.summary),v.VIT19.code,"sap.ui.vk.dvl.Viewport");p=sap.ve.dvl.DVLCAMERAPROJECTION.PERSPECTIVE}var c=this._dvl.Scene.CreateCamera(this._dvlSceneRef,p,sap.ve.dvl.DVLID_INVALID);if(p===sap.ve.dvl.DVLCAMERAPROJECTION.PERSPECTIVE){this._dvl.Camera.SetFOV(c,e.camera.fieldOfView)}else if(p===sap.ve.dvl.DVLCAMERAPROJECTION.ORTHOGRAPHIC){this._dvl.Camera.SetOrthoZoomFactor(c,e.camera.zoomFactor)}if(e.camera.position){this._dvl.Camera.SetOrigin(c,e.camera.position.x,e.camera.position.y,e.camera.position.z)}if(e.camera.rotation){this._dvl.Camera.SetRotation(c,e.camera.rotation.yaw,e.camera.rotation.pitch,e.camera.rotation.roll)}if(e.camera.bindingType){var _=V.decodedBindingType[e.camera.bindingType]||sap.ve.dvl.DVLCAMERAFOVBINDING.MIN;this._dvl.Camera.SetFOVBinding(c,_)}t=t||0;this._dvl.Renderer.ActivateCamera(this._dvlRendererId,c,t);this._dvl.Scene.DeleteNode(this._dvlSceneRef,c)}if(e.viewMatrix){this._matView=e.viewMatrix.slice()}if(e.projectionMatrix){this._matProj=e.projectionMatrix.slice()}if(e.visibility){var f=this._viewStateManager.getNodeHierarchy(),m=new Map,R=f.findNodesByName();R.forEach(function(e){var t=f.createNodeProxy(e),i=jQuery.grep(t.getVeIds(),function(e){return e.type==="VE_LOCATOR"});i=Array.isArray(i)&&i.length>0?i[0].fields[0].value:null;f.destroyNodeProxy(t);if(i){m.set(i,e)}});switch(e.visibility.mode){case u.Complete:var y=e.visibility.visible,g=e.visibility.hidden;y.forEach(function(e){this._viewStateManager.setVisibilityState(m.get(e),true,false)},this);g.forEach(function(e){this._viewStateManager.setVisibilityState(m.get(e),false,false)},this);break;case u.Differences:if(i){this.resetView({camera:false,visibility:true,transition:false})}e.visibility.changes.forEach(function(e){var t=m.get(e);if(t){this._viewStateManager.setVisibilityState(t,!this._viewStateManager.getVisibilityState(t),false)}},this);break;default:C.error(d().getText(v.VIT28.summary),v.VIT28.code,"sap.ui.vk.dvl.Viewport");break}}return this};T.prototype.setSelectionRect=function(e){if(!e){this._dvl.Renderer.DrawSelectionRect(0,0,0,0,this._dvlRendererId)}else{var t=this._toDvlRendererCoord(e.x1,e.y1);var i=this._toDvlRendererCoord(e.x2,e.y2);this._dvl.Renderer.DrawSelectionRect(t.x,t.y,i.x,i.y,this._dvlRendererId)}};T.prototype.getOutputSize=function(){var e=this.getViewInfo().camera.bindingType,t=this.getDomRef().getBoundingClientRect(),i=t.width,r=t.height,o;switch(V.decodedBindingType[e]){case sap.ve.dvl.DVLCAMERAFOVBINDING.MIN:o=Math.min(i,r);break;case sap.ve.dvl.DVLCAMERAFOVBINDING.MAX:o=Math.max(i,r);break;case sap.ve.dvl.DVLCAMERAFOVBINDING.HORZ:o=i;break;case sap.ve.dvl.DVLCAMERAFOVBINDING.VERT:o=r;break;default:break}return{left:(i-o)/2,top:(r-o)/2,sideLength:o}};T.prototype.onBeforeRendering=function(){if(this._resizeListenerId){e.deregister(this._resizeListenerId);this._resizeListenerId=null}};T.prototype.onAfterRendering=function(){var t=this.getDomRef();if(this._canvas){t.appendChild(this._canvas)}this._resizeListenerId=e.register(this,this._handleResize.bind(this));this._handleResize({size:{width:t.clientWidth,height:t.clientHeight}})};T.prototype._handleResize=function(e){if(this._dvlRendererId&&this._canvas){var t=e.size.width*window.devicePixelRatio;var i=e.size.height*window.devicePixelRatio;if(this._matProj){var r=this._matProj[0];var o=this._matProj[5];var n=Math.max(r,o);if(t>i){r=n*i/t;o=n}else{r=n;o=n*t/i}this._matProj[8]*=r/this._matProj[0];this._matProj[9]*=o/this._matProj[5];this._matProj[0]=r;this._matProj[5]=o}var a=96*window.devicePixelRatio;var s=this.getAggregation("outputSettings");this._gestureRatio=1;if(this.getKeepOutputSize()&&s&&s.getDpi()>0){var d=s.getWidth()/25.4*a;var l=s.getHeight()/25.4*a;var h=d/t;var v=l/i;var p=h>v?h:v;t*=p;i*=p;this._gestureRatio=p}this._dvl.Renderer.SetDimensions(t,i,this._dvlRendererId);this._dvl.Renderer.SetOptionF(sap.ve.dvl.DVLRENDEROPTIONF.DVLRENDEROPTIONF_DPI,a,this._dvlRendererId);this._dvl.Renderer.SetOptionF(sap.ve.dvl.DVLRENDEROPTIONF.DVLRENDEROPTIONF_MIN_VISIBLE_OBJECT_SIZE,1,this._dvlRendererId);this._canvas.width=t;this._canvas.height=i;this._canvas.style.width=e.size.width+"px";this._canvas.style.height=e.size.height+"px";this.fireResize({size:{width:e.size.width,height:e.size.height}});return true}};T.prototype._onVisibilityChanged=T.prototype._onSelectionChanged=T.prototype._onOpacityChanged=T.prototype._onTintColorChanged=function(e){if(this._dvlRendererId){this._dvl.Renderer.ForceRenderFrame(this._dvlRendererId)}};T.prototype.showHotspots=function(e,t,i){var r=sap.ui.vk.dvl.NodeProxy.prototype[typeof i==="string"?"setTintColor":"setTintColorABGR"];var o=function(e,t,i){var o=e.createNodeProxy(i);r.call(o,t);e.destroyNodeProxy(o)};if(!Array.isArray(e)){e=[e]}var n=i===undefined?this.getHotspotColorABGR():i;if(!t){n=0}var a=this._viewStateManager.getNodeHierarchy();if(this._isSmart2DContent()){var s=[];e.forEach(function(e){var t=y(this._dvl.Scene.RetrieveNodeInfo(this._dvlSceneRef,e,sap.ve.dvl.DVLNODEINFO.DVLNODEINFO_CHILDREN).ChildNodes);Array.prototype.push.apply(s,t)}.bind(this));Array.prototype.push.apply(s,e);s.forEach(o.bind(null,a,n))}else{var d=[];var l=function(e){var t=a.getChildren(e);Array.prototype.push.apply(d,t);t.forEach(l)};e.forEach(l);Array.prototype.push.apply(d,e);d.forEach(o.bind(null,a,n))}return this};T.prototype._getDecomposedABGR=function(e){return{red:(e>>>0&255)/255,green:(e>>>8&255)/255,blue:(e>>>16&255)/255,alpha:(e>>>24&255)/255}};T.prototype._setBackgroundColor=function(){if(this._dvl){var e=this._getDecomposedABGR(this.getBackgroundColorTopABGR()),t=this._getDecomposedABGR(this.getBackgroundColorBottomABGR());this._dvl.Renderer.SetBackgroundColor(e.red,e.green,e.blue,e.alpha,t.red,t.green,t.blue,t.alpha,this._dvlRendererId)}};T.prototype.setBackgroundColorTopABGR=function(e){this.setProperty("backgroundColorTopABGR",e,true);this._setBackgroundColor();return this};T.prototype.setBackgroundColorTop=function(e){this.setProperty("backgroundColorTop",e,true);return this.setBackgroundColorTopABGR(o(s(e)))};T.prototype.setBackgroundColorBottomABGR=function(e){this.setProperty("backgroundColorBottomABGR",e,true);this._setBackgroundColor();return this};T.prototype.setBackgroundColorBottom=function(e){this.setProperty("backgroundColorBottom",e,true);return this.setBackgroundColorBottomABGR(o(s(e)))};T.prototype.setKeepOutputSize=function(e){this.setProperty("keepOutputSize",e);this._updateViewportSize()};T.prototype.setOutputSettings=function(e){this.setAggregation("outputSettings",e);this._updateViewportSize()};T.prototype._updateViewportSize=function(){var e=this.getDomRef();if(e){this._handleResize({size:{width:e.clientWidth,height:e.clientHeight}})}};T.prototype.setShouldRenderFrame=function(){if(this._dvlRendererId){this._dvl.Renderer.ForceRenderFrame(this._dvlRendererId)}return this};T.prototype.shouldRenderFrame=function(){return this._dvlRendererId&&this._dvl.Renderer.ShouldRenderFrame(this._dvlRendererId)};function A(e,t,i){return e+(t-e)*i}function M(e,t,i){i=Math.min(Math.max((i-e)/(t-e),0),1);return i*i*i*(i*(i*6-15)+10)}T.prototype._updateRedlineZoomToAnimation=function(){var e=this._anim;var t=e.startProjRect;var i=e.endProjRect;var r=Math.min(M(0,1,(Date.now()-e.startTime)/e.duration),1);var o={left:A(t.left,i.left,r),right:A(t.right,i.right,r),top:A(t.top,i.top,r),bottom:A(t.bottom,i.bottom,r)};if(this._redlineHandler){var n=e.currentProjRect;var a=(n.left+n.right)*.5;var s=(n.top+n.bottom)*.5;var d=(o.left+o.right)*.5;var l=(o.top+o.bottom)*.5;var h=this.getDomRef();var v=(a-d)*h.clientWidth/(n.right-n.left);var p=(s-l)*h.clientHeight/(n.bottom-n.top);this._redlineHandler.pan(v,p);this._redlineHandler.zoom((n.right-n.left)/(o.right-o.left),h.clientWidth*.5,h.clientHeight*.5);e.currentProjRect=o}B(this._matProj,o);if(r>=1){delete this._anim}};T.prototype.renderFrame=function(){if(this._dvlRendererId){if(this._matView&&this._matProj){if(this._anim){this._updateRedlineZoomToAnimation()}this.renderFrameEx(this._matView,this._matProj,this._dvlRendererId);if(this._anim){this.setShouldRenderFrame()}}else{this._dvl.Renderer.RenderFrame(this._dvlRendererId)}}return this};T.prototype.renderFrameEx=function(e,t){if(this._dvlRendererId){this._dvl.Renderer.RenderFrameEx.apply(this,[].concat(e,t),this._dvlRendererId)}return this};T.prototype.resetView=function(e){if(e!==undefined&&!jQuery.isPlainObject(e)){C.error(d().getText(v.VIT31.summary),v.VIT31.code,"sap.ui.vk.dvl.Viewport")}var t={camera:true,transition:true,visibility:false};jQuery.extend(t,e);if(t.camera||t.visibility){var i=(t.camera?sap.ve.dvl.DVLRESETVIEWFLAG.CAMERA:0)|(t.transition?sap.ve.dvl.DVLRESETVIEWFLAG.SMOOTHTRANSITION:0)|(t.visibility?sap.ve.dvl.DVLRESETVIEWFLAG.VISIBILITY:0);if(this._dvlRendererId){this._dvl.Renderer.ResetView(i,this._dvlRendererId);this._lastPlayedStep=null}}return this};T.prototype.canIsolateNode=function(e){if(this._dvlRendererId){return this._dvl.Renderer.CanIsolateNode(e,this._dvlRendererId)}else{return false}};T.prototype.setIsolatedNode=function(e){if(this._dvlRendererId){this._dvl.Renderer.SetIsolatedNode(e,this._dvlRendererId)}return this};T.prototype.getIsolatedNode=function(){if(this._dvlRendererId){return this._dvl.Renderer.GetIsolatedNode(this._dvlRendererId)}else{return sap.ve.dvl.DVLID_INVALID}};T.prototype._toDvlRendererCoord=function(e,t){if(this._matProj){var i=this.getDomRef();var r=L(this._matProj);var o=L(this._dvl.Renderer.GetCameraMatrices().projection);var n=r.left+(r.right-r.left)*(e/i.clientWidth);var a=r.top+(r.bottom-r.top)*(t/i.clientHeight);e=(n-o.left)/(o.right-o.left)*i.clientWidth;t=(a-o.top)/(o.bottom-o.top)*i.clientHeight}return{x:e*window.devicePixelRatio*this._gestureRatio,y:t*window.devicePixelRatio*this._gestureRatio}};T.prototype.hitTest=function(e,t){if(this._dvlRendererId){var i=this._toDvlRendererCoord(e,t);var r=this._dvl.Renderer.HitTest(i.x,i.y,this._dvlRendererId).id;this.setShouldRenderFrame();return r}else{return null}};T.prototype.setShowDebugInfo=function(e){this.setProperty("showDebugInfo",e,true);if(this._dvlRendererId){this._dvl.Renderer.SetOption(sap.ve.dvl.DVLRENDEROPTION.DVLRENDEROPTION_SHOW_DEBUG_INFO,e,this._dvlRendererId)}return this};T.prototype._handleFrameFinished=function(e){if(e.rendererId===this._dvlRendererId){this.fireFrameRenderingFinished()}};T.prototype.beginGesture=function(e,t){if(this._dvlRendererId){this._gesturePoint={x:e,y:t};var i=this._toDvlRendererCoord(e,t);this._dvl.Renderer.BeginGesture(i.x,i.y,this._dvlRendererId)}return this};T.prototype.endGesture=function(){if(this._dvlRendererId){this._dvl.Renderer.EndGesture(this._dvlRendererId)}return this};T.prototype._activateRedline=function(){this.renderFrame();var e=this._dvl.Renderer.GetCameraMatrices();this._matView=e.view;this._matProj=e.projection};T.prototype._deactivateRedline=function(){this._matView=null;this._matProj=null};T.prototype.pan=function(e,t){if(this._dvlRendererId&&!this.getFreezeCamera()){if(this._redlineHandler){this._redlineHandler.pan(e,t)}if(this._matProj){var i=this.getDomRef();this._matProj[8]-=e*2/i.clientWidth;this._matProj[9]+=t*2/i.clientHeight;this.setShouldRenderFrame()}else{this._dvl.Renderer.Pan(e*window.devicePixelRatio*this._gestureRatio,t*window.devicePixelRatio*this._gestureRatio,this._dvlRendererId)}this.firePan({dx:e,dy:t})}return this};T.prototype.rotate=function(e,t){if(this._dvlRendererId&&!this.getFreezeCamera()){if(this._redlineHandler){return this.pan(e,t)}this._dvl.Renderer.Rotate(e*window.devicePixelRatio*this._gestureRatio,t*window.devicePixelRatio*this._gestureRatio,this._dvlRendererId);this.fireRotate({dx:e,dy:t})}return this};function L(e){var t=e[15]===1;var i=2/e[0];var r=2/e[5];var o,n;if(t){o=-e[12]*i;n=-e[13]*r}else{o=e[8]*i;n=e[9]*r}var a=(i+o)*.5;var s=o-a;var d=(r+n)*.5;var l=n-d;return{left:s,top:d,right:a,bottom:l}}function B(e,t){var i=e[15]===1;e[0]=2/(t.right-t.left);e[5]=2/(t.top-t.bottom);if(i){e[12]=-(t.right+t.left)/(t.right-t.left);e[13]=-(t.top+t.bottom)/(t.top-t.bottom)}else{e[8]=(t.right+t.left)/(t.right-t.left);e[9]=(t.top+t.bottom)/(t.top-t.bottom)}}T.prototype.zoom=function(e){if(this._dvlRendererId&&!this.getFreezeCamera()){if(this._redlineHandler){this._redlineHandler.zoom(e)}if(this._matProj){var t=this.getDomRef();var i=L(this._matProj);var r=i.left+(i.right-i.left)*this._gesturePoint.x/t.clientWidth;var o=i.top+(i.bottom-i.top)*this._gesturePoint.y/t.clientHeight;var n=1/e;i.left=r+(i.left-r)*n;i.right=r+(i.right-r)*n;i.top=o+(i.top-o)*n;i.bottom=o+(i.bottom-o)*n;B(this._matProj,i);this.setShouldRenderFrame()}else{this._dvl.Renderer.Zoom(e,this._dvlRendererId)}this.fireZoom({zoomFactor:e})}return this};T.prototype.zoomTo=function(e,t,i,r){if(this._dvlRendererId){var o=0;if(Array.isArray(e)){for(var n in e){o|=V.decodedZoomTo[e[n]]}}else{o=V.decodedZoomTo[e]}this._dvl.Renderer.ZoomTo(o,t,i,r,this._dvlRendererId)}return this};T.prototype._redlineZoomTo=function(e){var t=[Infinity,Infinity,-Infinity,-Infinity];if(e!==sap.ve.dvl.DVLID_INVALID){var i=this._dvl.Scene.RetrieveNodeInfo(this._dvlSceneRef,e,sap.ve.dvl.DVLNODEINFO.DVLNODEINFO_BBOX).bbox;var r=this._dvl.Scene.GetNodeWorldMatrix(this._dvlSceneRef,e).matrix;if(i&&r){var o=l.vec3,n=l.mat4;var a=n.multiply(n.create(),this._matProj,this._matView);var s=n.multiply(n.create(),a,r);var d=i.min,h=i.max;[o.fromValues(d[0],d[1],d[2]),o.fromValues(h[0],h[1],h[2]),o.fromValues(d[0],d[1],h[2]),o.fromValues(d[0],h[1],h[2]),o.fromValues(h[0],d[1],h[2]),o.fromValues(h[0],h[1],d[2]),o.fromValues(d[0],h[1],d[2]),o.fromValues(h[0],d[1],d[2])].forEach(function(e){o.transformMat4(e,e,s);if(e[2]>0){t[0]=Math.min(t[0],e[0]);t[1]=Math.min(t[1],e[1]);t[2]=Math.max(t[2],e[0]);t[3]=Math.max(t[3],e[1])}})}}var v=L(this._matProj);this._anim={startTime:Date.now(),duration:500,startProjRect:v,currentProjRect:v};if(t[2]>t[0]&&t[3]>t[1]){var p=this._anim.startProjRect;var c=A(p.left,p.right,(t[0]+t[2])*.25+.5);var _=A(p.top,p.bottom,(t[3]+t[1])*-.25+.5);var f=Math.max(t[2]-t[0],t[3]-t[1])*.5;var u=(p.right-p.left)*.5*f;var m=(p.top-p.bottom)*.5*f;this._anim.endProjRect={left:c-u,top:_+m,right:c+u,bottom:_-m}}else{this._anim.endProjRect=L(this._dvl.Renderer.GetCameraMatrices().projection)}this.setShouldRenderFrame()};T.prototype.tap=function(e,t,i){if(this._dvlRendererId){var r=this._toDvlRendererCoord(e,t),o;if(!i){o=this.hitTest(e,t);var n={picked:o===sap.ve.dvl.DVLID_INVALID||o==null?[]:[o]};this.fireNodesPicked(n);if(this.getSelectionMode()===p.Exclusive){this.exclusiveSelectionHandler(n.picked)}else if(this.getSelectionMode()===p.Sticky){this.stickySelectionHandler(n.picked)}if(o!==sap.ve.dvl.DVLID_INVALID){this.fireNodeClicked({nodeRef:o,nodeId:o,x:e,y:t},true,true)}this._dvl.Renderer.Tap(r.x,r.y,false,false,this._dvlRendererId)}else if(!this.getFreezeCamera()){if(this._matView&&this._matProj){o=this.hitTest(e,t);this._redlineZoomTo(o)}else{this._dvl.Renderer.Tap(r.x,r.y,true,false,this._dvlRendererId)}}}return this};T.prototype.rectSelect=function(e,t,i,r){var o=[];if(this._dvlRendererId){var n=this._toDvlRendererCoord(e,t);var a=this._toDvlRendererCoord(i,r);var s=y(this._dvl.Renderer.RectSelect(n.x,n.y,a.x,a.y,this._dvlRendererId));if(s.SelectedNodes){o=s.SelectedNodes}}return o};T.prototype.queueCommand=function(e){if(this._dvlRendererId){this._dvl.Renderer._queueCommand(e,this._dvlRendererId)}return this};T.prototype._setContent=function(e){O._setContent.apply(this,arguments);var t=null;if(e&&e instanceof g){t=e}this._setScene(t);return this};T.prototype._setScene=function(e){var t=e&&e.getGraphicsCore();this.setGraphicsCore(t);this.setScene(e);if(e&&(this._isSmart2DContent()||this._isSmart2DContentLegacy())){this._initializeSmart2DHandler()}};T.prototype.onSetContentConnector=function(e){_.prototype.onSetContentConnector.call(this,e);e.attachContentChangesFinished(this._onContentChangesFinished,this)};T.prototype.onUnsetContentConnector=function(e){e.detachContentChangesFinished(this._onContentChangesFinished,this);_.prototype.onUnsetContentConnector.call(this,e)};T.prototype._onContentChangesFinished=function(e){if(e.getSource().getContentResources().length>1){this.zoomTo(m.Visible,sap.ve.dvl.DVLID_INVALID,0,0)}this.setShouldRenderFrame()};T.prototype.onSetViewStateManager=function(e){this._viewStateManager=e;e.attachOpacityChanged(this._onOpacityChanged,this);e.attachSelectionChanged(this._onSelectionChanged,this);e.attachTintColorChanged(this._onTintColorChanged,this);e.attachVisibilityChanged(this._onVisibilityChanged,this);if(this._dvl){this._dvl.Renderer.SetViewStateManager(e,this._dvlRendererId);if(this._isSmart2DContent()||this._isSmart2DContentLegacy()){this._initializeSmart2DHandler()}}};T.prototype.onUnsetViewStateManager=function(e){if(this._dvl){this._dvl.Renderer.SetViewStateManager(null,this._dvlRendererId)}e.detachOpacityChanged(this._onOpacityChanged,this);e.detachSelectionChanged(this._onSelectionChanged,this);e.detachTintColorChanged(this._onTintColorChanged,this);e.detachVisibilityChanged(this._onVisibilityChanged,this);this._viewStateManager=null};var x={x:-2,y:-2};var F=2;var G=5;[{key:"left",dx:-F,dy:0},{key:"right",dx:+F,dy:0},{key:"up",dx:0,dy:-F},{key:"down",dx:0,dy:+F}].forEach(function(e){T.prototype["onsap"+e.key]=function(t){this.beginGesture(x.x,x.y);this.rotate(e.dx,e.dy);this.endGesture();this.setShouldRenderFrame();t.preventDefault();t.stopPropagation()}});[{key:"left",dx:-G,dy:0},{key:"right",dx:+G,dy:0},{key:"up",dx:0,dy:-G},{key:"down",dx:0,dy:+G}].forEach(function(e){T.prototype["onsap"+e.key+"modifiers"]=function(t){if(t.shiftKey&&!(t.ctrlKey||t.altKey||t.metaKey)){this.beginGesture(x.x,x.y);this.pan(e.dx,e.dy);this.endGesture();this.setShouldRenderFrame();t.preventDefault();t.stopPropagation()}}});[{key:"minus",d:.98},{key:"plus",d:1.02}].forEach(function(e){T.prototype["onsap"+e.key]=function(t){this.beginGesture(this.$().width()/2,this.$().height()/2);this.zoom(e.d);this.endGesture();this.setShouldRenderFrame();t.preventDefault();t.stopPropagation()}});return T});
//# sourceMappingURL=Viewport.js.map