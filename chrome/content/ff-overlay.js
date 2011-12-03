var highlightnumber = {
  onLoad: function() {
    // initialization code
    this.initialized = true;
    this.strings = document.getElementById("highlightnumber-strings");
  },

  onMenuItemCommand: function(e) {
    var promptService = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                                  .getService(Components.interfaces.nsIPromptService);
    promptService.alert(window, this.strings.getString("helloMessageTitle"),
                                this.strings.getString("helloMessage"));
  },

  onToolbarButtonCommand: function(e) {
    // just reuse the function above.  you can change this, obviously!
    highlightnumber.onMenuItemCommand(e);
  }
};

window.addEventListener("load", function () { highlightnumber.onLoad(); }, false);


highlightnumber.onFirefoxLoad = function(event) {
  document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e) {
    highlightnumber.showFirefoxContextMenu(e);
  }, false);
};

highlightnumber.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  document.getElementById("context-highlightnumber").hidden = gContextMenu.onImage;
};

window.addEventListener("load", function () { highlightnumber.onFirefoxLoad(); }, false);