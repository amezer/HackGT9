let mark = document.getElementById('questionMark');
let block = document.getElementById('questionHover');
mark.style.cursor = "pointer"
mark.onmouseenter = function(){block.style.opacity = 1;};
mark.onmouseleave = function(){block.style.opacity = 0;};

var dropBtn = document.getElementById('drop');
dropBtn.onclick = function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log("sending drop to content...");
        chrome.tabs.sendMessage(tabs[0].id, {message: "drop"});
    });
}

var feedBtn = document.getElementById('feed');
feedBtn.onclick = function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log("sending carrot to content...");
        chrome.tabs.sendMessage(tabs[0].id, {message: "carrot"});
    });
}