var dropBtn = document.getElementById('drop');
dropBtn.onclick = function(){
    if (dropBtn.innerHTML === "DROP") {
        dropBtn.innerHTML = "HIDE"
    } else {
        dropBtn.innerHTML = "DROP"
    }
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

var info = document.getElementById('questionHover');
var mark = document.getElementById('questionMark');
mark.style.cursor = "pointer"
mark.onmouseenter = function() {
    info.style.opacity = 1;
    info.innerHTML = "<br> Not seeing the axolotl? <br><br>Try refreshing the page or visiting a new site!";
    info.style.height = "205px";
};
mark.onmouseleave = function(){
    info.style.opacity = 0;
    info.innerHTML = '';
    info.style.height = 0;
};