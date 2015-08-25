/* zk.js

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
// ************************************************************************************************
// Constants

const Cc = Components.classes;
const Ci = Components.interfaces;
const nsIPrefBranch = Ci.nsIPrefBranch;

const PrefService = Cc["@mozilla.org/preferences-service;1"];
const nsIPrefService = Ci.nsIPrefService;
const nsIPrefBranch2 = Ci.nsIPrefBranch2;
const prefs = PrefService.getService(nsIPrefBranch2);

const nsIFilePicker = Ci.nsIFilePicker;

var panelName = "ZulEditor";
if (!Firebug.prefDomain)
	Firebug.prefDomain = "extensions.firebug";

Firebug.ZKModel = extend(Firebug.Module, {
	  ZKService: "zk.serviceURL",
    showPanel: function(browser, panel) { 
		if (browser.contentWindow) {
			var obj = browser.contentWindow.wrappedJSObject || browser.contentWindow,
				zk = obj.zk;
			
			browser.chrome.$("outDomBtn").style.display = zk && zk.version ? "block" : "none";
			browser.chrome.$("outZulBtn").style.display = zk && zk.version ? "block" : "none";
		}
		var isZKPanel = panel && panel.name == panelName,
			hwButtons = browser.chrome.$("fbZKButtons");
      collapse(hwButtons, !isZKPanel); 
    },
    onOutDomBtn: function (context) {
    	var obj = context.window.wrappedJSObject || context.window,
  			zk = obj.zk;
  		if (!zk || !zk.version) {
  			alert("This is not ZK 5 version!");
  			$("outDomBtn").style.display = "none";
  			return;
  		}
  		obj.zk.load('zk.debug', function () {
			
			// old version
			if (obj.zDebug.outDomTree) {
				obj.zDebug.outDomTree(zk.Desktop._dt.firstChild);
			} else {
  				obj.zDebug.dumpDomTree(zk.Desktop._dt.firstChild);
			}
  			});
    },
    onOutZulBtn: function (context) {
    	var obj = context.window.wrappedJSObject || context.window,
  			zk = obj.zk;
  		if (!zk || !zk.version) {
  			alert("This is not ZK 5 version!");
  			$("outZulBtn").style.display = "none";
  			return;
  		}
  		obj.zk.load('zk.debug', function () {
			// old version
			if (obj.zDebug.dumpWidgetTree4Zul) {
				obj.zDebug.dumpWidgetTree4Zul(zk.Desktop._dt.firstChild);
			} else {
	  			var scriptSource = getResource("chrome://zk/content/debugger.js");
	  			obj.$eval(scriptSource);
	  			if (obj.zDebug.dumpWidgetTree4Zul)
	  				obj.zDebug.dumpWidgetTree4Zul(zk.Desktop._dt.firstChild);
	  			else {
	  				alert("This is not a latest ZK 5 version!");
	  				$("outZulBtn").style.display = "none";
	  			}
			}
  		});
    },
    onTryMeBtn: function(context) {    	
		var input = $("tmUrl"),
    		contentWrapper = new XPCNativeWrapper(context.window, 'doc'),
			docWrapper = new XPCNativeWrapper(contentWrapper.document, 'createElement()'),
			doc1Wrapper = new XPCNativeWrapper(contentWrapper.document, 'body'),
			panel = context.getPanel(panelName),
    		el = docWrapper.createElement("form"),
    		service = Firebug.ZKModel.getPref(Firebug.prefDomain, this.ZKService);
		service = service.split(",")[0];
		
    	if (!doc1Wrapper.body) {
    		alert("Please open a correct tab!");
    		return;
    	}
    	
		if (!ZKPanel.trim(service).length) {
			alert("Service URL cannot be empty!");
			return;
		}
		el.action = service;
		el.method = "post";
		var inp = docWrapper.createElement("INPUT");
		inp.type = "hidden";
		inp.name = "zulData";
		inp.value = panel.panelNode.firstChild.getCode();
		el.appendChild(inp);
		docWrapper.body.appendChild(el);
		zulData = inp.value;
		el.submit();
    },
    onChangeURL: function(context) {
    	openDialog("chrome://zk/content/service.xul",  "_blank", "modal,centerscreen", Firebug.ZKModel.getPref(Firebug.prefDomain, Firebug.ZKModel.ZKService), Firebug);
    },
    onClickIcon: function(context, event) {
        if (event.button != 0) {
            return;
        } else if (isControl(event)) {
            Firebug.toggleDetachBar(true);
        } else {
            Firebug.toggleBar();
            Firebug.tabBrowser.selectedBrowser.chrome.selectPanel('ZulEditor');
        }
    },
    getPref: function (prefDomain, name) {
	    var prefName = prefDomain + "." + name;
	
	    var type = prefs.getPrefType(prefName);
	    if (type == nsIPrefBranch.PREF_STRING)
	        return prefs.getCharPref(prefName);
	    else if (type == nsIPrefBranch.PREF_INT)
	        return prefs.getIntPref(prefName);
	    else if (type == nsIPrefBranch.PREF_BOOL)
	        return prefs.getBoolPref(prefName);
	},
	setPref: function (prefDomain, name, value) {
    	var prefName = prefDomain + "." + name;
	    var type = prefs.getPrefType(prefName);
	    if (type == nsIPrefBranch.PREF_STRING)
	        prefs.setCharPref(prefName, value);
	    else if (type == nsIPrefBranch.PREF_INT)
	        prefs.setIntPref(prefName, value);
	    else if (type == nsIPrefBranch.PREF_BOOL)
	        prefs.setBoolPref(prefName, value);
	}
   
});
zulData = "";
function ZKPanel() {};

ZKPanel.endsWith = function (str, suffix) {
	return str.substring(str.length-suffix.length) == suffix;
};
ZKPanel.startsWith = function (str, prefix) {
	return str.substring(0,prefix.length) == prefix;
};
ZKPanel.trim = function (str) {
	var j = 0, tl = str.length, k = tl - 1;
	while (j < tl && str.charAt(j) <= ' ')
		++j;
	while (k >= j && str.charAt(k) <= ' ')
		--k;
	return j > k ? "": str.substring(j, k + 1);
};
ZKPanel.prototype = extend(Firebug.Panel, { 
    name: panelName, 
    title: "Zul Editor",
    //searchable: true,

    initialize: function(context, doc) {
      Firebug.Panel.initialize.apply(this, arguments);
      var zulInp = doc.getElementById("zulInp");
      if (zulInp) {
      	if (zulInp.sid == context.uid)
      		return;
      	zulInp.sid = context.uid;
      	var cp = doc.getElementById("zulInp_cp");
      	if (cp) {
      		cp.value = zulInp.getCode();
      		this.panelNode.appendChild(cp);
      	}
      	this.panelNode.insertBefore(zulInp, cp);
      	return;
      }
      var scriptSource = getResource("chrome://zk/content/codepress/codepress.js");
      addScript(doc, "_codepress", scriptSource);
      var textarea = doc.createElement("textarea");
      textarea.className = "htmlEditor codepress zul fullPanelEditor";
      textarea.id="zulInp";
      textarea.sid = context.uid;
      if (zulData)
      	textarea.value = zulData;
      else
      	textarea.value ="<zk>\n\r</zk>";
      this.panelNode.appendChild(textarea);
    },
    show: function() {
    	var zulInp = this.document.getElementById("zulInp");
      if (zulInp) {
      	if (zulInp.sid == this.context.uid)
      		return;
      	zulInp.sid = this.context.uid;
      	var cp = this.document.getElementById("zulInp_cp");
      	if (cp) {
      		cp.value = zulInp.getCode();
      		this.panelNode.appendChild(cp);
      	}
      	this.panelNode.insertBefore(zulInp, cp);
      }
    },
    getOptionsMenuItems: function() {
   			return [
            {label: "Open...", nol10n: true, command: bind(this.onOpen, this) },
            {label: "Save As...", nol10n: true, command: bind(this.onSave, this) }
        ];
    },
    onOpen: function () {
    	var fp = Cc["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
		fp.init(window, "Open a Zul File", nsIFilePicker.modeOpen);
		fp.appendFilter("Zul Files","*.zul");
		var rv = fp.show();
		if (rv == nsIFilePicker.returnOK || rv == nsIFilePicker.returnReplace) {
			var file = fp.file;
			if (!ZKPanel.endsWith(file.leafName.toLowerCase(), ".zul")) {
		  		alert("File type must be ZUL!");
					return;
			}
			var inp = Cc["@mozilla.org/network/file-input-stream;1"]
				.createInstance(Ci.nsIFileInputStream);
			var cstream = Cc["@mozilla.org/intl/converter-input-stream;1"]
				.createInstance(Ci.nsIConverterInputStream);
	
			inp.init(file, -1, 0, 0); 
			var data = "";
			cstream.init(inp, "UTF-8", 0, 0);
			var str = {};
   			while (cstream.readString(4096, str) != 0) {
     	 		data += str.value;
    		}
			  
			cstream.close();
			var inp = this.panelNode.firstChild;
			inp.setCode(data);			
    		setTimeout(function(){inp.syntaxHighlight('generic');},100);
		}
    },
    onSave: function () {
			var fp = Cc["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
			fp.init(window, "Save Zul as File", nsIFilePicker.modeSave);
			fp.appendFilter("Zul Files","*.zul");
			var rv = fp.show();
			if (rv == nsIFilePicker.returnOK || rv == nsIFilePicker.returnReplace) {
			  var file = fp.file;
			  if (!ZKPanel.endsWith(file.leafName.toLowerCase(), ".zul")) {
						file.initWithPath(file.path + ".zul");
				}
			  var out = Cc["@mozilla.org/network/file-output-stream;1"]
                         .createInstance(Ci.nsIFileOutputStream);
				out.init(file, 0x02 | 0x08 | 0x20, 0666, 0); 
				var data = this.panelNode.firstChild.getCode();
				var cstream = Cc["@mozilla.org/intl/converter-output-stream;1"].
                          createInstance(Ci.nsIConverterOutputStream);
				cstream.init(out, "UTF-8", 0, 0);
				cstream.writeString(data);
				cstream.close();
			}
    }/**,
    search: function(text) {
    	if (!text) return;
    	var inp = this.panelNode.firstChild;
    	var begin = inp.value.indexOf(text);
    	if (begin > -1 && inp.setSelectionRange) {
				inp.setSelectionRange(begin, begin + text.length);
				inp.focus();
			}
    }*/
});
zkLoadCSSDirect = function (uri, doc) {
	var e = doc.createElement("LINK");
	e.rel = "stylesheet";
	e.type = "text/css";
	e.href = uri;
	doc.getElementsByTagName("HEAD")[0].appendChild(e);
};
Firebug.registerPanel(ZKPanel); 
Firebug.registerModule(Firebug.ZKModel); 
}});