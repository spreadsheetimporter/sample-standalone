// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define([],function(){"use strict";function e(e){var a=[],n;e=e||[];for(n=0;n<e.length;n++){if(e[n]!==undefined){if(e[n]!=="home"&&e[n]!=="app"){throw new Error("sLaunchpadState value is invalid")}a.push(e[n])}}if(!a.length){a=["app","home"]}return a}function a(e,a){var n=[];if(e==="app"&&!a){var t=["app","minimal","standalone","embedded","headerless","merged","blank","lean"];n=n.concat(t)}else if(e==="home"&&!a){var r=["home","embedded-home","headerless-home","merged-home","blank-home","lean-home"];n=n.concat(r)}else{n.push(e)}return n}function n(n,t){var r=t?n:e(n);return r.reduce(function(e,n){var r=a(n,t);if(r){e=e.concat(r)}return e},[])}return{getAllStateToUpdate:n,getModelStates:a,getPassStates:e}});
//# sourceMappingURL=StateHelper.js.map