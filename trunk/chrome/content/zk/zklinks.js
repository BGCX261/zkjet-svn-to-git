/* zklinks.js

	Purpose:
		
	Description:
		
	History:
		Fri Jun  24 22:10:09     2009, Created by jumperchen

Copyright (C) 2011 Potix Corporation. All Rights Reserved.

*/
FBL.ns(function() { with (FBL) {
const zkURLs = {
    main: "http://www.zkoss.org",
    forum: "http://www.zkoss.org/forum/",
    demo: "http://www.zkoss.org/zkdemo/",
    docs: "http://books.zkoss.org/",
    javaAPI: "http://www.zkoss.org/javadoc/latest/zk/",
    jsAPI: "http://www.zkoss.org/javadoc/latest/jsdoc/",
	zkfiddle: "http://www.zkfiddle.org/"
};
function ZKLinks() {}
ZKLinks.prototype = extend(Firebug.Panel, { 
    name: "ZKLinks",
    parentPanel: "ZulEditor",
    title: "ZK Links",
	initialize: function() {
		Firebug.Panel.initialize.apply(this, arguments);
      	zkLoadCSSDirect("chrome://zk/skin/zk.css", this.document);
		ZKLinksTag.bodyTag.append(null, this.panelNode, null);
	},
    show: function () {
    	if (Firebug.isDetached()) {
    		zkLoadCSSDirect("chrome://zk/skin/zk.css", this.document);
    	}
    }
});

var ZKLinksTag = domplate(Firebug.Rep, {
    bodyTag:
    UL({"class": "zklinks"},
        LI(
			A({"class": "zklink", onclick: "$onClick", which:'main'},
            "Home")
        ),
        LI(
			A({"class": "zklink", onclick: "$onClick", which:'forum'},
            "Forum")
        ),
        LI(
			A({"class": "zklink", onclick: "$onClick", which:'demo'},
            "Demo")
        ),
        LI(
			A({"class": "zklink", onclick: "$onClick", which:'docs'},
            "Document")
        ),
        LI(
			A({"class": "zklink", onclick: "$onClick", which:'javaAPI'},
            "Java Doc")
        ),
        LI(
			A({"class": "zklink", onclick: "$onClick", which:'jsAPI'},
            "Javascript Doc")
        ),
        LI(
			A({"class": "zklink", onclick: "$onClick", which:'zkfiddle'},
            "ZK Fiddle")
        )
    ),
    onClick: function(evt) {
  		openNewTab(zkURLs[evt.target.getAttribute("which")]);
    }
});
Firebug.registerPanel(ZKLinks); 
}});