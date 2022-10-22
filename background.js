chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target : {tabId: tabs[0].id},
                //func : addImg
                //files: ['content.js']
            });
        });
    }
});

const addCarrot = function() {
    console.log("add carrot")
    const img = document.createElement("img");
    img.src = chrome.runtime.getURL("./images/carrot1.png");
    document.body.appendChild(img);
}

chrome.omnibox.onInputStarted.addListener(function() {
    chrome.omnibox.setDefaultSuggestion({
        description: 'text',
    })
})

chrome.omnibox.onInputEntered.addListener((text) => {
    // Encode user input for special characters , / ? : @ & = + $ #

    // var newURL = 'https://www.google.com/search?q=' + encodeURIComponent(text);
    // chrome.tabs.create({ url: newURL });

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        console.log("sending " + text + " to content...")
        chrome.tabs.sendMessage(tabs[0].id, { message: text })
    });

    // 
});
