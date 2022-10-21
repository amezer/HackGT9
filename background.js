function addImg() {
    console.log("add child");
    const img = document.createElement('img');
    const container = document.createElement('div');
    img.src = chrome.runtime.getURL('/images/pet_axolotl.png');
    img.style.position = "fixed";
    img.style.zIndex = 9999;
    container.classList.add("container");
    container.append(img);
    document.body.insertAdjacentElement("afterend",container);
    document.body.appendChild(img);
}

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active) {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.scripting.executeScript({
                target : {tabId: tabs[0].id},
                func : addImg
            });
        });
    }
  })