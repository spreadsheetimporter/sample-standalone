// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/components/tiles/generic","sap/m/library","sap/ui/thirdparty/jquery","sap/base/Log"],function(e,i,jQuery,t){"use strict";var a=i.DeviationIndicator;var l=i.ValueColor;var o=i.Size;var s=i.LoadState;var n=i.FrameType;var r=e.extend("sap.ushell.components.tiles.indicatorcontribution.ContributionTile",{onInit:function(){this.KPI_VALUE_REQUIRED=false},_processDataForComparisonChart:function(e,i,t,a){var l=this.oConfig.TILE_PROPERTIES.semanticColorContribution;var o=[];var s;var n;for(var r=0;r<e.results.length;r++){var T=e.results[r];var c={};try{c.title=T[t].toString()}catch(e){c.title=""}c.value=Number(T[i]);var u=Number(T[i]);if(this.oConfig.EVALUATION.SCALING==-2){u*=100}var p=this.isCurrencyMeasure(i);n=T[a];s=sap.ushell.components.tiles.indicatorTileUtils.util.getLocaleFormattedValue(u,this.oConfig.EVALUATION.SCALING,this.oConfig.EVALUATION.DECIMAL_PRECISION,p,n);c.displayValue=s.toString();if(typeof l==="undefined"){c.color="Neutral"}else{c.color=l}if(c&&a){c[a]=n}o.push(c)}return o},fetchChartData:function(e,i,a,l){var o=this;try{var s=this.oConfig.EVALUATION.ODATA_ENTITYSET,n;o.setThresholdValues();if(this.oConfig.TILE_PROPERTIES.semanticMeasure){n=this.oConfig.EVALUATION.COLUMN_NAME+","+this.oConfig.TILE_PROPERTIES.semanticMeasure}else{n=this.oConfig.EVALUATION.COLUMN_NAME}var r=null;var T=this.oConfig.TILE_PROPERTIES.dimension;var c=sap.ushell.components.tiles.indicatorTileUtils.util.getBoolValue(e);var u=sap.ushell.components.tiles.indicatorTileUtils.cache.getKpivalueById(o.oConfig.TILE_PROPERTIES.id);if(sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(o.oConfig)){if(u){var p=u.Data&&JSON.parse(u.Data)}}var E=o.oTileApi.configuration.getParameterValueAsString("timeStamp");var h=sap.ushell.components.tiles.indicatorTileUtils.util.isCacheValid(o.oConfig.TILE_PROPERTIES.id,E,o.chipCacheTime,o.chipCacheTimeUnit,o.tilePressed);if(p&&!p.rightData||!u||!h&&o.oTileApi.visible.isVisible()||c||i&&o.oTileApi.visible.isVisible()||o.getView().getViewData().refresh){if(o.kpiValueFetchDeferred){o.kpiValueFetchDeferred=false;var d=sap.ushell.components.tiles.indicatorTileUtils.util.prepareFilterStructure(this.oConfig.EVALUATION_FILTERS,this.oConfig.ADDITIONAL_FILTERS);var f={};f["0"]=n+",asc";f["1"]=n+",desc";f["2"]=T+",asc";f["3"]=T+",desc";var I=f[this.oConfig.TILE_PROPERTIES.sortOrder||"0"].split(",");var C=sap.ushell.components.tiles.indicatorTileUtils.util.prepareQueryServiceUri(o.oRunTimeODataModel,s,n,T,d,3);if(this.oConfig.TILE_PROPERTIES.semanticMeasure){C.uri+="&$top=3&$orderby="+I[0]+" "+I[2]}else{C.uri+="&$top=3&$orderby="+I[0]+" "+I[1]}this.comparisionChartODataRef=C.model.read(C.uri,null,null,true,function(e){o.kpiValueFetchDeferred=true;var i={};if(e&&e.results&&e.results.length){if(C.unit[0]){o._updateTileModel({unit:e.results[0][C.unit[0].name]});r=C.unit[0].name;i.unit=C.unit[0];i.unit.name=C.unit[0].name}T=sap.ushell.components.tiles.indicatorTileUtils.util.findTextPropertyForDimension(o.oRunTimeODataModel,s,T);i.dimension=T;o.oConfig.TILE_PROPERTIES.FINALVALUE=e;o.oConfig.TILE_PROPERTIES.FINALVALUE=o._processDataForComparisonChart(o.oConfig.TILE_PROPERTIES.FINALVALUE,n.split(",")[0],T,r);i.data=o.oConfig.TILE_PROPERTIES.FINALVALUE;i.isCurM=o.isACurrencyMeasure(o.oConfig.EVALUATION.COLUMN_NAME);var t={};o.cacheTime=sap.ushell.components.tiles.indicatorTileUtils.util.getUTCDate();t.ChipId=o.oConfig.TILE_PROPERTIES.id;t.Data=JSON.stringify(i);t.CacheMaxAge=Number(o.chipCacheTime);t.CacheMaxAgeUnit=o.chipCacheTimeUnit;t.CacheType=1;var l=o.getLocalCache(t);o.updateDatajobScheduled=false;var c=o.oConfig.TILE_PROPERTIES.id+"data";var p=sap.ushell.components.tiles.indicatorTileUtils.util.getScheduledJob(c);if(p){clearTimeout(p);p=undefined}if(!sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(o.oConfig)){sap.ushell.components.tiles.indicatorTileUtils.cache.setKpivalueById(o.oConfig.TILE_PROPERTIES.id,l);var E=false;if(u){E=true}if(o.chipCacheTime){sap.ushell.components.tiles.indicatorTileUtils.util.writeFrontendCacheByChipAndUserId(o.oTileApi,o.oConfig.TILE_PROPERTIES.id,t,E,function(e){if(e){o.cacheTime=e&&e.CachedTime;sap.ushell.components.tiles.indicatorTileUtils.cache.setKpivalueById(o.oConfig.TILE_PROPERTIES.id,e)}if(o.chipCacheTime&&!sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(o.oConfig)){jQuery.proxy(o.setTimeStamp(o.cacheTime),o)}})}}else{var h=sap.ushell.components.tiles.indicatorTileUtils.cache.getKpivalueById(o.oConfig.TILE_PROPERTIES.id),d;if(h){if(!h.CachedTime){h.CachedTime=sap.ushell.components.tiles.indicatorTileUtils.util.getUTCDate()}d=h.Data;if(d){d=JSON.parse(d);if(o.oKpiTileView.getViewName()=="tiles.indicatornumeric.NumericTile"){d.leftData=i}else{d.rightData=i}}h.Data=JSON.stringify(d);sap.ushell.components.tiles.indicatorTileUtils.cache.setKpivalueById(o.oConfig.TILE_PROPERTIES.id,h)}else{d={};d.rightData=i;l.Data=JSON.stringify(d);sap.ushell.components.tiles.indicatorTileUtils.cache.setKpivalueById(o.oConfig.TILE_PROPERTIES.id,l)}o.cacheWriteData=i}a.call(o,o.oConfig.TILE_PROPERTIES.FINALVALUE)}else if(e.results.length==0){o.oConfig.TILE_PROPERTIES.FINALVALUE=e;if(sap.ushell.components.tiles.indicatorTileUtils.cache.getKpivalueById(o.oConfig.TILE_PROPERTIES.id)){i=sap.ushell.components.tiles.indicatorTileUtils.cache.getKpivalueById(o.oConfig.TILE_PROPERTIES.id);i.data=e}else{i.data=e}sap.ushell.components.tiles.indicatorTileUtils.cache.setKpivalueById(o.oConfig.TILE_PROPERTIES.id,i);a.call(o,o.oConfig.TILE_PROPERTIES.FINALVALUE);o.setNoData()}else{sap.ushell.components.tiles.indicatorTileUtils.cache.setKpivalueById(o.oConfig.TILE_PROPERTIES.id,{empty:"empty"});o.setNoData()}},function(e){o.kpiValueFetchDeferred=true;if(e&&e.response){t.error(e.message+" : "+e.request.requestUri);l.call(o,e)}})}}else if(u&&u.Data){var g;var m=o.oConfig&&o.oConfig.TILE_PROPERTIES&&o.oConfig.TILE_PROPERTIES.tileType;if(m.indexOf("DT-")==-1){g=u.Data&&JSON.parse(u.Data)}else{g=u.Data&&JSON.parse(u.Data);g=g.rightData}o.cacheTime=u.CachedTime;if(o.chipCacheTime&&!sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(o.oConfig)){jQuery.proxy(o.setTimeStamp(o.cacheTime),o)}if(g.data&&g.data.length){if(g.unit){o._updateTileModel({unit:g.data[0][g.unit.name]})}T=g.dimension;o.oConfig.TILE_PROPERTIES.FINALVALUE=g.data;a.call(o,o.oConfig.TILE_PROPERTIES.FINALVALUE)}else if(g&&g.data&&g.data instanceof Array&&g.data.length==0){o.oConfig.TILE_PROPERTIES.FINALVALUE=g.data;a.call(o,o.oConfig.TILE_PROPERTIES.FINALVALUE);o.setNoData()}else{o.setNoData()}}else{o.setNoData()}}catch(e){o.kpiValueFetchDeferred=true;l.call(o,e)}},doProcess:function(e,i){var t=this;this.DEFINITION_DATA=this.oConfig;this._updateTileModel(this.DEFINITION_DATA);this.setTextInTile();this.fetchChartData(e,i,function(e){this.CALCULATED_KPI_VALUE=e;this._updateTileModel({data:this.CALCULATED_KPI_VALUE});if(t.oConfig.TILE_PROPERTIES.frameType==n.TwoByOne){t.oKpiTileView.oGenericTile.setFrameType(n.TwoByOne);t.oKpiTileView.oGenericTile.removeAllTileContent();t.getView().getViewData().parentController._updateTileModel(this.getTile().getModel().getData());t.getView().getViewData().deferredObj.resolve()}else{t.oKpiTileView.oGenericTile.setFrameType(n.OneByOne);t.oKpiTileView.oGenericTile.removeAllTileContent();t.oKpiTileView.oGenericTile.addTileContent(t.oKpiTileView.oNVConfS);this.oKpiTileView.oGenericTile.setState(s.Loaded)}this.setToolTip(null,this.CALCULATED_KPI_VALUE,"CONT");if(this.chipCacheTime&&!sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(this.oConfig)){sap.ushell.components.tiles.indicatorTileUtils.util.scheduleFetchDataJob.call(this,this.oTileApi.visible.isVisible())}},this.logError)},doDummyProcess:function(){var e=this;e.setTextInTile();e._updateTileModel({value:8888,size:o.Auto,frameType:n.OneByOne,state:s.Loading,valueColor:l.Error,indicator:a.None,title:"US Profit Margin",footer:"Current Quarter",description:"Maximum deviation",data:[{title:"Americas",value:10,color:"Neutral"},{title:"EMEA",value:50,color:"Neutral"},{title:"APAC",value:-20,color:"Neutral"}]});this.oKpiTileView.oGenericTile.setState(s.Loaded)}});return r});
//# sourceMappingURL=ContributionTile.controller.js.map