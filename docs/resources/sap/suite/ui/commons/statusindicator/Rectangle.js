sap.ui.define(["sap/suite/ui/commons/util/HtmlElement","sap/suite/ui/commons/statusindicator/SimpleShape","sap/suite/ui/commons/statusindicator/SimpleShapeRenderer"],function(t,e,i){"use strict";var s=e.extend("sap.suite.ui.commons.statusindicator.Rectangle",{metadata:{properties:{x:{type:"int",defaultValue:0},y:{type:"int",defaultValue:0},rx:{type:"int",defaultValue:0},ry:{type:"int",defaultValue:0},width:{type:"int",defaultValue:0},height:{type:"int",defaultValue:0}}},renderer:i});s.prototype._getSimpleShapeElement=function(e){var i=new t("rect");i.setId(this._buildIdString(e));i.setAttribute("x",this.getX());i.setAttribute("y",this.getY());i.setAttribute("width",this.getWidth());i.setAttribute("height",this.getHeight());i.setAttribute("rx",this.getRx());i.setAttribute("ry",this.getRy());i.setAttribute("stroke-width",this.getStrokeWidth());i.setAttribute("stroke",this._getCssStrokeColor());return i};return s});
//# sourceMappingURL=Rectangle.js.map