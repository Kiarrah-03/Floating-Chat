chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: "save-to-floating-chat",
      title: "Save to Chat Everywhere",
      contexts: ["link", "page", "video", "image"],
    });
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "save-to-floating-chat") {
    const urlToSave = info.linkUrl || info.srcUrl || info.pageUrl;
    if (urlToSave && tab?.id) {
      chrome.tabs
        .sendMessage(tab.id, {
          action: "saveExternalLink",
          url: urlToSave,
        })
        .catch(() => {});
    }
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "takeScreenshot") {
    chrome.tabs.captureVisibleTab(
      sender.tab.windowId,
      { format: "png" },
      (dataUrl) => {
        if (chrome.runtime.lastError) {
          sendResponse({
            success: false,
            error: chrome.runtime.lastError.message,
          });
          return;
        }
        sendResponse({ success: true, image: dataUrl });
      },
    );
    return true;
  }
});
