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

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active) {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.scripting.executeScript({
                target : {tabId: tabs[0].id},
                //func : addImg
                //files: ['content.js']
            });
        });
    }
});



