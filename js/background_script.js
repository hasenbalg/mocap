var current_tab, current_info;
chrome.contextMenus.create({
  title: "chng img 2 cnvs",
  contexts:["image"],
  onclick: function(info, tab) {
    current_tab = tab;
    current_info = info;

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

function toggleZoom(enabled) {
  console.log("-----------------------------------");
  console.log(enabled);
  console.log("background_script.js" + current_info);

  chrome.tabs.executeScript(current_tab.id, {
    code: 'var url = "' + current_info.srcUrl + '";'

  }, function() {
    chrome.tabs.executeScript(current_tab.id, {code: 'var zoom_enabled = ' + enabled + ';'}, function() {
      chrome.tabs.executeScript(current_tab.id, {file: 'js/leap-0.6.3.min.js'}, function() {
        chrome.tabs.executeScript(current_tab.id, {file: 'js/leap_control_script.js'}, function() {
          chrome.tabs.executeScript(current_tab.id, {file: 'js/three.min.js'}, function() {
            chrome.tabs.executeScript(current_tab.id, {file: 'js/swap_img_cnvs.js'});
          });
        });
      });
    });
  });
}
