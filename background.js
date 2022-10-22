// function addImg() {
//     //ensure jquery is in the current tab
//     const jquery = document.createElement('script');
//     jquery.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
//     document.head.appendChild(jquery);
//     //creating the img element of the axolotl
//     const img = document.createElement('img');
//     const container = document.createElement('div');
//     img.src = chrome.runtime.getURL('/images/pet_axolotl.png');
//     container.style.zIndex = 9999;
//     console.log(window.innerHeight);
//     container.style.left = 0;
//     container.classList.add("container");
//     container.append(img);
//     container.style.position = "fixed";
//     img.style.width = "77px";
//     img.style.height = "auto";
//     container.style.top = window.innerHeight - 80 + "px";
//     document.body.insertAdjacentElement("afterend",container);
// }
// function addImg() {
//     //ensure jquery is in the current tab
//     const jquery = document.createElement('script');
//     jquery.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
//     document.head.appendChild(jquery);
//     //creating the img element of the axolotl
//     const img = document.createElement('img');
//     img.classList.add("pet");
//     const container = document.createElement('div');
//     img.src = chrome.runtime.getURL('/images/pet_axolotl.png');
//     //container.style.zIndex = 9999;
//     //container.style.left = 0;
//     container.classList.add("pet-container");
//     container.append(img);
//     //container.style.position = "fixed";
//     // img.style.width = "77px";
//     // img.style.height = "auto";
//     container.style.top = window.innerHeight - 80 + "px";
//     document.body.insertAdjacentElement("afterend",container);
// }

function addImg() {
    console.log("add child");
    const img = document.createElement('img');
    const container = document.createElement('div');
    img.src = chrome.runtime.getURL('/images/pet_axolotl.png');
    img.style.position = "fixed";
    img.style.zIndex = 9999;
    container.classList.add("container");
    container.append(img);
    document.body.insertAdjacentElement("afterend", container);
    document.body.appendChild(img);
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
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

});