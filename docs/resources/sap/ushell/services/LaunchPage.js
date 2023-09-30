// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/Log","sap/ushell/services/ContentExtensionAdapterFactory","sap/ui/thirdparty/jquery","sap/ushell/resources","sap/ushell/services/_AppState/AppStatePersistencyMethod","sap/ushell/Config","sap/m/library","sap/m/GenericTile"],function(e,t,jQuery,r,i,o,n,a){"use strict";var s=n.LoadState;function u(i){var n=this,u=[],l=t.getAdapters();this.oAdapters={default:i};l.then(function(e){jQuery.extend(this.oAdapters,e)}.bind(this));this.getGroups=function(){if(o.last("/core/spaces/enabled")){return(new jQuery.Deferred).resolve([]).promise()}var t=new jQuery.Deferred;l.then(function(){var r=Object.keys(n.oAdapters).map(function(e){return n._getAdapter(e).getGroups()});jQuery.when.apply(jQuery,r).done(function(){var e=[].concat.apply([],arguments);t.resolve(e)}).fail(function(){e.error("getGroups failed")})});return t.promise()};this.getGroupsForBookmarks=function(t){var i=new jQuery.Deferred;this.getGroups().then(function(o){this.getDefaultGroup().then(function(e){if(o.length>0){o=o.filter(function(e){if(t===true){return this.isGroupVisible(e)}return!this.isGroupLocked(e)&&this.isGroupVisible(e)}.bind(this));o=o.map(function(t){return{title:t===e&&r.i18n.getText("my_group")||this.getGroupTitle(t),object:t}}.bind(this))}i.resolve(o)}.bind(this),function(t){e.error("getGroupsForBookmarks - getDefaultGroup - failed: "+t.message)})}.bind(this),function(t){e.error("getGroupsForBookmarks - getGroups - failed: "+t.message)});return i.promise()};this.getDefaultGroup=function(){var t=this._getAdapter().getDefaultGroup();t.fail(function(){e.error("getDefaultGroup failed")});return t};this.getGroupTitle=function(e){return this._getAdapter(e.contentProvider).getGroupTitle(e)};this.getGroupId=function(e){return this._getAdapter(e.contentProvider).getGroupId(e)};this.getGroupById=function(e){var t=new jQuery.Deferred,r=this;this.getGroups().then(function(i){i=jQuery.grep(i,function(t){return r.getGroupId(t)===e});t.resolve(i&&i.length>0?i[0]:undefined)});return t.promise()};this.getGroupTiles=function(e){return this._getAdapter(e.contentProvider).getGroupTiles(e)};this.getTilesByGroupId=function(e){var t=new jQuery.Deferred,r=this;this.getGroupById(e).then(function(i){if(i){var o=r._getAdapter(i.contentProvider).getGroupTiles(i);if(o){o=o.map(function(t){return{id:r.getTileId(t),title:r.getTileTitle(t),subtitle:r.getCatalogTilePreviewSubtitle(t),url:r.getCatalogTileTargetURL(t),icon:r.getCatalogTilePreviewIcon(t),groupId:e}})}else{o=[]}t.resolve(o)}else{t.resolve([])}});return t.promise()};this.getLinkTiles=function(e){return this._getAdapter(e.contentProvider).getLinkTiles(e)};this.addGroupAt=function(t,r){var i,o=r,n=this._getAdapter();if(n.addGroupAt){i=n.addGroupAt(t,r);i.fail(function(){e.error("addGroup "+t+" failed")})}else{var a=new jQuery.Deferred;i=n.addGroup(t);i.done(function(e){var t=this.moveGroup(e,o),r=e;t.done(function(){a.resolve(r)});t.fail(function(){a.reject()})}.bind(this));i.fail(function(){e.error("addGroup "+t+" failed");a.reject()});return a.promise()}return i};this.addGroup=function(t){var r=this._getAdapter().addGroup(t);r.fail(function(){e.error("addGroup "+t+" failed")});return r};this.removeGroup=function(t,r){var i=this._getAdapter(t.contentProvider).removeGroup(t,r);i.fail(function(){e.error("Fail to removeGroup "+n.getGroupTitle(t))});return i};this.resetGroup=function(t,r){var i=this._getAdapter(t.contentProvider).resetGroup(t,r);i.fail(function(){e.error("Fail to resetGroup "+n.getGroupTitle(t))});return i};this.isGroupRemovable=function(e){return this._getAdapter(e.contentProvider).isGroupRemovable(e)};this.isGroupLocked=function(e){var t=this._getAdapter(e.contentProvider);if(typeof t.isGroupLocked==="function"){return t.isGroupLocked(e)}return false};this.isGroupFeatured=function(e){var t=this._getAdapter(e.contentProvider);if(typeof t.isGroupFeatured==="function"){return t.isGroupFeatured(e)}return false};this.moveGroup=function(t,r){var i=this._getAdapter(t.contentProvider).moveGroup(t,r);i.fail(function(){e.error("Fail to moveGroup "+n.getGroupTitle(t))});return i};this.setGroupTitle=function(t,r){var i=this._getAdapter(t.contentProvider).setGroupTitle(t,r);i.fail(function(){e.error("Fail to set Group title: "+n.getGroupTitle(t))});return i};this.hideGroups=function(t){var r=new jQuery.Deferred,i=this._getAdapter();if(typeof i.hideGroups!=="function"){r.reject("hideGroups() is not implemented in the Adapter.")}else{i.hideGroups(t).done(function(){r.resolve()}).fail(function(t){e.error("Fail to store groups visibility."+t);r.reject()})}return r.promise()};this.isGroupVisible=function(e){var t=this._getAdapter(e.contentProvider);if(typeof t.isGroupVisible==="function"){return t.isGroupVisible(e)}return true};this.addTile=function(t,r){return this._getAdapter(r.contentProvider).addTile(t,r).fail(function(){e.error("Fail to add Tile: "+n.getCatalogTileId(t))})};this.removeTile=function(t,r,i){var o=new jQuery.Deferred;sap.ushell.Container.getServiceAsync("AppState").then(function(n){this._getAdapter(t.contentProvider).removeTile(t,r,i).done(function(){var e=this.getCatalogTileTargetURL(r);this.deleteURLStatesPersistentData(e,n);o.resolve()}.bind(this)).fail(function(t){e.error("Fail to remove Tile: "+this.getTileId(r));o.reject(t)}.bind(this))}.bind(this)).catch(o.reject);return o.promise()};this.moveTile=function(t,r,i,o,a,s){var u=this._getAdapter().moveTile(t,r,i,o,a,s);u.fail(function(){e.error("Fail to move Tile: "+n.getTileId(t))});return u};this.isLinkPersonalizationSupported=function(e){var t=e&&e.contentProvider,r=this._getAdapter(t);if(typeof r.isLinkPersonalizationSupported==="function"){return r.isLinkPersonalizationSupported(e)}return false};this.getTileId=function(e){var t=e&&e.contentProvider;return this._getAdapter(t).getTileId(e)};this.getTileTitle=function(e){var t=e&&e.contentProvider;return this._getAdapter(t).getTileTitle(e)};this.getTileType=function(e){var t=e&&e.contentProvider,r=this._getAdapter(t);if(r.getTileType){return r.getTileType(e)}return"tile"};this.getTileView=function(e){var t=e&&e.contentProvider,r=this._getAdapter(t).getTileView(e);if(!jQuery.isFunction(r.promise)){r=(new jQuery.Deferred).resolve(r).promise()}return r};this.getCardManifest=function(e){var t=e&&e.contentProvider;return this._getAdapter(t).getCardManifest(e)};this.getAppBoxPressHandler=function(e){var t=e&&e.contentProvider,r=this._getAdapter(t);if(r.getAppBoxPressHandler){return r.getAppBoxPressHandler(e)}return undefined};this.getTileSize=function(e){var t=e&&e.contentProvider;return this._getAdapter(t).getTileSize(e)};this.getTileTarget=function(e){var t=e&&e.contentProvider;return this._getAdapter(t).getTileTarget(e)};this.getTileDebugInfo=function(e){var t=e&&e.contentProvider,r=this._getAdapter(t);if(typeof r.getTileDebugInfo==="function"){return r.getTileDebugInfo(e)}return undefined};this.isTileIntentSupported=function(e){var t=e&&e.contentProvider,r=this._getAdapter(t);if(typeof r.isTileIntentSupported==="function"){return r.isTileIntentSupported(e)}return true};this.refreshTile=function(e){var t=e&&e.contentProvider;this._getAdapter(t).refreshTile(e)};this.setTileVisible=function(e,t){var r=e&&e.contentProvider;this._getAdapter(r).setTileVisible(e,t)};this.registerTileActionsProvider=function(e){if(typeof e!=="function"){throw new Error("Tile actions Provider is not a function")}u.push(e)};this.getTileActions=function(e){var t=[],r,i=e&&e.contentProvider,o=this._getAdapter(i);if(typeof o.getTileActions==="function"){r=o.getTileActions(e);if(r&&r.length){t.push.apply(t,r)}}for(var n=0;n<u.length;n++){r=u[n](e);if(r&&r.length){t.push.apply(t,r)}}return t};this.getCatalogs=function(){return this._getAdapter().getCatalogs()};this.isCatalogsValid=function(){return this._getAdapter().isCatalogsValid()};this.getCatalogData=function(t){var r=this._getAdapter();if(typeof r.getCatalogData!=="function"){e.warning("getCatalogData not implemented in adapter",null,"sap.ushell.services.LaunchPage");return{id:this.getCatalogId(t)}}return r.getCatalogData(t)};this.getCatalogError=function(e){return this._getAdapter().getCatalogError(e)};this.getCatalogId=function(e){return this._getAdapter().getCatalogId(e)};this.getCatalogTitle=function(e){return this._getAdapter().getCatalogTitle(e)};this.getCatalogTiles=function(t){var r=this._getAdapter().getCatalogTiles(t);r.fail(function(){e.error("Fail to get Tiles of Catalog: "+n.getCatalogTitle(t))});return r};this.getCatalogTileId=function(e){return this._getAdapter(e.contentProvider).getCatalogTileId(e)};this.getStableCatalogTileId=function(e){var t=this._getAdapter(e.contentProvider);if(t&&!t.getStableCatalogTileId){return null}return t.getStableCatalogTileId(e)};this.getCatalogTileTitle=function(e){var t=e&&e.contentProvider;return this._getAdapter(t).getCatalogTileTitle(e)};this.getCatalogTileSize=function(e){var t=e&&e.contentProvider;return this._getAdapter(t).getCatalogTileSize(e)};this.getCatalogTileViewControl=function(e){var t=e&&e.contentProvider;var r=this._getAdapter(t);if(typeof r.getCatalogTileViewControl==="function"){return r.getCatalogTileViewControl(e)}var i=new jQuery.Deferred;var o=this.getCatalogTileView(e);i.resolve(o);return i.promise()};this.getCatalogTileView=function(t){e.error("Deprecated API call of 'sap.ushell.LaunchPage.getCatalogTileView'. Please use 'getCatalogTileViewControl' instead",null,"sap.ushell.services.LaunchPage");var r=t&&t.contentProvider;var i=this._getAdapter(r);if(i.getCatalogTileView){return i.getCatalogTileView(t)}var o=this.getTileTitle(t)||this.getCatalogTileTitle(t);return this._createErrorTile(o,"The LaunchPageAdapter does not support getCatalogTileView")};this._createErrorTile=function(e,t){var r=new a({state:s.Failed,header:e,subheader:t||""}).addStyleClass("sapUshellTileError");return r};this.getCatalogTileTargetURL=function(e){var t=e&&e.contentProvider;return this._getAdapter(t).getCatalogTileTargetURL(e)};this.getCatalogTileTags=function(e){var t=e&&e.contentProvider;var r=this._getAdapter(t);if(typeof r.getCatalogTileTags==="function"){return r.getCatalogTileTags(e)}return[]};this.getCatalogTileKeywords=function(e){var t=e&&e.contentProvider;return this._getAdapter(t).getCatalogTileKeywords(e)};this.getCatalogTilePreviewTitle=function(e){var t=e&&e.contentProvider;return this._getAdapter(t).getCatalogTilePreviewTitle(e)};this.getCatalogTilePreviewInfo=function(e){var t=e&&e.contentProvider;if(this._getAdapter(t).getCatalogTilePreviewInfo){return this._getAdapter(t).getCatalogTilePreviewInfo(e)}return""};this.getCatalogTilePreviewSubtitle=function(e){var t=e&&e.contentProvider;var r=this._getAdapter(t);if(r.getCatalogTilePreviewSubtitle){return r.getCatalogTilePreviewSubtitle(e)}return undefined};this.getCatalogTilePreviewIcon=function(e){var t=e&&e.contentProvider;return this._getAdapter(t).getCatalogTilePreviewIcon(e)};this.addBookmark=function(t,r,i){var o=new jQuery.Deferred;if(this._hasRequiredBookmarkParameters(t)){if(r&&this.isGroupLocked(r)){var n="Tile cannot be added, target group ("+this.getGroupTitle(r)+")is locked!";e.error(n);return o.reject(n)}this.changeURLStatesToPersistent(t.url).done(function(n){var a=r&&r.contentProvider;t.url=n;this._getAdapter(a).addBookmark(t,r,i).done(o.resolve).fail(function(){e.error("Fail to add bookmark for URL: "+t.url+" and Title: "+t.title);o.reject()})}.bind(this)).fail(function(r){e.error(r||"Fail to change url states to persistent: "+t.url);o.reject()})}return o.promise()};this.addCustomBookmark=function(t,r,i){var o=new jQuery.Deferred;if(this._hasRequiredBookmarkParameters(t)){if(r&&this.isGroupLocked(r)){var n="Tile cannot be added, target group ("+this.getGroupTitle(r)+")is locked!";e.error(n);return o.reject(n)}this.changeURLStatesToPersistent(t.url).done(function(n){var a=r&&r.contentProvider;t.url=n;this._getAdapter(a).addCustomBookmark(t,r,i).done(o.resolve).fail(function(){e.error("Fail to add bookmark for URL: "+t.url+" and Title: "+t.title);o.reject()})}.bind(this)).fail(function(r){e.error(r||"Fail to change url states to persistent: "+t.url);o.reject()})}return o.promise()};this._hasRequiredBookmarkParameters=function(t){if(!t.title){e.error("Add Bookmark - Missing title");throw new Error("Title missing in bookmark configuration")}if(!t.url){e.error("Add Bookmark - Missing URL");throw new Error("URL missing in bookmark configuration")}return true};this.countBookmarks=function(t,r){if(!t||typeof t!=="string"){e.error("Fail to count bookmarks. No valid URL");throw new Error("Missing URL")}var i=this._getAdapter().countBookmarks(t,r);i.fail(function(){e.error("Fail to count bookmarks")});return i};this.countCustomBookmarks=function(e){if(!e.url||!e.vizType){return Promise.reject("countCustomBookmarks: Some required parameters are missing.")}return this._getAdapter().countCustomBookmarks(e)};this.deleteBookmarks=function(t,r){var i=new jQuery.Deferred;if(!t||typeof t!=="string"){return i.reject(new Error("Missing URL")).promise()}sap.ushell.Container.getServiceAsync("AppState").then(function(o){this._getAdapter().deleteBookmarks(t,undefined,r).done(function(e){this.deleteURLStatesPersistentData(t,o);i.resolve(e)}.bind(this)).fail(function(r){e.error("Fail to delete bookmark for: "+t);i.reject(r)})}.bind(this)).catch(i.reject);return i.promise()};this.deleteCustomBookmarks=function(e){if(!e.url||!e.vizType){return Promise.reject("deleteCustomBookmarks: Some required parameters are missing.")}return this._getAdapter().deleteCustomBookmarks(e)};this.updateBookmarks=function(t,r,i){if(!t||typeof t!=="string"){e.error("Fail to update bookmark. No valid URL");throw new Error("Missing URL")}if(!r||typeof r!=="object"){e.error("Fail to update bookmark. No valid parameters, URL is: "+t);throw new Error("Missing parameters")}var o=new jQuery.Deferred;this.changeURLStatesToPersistent(r.url).done(function(n){r.url=n;this._getAdapter().updateBookmarks(t,r,undefined,i).done(o.resolve).fail(function(){e.error("Fail to update bookmark for: "+t);o.reject()})}.bind(this)).fail(function(t){e.error(t||"Fail to change url states to persistent: "+r.url);o.reject()});return o.promise()};this.updateCustomBookmarks=function(e,t){if(!e.url||!e.vizType||!t){return Promise.reject("updateCustomBookmarks: Some required parameters are missing.")}return this._getAdapter().updateCustomBookmarks(e,t)};this.onCatalogTileAdded=function(e){this._getAdapter().onCatalogTileAdded(e)};this.changeURLStatesToPersistent=function(t){var r=new jQuery.Deferred;sap.ushell.Container.getServiceAsync("AppState").then(function(i){if(i.getSupportedPersistencyMethods().length===0){r.resolve(t);return}if(t&&t.length>0){try{i.setAppStateToPublic(t).done(r.resolve).fail(r.reject)}catch(t){e.error("error in converting transient state to personal persistent when bookmark is added",t,"sap.ushell.services.LaunchPage");r.reject()}}else{r.resolve(t)}});return r.promise()};this.deleteURLStatesPersistentData=function(t,r){if(r.getSupportedPersistencyMethods().length===0){return}if(t&&t.length>0){try{var i=d(t,"sap-xapp-state"),o=d(t,"sap-iapp-state");if(i!==undefined||o!==undefined){this.countBookmarks(t).done(function(e){if(e===0){if(i!==undefined){r.deleteAppState(i)}if(o!==undefined){r.deleteAppState(o)}}})}}catch(t){e.error("error in deleting persistent state when bookmark is deleted",t,"sap.ushell.services.LaunchPage")}}};function d(e,t){var r=new RegExp("(?:"+t+"=)([^&/]+)"),i=r.exec(e),o;if(i&&i.length===2){o=i[1]}return o}}u.prototype._getAdapter=function(e){return this.oAdapters[e]||this.oAdapters.default};u.hasNoAdapter=false;return u},true);
//# sourceMappingURL=LaunchPage.js.map