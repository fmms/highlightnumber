var highlightnumber = {
  onLoad: function() {
    // initialization code
    this.initialized = true;
    this.strings = document.getElementById("highlightnumber-strings");
    alert("HighlightNumber initialized");

    // SteelMessage
    var os = Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);
    // nsIMsgHeaderSink aSubject, MsgMsgDisplayed aTopic, aData:imap-message:/...
    os.addObserver(function(aSubject,aTopic,aData) { 
      //  alert('loaded in traditional view\nsubject:' + aSubject + "\naTopic:" + aTopic + "\naData:" + aData);
      highlightnumber.onNewMessageSelected();
    }, "MsgMsgDisplayed", false);


    // Conversations View
    var hasConversations;
    try {
      Components.utils.import("resource://conversations/hook.js");
      hasConversations = true;
    } catch (e) {
      hasConversations = false;
    }
    if (hasConversations)
      // nsIMsgDBHdr aMsgHdr, HTMLLIElement aDomNode 
      registerHook({onMessageStreamed: function (aMsgHdr, aDomNode) { 
        //alert("loaded in conversations\nMsgHdr: " + aMsgHdr + "\n" + aDomNode); 
        highlightnumber.onNewMessageSelected();
        }, 
      });
  },

  onNewMessageSelected: function() {
    alert("a new message is selected");
  },

};

window.addEventListener("load", function () { highlightnumber.onLoad(); }, false);
