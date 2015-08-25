/* zkscript.js

	Purpose:
		
	Description:
		
	History:
		Mon Feb  2 18:13:09     2009, Created by jumperchen

Copyright (C) 2008 Potix Corporation. All Rights Reserved.

This program is distributed under GPL Version 2.0 in the hope that
it will be useful, but WITHOUT ANY WARRANTY.
*/
FBL.ns(function() { with (FBL) {
function ZKScript() {}
ZKScript.prototype = extend(Firebug.Panel, { 
    name: "ZKScript",
    parentPanel: "ZulEditor",
    title: "ZScript",

    initialize: function() {
	      Firebug.Panel.initialize.apply(this, arguments);
      	zkLoadCSSDirect("chrome://zk/skin/zk.css", this.document);
	     	ZscriptTag.bodyTag.append(null, this.panelNode, null);
	  },
    show: function () {
    	if (Firebug.isDetached()) {
    		zkLoadCSSDirect("chrome://zk/skin/zk.css", this.document);
    	}
    }
});

var ZscriptTag = domplate(Firebug.Rep, {
    bodyTag:
    DIV(
        DIV({display: 'table-row'},
        		DIV({style: 'background: #EFEFD1; height: 22px; padding: 2px;border: 1px solid #BABAAB;'},
        			A({"class": "zscriptButton", onclick: "$onRunClick", onmousedown: "$onMouseDown", onmouseup: "$onMouseUp", onmouseout: "$onMouseUp"},
                                "Run"
              ),
              A({"class": "zscriptButton", onclick: "$onClearClick", onmousedown: "$onMouseDown", onmouseup: "$onMouseUp", onmouseout: "$onMouseUp"},
                                "Clear"
              ),
              A({"class": "zscriptButton", onclick: "$onCopyClick", onmousedown: "$onMouseDown", onmouseup: "$onMouseUp", onmouseout: "$onMouseUp"},
                                "Copy"
              )
        		)
        	),
        	DIV({display: 'table-row'},
        		
        			TEXTAREA({id: "zscript_editor", class: "htmlEditor", style: "padding-top:2px;font-size: Inherit;font-family: Monaco, monospace;margin:0;border:0;height:100%; width: 100%;"})
        		
        	)
        )
        ,
    onMouseDown: function (evt) {
    	FBL.setClass(evt.target, "zscriptButton-down");
    },
    onMouseUp: function (evt) {
    	FBL.removeClass(evt.target, "zscriptButton-down");
    },
    onRunClick: (function () {
			function _onChangeData(zk, wgt, val, selbk) {
				var inf = {value: val,
					start: zk(wgt.getInputNode()).getSelectionRange()[0]}
				if (selbk) inf.bySelectBack =  true;
				return inf;
			}
    	return function(event) {
	  		var obj = FirebugContext.window.wrappedJSObject || FirebugContext.window,
	    			zkau = obj.zkau,
	    			zk = obj.zk,
	    			uuid = obj._zkJetId,
	    			textarea = this.getEditor();
	       	if (zk && zkau) {
	        	zkau.send({uuid: uuid, cmd: 'onChange', data: [textarea.value, false, 0]});
	        } else if (zk && zk.version /**zk 5.0.x version*/) {
	        	var wgt = zk.Widget.$(uuid);
	        	if (wgt) {
	        		wgt.fire('onChange', _onChangeData(zk, wgt, textarea.value));
	        	}
	        } else {
	        	alert("This is not a ZK page!");
	        }
   	 }
    }()),
    onClearClick: function(event) {
  		this.getEditor().value = '';
    },
    getEditor: function () {
    	return FirebugContext.getPanel("ZKScript").panelNode.getElementsByClassName("htmlEditor")[0];
    },
    onCopyClick: function(event) {
  		FBL.copyToClipboard(this.getEditor().value);
    }
});
Firebug.registerPanel(ZKScript); 
}});