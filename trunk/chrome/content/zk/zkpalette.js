/* zkpalette.js

{{IS_NOTE
	Purpose:
		
	Description:
		
	History:
		Wed Oct 29 18:40:37     2008, Created by jumperchen
}}IS_NOTE

Copyright (C) 2008 Potix Corporation. All Rights Reserved.

{{IS_RIGHT
}}IS_RIGHT
*/
FBL.ns(function() { with (FBL) {
const defaultImage = function (text) {
	return "chrome://zk/skin/cmps/" + text + ".png";
};
const defaultCode = function (text) {
	return "<" + text + "/>";
};
const categories = [
	{name: "ZK Element", selected: "seld",
		items:[
			{text: "zk", tags: "<zk>\n\r</zk>"},
			{text: "zscript", tags: "<zscript><![CDATA[\n\r]]></zscript>"},
			{text: "attribute", tags: "<attribute name=''><![CDATA[\n\r]]></attribute>"},
			{text: "custom-attributes"},
			{text: "variables"}
		]	
	},
	{name: "Basic",
		items:[
			{text: "button", tags: "<button label='' onClick=''/>"},
			{text: "html", tags: "<html><![CDATA[\n\r]]></html>"},
			{text: "iframe", tags: "<iframe src=''/>"},
			{text: "include", tags: "<include src=''/>"},
			{text: "image", tags: "<image label='' src=''/>"},
			{text: "label", tags: "<label value=''>"},
			{text: "separator", tags: "<separator bar='false'/>"},
			{text: "space", tags: "<space orient='horizontal'/>"},
			{text: "script", tags: "<script src=''/>"},
			{text: "style", tags: "<style src=''>\n\r</style>"},
			{text: "menubar", tags: "<menubar>\n\r</menubar>"},
			{text: "menu", tags: "<menu label=''>\n\r</menu>"},
			{text: "menupopup", tags: "<menupopup>\n\r</menupopup>"},
			{text: "menuitem", tags: "<menuitem label=''/>"},
			{text: "menuseparator"},
			{text: "popup", tags: "<popup>\n\r</popup>"},
			{text: "toolbar", tags: "<toolbar>\n\r</toolbar>"},
			{text: "toolbarbutton", tags: "<toolbarbutton label=''/>"},
			{text: "paging", tags: "<paging totalSize=''/>"},
			{text: "chart"},
			{text: "captcha"},
			{text: "progressmeter"},
			{text: "timer", tags: "<timer running='true' repeat='false' onTimer=''/>"}
		]
	},
	{name: "Input",
		items:[
			{text: "bandbox", tags: "<bandbox>\n\r</bandbox>"},
			{text: "bandpopup", tags: "<bandpopup>\n\r</bandpopup>"},
			{text: "calendar"},
			{text: "checkbox"},
			{text: "combobox"},
			{text: "comboitem"},
			{text: "datebox"},
			{text: "decimalbox"},
			{text: "doublebox"},
			{text: "fileupload"},
			{text: "intbox"},
			{text: "longbox"},
			{text: "radio"},
			{text: "radiogroup"},
			{text: "slider"},
			{text: "spinner"},
			{text: "textbox"},
			{text: "timebox"}
		]
	},
	{name: "Container",
		items:[
			{text: "groupbox", tags: "<groupbox title='' mold='3d'>\n\r</groupbox>"},
			{text: "window", tags: "<window title='' border='normal'>\n\r</window>"},
			{text: "caption"},
			{text: "div", tags: "<div>\n\r</div>"},
			{text: "hbox", tags: "<hbox>\n\r</hbox>"},
			{text: "vbox", tags: "<vbox>\n\r</vbox>"},
			{text: "box", tags: "<box>\n\r</box>"},
			{text: "span", tags: "<span>\n\r</span>"},
			{text: "splitter"},
			{text: "tabbox", tags: "<tabbox>\n\r</tabbox>"},
			{text: "tabs", tags: "<tabs>\n\r</tabs>"},
			{text: "tab", tags: "<tab label=''/>"},
			{text: "tabpanels", tags: "<tabpanels>\n\r</tabpanels>"},
			{text: "tabpanel", tags: "<tabpanel>\n\r</tabpanel>"}
		]
	},
	{name: "Listbox & Grid",
		items:[
			{text: "listbox", tags: "<listbox fixedLayout='true' vflex='false'>\n\r</listbox>"},
			{text: "listhead", tags: "<listhead>\n\r</listhead>"},
			{text: "listheader", tags: "<listheader label=''/>"},
			{text: "listitem", tags: "<listitem label=''/>"},
			{text: "listcell", tags: "<listcell label=''/>"},
			{text: "listfoot", tags: "<listfoot>\n\r</listfoot>"},
			{text: "listfooter", tags: "<listfooter label=''/>"},
			{text: "listgroup", tags: "<listgroup label=''/>"},
			{text: "listgroupfoot", tags: "<listgroupfoot label=''/>"},
			{text: "auxhead", tags: "<auxhead>\n\r</auxhead>"},
			{text: "auxheader", tags: "<auxheader label=''/>"}
		]	
	},
	{name: "Grid",
		items:[
			{text: "grid", tags: "<grid fixedLayout='true' vflex='false'>\n\r</grid>"},
			{text: "columns", tags: "<columns>\n\r</columns>"},
			{text: "column", tags: "<column label=''/>"},
			{text: "rows", tags: "<rows>\n\r</rows>"},
			{text: "row", tags: "<row>\n\r</row>"},
			{text: "detail", tags: "<detail>\n\r</detail>"},
			{text: "foot", tags: "<foot>\n\r</foot>"},
			{text: "footer", tags: "<footer label=''/>"},
			{text: "group", tags: "<group label=''/>"},
			{text: "groupfoot", tags: "<groupfoot>\n\r</groupfoot>"},
			{text: "auxhead", tags: "<auxhead>\n\r</auxhead>"},
			{text: "auxheader", tags: "<auxheader label=''/>"}
		]
	},
	{name: "Tree",
		items:[
			{text: "tree", tags: "<tree fixedLayout='true' vflex='false'>\n\r</tree>"},
			{text: "treecols", tags: "<treecols>\n\r</treecols>"},
			{text: "treecol", tags: "<treecol label=''/>"},
			{text: "treechildren", tags: "<treechildren>\n\r</treechildren>"},
			{text: "treeitem", tags: "<treeitem label=''/>"},
			{text: "treerow", tags: "<treerow>\n\r</treerow>"},
			{text: "treecell", tags: "<treecell label=''/>"},
			{text: "treefoot", tags: "<treefoot>\n\r</treefoot>"},
			{text: "treefooter", tags: "<treefooter label=''/>"},
			{text: "auxhead", tags: "<auxhead>\n\r</auxhead>"},
			{text: "auxheader", tags: "<auxheader label=''/>"}
		]
	},
	{name: "Layout",
		items:[
			{text: "borderlayout", tags: "<borderlayout>\n\r</borderlayout>"},
			{text: "east", tags: "<east>\n\r</east>"},
			{text: "north", tags: "<north>\n\r</north>"},
			{text: "west", tags: "<west>\n\r</west>"},
			{text: "south", tags: "<south>\n\r</south>"},
			{text: "center", tags: "<center>\n\r</center>"},
			{text: "columnlayout", tags: "<columnlayout>\n\r</columnlayout>"},
			{text: "columnchildren", tags: "<columnchildren>\n  <panel>\n    <panelchildren>\n\r    </panelchildren>\n  </panel>\n</columnchildren>"},
			{text: "panel", tags: "<panel>\n\r</panel>"},
			{text: "panelchildren", tags: "<panelchildren>\n\r</panelchildren>"},
			{text: "portallayout", tags: "<portallayout>\n\r</portallayout>"},
			{text: "portalchildren", tags: "<portalchildren>\n  <panel>\n    <panelchildren>\n\r    </panelchildren>\n  </panel>\n</portalchildren>"},
			{text: "tablelayout", tags: "<borderlayout>\n\r</borderlayout>"},
			{text: "tablechildren", tags: "<tablechildren>\n  <panel>\n    <panelchildren>\n\r    </panelchildren>\n  </panel>\n</tablechildren>"}
		]
	},
	{name: "Other",
		items:[
			{text: "area"},
			{text: "audio"},
			{text: "fisheyebar"},
			{text: "fisheye"},
			{text: "flash"},
			{text: "imagemap"},
			{text: "jasperreport"},
			{text: "gmaps"},
			{text: "gmarker"},
			{text: "ginfo"},
			{text: "gpolyline"}
		]	
	}
];
var PaletteTag = domplate(Firebug.Rep, {
    bodyTag:
        DIV({class: "palette-body"},
            FOR("category", "$categories", 
			        DIV({class: "palette-category $category.selected"},
		            DIV({class: "palette-category-header", onclick: "$onCategoryClick"},
		            	SPAN("$category.name")
		            	),
		            DIV({class: "palette-category-body"},
		            	FOR("item", "$category.items",
		            		DIV({class: "palette-category-row"},
			            		DIV({style: "background-image: url($item.image);", zcode: "$item.tags", class: "palette-item", onclick: "$onItemClick"},
						          	SPAN("$item.text")
						          )
					          )
			          	)
			        )
			      	)
			)
        ),
    onCategoryClick: function(event) {
       	var cate = event.target.tagName != "DIV" ? event.target.parentNode: event.target;
		if (!hasClass(cate, 'palette-category'))
       		cate = cate.parentNode;
       	for (var n = cate.parentNode.firstChild; n; n = n.nextSibling)
       		if(n == cate) setClass(n, 'seld');
       		else removeClass(n, 'seld');
       	FirebugContext.getPanel("ZKPalette").panelNode.scrollTop = cate.offsetTop;
    },
    onItemClick: function(event) {
    	var div = event.target.tagName != "DIV" ? event.target.parentNode: event.target,
    		zcode = div.getAttribute("zcode"),
    		panel = FirebugContext.getPanel("ZulEditor"),
    		textarea = panel.panelNode.firstChild;
			textarea.insertCode(zcode, true);
			setTimeout(function(){textarea.syntaxHighlight('generic');},100);
    }
});
function getSelectionRange(inp) {	
	try {
		return [inp.selectionStart, inp.selectionEnd];
	}catch (e) {
		return [0, 0];
	}
}
function ZKPalette() {}

ZKPalette.endsWith = function (str, suffix) {
	return str.substring(str.length-suffix.length) == suffix;
};
ZKPalette.startsWith = function (str, prefix) {
	return str.substring(0,prefix.length) == prefix;
};
ZKPalette.trim = function (str) {
	var j = 0, tl = str.length, k = tl - 1;
	while (j < tl && str.charAt(j) <= ' ')
		++j;
	while (k >= j && str.charAt(k) <= ' ')
		--k;
	return j > k ? "": str.substring(j, k + 1);
};
ZKPalette.prototype = extend(Firebug.Panel, { 
    name: "ZKPalette",
    parentPanel: "ZulEditor",
    title: "ZK Palette",

    initialize: function() {
      Firebug.Panel.initialize.apply(this, arguments);
      zkLoadCSSDirect("chrome://zk/skin/zkpalette.css", this.document);
      for (var i = categories.length; --i>=0;) {
      	for (var j = categories[i].items.length; --j>=0;) {
      		if (!categories[i].items[j].image)
      			categories[i].items[j].image = defaultImage(categories[i].items[j].text);
      		if (!categories[i].items[j].tags)
      			categories[i].items[j].tags = defaultCode(categories[i].items[j].text);
      	}
      }
      PaletteTag.bodyTag.append({categories: categories}, this.panelNode, null);
    },
    show: function () {
    	if (Firebug.isDetached()) {
    		zkLoadCSSDirect("chrome://zk/skin/zkpalette.css", this.document);
    	}
    },
    getOptionsMenuItems: function() {
   			return [
            {label: "Format", nol10n: true, command: bind(this.onFormat, this) }
        ];
    },
    onFormat: function () {
    	var panel = FirebugContext.getPanel("ZulEditor"),
    		textarea = panel.panelNode.firstChild;
    	textarea.setCode(this.formatting(textarea.getCode()));
    	setTimeout(function(){textarea.syntaxHighlight('generic');},100);
    },
    formatting: function (text) {
    	var handler = new DefaultHandler();
    	this.parseXML(text, handler);
    	return handler.toHTML();
    },
    parseXML: function(text, handler) {
    	if (!handler) return;
		var begin, content, deep = 0, empty;
		while (text) {
			text = ZKPalette.trim(text);
			begin = text.indexOf('<');
			if (begin == 0 && ZKPalette.startsWith(text, '<!--')) {
				begin = text.indexOf("-->");
				if (begin != -1) {
					handler.comment(deep, text.substring(0, begin + 3));
					text = text.substring(begin + 3);
				}
				if (ZKPalette.startsWith(text, '</')) 
					deep--;
			} else if (begin == 0 && ZKPalette.startsWith(text, '<?')) {
				begin = text.indexOf("?>");
				if (begin != -1) {
					handler.comment(deep, text.substring(0, begin + 2));
					text = text.substring(begin + 2);
				}
			} else if (begin == 0 && ZKPalette.startsWith(text, '<![CDATA[')) {
				var end = text.indexOf(']]>');
				content = ZKPalette.trim(text.substring(9 , end));
				if (ZKPalette.startsWith(content, '\n'))
					content = ZKPalette.trim(content.substring(1, content.length));
				if (ZKPalette.endsWith(content, '\n'))
					content = ZKPalette.trim(content.substring(0, content.length - 1));
				handler.startTag(deep++, '<![CDATA[', false, !content);
				if (content) {
					handler.content(deep, content + '\n');
					handler.endTag(--deep, ']]>');
				} else {
					handler.content(deep, '\n\r');
					handler.endTag(--deep, ']]>');
				}
				--deep;
				text = text.substring(end + 3);
			} else if (begin >= 0 && text.indexOf('</') == begin) {
				var end = text.indexOf('>');
				if (begin != 0) {
					content = text.substring(0, begin);
					if(ZKPalette.endsWith(content, "\n\t"))
						content = content.substring(0, content.lastIndexOf('\t'));
					handler.content(deep, content + (ZKPalette.endsWith(content, "\n") ? "" : (ZKPalette.endsWith(content, "\n\t") ? "" : "\n")));
					deep--;
				}
				content = text.substring(begin, end + 1);
				text = text.substring(end + 1);
				text = ZKPalette.trim(text);
				handler.endTag(deep, content, empty);
				empty = false;
				if (ZKPalette.startsWith(text, '</')) 
					deep--;
			} else if (begin > 0) {
					content = ZKPalette.trim(text.substring(0, begin));
					handler.content(deep, content + '\n');
					text = text.substring(begin);
			} else if (begin == 0) {
				var mid = text.indexOf('>'), end = text.indexOf('/>');
				if (end >= 0 && end < mid) {
					content = text.substring(0, end + 2);
					handler.startTag(deep, content, true);
					text = ZKPalette.trim(text.substring(end + 2));
					if (ZKPalette.startsWith(text, '</')) 
						deep--;
				} else {
					content = text.substring(0, mid + 1);
					text = ZKPalette.trim(text.substring(mid + 1));
					empty = ZKPalette.startsWith(text, '</');
					handler.startTag(deep, content, false, empty);
					if (!empty) 
						deep++;
				}
			} else {
				handler.error(text);
				break;
			}
		}
	}
});
function DefaultHandler() {
	this.out = [];
}
DefaultHandler.prototype = {
	_errorNumber: 0,
	endTag: function (deep, content, isEmpty) {
		this.out.push(isEmpty ? '' : this._getSpace(deep), content, '\n');
	},
	comment: function (deep, content) {
		this.out.push(this._getSpace(deep), content, '\n');
	},
	startTag: function (deep, content, isSingle, isEmpty) {
		this.out.push(this._getSpace(deep), content, isEmpty ? '' : '\n');
	},
	content: function (deep, content) {
		this.out.push(this._getSpace(deep), content);
	},
	error: function (content) {
		this.out.push(content);
	},
	toHTML: function () {
		return this.out.join('');
	},
	_getSpace: function (deep) {
		var out = [];
		for (; deep-- > 0;)
			out.push('\t');
		return out.join('');
	}
};
Firebug.registerPanel(ZKPalette); 
}});