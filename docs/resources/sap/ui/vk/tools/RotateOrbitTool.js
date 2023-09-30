/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["./Tool","../helpers/RotateOrbitHelperDvl","../helpers/RotateOrbitHelperThree"],function(t,e,i){"use strict";var r=t.extend("sap.ui.vk.tools.RotateOrbitTool",{metadata:{library:"sap.ui.vk",events:{rotate:{parameters:{dx:"int",dy:"int"}}}},constructor:function(e,i){if(r._instance){return r._instance}t.apply(this,arguments);this.setToolid("1a1fced1-9b42-d7f3-5fdf-8d338b3591a6");this._viewport=null;this._rotateOrbitHelper=null;r._instance=this}});r.prototype.init=function(){if(t.prototype.init){t.prototype.init.call(this)}this.setFootprint(["sap.ui.vk.dvl.Viewport","sap.ui.vk.threejs.Viewport"])};r.prototype.setActive=function(e,i,r){t.prototype.setActive.call(this,e,i,r);if(this._viewport){if(e){if(this._prepare()){this._rotateOrbitHelper.activateOrbitMode()}}else if(this._rotateOrbitHelper){this._rotateOrbitHelper.deactivateOrbitMode();this._rotateOrbitHelper=null}}return this};r.prototype._prepare=function(){if(this.isViewportType("sap.ui.vk.dvl.Viewport")&&this._viewport._dvl){if(this._rotateOrbitHelper==null){this._dvlRendererId=this._viewport._dvlRendererId;this._dvl=this._viewport._dvl;this._rotateOrbitHelper=new e(this,this._dvl)}}else if(this.isViewportType("sap.ui.vk.threejs.Viewport")){if(this._rotateOrbitHelper==null){this._rotateOrbitHelper=new i(this)}}else{return false}return true};r.prototype.rotate=function(t,e){if(this._prepare()){this._rotateOrbitHelper.rotate(t,e)}};r.prototype.destroy=function(){t.prototype.destroy.call(this);this._viewport=null;this._rotateOrbitHelper=null;delete r._instance};return r});
//# sourceMappingURL=RotateOrbitTool.js.map