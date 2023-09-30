/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/model/json/JSONModel","./findIndexInArray","./AnimationPlayback","./Core"],function(t,a,e,i,s){"use strict";var n=t.extend("sap.ui.vk.View",{metadata:{library:"sap.ui.vk",interfaces:["sap.ui.vk.IPlaybackCollection"],properties:{viewId:{type:"string"},name:{type:"string"},description:{type:"string"},aspectRatio:{type:"float"},autoPlayAnimation:{type:"boolean",defaultValue:true},topColor:{type:"sap.ui.core.CSSColor",defaultValue:"rgba(238, 238, 238, 1)"},bottomColor:{type:"sap.ui.core.CSSColor",defaultValue:"rgba(255, 255, 255, 1)"}}}});n.prototype.init=function(){this._playbacks=[];this._playbacksJSONData=[];this._model=new a({playbacks:this._playbacksJSONData});this._model.setSizeLimit(1e3*1e3);this._highlightIdNodesMap=new Map};n.prototype.exit=function(){this._playbacks=undefined;this._playbacksJSONData=undefined;this._highlightIdNodesMap=undefined};n.prototype.getCamera=function(){return this._camera};n.prototype.setCamera=function(t){this._camera=t;return this};n.prototype.hasHighlight=function(){return this._highlightIdNodesMap&&this._highlightIdNodesMap.size};n.prototype.getHighlightIdNodesMap=function(){return this._highlightIdNodesMap};n.prototype.addHighlightedNodes=function(t,a){var e=this._highlightIdNodesMap.get(t);if(!Array.isArray(a)){a=[a]}if(!e){this._highlightIdNodesMap.set(t,a)}else{e=e.concat(a.filter(function(t){return e.indexOf(t)<0}));this._highlightIdNodesMap.set(t,e)}};n.prototype.hasAnimation=function(){return this._playbacks&&this._playbacks.length};n.prototype.getPlaybacks=function(){return this._playbacks};n.prototype.getPlayback=function(t){if(t<0||t>=this._playbacks.length){return undefined}return this._playbacks[t]};n.prototype.indexOfPlayback=function(t){return e(this._playbacks,function(a){return a===t})};n.prototype.addPlayback=function(t,a){this._playbacks.push(t);this._playbacksJSONData.push(t.getJSONData());if(this._model){this._model.updateBindings()}t.setJSONModel(this._model);if(!a){this._firePlaybacksChanged("playbackAdded",t)}return this};n.prototype.insertPlayback=function(t,a,e){if(a<0){a=0}else if(a!==0&&a>=this._playbacks.length){a=this._playbacks.length}this._playbacks.splice(a,0,t);this._playbacksJSONData.splice(a,0,t.getJSONData());if(this._model){this._model.updateBindings()}if(!e){this._firePlaybacksChanged("playbackInserted",t)}return this};n.prototype.sortPlaybacks=function(t,a,e){this._playbacks.sort(function(t,a){return t.getStartTime()-a.getStartTime()});this._playbacksJSONData=[];this._playbacks.forEach(function(t){this._playbacksJSONData.push(t.getJSONData())}.bind(this));var i=true;for(var s=0;s<this._playbacks.length-1;s++){var n=this._playbacks[s].getStartTime();var r=this._playbacks[s+1].getStartTime();if(r-n<1e-5){i=false;break}}if(!e){this._firePlaybacksChanged("playbacksOrderChanged")}return i};n.prototype.removePlayback=function(t,a){var i;if(typeof t==="number"){i=t}else if(typeof t==="string"){i=e(this._playbacks,function(a){return a.getId()===t})}else{i=e(this._playbacks,function(a){return a===t})}var s;if(i!=null&&i>=0&&i<this._playbacks.length){s=this._playbacks[i];this._playbacks.splice(i,1);this._playbacksJSONData.splice(i,1);if(this._model){this._model.updateBindings()}}if(!a){this._firePlaybacksChanged("playbackRemoved",s)}return this};n.prototype.removePlaybacks=function(t){this._playbacks.splice(0);this._playbacksJSONData.splice(0);if(this._model){this._model.updateBindings()}if(!t){this._firePlaybacksChanged("playbacksRemoved")}return this};n.prototype.switchPlaybacks=function(t,a,e){var i,s;for(var n=0;n<this._playbacks.length;n++){if(this._playbacks[n]===t){i=n}else if(this._playbacks[n]===a){s=n}}if(i!==undefined&&s!==undefined){var r=this._playbacks[i];var o=this._playbacksJSONData[i];this._playbacks[i]=this._playbacks[s];this._playbacksJSONData[i]=this._playbacksJSONData[s];this._playbacks[s]=r;this._playbacksJSONData[s]=o}this.resetPlaybacksStartTimes(true);if(!e){this._firePlaybacksChanged("playbacksOrderChanged")}return this};n.prototype.resetPlaybacksStartTimes=function(t){if(this._playbacks.length===0){return this}var a=0;for(var e=0;e<this._playbacks.length;e++){this._playbacks[e].setStartTime(a);a+=this._playbacks[e].getDuration()}if(!t){this._firePlaybacksChanged("playbacksStartTimeChanged")}return this};n.prototype._firePlaybacksChanged=function(t,a){s.getEventBus().publish("sap.ui.vk","playbacksChanged",{viewId:this.getViewId(),operation:t,playback:a})};n.prototype.setPlaybacksReversed=function(t,a){for(var e=0;e<this._playbacks.length;e++){this._playbacks[e].setReversed(t)}if(!a){this._firePlaybacksChanged()}return this};n.prototype.getNodeInfos=function(){return this._nodeInfos?this._nodeInfos:[]};n.prototype.setNodeInfos=function(t){this._nodeInfos=t;return this};n.prototype.updateNodeInfos=function(t){var a=this.getNodeInfos();if(!a){return this.setNodeInfos(t)}var e=new Map;a.forEach(function(t,a){e.set(t.target,a)});var i=function(t,a){for(var e in a){t[e]=a[e]}};t.forEach(function(t){var s=e.get(t.target);if(s==null){a.push(t)}else{i(a[s],t)}});this.setNodeInfos(a);return this};n.prototype.getModel=function(){return this._model};return n});
//# sourceMappingURL=View.js.map