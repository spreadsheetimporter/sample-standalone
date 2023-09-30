/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/base/ManagedObject","sap/ui/dt/ElementUtil","sap/ui/dt/OverlayUtil","sap/ui/dt/Util"],function(e,t,r,a,n){"use strict";var o=t.extend("sap.ui.dt.plugin.ElementMover",{metadata:{library:"sap.ui.dt",properties:{movableTypes:{type:"string[]",defaultValue:["sap.ui.core.Element"]}},associations:{},events:{validTargetZonesActivated:{}}}});o.prototype._getMovableTypes=function(){return this.getProperty("movableTypes")||[]};o.prototype.isMovableType=function(t){var r=this._getMovableTypes();return r.some(function(r){return e.isA(t,r)})};o.prototype.checkMovable=function(){return Promise.resolve(true)};o.prototype.getMovedOverlay=function(){return this._oMovedOverlay};o.prototype.setMovedOverlay=function(e){if(e){this._source=a.getParentInformation(e)}else{delete this._source}this._oMovedOverlay=e};o.prototype._getSource=function(){return this._source};o.prototype.activateAllValidTargetZones=function(e,t){return this._iterateAllAggregations(e,this._activateValidTargetZone.bind(this),t,true).then(function(){this.fireValidTargetZonesActivated()}.bind(this))};o.prototype._activateValidTargetZone=function(e,t){return this.checkTargetZone(e).then(function(r){if(r){e.setTargetZone(true);if(t){e.addStyleClass(t)}}}).catch(function(e){throw n.createError("ElementMover#_activateValidTargetZone","An error occurred during activation of valid target zones: "+e)})};o.prototype.checkTargetZone=function(e,t,a){var n=t||this.getMovedOverlay();return r.checkTargetZone(e,n,a)};o.prototype._deactivateTargetZone=function(e,t){e.setTargetZone(false);if(t){e.removeStyleClass(t)}};o.prototype.activateTargetZonesFor=function(e,t){return this._iterateOverlayAggregations(e,this._activateValidTargetZone.bind(this),t,true).then(function(){this.fireValidTargetZonesActivated()}.bind(this))};o.prototype.deactivateTargetZonesFor=function(e,t){this._iterateOverlayAggregations(e,this._deactivateTargetZone.bind(this),t)};o.prototype.deactivateAllTargetZones=function(e,t){this._iterateAllAggregations(e,this._deactivateTargetZone.bind(this),t)};o.prototype._iterateAllAggregations=function(e,t,r,a){var n=e.getElementOverlays();var o=n.map(function(e){return this._iterateOverlayAggregations(e,t,r,a)},this);if(a){return Promise.all(o)}};o.prototype._iterateOverlayAggregations=function(e,t,r,a){var n=e.getAggregationOverlays();var o=n.map(function(e){return t(e,r)});if(a){return Promise.all(o)}};o.prototype.repositionOn=function(e,t,n){var o=e.getElement();var i=a.getParentInformation(t);var g=a.getParentInformation(e);var s;var v=e.getParentAggregationOverlay();var f=e.getRelevantContainer();var u=e.getParentElementOverlay();if(v&&u){var l=v.getAggregationName();s=u.getDesignTimeMetadata().getAggregation(l)}if(i.index!==-1){if(s&&s.beforeMove){s.beforeMove(f,o)}if(n){i.index++;if(g.aggregation===i.aggregation){i.index=r.adjustIndexForMove(g.parent,i.parent,g.index,i.index)}}r.insertAggregation(i.parent,i.aggregation,o,i.index);if(s&&s.afterMove){s.afterMove(f,o)}this._setSourceAndTargetParentInformation()}};o.prototype.insertInto=function(e,t,a){var n=e.getElement();var o=t.getElement();var i;var g=e.getParentAggregationOverlay();var s=e.getRelevantContainer();var v=e.getParentElementOverlay();if(g&&v){var f=g.getAggregationName();i=v.getDesignTimeMetadata().getAggregation(f)}var u=r.getAggregation(t.getElement(),t.getAggregationName());var l=u.indexOf(n);var c=a?u.length:0;if(!(l>-1&&l===(c===0?c:c-1))){if(i&&i.beforeMove){i.beforeMove(s,n)}var d=t.getAggregationName();r.insertAggregation(o,d,n,c);if(i&&i.afterMove){i.afterMove(s,n)}this._setSourceAndTargetParentInformation()}};o.prototype._compareSourceAndTarget=function(e,t){var r;for(r in e){switch(typeof e[r]){case"object":if(e[r].getId()!==t[r].getId()){return false}break;default:if(e[r]!==t[r]){return false}}}return true};o.prototype._setSourceAndTargetParentInformation=function(){var e=this.getMovedOverlay();if(!e){delete this._mSourceParentInformation;delete this._mTargetParentInformation;return}var t=this._getSource();if(t){this._mSourceParentInformation={};Object.assign(this._mSourceParentInformation,t)}else{delete this._mSourceParentInformation}var r=a.getParentInformation(e);if(r){this._mTargetParentInformation=r}else{delete this._mTargetParentInformation}};o.prototype.getSourceAndTargetParentInformation=function(){return{sourceParentInformation:this._mSourceParentInformation,targetParentInformation:this._mTargetParentInformation}};return o});
//# sourceMappingURL=ElementMover.js.map