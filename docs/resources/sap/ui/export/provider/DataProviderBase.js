/*!
 * SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
(function(t){"use strict";if(typeof sap!=="undefined"&&typeof sap.ui.define==="function"){sap.ui.define([],t,true)}else{var e;if(typeof window!=="undefined"){e=window}else if(typeof self!=="undefined"){e=self}else{e=this}e.DataProviderBase=t()}})(function(){"use strict";var t=function(e){this.mSettings=e;this.bCanceled=false;this.iAvailableRows=0;this.mRequest=null;this.iTotalRows=Math.min(e.dataSource.count||t.MAX_ROWS,t.MAX_ROWS);this.iBatchSize=Math.min(e.dataSource.sizeLimit||t.MAX_ROWS,this.iTotalRows);this._prepareDataUrl()};t.MAX_ROWS=1048575;t.HTTP_ERROR_MSG="HTTP connection error";t.HTTP_WRONG_RESPONSE_MSG="Unexpected server response:\n";t._createGuid=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=Math.random()*16|0,r=t==="x"?e:e&3|8;return r.toString(16)})};t.getColumnsToConvert=function(t){return t.workbook.columns.reduce(function(t,e){var r;r=e.property instanceof Array?e.property:[e.property];if(e.unitProperty){r.push(e.unitProperty)}r.forEach(function(r){var n=r.split("/");if(n.length>1){t.push({property:r,keys:n,type:e.type})}});return t},[])};t.getDataConverter=function(e){var r=this.getColumnsToConvert(e);return function(e){return t._convertData(e,r)}};t._convertData=function(e,r){r.forEach(function(r){e.forEach(function(e){e[r.property]=t._getValue(e,r)})});return e};t._getValue=function(t,e){var r=e.keys.reduce(function(t,e){return t&&t[e]},t);return r};t.prototype.requestData=function(e){var r=this.mSettings.dataSource;this.fnConvertData=t.getDataConverter(this.mSettings);this.fnProcessCallback=e;this.mRequest={serviceUrl:this._cleanUrl(r.serviceUrl),dataUrl:this._getUrl(0,this.iBatchSize),method:r.useBatch?"BATCH":"GET",headers:r.headers};this.sendRequest(this.mRequest).then(this.fnOnDataReceived.bind(this)).catch(this.fnOnError.bind(this));return{cancel:function(){this.bCanceled=true;if(this.oPendingXHR instanceof XMLHttpRequest){this.oPendingXHR.abort()}}.bind(this)}};t.prototype.fnOnDataReceived=function(t){var e,r,n,s;var i={};this.oPendingXHR=null;if(this.bCanceled){return}e=t&&t.value||t.d&&(t.d.results||t.d)||t;e=Array.isArray(e)?e:[];n=e.length;this.iAvailableRows+=n;s=this.iTotalRows-this.iAvailableRows;i.finished=n===0||s<=0;i.progress=this.iTotalRows;i.total=this.iTotalRows;i.fetched=this.iAvailableRows;r=t&&t["@odata.nextLink"]||t.d&&t.d.__next||null;if(!i.finished){this.mRequest.dataUrl=this._getUrl(this.iAvailableRows,Math.min(this.iBatchSize,s),r);this.sendRequest(this.mRequest).then(this.fnOnDataReceived.bind(this)).catch(this.fnOnError.bind(this))}i.rows=this.fnConvertData(e);this.fnProcessCallback(i)};t.prototype.fnOnError=function(t){this.fnProcessCallback({error:t})};t.prototype._cleanUrl=function(t){var e;if(!t){return""}e=new URL(t);e.hash=e.search="";e.pathname+=e.pathname.endsWith("/")?"":"/";return e.toString()};t.prototype._prepareDataUrl=function(){var t=this.mSettings.dataSource;var e,r=/\$skip\=[0-9]+/,n=/\$top\=[0-9]+/;if(!t.dataUrl){throw"Unable to load data - no URL provided."}e=new URL(t.dataUrl);e.search=e.search||"";if(!r.test(e.search)){e.search+=(e.search.length?"&$skip=":"$skip=")+0}if(!n.test(e.search)){e.search+="&$top="+0}this.mSettings.dataSource.dataUrl=e.toString()};t.prototype._getUrl=function(t,e,r){var n,s;n=new URL(this.mSettings.dataSource.dataUrl);if(r){s=new URL(r,n.origin);n.search=s.search}else{n.search=(n.search||"").replace(/\$skip\=[0-9]+/g,"$skip="+t).replace(/\$top\=[0-9]+/g,"$top="+e)}return n.toString()};t.prototype.sendRequest=function(t){var e;if(typeof t!=="object"||t===null||typeof t.dataUrl!=="string"){throw new Error("Unable to send request - Mandatory parameters missing.")}e=(t.method==="BATCH"&&t.serviceUrl?this.sendBatchRequest:this.sendGetRequest).bind(this);return e(t)};t.prototype.sendBatchRequest=function(e){return new Promise(function(r,n){var s=new XMLHttpRequest;var i="batch_"+t._createGuid();var a=e.dataUrl.split(e.serviceUrl)[1];var o=[];var h,c;s.onload=function(){var e,s,i,a,o,h,c;s=this.responseText.split("\r\n");o=0;a=s.length;i=a-1;s.forEach(function(t){c=t.match(/^HTTP\/1\.[0|1] ([1-9][0-9]{2})/);if(Array.isArray(c)&&c[1]){h=c[1]}});while(o<a&&s[o].slice(0,1)!=="{"){o++}while(i>0&&s[i].slice(-1)!=="}"){i--}s=s.slice(o,i+1);e=s.join("\r\n");if(h&&parseInt(h)>=400){n(t.HTTP_WRONG_RESPONSE_MSG+e);return}try{r(JSON.parse(e))}catch(r){n(t.HTTP_WRONG_RESPONSE_MSG+e)}};s.onerror=function(){n(this.responseText||t.HTTP_ERROR_MSG)};s.open("POST",e.serviceUrl+"$batch",true);s.setRequestHeader("Accept","multipart/mixed");s.setRequestHeader("Content-Type","multipart/mixed;boundary="+i);o.push("--"+i);o.push("Content-Type: application/http");o.push("Content-Transfer-Encoding: binary");o.push("");o.push("GET "+a+" HTTP/1.1");o.push("Accept:application/json");for(h in e.headers){c=e.headers[h];if(h.toLowerCase()!="accept"){s.setRequestHeader(h,c);o.push(h+":"+c)}}o.push("");o.push("");o.push("--"+i+"--");o.push("");o=o.join("\r\n");s.send(o);this.oPendingXHR=s}.bind(this))};t.prototype.sendGetRequest=function(e){return new Promise(function(r,n){var s;var i=new XMLHttpRequest;i.onload=function(){if(this.status>=400){n(this.responseText||this.statusText||t.HTTP_ERROR_MSG);return}try{r(JSON.parse(this.responseText))}catch(e){n(t.HTTP_WRONG_RESPONSE_MSG+this.responseText)}};i.onerror=function(){n(this.responseText||t.HTTP_ERROR_MSG)};i.open("GET",e.dataUrl,true);i.setRequestHeader("accept","application/json");for(s in e.headers){if(s.toLowerCase()!=="accept"){i.setRequestHeader(s,e.headers[s])}}i.send();this.oPendingXHR=i}.bind(this))};return t});
//# sourceMappingURL=DataProviderBase.js.map