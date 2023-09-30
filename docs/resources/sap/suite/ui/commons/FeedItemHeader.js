/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/m/ListItemBase","./library","sap/ui/core/HTML","sap/base/security/URLListValidator","sap/base/Log","./FeedItemHeaderRenderer"],function(e,t,i,r,o,s){"use strict";var l=e.extend("sap.suite.ui.commons.FeedItemHeader",{metadata:{deprecated:true,library:"sap.suite.ui.commons",properties:{title:{type:"string",group:"Misc",defaultValue:null},image:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},link:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},source:{type:"string",group:"Misc",defaultValue:null},publicationDate:{type:"object",group:"Misc",defaultValue:null},description:{type:"string",group:"Misc",defaultValue:null}}}});l.prototype.exit=function(t){if(this._htmlControl){this._htmlControl.destroy()}e.prototype.exit.apply(this)};l.prototype.setImage=function(e){if(e){var t=r.validate(e);if(t){this.setProperty("image",e)}else{o.error("Invalid Url:'"+e+"'. Property 'image' of FeedItemHeader not set")}}return this};l.prototype.setLink=function(e){if(e){var t=r.validate(e);if(t){this.setProperty("link",e)}else{o.error("Invalid Url:'"+e+"'. Property 'link' of FeedItemHeader not set")}}return this};l.prototype.onclick=function(e){this.firePress({link:this.getLink()});e.preventDefault()};l.prototype._getHtmlControl=function(){if(!this._htmlControl){this._htmlControl=new i({id:this.getId()+"-feedItemHeaderDescription",sanitizeContent:true})}return this._htmlControl};return l});
//# sourceMappingURL=FeedItemHeader.js.map