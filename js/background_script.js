chrome.contextMenus.create({
  title: "chng img 2 cnvs",
  contexts:["image"],
  onclick: function(info, tab) {
    chrome.tabs.executeScript(tab.id, {
      code: 'var url = "' + info.srcUrl + '";'
    }, function() {
      chrome.tabs.executeScript(tab.id, {file: 'js/leap-0.6.3.min.js'}, function() {
        chrome.tabs.executeScript(tab.id, {file: 'js/leap_control_script.js'}, function() {
          chrome.tabs.executeScript(tab.id, {file: 'js/three.min.js'}, function() {
            chrome.tabs.executeScript(tab.id, {file: 'js/swap_img_cnvs.js'});
          });
        });
      });
    });
  }});
