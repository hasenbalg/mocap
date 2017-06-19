chrome.contextMenus.create({
  title: "Use URL of image somehow",
  contexts:["image"],
  onclick: function(info, tab) {
    // https://stackoverflow.com/a/34666605/4062341
    chrome.tabs.executeScript(tab.id, {
      code: 'var url = "' + info.srcUrl + '";'
    }, function() {
      chrome.tabs.executeScript(tab.id, {file: 'js/prepare_page.js'}, function() {
      chrome.tabs.executeScript(tab.id, {file: 'js/leap.js'}, function() {
        chrome.tabs.executeScript(tab.id, {file: 'js/three.min.js'}, function() {
          chrome.tabs.executeScript(tab.id, {file: 'js/leap_control_script.js'}, function() {
            chrome.tabs.executeScript(tab.id, {file: 'js/projection.js'}, function() {
              chrome.tabs.executeScript(tab.id, {file: 'js/substitute_img.js'});
            });
          });
          });
        });
      });
    });
  }
});
