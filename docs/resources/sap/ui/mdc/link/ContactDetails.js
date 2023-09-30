/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","./ContactDetailsRenderer","sap/ui/core/Title","sap/m/VBox","sap/m/Text","sap/m/Link","sap/m/Label","sap/m/Image","sap/ui/layout/form/SimpleForm"],function(e,t,i,r,n,o,s,a,d){"use strict";var g=e.extend("sap.ui.mdc.link.ContactDetails",{metadata:{library:"sap.ui.mdc",defaultAggregation:"items",aggregations:{items:{type:"sap.ui.mdc.link.ContactDetailsItem",multiple:true,singularName:"item"},_content:{type:"sap.m.VBox",visibility:"hidden",multiple:false}}},renderer:t});var p=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");g.prototype.applySettings=function(){e.prototype.applySettings.apply(this,arguments);this._createContent()};g.prototype._createContent=function(){var e=[];this.getItems().forEach(function(t){var r=new i({text:t.getSectionTitle()});var o=new a({src:t.getPhoto(),visible:!!t.getPhoto(),decorative:false,width:"5rem",height:"5rem"});var g=new s({text:"",labelFor:o,visible:!!t.getPhoto()});var f=new n({text:t.getFormattedName(),visible:!!t.getFormattedName()});var l=new s({text:p.getText("info.POPOVER_CONTACT_SECTION_NAME"),labelFor:f,visible:!!t.getFormattedName()});var u=new n({text:t.getRole(),visible:!!t.getRole()});var T=new s({text:p.getText("info.POPOVER_CONTACT_SECTION_ROLE"),labelFor:u,visible:!!t.getRole()});var c=new n({text:t.getTitle(),visible:!!t.getTitle()});var h=new s({text:p.getText("info.POPOVER_CONTACT_SECTION_JOBTITLE"),labelFor:c,visible:!!t.getTitle()});var O=new n({text:t.getOrg(),visible:!!t.getOrg()});var y=new s({text:p.getText("info.POPOVER_CONTACT_SECTION_DEPARTMENT"),labelFor:O,visible:!!t.getOrg()});var x=new d({editable:false,layout:"ColumnLayout",content:[r,g,o,l,f,T,u,h,c,y,O]});this._addEmailsToSimpleForm(t,x,p);this._addPhonesToSimpleForm(t,x,p);this._addAddressesToSimpleForm(t,x,p);e.push(x)}.bind(this));this.setAggregation("_content",new r({items:e}))};g.prototype._addEmailsToSimpleForm=function(e,t,i){e.getEmails().filter(function(e){return!e.processed&&!!e.getTypes()&&(e.getTypes().indexOf("preferred")>-1||e.getTypes().indexOf("work")>-1)}).sort(function(e,t){if(e.getTypes().indexOf("preferred")>-1&&t.getTypes().indexOf("preferred")<0){return-1}if(t.getTypes().indexOf("preferred")>-1&&e.getTypes().indexOf("preferred")<0){return 1}return 0}).forEach(function(e){this._addLabeledLink("email",i.getText("info.POPOVER_CONTACT_SECTION_EMAIL"),e,t);e.processed=true},this)};g.prototype._addPhonesToSimpleForm=function(e,t,i){e.getPhones().filter(function(e){return!e.processed&&!!e.getTypes()&&e.getTypes().indexOf("work")>-1}).sort(function(e,t){if(e.getTypes().indexOf("preferred")>-1){return-1}if(t.getTypes().indexOf("preferred")>-1){return 1}return 0}).forEach(function(e){this._addLabeledLink("phone",i.getText("info.POPOVER_CONTACT_SECTION_PHONE"),e,t);e.processed=true},this);e.getPhones().filter(function(e){return!e.processed&&!!e.getTypes()&&e.getTypes().indexOf("cell")>-1}).sort(function(e,t){if(e.getTypes().indexOf("preferred")>-1){return-1}if(t.getTypes().indexOf("preferred")>-1){return 1}return 0}).forEach(function(e){this._addLabeledLink("phone",i.getText("info.POPOVER_CONTACT_SECTION_MOBILE"),e,t);e.processed=true},this);e.getPhones().filter(function(e){return!e.processed&&!!e.getTypes()&&e.getTypes().indexOf("fax")>-1}).sort(function(e,t){if(e.getTypes().indexOf("preferred")>-1){return-1}if(t.getTypes().indexOf("preferred")>-1){return 1}return 0}).forEach(function(e){this._addLabeledLink("phone",i.getText("info.POPOVER_CONTACT_SECTION_FAX"),e,t);e.processed=true},this);e.getPhones().filter(function(e){return!e.processed&&!!e.getTypes()&&e.getTypes().indexOf("preferred")>-1}).forEach(function(e){this._addLabeledLink("phone",i.getText("info.POPOVER_CONTACT_SECTION_PHONE"),e,t);e.processed=true},this)};g.prototype._addAddressesToSimpleForm=function(e,t,i){e.getAddresses().filter(function(e){return!e.processed&&!!e.getTypes()&&(e.getTypes().indexOf("preferred")>-1||e.getTypes().indexOf("work")>-1)}).sort(function(e,t){if(e.getTypes().indexOf("preferred")>-1&&t.getTypes().indexOf("preferred")<0){return-1}if(t.getTypes().indexOf("preferred")>-1&&e.getTypes().indexOf("preferred")<0){return 1}return 0}).forEach(function(e){this._addLabeledAddress(e,t,i);e.processed=true},this)};g.prototype._addLabeledAddress=function(e,t,i){var r=function(e,t,i,r,n){var o=[];if(e){o.push(e)}if(t&&i){o.push(t+" "+i)}else{if(t){o.push(t)}if(i){o.push(i)}}if(r){o.push(r)}if(n){o.push(n)}return o.join(", ")};var o=function(e,t,i,r,n){return!!(e||t||i||r||n)};var a;var d;if(e.getBindingPath("street")&&e.getBindingPath("code")&&e.getBindingPath("locality")&&e.getBindingPath("region")&&e.getBindingPath("country")){a=[{path:e.getBindingPath("street")?e.getBindingPath("street"):"$notExisting"},{path:e.getBindingPath("code")?e.getBindingPath("code"):"$notExisting"},{path:e.getBindingPath("locality")?e.getBindingPath("locality"):"$notExisting"},{path:e.getBindingPath("region")?e.getBindingPath("region"):"$notExisting"},{path:e.getBindingPath("country")?e.getBindingPath("country"):"$notExisting"}];d=new n;d.bindProperty("text",{parts:a,formatter:r});d.bindProperty("visible",{parts:a,formatter:o})}else{d=new n({text:r(e.getStreet(),e.getCode(),e.getLocality(),e.getRegion(),e.getCountry()),visible:o(e.getStreet(),e.getCode(),e.getLocality(),e.getRegion(),e.getCountry())})}var g=new s({text:i.getText("info.POPOVER_CONTACT_SECTION_ADR"),labelFor:d.getId()});t.addContent(g);t.addContent(d)};g.prototype._addLabeledLink=function(e,t,i,r){var n;if(i.getBindingPath("uri")){n=new o;n.bindProperty("href",{path:i.getBindingPath("uri"),formatter:function(t){return(e==="email"?"mailto:":"tel:")+t}});n.bindProperty("text",{path:i.getBindingPath("uri")});n.bindProperty("visible",{path:i.getBindingPath("uri"),formatter:function(e){return!!e}})}else{n=new o({href:e==="email"?"mailto:":"tel:"+i.getUri(),text:i.getUri(),visible:!!i.getUri()})}var a=new s({text:t,labelFor:n.getId()});r.addContent(a);r.addContent(n)};return g});
//# sourceMappingURL=ContactDetails.js.map