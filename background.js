//setInterval(mainFunc, 250);

chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'aaaa') {
      sendResponse(request);
    }
  });
}) 



