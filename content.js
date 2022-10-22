const init = function() {
    const injectElement = document.createElement('div')
    injectElement.innerHTML = "helllllllooooo"
    document.body.appendChild(injectElement)

}

const addCarrot = function() {
    console.log("add carrot")
    const img = document.createElement("img");
    img.src = chrome.runtime.getURL("./images/carrot1.png");
    document.body.appendChild(img);
}


// chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.content) {
//         sendResponse({ content: "response message" });
//         return true; // This is required by a Chrome Extension
//     }
// })
chrome.runtime.onMessage.addListener(function(request, sender) {
    console.log("recieved message from background")
    console.log(request.message);
    if (request.message === "carrot") {
        addCarrot()
    }
});
init()
    // addCarrot()