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
        chrome.tabs.sendMessage(tabs[0].id, { message: text, sender: "background.js"})
    });

});