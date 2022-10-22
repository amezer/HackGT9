var posTop;
var posLeft;
var axlImg = chrome.runtime.getURL('/images/pet_axolotl.png');
//set and get positionTop
chrome.storage.sync.get('positionTop', function(result) {
    // console.log(result)
    // if (result.positionTop == undefined) {
    //     posTop = '400px'
    //     console.log('null, but set to 100, 400')
    // } else {
    //     posTop = result.positionTop;
    //     console.log('TopValue currently is ' + result.positionTop);
    // }  
    posTop = '790px';
});

//set and get positionLeft
chrome.storage.sync.get('positionLeft', function(result) {
    // console.log(result)
    // if (result.positionLeft == undefined) {
    //     posLeft = '100px'
    //     console.log('null, but set to 100, 400');
    // } else {
    //     posLeft = result.positionLeft;
    //     console.log('LeftValue currently is ' + result.positionLeft);
    // }
    posLeft = '100px';
});

$(document).ready(function readyHandler() {
    var container = $("<div class='axl-container'></div>");

    var animating = false;

    var axlContainer = $('.axl-container');
    // initialize pet
    $("body").parent().append(container);
    var cursor = chrome.runtime.getURL("./images/carrot1.png");
    $("body").css({
        "cursor": 'url('+ cursor +'), default'
    })
    $(".axl-container").prepend($('<img>', { id: "axl", src: axlImg}));
    $(".axl-container").css({
        "z-index": "9999",
        "position": "fixed",
        "touch-action": "none",
        "left": posLeft,
        "top": posTop
    });
    $("#axl").css({
        "width": "77px",
        "height": "auto"
    });

    function setThePosition() {
        posLeft = $(".axl-container").css("left");
        posTop = $(".axl-container").offset().top;

        if (posTop > window.screen.availHeight) {
            posTop = window.screen.availHeight - 100
        }
        console.log(window.screen.availWidth)
        if (posLeft > window.screen.availWidth) {
            posLeft = window.screen.availWidth - 100
        }

        chrome.storage.sync.set({ 'positionLeft': posLeft }, function() {
            console.log('posLeft is set to ' + posLeft);
        });
        chrome.storage.sync.set({ 'positionTop': posTop }, function() {
            console.log('posTop is set to ' + posTop);
        });
    }

    console.log(window.innerWidth);

    function walk() {
        if ($('.axl-container').offset().left > window.screen.availWidth) {
            console.log("triggered, " + posLeft);
            //posLeft = "100px";
            $('.axl-container').offset({left: 0});
            //$('.axl-container').animate({left: "-=3px"}, 50);
        } else {
            $('.axl-container').animate({left: "+=3px"}, 50);
        }
    }
    setInterval(walk, 50);
}, () => chrome.runtime.lastError);
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