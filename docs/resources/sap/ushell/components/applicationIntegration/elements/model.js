// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/EventHub","sap/ushell/Config","sap/ushell/utils","sap/ushell/components/HeaderManager","sap/ushell/components/StateHelper","sap/ui/performance/Measurement","sap/base/Log","sap/base/util/deepExtend","sap/ui/thirdparty/jquery","sap/ushell/utils/UrlParsing"],function(t,e,n,a,i,o,s,r,jQuery,l){"use strict";var h;var u;function f(){return{home:{actions:["ContactSupportBtn"]},app:{actions:["ContactSupportBtn","aboutBtn"]},minimal:{actions:["ContactSupportBtn","aboutBtn"]},standalone:{actions:["ContactSupportBtn","aboutBtn"]},embedded:{actions:["ContactSupportBtn","aboutBtn"]},"embedded-home":{actions:["ContactSupportBtn","aboutBtn"]},lean:{actions:["ContactSupportBtn","aboutBtn"]}}}function d(){return{blank:{stateName:"blank",showCurtain:false,showCatalog:false,showPane:false,showRightFloatingContainer:true,showRecentActivity:true,paneContent:[],actions:[],floatingActions:[],subHeader:[],toolAreaItems:[],RightFloatingContainerItems:[],toolAreaVisible:false,floatingContainerContent:[],search:""},"blank-home":{stateName:"blank-home",showCurtain:false,showCatalog:false,showPane:false,showRightFloatingContainer:true,showRecentActivity:true,paneContent:[],actions:[],floatingActions:[],subHeader:[],toolAreaItems:[],RightFloatingContainerItems:[],toolAreaVisible:false,floatingContainerContent:[],search:""},home:{stateName:"home",showCurtain:false,showCatalog:false,showPane:false,showRightFloatingContainer:true,showRecentActivity:true,search:"",paneContent:[],actions:["openCatalogBtn","userSettingsBtn"],floatingActions:[],subHeader:[],toolAreaItems:[],RightFloatingContainerItems:[],toolAreaVisible:false,floatingContainerContent:[]},app:{stateName:"app",showCurtain:false,showCatalog:false,showPane:false,showRightFloatingContainer:true,showRecentActivity:true,paneContent:[],search:"",actions:["openCatalogBtn","userSettingsBtn"],floatingActions:[],subHeader:[],toolAreaItems:[],RightFloatingContainerItems:[],toolAreaVisible:false,floatingContainerContent:[]},minimal:{stateName:"minimal",showCurtain:false,showCatalog:false,showPane:false,showRightFloatingContainer:true,showRecentActivity:true,paneContent:[],actions:["openCatalogBtn","userSettingsBtn"],floatingActions:[],subHeader:[],toolAreaItems:[],RightFloatingContainerItems:[],toolAreaVisible:false,floatingContainerContent:[],search:""},standalone:{stateName:"standalone",showCurtain:false,showCatalog:false,showPane:false,showRightFloatingContainer:true,showRecentActivity:true,paneContent:[],actions:[],floatingActions:[],subHeader:[],toolAreaItems:[],RightFloatingContainerItems:[],toolAreaVisible:false,floatingContainerContent:[],search:""},embedded:{stateName:"embedded",showCurtain:false,showCatalog:false,showPane:false,showRightFloatingContainer:true,showRecentActivity:true,paneContent:[],actions:[],floatingActions:[],subHeader:[],toolAreaItems:[],RightFloatingContainerItems:[],toolAreaVisible:false,floatingContainerContent:[],search:""},"embedded-home":{stateName:"embedded-home",showCurtain:false,showCatalog:false,showPane:false,showRightFloatingContainer:true,showRecentActivity:true,paneContent:[],actions:[],floatingActions:[],subHeader:[],toolAreaItems:[],RightFloatingContainerItems:[],toolAreaVisible:false,floatingContainerContent:[],search:""},headerless:{stateName:"headerless",showCurtain:false,showCatalog:false,showPane:false,showRightFloatingContainer:true,showRecentActivity:true,paneContent:[],actions:[],floatingActions:[],subHeader:[],toolAreaItems:[],RightFloatingContainerItems:[],toolAreaVisible:false,floatingContainerContent:[],search:""},merged:{stateName:"merged",showCurtain:false,showCatalog:false,showPane:false,showRightFloatingContainer:true,showRecentActivity:true,paneContent:[],actions:[],floatingActions:[],subHeader:[],toolAreaItems:[],RightFloatingContainerItems:[],toolAreaVisible:false,floatingContainerContent:[],search:""},"headerless-home":{stateName:"headerless-home",showCurtain:false,showCatalog:false,showPane:false,showRightFloatingContainer:true,showRecentActivity:true,paneContent:[],actions:[],floatingActions:[],subHeader:[],toolAreaItems:[],RightFloatingContainerItems:[],toolAreaVisible:false,floatingContainerContent:[],search:""},"merged-home":{stateName:"merged-home",showCurtain:false,showCatalog:false,showPane:false,showRightFloatingContainer:true,showRecentActivity:true,paneContent:[],actions:[],floatingActions:[],subHeader:[],toolAreaItems:[],RightFloatingContainerItems:[],toolAreaVisible:false,floatingContainerContent:[],search:""},lean:{stateName:"lean",showCurtain:false,showCatalog:false,showPane:false,showRightFloatingContainer:true,showRecentActivity:false,paneContent:[],search:"",actions:[],floatingActions:[],subHeader:[],toolAreaItems:[],RightFloatingContainerItems:[],toolAreaVisible:false,floatingContainerContent:[]},"lean-home":{stateName:"lean-home",showCurtain:false,showCatalog:false,showPane:false,showRightFloatingContainer:true,showRecentActivity:false,paneContent:[],search:"",actions:[],floatingActions:[],subHeader:[],toolAreaItems:[],RightFloatingContainerItems:[],toolAreaVisible:false,floatingContainerContent:[]}}}function c(t,e){return Object.keys(t).reduce(function(n,a){if(!e[a]){n[a]=t[a]}return n},{})}function g(t,e){return e!==undefined}function m(){return true}function S(t,e){var n=e.split("/");var a=t;n.shift();n.forEach(function(t){if(!a){return}a=a[t]});return a}function p(t,e,n){var a=t.split("/");var i=n;a.shift();var o=a.pop();a.forEach(function(t){i=i[t]});i[o]=e}function C(){var C;var v;var w;var A;var I;var b;var R;var _;var y;var F;this.createDefaultTriggers=function(e){var n=function(t,e,n){if(n.sProperty==="actions"){var a=S(n.oModel,n.path);if(a&&a.length===0&&n.aIds&&n.aIds.length>0){this._renderShellState()}}}.bind(this);var a=function(t){function e(t,e){var n=l.getHash(t),a=l.getHash(e),i=l.parseShellHash(n).appSpecificRoute,o=l.parseShellHash(a).appSpecificRoute;return i!==o}var n=e(t.oldURL,t.newURL);if(n){this.addHeaderItem(["backBtn"],true)}}.bind(this);this.createTriggersOnBaseStates([{sName:"onAddFirstAction",fnRegister:function(){sap.ui.getCore().getEventBus().subscribe("launchpad","updateShell",n,this)},fnUnRegister:function(){sap.ui.getCore().getEventBus().unsubscribe("launchpad","updateShell",n,this)}}],["blank","blank-home"],e);var i=this;var o;this.createTriggersOnBaseStates([{sName:"onAddFirstAction",fnRegister:function(){window.addEventListener("hashchange",a);var e=0;o=t.on("AppRendered").do(function(){e++;if(e>=2){i.addHeaderItem(["backBtn"],true)}})},fnUnRegister:function(){window.removeEventListener("hashchange",a);if(o){o.off()}}}],["lean","lean-home"],e)};this.init=function(t,n){h=d();u=f();v=e.last("/core/shell/model");C={};I={};b=false;_=false;y=[];F=true;A=n;R=undefined;if(t){o.start("FLP:ElementsModel.init","moveShellHeaderEndItems","FLP");if(t.moveContactSupportActionToShellHeader){this._removeCustomDataActionBtnFromMeArea("ContactSupportBtn")}if(t.moveAppFinderActionToShellHeader){this._removeActionFromMeArea("openCatalogBtn")}if(t.moveUserSettingsActionToShellHeader){this._removeActionFromMeArea("userSettingsBtn")}o.end("FLP:ElementsModel.init")}var a=t&&t.appState?t.appState:"home";this.createDefaultTriggers(a);this.switchState(a)};this.destroy=function(){v=undefined;C=undefined;A=undefined;I=undefined;b=undefined;F=undefined;_=undefined;R=undefined;h=undefined;u=undefined};this.getModel=function(){var t=sap.ushell.Container.getRenderer("fiori2");if(!t){return undefined}return t._oShellView.getModel()};this._removeCustomDataActionBtnFromMeArea=function(t){for(var e in u){var n=u[e];var a=n.actions;var i=a.indexOf(t);if(i!==-1){u[e].actions.splice(i,1)}}};this._removeActionFromMeArea=function(t){var e;for(e in h){var n=h[e];if(e==="blank"||e==="blank-home"){continue}var a=n.actions;var i=a.indexOf(t);if(i!==-1){h[e].actions.splice(i,1)}}};this.destroyManageQueue=function(){this._destroyManageQueue(["home","embedded-home","headerless-home","merged-home","blank-home","lean-home"])};this.switchState=function(t){var n=r({},h[t]);var i=c(n,{aTriggers:true});e.emit("/core/shell/model/currentState",i);a.switchState(t);w=A.customShellState;R=undefined;this._renderShellState();return n};this.setLeftPaneVisibility=function(t,e,n){this.updateStateProperty("showPane",t,e,n)};this.setHeaderHiding=function(){s.warning("Application Life Cycle model: headerHiding property is deprecated and has no effect")};this._createHeaderEventPayload=function(t,e,n,a,i,o){var s={propertyName:t,value:e,aStates:a,bCurrentState:n,action:o,bDoNotPropagate:i};return s};this.setHeaderVisibility=function(t,e,n){var i=this._createHeaderEventPayload("headerVisible",t,e,n,false);a.updateStates(i)};this.showLogo=function(t,e){this.updateShowLogo(true,t,e,false)};this.updateShowLogo=function(t,e,n,i){var o=this._createHeaderEventPayload("showLogo",t,e,n,i);a.updateStates(o)};this.addHeaderItem=function(t,e,n){if(t.length){var i=this._createHeaderEventPayload("headItems",t,e,n,false);a.updateStates(i)}};this.removeHeaderItem=function(t,e,n){var i=this._createHeaderEventPayload("headItems",t,e,n,false,"remove");a.updateStates(i)};this.addHeaderEndItem=function(t,e,n,i){if(t.length){var o=this._createHeaderEventPayload("headEndItems",t,e,n,i);a.updateStates(o)}};this.removeHeaderEndItem=function(t,e,n){var i=this._createHeaderEventPayload("headEndItems",t,e,n,false,"remove");a.updateStates(i)};this.addSubHeader=function(t,e,n){if(t.length){this._addShellItem("subHeader",t,e,n)}};this.removeSubHeader=function(t,e,n){this._removeShellItem("subHeader",t,e,n)};this.addActionButton=function(t,e,n){this._addActionButton("actions",t,e,n)};this.removeActionButton=function(t,e,n){this._removeShellItem("actions",t,e,n)};this.addToolAreaItem=function(t,e,n,a){if(t.length){this._addToolAreaItem("toolAreaItems",t,e,n,a)}};this.removeToolAreaItem=function(t,e,n){this._removeShellItem("toolAreaItems",t,e,n)};this.addLeftPaneContent=function(t,e,n){if(t.length){this._addShellItem("paneContent",t,e,n)}};this.removeLeftPaneContent=function(t,e,n){this._removeShellItem("paneContent",t,e,n)};this.addRightFloatingContainerItem=function(t,e,n){if(t.length){this._addRightFloatingContainerItem("RightFloatingContainerItems",t,e,n)}};this.removeRightFloatingContainerItem=function(t,e,n){this._removeShellItem("RightFloatingContainerItems",t,e,n)};this.showSettingsButton=function(t,e){this.addActionButton(["userSettingsBtn"],t,e,false)};this.showSignOutButton=function(t,e){this.addActionButton(["logoutBtn"],t,e,false)};this.showRightFloatingContainer=function(t){this._showRightFloatingContainer(t)};this.addFloatingActionButton=function(t,e,n){if(t.length){this._addShellItem("floatingActions",t,e,n)}};this.removeFloatingActionButton=function(t,e,n){this._removeShellItem("floatingActions",t,e,n)};this.updateStateProperty=function(t,e,n,i,o){if(t.startsWith("application")){var s=this._createHeaderEventPayload(t,e,n,i,false);a.updateStates(s);return}this._setShellItem(t,e,n,i,g,p,o)};this._handleTriggers=function(t){var e,n,a=[],i={};F=false;while(y.length>0){e=y.pop();if(t[e.sName]){a.push(e);i[e.sName]=e}else{e.fnUnRegister(this)}}for(var o in t){if(t.hasOwnProperty(o)){if(!i[o]){n=t[o];n.fnRegister(this);a.push(n)}}}y=a;F=true};this._registerTriggers=function(t){F=false;t.forEach(function(t){t.fnRegister(this);y.push(t)});F=true};function B(t,e){var n=[];if(!e.aTriggers){e.aTriggers=[]}t.forEach(function(t){var a={sName:t.sName,fnRegister:t.fnRegister,fnUnRegister:t.fnUnRegister};e.aTriggers.push(a);n.push(a)});return n}this.createTriggersOnState=function(t){var e=B(t,h);if(!b){this._registerTriggers(e)}};this.createTriggersOnBaseStates=function(t,e,n){var a=[];e.forEach(function(e){var n=h[e];a=B(t,n)});var i=e.indexOf(n)>=0;if(i&&!b){this._registerTriggers(a)}};this.createTriggers=function(t,e,n){var a=v.currentState;if(e===true){this.createTriggersOnState(t,a);return}this.createTriggersOnBaseStates(t,n,a.stateName)};this.showShellItem=function(t,e,n){var a=i.getModelStates(e),o="/currentState"+t,s;for(var r=0;r<a.length;r++){s=h[a[r]].stateName;h[s][t.split("/")[1]]=n}if(v.currentState.stateName===e){p(o,n,v);if(!b){this._renderShellState()}}};this.addCustomItems=function(t,e,n,a){if(this._isValidStateEntry(t)){this._isValidStateEntry(t).fnAdd(e,n,a)}else{throw new Error("Invalid state entry:"+t)}};this.removeCustomItems=function(t,e,n,a){if(this._isValidStateEntry(t)){this._isValidStateEntry(t).fnRemove(e,n,a)}else{throw new Error("Invalid state entry:"+t)}};this.applyExtendedShellState=function(t){R=t;this._renderShellState()};this.addEntryInShellStates=function(t,e,n,a,i){var o,s;if(!C[t]){C[t]={fnAdd:n,fnHide:a};var r=this._getStatesList();for(o=0;o<r.length;o++){s=r[o];h[s][t]=i[s]}this["remove"+e]=a;this["add"+e]=n}else{throw new Error("State entry already exsists:"+t)}};this.addElementToManagedQueue=function(t){var n=e.last("/core/shell/model/currentState/stateName"),a,i=t.getId();if(!A){A={extendedShellStates:{},aTriggers:[],customShellState:this._createCustomShellState("custom")}}a=A.extendedShellStates;if(!a[n]){a[n]={managedObjects:[],customState:undefined}}a[n].managedObjects.push(i);var o=I[i];if(o){o.nRefCount++}else{o={oItem:t,nRefCount:1};I[i]=o}};this.updateNeededTriggersMap=function(t,e){var n;if(!e){return}for(n=0;n<e.length;n++){t[e[n].sName]=e[n]}};this._renderShellState=function(){var t=e.last("/core/shell/model/currentState/stateName"),n,i,o=r({},h[t]),s=A,l,u={};if(b){return}if(s&&s.customShellState){l=s.customShellState.currentState}var f={currentState:r({},o)};v=f;b=true;if(R&&s.extendedShellStates&&s.extendedShellStates[R]){n=s.extendedShellStates[R].customState;i=n.currentState;this._addCustomShellStates(i)}if(l){this._addCustomShellStates(l)}v=e.last("/core/shell/model");if(o&&o.aTriggers){this.updateNeededTriggersMap(u,o.aTriggers)}if(i&&i.aTriggers){this.updateNeededTriggersMap(u,i.aTriggers)}if(l&&l.aTriggers){this.updateNeededTriggersMap(u,l.aTriggers)}if(F){this._handleTriggers(u)}delete f.currentState.aTriggers;var d=c(f.currentState,{aTriggers:true});a.recalculateState(R);e.emit("/core/shell/model/currentState",d);b=false};this._addCustomShellStates=function(t){this.addToolAreaItem(t.toolAreaItems,false,true);this.addSubHeader(t.subHeader,true);this.addRightFloatingContainerItem(t.RightFloatingContainerItems,true);this.addActionButton(t.actions,true,undefined,false);this.addLeftPaneContent(t.paneContent,true);this.addFloatingActionButton(t.floatingActions,true);this.showRightFloatingContainer(t.showRightFloatingContainer)};this._createCustomShellState=function(t){var e={currentState:{stateName:t,headEndItems:[],paneContent:[],headItems:[],actions:[],floatingActions:[],subHeader:[],toolAreaItems:[],RightFloatingContainerItems:[],application:{},showRightFloatingContainer:undefined,headerHeading:undefined}};var n=u[t];if(n){jQuery.extend(e.currentState,n)}return e};this._showRightFloatingContainer=function(t){this._setShellItem("showRightFloatingContainer",t,true,[],g,p)};this._addActionButton=function(t,e,a,i){function o(t,e,a){var i=S(a,t);var o=i.indexOf("logoutBtn");if(o>-1){i.splice.apply(i,[o,0].concat(e))}else{i=i.concat(e)}var s=n.removeDuplicatedActions(i);function r(t){var e=[],n=["recentActivitiesBtn","frequentActivitiesBtn","openCatalogBtn","userSettingsBtn","ActionModeBtn","EditModeBtn","ContactSupportBtn"];for(var a=0;a<n.length;a++){var i=t.indexOf(n[a]);if(i>-1){e.push(t.splice(i,1)[0])}}e=e.concat(t);return e}var l=r(s);p(t,l,a)}this._setShellItem(t,e,a,i,m,o)};this.setFloatingContainerContent=function(t,e,n,a){function i(t,e,n){return e.length===1}function o(t,e,n){p(t,e,n)}this._setShellItem(t,e,n,a,i,o)};this._addShellItem=function(t,e,n,a){function i(t,e,n){if(t.length>0){s.warning("You can only add one item. Replacing existing item: "+t[0]+" in state: "+n+", with the new item: "+e[0]+".")}return true}function o(t,n,a){p(t,e.slice(0),a)}this._setShellItem(t,e,n,a,i,o)};this._addRightFloatingContainerItem=function(t,e,n,a){function i(t,e,n){var a=S(n,t);a=a.concat(e);p(t,a,n)}this._setShellItem(t,e,n,a,m,i)};this._addToolAreaItem=function(t,e,n,a,o){function s(t,e,n){var a=S(n,t),i,o;if(typeof e==="string"){e=[e]}for(o=0;o<e.length;o++){i=e[o];if(a.indexOf(i)<0){a.push(i)}}p(t,a,n)}if(n){var r,l=i.getPassStates(o);for(r=0;r<l.length;r++){this.showShellItem("/toolAreaVisible",l[r],true)}}this._setShellItem(t,e,a,o,m,s)};this._removeShellItem=function(t,e,n,a){function i(t,e){var n,a,i;for(i=0;i<e.length;i++){a=e[i];n=t.indexOf(a);if(n<0){s.warning("You cannot remove Item: "+a+", the Item does not exists.");return false}}return true}function o(t,e,n){var a=S(n,t),i,o,s;for(s=0;s<e.length;s++){o=e[s];i=a.indexOf(o);if(i>-1){a.splice(i,1)}}p(t,a,n)}this._setShellItem(t,e,n,a,i,o)};this._setShellItem=function(t,e,n,a,o,s,r){var l,u;var f=Array.isArray(e)?e.slice(0):e;if(n===true){l="/currentState/"+t;u=S(v,l);if(o(u,f,"currentState")===false){return}if(!_&&!b){s(l,f,w);sap.ui.getCore().getEventBus().publish("launchpad","updateShell",{oModel:v,path:l,aIds:f,sProperty:t});this._renderShellState()}else{s(l,f,v)}}else{var d=r?a:i.getPassStates(a),c,g=v.currentState.stateName;for(c=0;c<d.length;c++){var m=d[c],p;u=S(h[m],"/"+t);if(o(u,f,m)===false){continue}var C=i.getModelStates(m,r);for(p=0;p<C.length;p++){l="/"+C[p]+"/"+t;s(l,f,h);if(g===C[p]){if(!b){this._renderShellState()}}}}}};this._getStatesList=function(){return Object.keys(h)};this._destroyManageQueue=function(){var t,e,n,a,i,o;a=A.extendedShellStates;for(i in a){if(a.hasOwnProperty(i)){o=a[i].managedObjects;for(t=0;t<o.length;t++){e=o[t];n=I[e];n.nRefCount--;if(n.nRefCount===0){n.oItem.destroy();I[e]=null}}delete a[i]}}};this._isValidStateEntry=function(t){return!!C[t]};this.getModelToUpdate=function(){return v};this.setModelToUpdate=function(t,e){_=e;v=t};this._getManagedElements=function(){return I};this.extendStates=function(t){var e;for(e in t){if(t.hasOwnProperty(e)){n.updateProperties(h[e],t[e])}}};this.getBaseStateMember=function(t,e){return h[t][e]};this.getCustomStateDeltaMember=function(t,e){return u[t][e]};this.getAllStatesInDelta=function(){return Object.keys(u)}}var v=new C;return v},true);
//# sourceMappingURL=model.js.map