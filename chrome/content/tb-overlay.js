var highlightnumber = {
  onLoad: function() {
    // initialization code
    this.initialized = true;
    this.strings = document.getElementById("highlightnumber-strings");
    alert("hallo");

    var threePane = Components.classes['@mozilla.org/appshell/window-mediator;1'].getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow("mail:3pane");
    gBrowser = threePane.document.getElementById("messagepane");
    gBrowser.addEventListener("DOMContentLoaded", alert("this.parseClick2Dial"), false);
    gBrowser.addEventListener("DOMFrameContentLoaded", alert("this.parseClick2DialFrame"), false); 

    // SteelMessage
    var os = Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);
    os.addObserver(function(aSubject,aTopic,aData) { alert('loaded in traditional view'); }, "MsgMsgDisplayed", false);

    // Conversations View
    var hasConversations;
    try {
      Components.utils.import("resource://conversations/hook.js");
      hasConversations = true;
    } catch (e) {
      hasConversations = false;
    }
    if (hasConversations)
      registerHook({onMessageStreamed: function (aMsgHdr, aDomNode) { 
        alert("loaded in conversations"); 
      }, 
      });
  },
  pageLoaded: function pageLoaded(contentDocument) {
    alert('hello');
  },

};

window.addEventListener("load", function () { highlightnumber.onLoad(); }, false);
