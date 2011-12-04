var highlightnumber = {
  onLoad: function() {
    // initialization code
    this.initialized = true;
    this.strings = document.getElementById("highlightnumber-strings");

    // SteelMessage
    var os = Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);
    // nsIMsgHeaderSink aSubject, MsgMsgDisplayed aTopic, aData:imap-message:/...
    os.addObserver(function(aSubject,aTopic,aData) { 
      //  alert('loaded in traditional view\nsubject:' + aSubject + "\naTopic:" + aTopic + "\naData:" + aData);
      highlightnumber.onNewMessageSelected();
    }, "MsgMsgDisplayed", false);


    // Conversations View
    if (highlightnumber.hasConversations())
      // nsIMsgDBHdr aMsgHdr, HTMLLIElement aDomNode 
      registerHook({onMessageStreamed: function (aMsgHdr, aDomNode) { 
        //alert("loaded in conversations\nMsgHdr: " + aMsgHdr + "\n" + aDomNode); 
        highlightnumber.onNewMessageSelected();
        }, 
      });
  },

  hasConversations: function() {
    try {
      Components.utils.import("resource://conversations/hook.js");
      return true;
    } catch (e) {
      return false;
    }
  },

  onNewMessageSelected: function() {
    var doc;
    var msg;
    if (highlightnumber.hasConversations()) {
      // alert("not supported");
      return;
    } else {
      doc = document.getElementById("messagepane").contentDocument;
      msg = doc.body;
    }

    var pattern = "Felix"; 
    var xpath = "//body//text()[contains(.," + pattern + ")]";
    var candidates = doc.evaluate(xpath, msg, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i=0; i < candidates.snapshotLength; i++) {  
      cand = candidates.snapshotItem(i);
      highlightnumber.highlight(cand, pattern);
    } 
  }, 
  highlight: function(aNode, pattern) {
    if (!aNode) 
      return;
    var offset = aNode.nodeValue.indexOf(pattern)
    if (offset != -1) {
      var spanNode = aNode.ownerDocument.createElement("nobr");
      spanNode.style.borderRadius = '3px';
      spanNode.style.backgroundColor = '#BDABFF';
      var range = aNode.ownerDocument.createRange();
      range.setStart(aNode, offset);
      range.setEnd(aNode, offset + pattern.length);
      range.surroundContents(spanNode);
      aNode = spanNode.nextSibling;
    }
  },

};

window.addEventListener("load", function () { highlightnumber.onLoad(); }, false);
