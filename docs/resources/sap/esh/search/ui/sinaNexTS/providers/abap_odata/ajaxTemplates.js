/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define([],function(){function e(t){"@babel/helpers - typeof";return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)
/*!
   * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
   */}function t(t){if(e(t)==="object"){var i=t;if(e(i.d)==="object"){var r=i;if(e(r.d.QueryOptions)==="object"){var s=r.d.QueryOptions;if(typeof s.SearchType==="string"&&s.SearchType===""&&!r.d.ActivateNLQ){return true}}}}return false}var i={d:{Filter:{},Id:"1",QueryOptions:{SearchTerms:"",Top:10,Skip:0,SearchType:"",ClientSessionID:"",ClientCallTimestamp:"",ClientServiceName:"",ClientLastExecutionID:""},DataSources:[],OrderBy:[],ResultList:{SearchResults:[{HitAttributes:[],Attributes:[]}]},ExecutionDetails:[],MaxFacetValues:5,Facets:[{Values:[]}]}};function r(t){if(e(t)==="object"){var i=t;if(e(i.d)==="object"){var r=i;if(e(r.d.QueryOptions)==="object"){var s=r.d.QueryOptions;if(typeof s.SearchType==="string"&&s.SearchType===""&&typeof r.d.ActivateNLQ==="boolean"&&r.d.ActivateNLQ===true){return true}}}}return false}var s={d:{Filter:{},Id:"1",ActivateNLQ:true,QueryOptions:{SearchTerms:"",Top:10,Skip:0,SearchType:"",ClientSessionID:"",ClientCallTimestamp:"",ClientServiceName:"",ClientLastExecutionID:""},DataSources:[],OrderBy:[],ResultList:{SearchResults:[{HitAttributes:[],Attributes:[]}],NLQQueries:[{NLQConnectorQueries:[{SearchFilter:{SubFilters:[{SubFilters:[{SubFilters:[{SubFilters:[{SubFilters:[{SubFilters:[]}]}]}]}]}]}}]}]},ExecutionDetails:[],MaxFacetValues:5,Facets:[{Values:[]}]}};function u(t){if(e(t)==="object"){var i=t;if(e(i.d)==="object"){var r=i;if(e(r.d.QueryOptions)==="object"){var s=r;return typeof s.d.QueryOptions.SearchType==="string"&&s.d.QueryOptions.SearchType==="F"}}}return false}var n={d:{Id:"1",DataSources:[],Filter:{},QueryOptions:{SearchTerms:"",Skip:0,SearchType:"F",ClientSessionID:"",ClientCallTimestamp:"",ClientServiceName:"",ClientLastExecutionID:""},FacetRequests:[],MaxFacetValues:5,Facets:[{Values:[]}],ExecutionDetails:[]}};function a(t){if(e(t)==="object"){var i=t;if(e(i.d)==="object"){var r=i;if(typeof r.d.ValueHelpAttribute==="string")return true}}return false}var o={d:{Id:"1",ValueHelpAttribute:"",ValueFilter:"",DataSources:[],Filter:{},QueryOptions:{SearchTerms:"",Top:1e3,Skip:0,SearchType:"V",ClientSessionID:"",ClientCallTimestamp:"",ClientServiceName:"",ClientLastExecutionID:""},ValueHelp:[]}};function l(t){if(e(t)==="object"){var i=t;if(e(i.d)==="object"){var r=i;if(typeof r.d.SuggestionInput==="string")return true}}return false}var c={d:{Id:"1",SuggestionInput:"",IncludeAttributeSuggestions:false,IncludeHistorySuggestions:false,IncludeDataSourceSuggestions:false,DetailLevel:1,QueryOptions:{Top:0,Skip:0,SearchType:"S",SearchTerms:"",ClientSessionID:"",ClientCallTimestamp:"",ClientServiceName:"",ClientLastExecutionID:""},Filter:{},DataSources:[],Suggestions:[],ExecutionDetails:[]}};function S(t){if(e(t)==="object"){var i=t;if(e(i.d)==="object"){var r=i;if(r.d.IncludeAttributeSuggestions!=="undefined"&&r.d.IncludeAttributeSuggestions===true)return true}}return false}var p={d:{Id:"1",IncludeAttributeSuggestions:true,QueryOptions:{SearchTerms:"a",Top:10,Skip:0,ClientSessionID:"",ClientCallTimestamp:"",ClientServiceName:"",ClientLastExecutionID:""},DataSources:[{Id:"UIA000~EPM_BPA_DEMO~",Type:"View"}],ObjectSuggestions:{SearchResults:[{HitAttributes:[],Attributes:[]}]},Filter:{},ExecutionDetails:[]}};function f(t){if(e(t)==="object"){var i=t;return typeof i.SemanticObjectType==="string"&&typeof i.Intent==="string"&&typeof i.System==="string"&&typeof i.Client==="string"&&Array.isArray(i.Parameters)}return false}var y={__esModule:true};y.isSearchRequest=t;y.searchRequest=i;y.isNlqSearchRequest=r;y.nlqSearchRequest=s;y.isChartRequest=u;y.chartRequest=n;y.isValueHelperRequest=a;y.valueHelperRequest=o;y.isSuggestionRequest=l;y.suggestionRequest=c;y.isObjectSuggestionRequest=S;y.objectSuggestionRequest=p;y.isNavigationEvent=f;return y})})();
//# sourceMappingURL=ajaxTemplates.js.map