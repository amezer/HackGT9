var dropBtn = document.getElementById('drop');
dropBtn.onclick = function() {
    console.log(dropBtn.innerHTML)
    if (dropBtn.innerHTML == '<img src="/images/dropUp.png">') {
        dropBtn.innerHTML = '<img src="/images/HideUp.png">'
    } else {
        dropBtn.innerHTML = '<img src="/images/dropUp.png">'
    }
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        console.log("sending drop to content...");
        chrome.tabs.sendMessage(tabs[0].id, { message: "drop", sender: "popup.js" });
    });
}

var feedBtn = document.getElementById('feed');
feedBtn.onclick = function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        console.log("sending carrot to content...");
        chrome.tabs.sendMessage(tabs[0].id, { message: "carrot", sender: "popup.js" });
    });
}

var gymBtn = document.getElementById('gym');
gymBtn.onclick = function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        console.log("sending gym to content...");
        chrome.tabs.sendMessage(tabs[0].id, { message: "gym", sender: "popup.js"});
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
mark.onmouseleave = function() {
    info.style.opacity = 0;
    info.innerHTML = '';
    info.style.height = 0;
};
window.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['calories'], function(result) {
        if (result.calories != 0) {
            chrome.storage.sync.set({calories: 0}, function() {
                console.log('calories is set to ' + carrotsConsumed);
            });
        }
    });
});

function updateCalories(){
    var calories;
    chrome.storage.sync.get(['calories'], function(result) {
        //console.log(result);
        //calories = result.calories;
        document.getElementById('calories').innerHTML = result.calories;
        //$('.calories').text(result.calories);
        console.log('calories currently is ' + result.calories);
        calories = result.calories;
        if (calories >= 5) {
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                console.log("sending explode to content...");
                calories = 0;
                chrome.tabs.sendMessage(tabs[0].id, { message: "explode", sender: "popup.js"});
            });
        }
    });
}
// var calories = 0;
setInterval(updateCalories, 500);

//document.getElementById('calories').innerHTML = calories;
// var setCalories = info => {
//     console.log("calories: " + info.calories);
//     document.getElementById('calories').innerHTML = info.calories;
    
// }

// window.addEventListener('DOMContentLoaded', () => {
//     console.log('in');
//     // ...query for the active tab...
//     chrome.tabs.query({
//       active: true,
//       currentWindow: true
//     }, tabs => {
//       // ...and send a request for the DOM info...
//       chrome.tabs.sendMessage(
//           tabs[0].id,
//           {from: 'popup', subject: 'calories'},
//           // ...also specifying a callback to be called 
//           //    from the receiving end (content script).
//           setCalories);
//     });
//   });
  
