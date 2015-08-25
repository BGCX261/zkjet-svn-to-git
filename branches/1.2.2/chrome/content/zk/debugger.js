/* debugger.js

	Purpose:
		
	Description:
		
	History:
		Fri Jan 16 10:19:46     2009, Created by jumperchen

Copyright (C) 2008 Potix Corporation. All Rights Reserved.

This program is distributed under LGPL Version 3.0 in the hope that
it will be useful, but WITHOUT ANY WARRANTY.
*/
(function(){
var cls = 'z-debug-domtree';
if (zk.loadCSS) {
	zk.loadCSS(zk.ajaxURI('web/js/zk/debug/debugger.css.dsp', {au:true}));	
	cls = 'z-debug';
}

function _space(deep) {
	var out = [];
	for (; deep-- > 0;)
		out.push('&nbsp;&nbsp;&nbsp;&nbsp;');
	return out.join('');
}
function _dumpWgt(out, wgt, nLevel, inf) {
	inf.cnt++;
	out.push(_space(nLevel++),
		(wgt.widgetName == 'widget' ? (wgt.$n() ? wgt.$n().tagName : wgt.widgetName) : wgt.widgetName),
		(wgt.id ? '$' + wgt.id: '#' + wgt.uuid), '<br/>');

	for (wgt = wgt.firstChild; wgt; wgt = wgt.nextSibling)
		_dumpWgt(out, wgt, nLevel, inf);
}
var _defaultIgnore = {draggable: 'false', droppable: 'false', mold: 'default', colspan: 1,
		scrollTop: 0, scrollLeft: 0, innerWidth: '100%', cols: 0, model: true,
		sortDirection: 'natural', sortAscending: 'none', sortDescending: 'none',
		columnshide: true, columnsgroup: true};
var _specialIgnore = {
	treecell: {width: 1},
	rows: {visibleItemCount: 1},
	columns: {menupopup: 1},
	treeitem: {image: 1, label: 1, zclass: 1},
	listitem: {label: 1, zclass: 1},
	include: {content: 1},
	center: {maxsize: 1, minsize: 1, cmargins: 1, margins: 1, open: 1},
	paging: {pageCount: 1}
};

function _dumpAttrs(wgt) {
	var out = [];
	for (var nm in wgt) {
		if (nm.startsWith('get') && nm.length > 3 && !nm.endsWith('_')) {
			var setting = 's' + nm.substring(1);
			if (typeof wgt[setting] == 'function') {
    			var key = nm.charAt(3).toLowerCase() + nm.substring(4);
    			try {
    				if (_specialIgnore[wgt.widgetName] && _specialIgnore[wgt.widgetName][key])
    					continue;
    				
    				var value = wgt[nm]();
    				if (typeof value != 'object' && typeof value != 'function' && value != null && value !== '') {
    					if (_defaultIgnore[key] === undefined) {
    						if (key != 'zclass' || value != 'z-' + wgt.widgetName) {
    							if (key == "selectedIndex")
    								out.push(' onCreate="self.selectedIndex = ', value, '"');
    							else
    								out.push(' ', key, '="', zUtl.encodeXML(zUtl.encodeXML(value)), '"');
    						}
    					} else if (_defaultIgnore[key] !== value)
    						out.push(' ', key, '="', value, '"');
    				}
    					
    			} catch (e) {}
			}
		}
	}
	return out.join('');
}
function _dumpWgt4Zul(out, wgt, nLevel, inf) {
	inf.cnt++;
	var nm = wgt.widgetName;
	if (nm == undefined) {
		// old version
		var cn = wgt.className;
		nm = wgt.widgetName = cn.substring(cn.lastIndexOf('.') + 1, cn.length).toLowerCase();
	}
	if (nm == 'native' || nm == 'widget' /* widget is old version*/) {
		nm = wgt.$n() ? 'h:' + wgt.$n().tagName.toLowerCase() : wgt.epilog ? 'h:' + (wgt.epilog.match(/<\/?(.+)>/)[1]) : wgt.widgetName;
		if (nm == 'native'|| nm == 'widget') {
			if (wgt.prolog.trim())
				nm = 'h:' + wgt.prolog.match(/<(.+)\/>/)[1];
			else
				nm = 'h:span';
		}
	}
	if (nm == 'script' || nm == 'paging' && wgt.parent.$instanceof(zul.mesh.MeshWidget))
		return;
	else if (nm == 'text')
		nm = 'h:' + nm;
	else if (nm == 'select')
		nm = 'listbox';
	else if (nm == 'option') {
		nm = 'listitem';
		var attrs =  _dumpAttrs(wgt).replace('mold="select"', '');
		out.push(_space(nLevel++), '&lt;', nm, attrs);
		if (wgt.firstChild) {
			inf.cnt++;
			out.push(' label="', zUtl.encodeXML(zUtl.encodeXML(wgt.firstChild.getLabel())), '"/&gt;<br/>');
		} else
			out.push('/&gt;<br/>');
		return;
	} else if (nm == 'include')
		out.push('&lt;!--');
	
	
	out.push(_space(nLevel++), '&lt;', nm, _dumpAttrs(wgt));
	
	if (wgt.firstChild) {
		out.push('&gt;');
		var isPage = nm == 'page' && wgt.parent.$instanceof(zul.wgt.Include)
				|| wgt.firstChild.widgetName != 'page' && wgt.$instanceof(zul.wgt.Include);
		
		if (isPage)
			out.push('--&gt;');
		
		out.push('<br/>');
		
		for (wgt = wgt.firstChild; wgt; wgt = wgt.nextSibling)
			_dumpWgt4Zul(out, wgt, nLevel, inf);
		
		if (isPage) {
			out.push('&lt;!--');
		}
		out.push(_space(--nLevel), '&lt;/', nm, '&gt;<br/>');
		if (nm == 'include') {
			out.push('--&gt;');
		}
	} else {
		out.push('/&gt;<br/>');
		if (nm == 'include')
			out.push('--&gt;');
		else if (nm == 'page' && wgt.parent.$instanceof(zul.wgt.Include)) {
			out.push('--&gt;');
		}
	}
}
function _parseHTML(text, handler) {
	var begin, content, deep = 0, empty;
		
	while (text) {
		text = text.trim();
		begin = text.indexOf('<');
		if (begin == 0 && text.startsWith('<!--')) {
			begin = text.indexOf("-->");
			if (begin != -1) {
				handler.comment(deep, text.substring(0, begin + 3));
				text = text.substring(begin + 3);
			}
			if (text.startsWith('</')) 
				deep--;
		} else if (begin >= 0 && text.indexOf('</') == begin) {
			var end = text.indexOf('>');
			if (begin != 0) {
				content = text.substring(0, begin);
				handler.content(deep, content);
				deep--;
			}
			content = text.substring(begin, end + 1);
			text = text.substring(end + 1);
			text = text.trim();
			handler.endTag(deep, content, empty);
			empty = false;
			if (text.startsWith('</')) 
				deep--;
		} else if (begin > 0) {
				content = text.substring(0, begin);
				handler.content(deep, content);
				text = text.substring(begin);
		} else if (begin == 0) {
			var mid = text.indexOf('>'), end = text.indexOf('/>');
			
			if (end >= 0 && end < mid) {
				content = text.substring(0, end + 2);
				handler.startTag(deep, content, true);
				text = text.substring(end + 2).trim();
				if (text.startsWith('</')) 
					deep--;
			} else {
				content = text.substring(0, mid + 1);
				text = text.substring(mid + 1).trim();
				empty = text.startsWith('</');
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

zk.debug.Debugger = zk.$extends(zk.Object, {
	outId: 'zk_debugger',
	
	getConsole: function () {
		var console = jq(this.outId, zk)[0];
		if (!console) {
			console = document.createElement("div");
			document.body.appendChild(console);
			jq(console).replaceWith('<div id="' + this.outId +'" class="' + cls + '"></div>');
			console = jq(this.outId, zk)[0];
		}
		return console;
	},
	// don't change the function name, otherwise, zkjet will break.
	dumpDomTree: function (wgt, handler) {
		var text;
		if (wgt && typeof wgt.$instanceof == 'function' && wgt.$instanceof(zk.Widget)) {
			var out = [];
			wgt.redraw(out);
			text = out.join('');
		} else if (wgt) {
			text = wgt.toString();
		}
		if (text) {
			if (!handler) 
				handler = new zk.debug.DefaultHandler();
			_parseHTML(text, handler);

			this._dump('[' + wgt.className + '] '
				+ wgt.uuid + '&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red;">ErrorNumber: '
				+ handler.getErrorNumber() + '</span>', handler.toHTML());
		}
	},
	dumpWidgetTree: function (wgt) {
		var out = [], inf = {cnt: 0};
		_dumpWgt(out, wgt, 0, inf);
		this._dump("Total: "+inf.cnt, out.join(''));
	},
	// don't change the function name, otherwise, zkjet will break.
	dumpWidgetTree4Zul: function (wgt) {
		var out = ['&lt;zk xmlns:h="native"&gt;'], inf = {cnt: 0};
		_dumpWgt4Zul(out, wgt, 0, inf);
		out.push('&lt;/zk&gt;');
		this._dump("Total: "+inf.cnt, out.join(''));
	},
	_dump: function (header, content) {
		var console = this.getConsole();
		console.innerHTML += '<div class="' + cls + '-header">'
				+ '<div class="' + cls + '-close" onclick="jq(\'#'
				+ this.outId + '\').remove()" onmouseover="jq(this).addClass(\'' + cls + '-close-over\');"'
				+ ' onmouseout="jq(this).removeClass(\'' + cls + '-close-over\');"></div>' + header
				+ '</div><div class="' + cls + '-body">' + content + '</div>';
//		if (zk.ie && console.offsetHeight) {}
//		console.scrollTop = console.scrollHeight;
	}
});

zk.debug.DefaultHandler = zk.$extends(zk.Object, {
	_errorNumber: 0,
	$init: function () {
		this.out = [];
		this.stack = [];
	},
	endTag: function (deep, content, isEmpty) {
		var startTag = this.stack.pop(),
			endTag = content.substring(2, content.length-1);
		if (startTag != endTag) {
			this._errorNumber++;
			this.out.push('<span style="color:red">Unmatched start tag : [<span style="color:blue;">&lt;',
					startTag, '&gt;</span>], end tag : [<span style="color:blue;">&lt;/',
					endTag, '&gt;</span>]</span><br/>');
			return;
		}
		this.out.push(isEmpty ? '' : _space(deep), zUtl.encodeXML(content), '<br/>');
	},
	comment: function (deep, content) {
		this.out.push(_space(deep), zUtl.encodeXML(content), '<br/>');
	},
	startTag: function (deep, content, isSingle, isEmpty) {
		this.out.push(_space(deep), this._parseAttribute(content, isSingle), isEmpty ? '' : '<br/>');
	},
	_parseAttribute: function (content, isSingle) {
		var out = [];
		for (var odd, start, c, i = 0, j = content.length; i < j; i++) {
			c = content.charAt(i);
			switch (c) {
				case '=':
					// fix if src contains a character '='.
					if (!odd)
						out.push('=<span style="color:#0666FD">');
					else
						out.push('=');
					if (!odd)
						odd = false;
					break;
				case '<':
					if (start) {// error caused by double '<' syntax
						out.push('<span style="color:red;">', zUtl.encodeXML(content.substring(i)), '</span>');
						this._errorNumber++;
						return out.join('');
					}
					out.push('&lt;');
					start = true;
					break;
				case '>':
					if (!isSingle)
						if (start)
							this.stack.push(content.substring(1, i));
					
					out.push('&gt;');
					break;
				case ' ':
					if (!isSingle) {
						isSingle = true;
						if (start)
							this.stack.push(content.substring(1, i));
					}
					out.push(c);
					break;
				case '"':
					if (odd) {
						odd = false;
						out.push('"</span>');
						break;
					} else odd = true;
					// don't break;
				default:
					out.push(c);
			}
		}
		return out.join('');
	},
	content: function (deep, content) {
		if (content.indexOf('>') > -1)
			this.error(content);		
		else
			this.out.push(_space(deep), zUtl.encodeXML(content), '<br/>');
	},
	error: function (content) {
		this._errorNumber++;
		this.out.push('<span style="color:red"> Error caused by {', zUtl.encodeXML(content), '}</span><br/>');
	},
	toHTML: function () {
		return this.out.join('');
	},
	getErrorNumber: function () {
		return this._errorNumber;
	}
});

})();
zDebug = new zk.debug.Debugger();