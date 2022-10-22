var axlImg = chrome.runtime.getURL('/images/pet_axolotl.png');
var carrotImg = chrome.runtime.getURL("./images/carrot1.png");





$(document).ready(function readyHandler() {
    var container = $("<div class='axl-container'></div>");

    // initialize pet
    $("body").parent().append(container);
    var cursor = chrome.runtime.getURL("./images/carrot1.png");
    $("body").css({
        "cursor": 'url(' + cursor + '), default'
    })
    $(".axl-container").prepend($('<img>', { id: "axl", src: axlImg }));
    $(".axl-container").css({
        "z-index": "9999",
        "position": "fixed",
        "touch-action": "none",
        "left": '100px',
        "bottom": "0"
    });
    $("#axl").css({
        "width": "77px",
        "height": "auto"
    });



    function walk() {
        if ($('.axl-container').offset().left > window.screen.availWidth) {

            $('.axl-container').offset({ left: 0 });
        } else {
            $('.axl-container').animate({ left: "+=3px" }, 50);
        }
    }
    setInterval(walk, 50);
}, () => chrome.runtime.lastError);





const addCarrot = function() {

    let rand = randomIntFromInterval(-1, 1);
    while (rand < 0.5 && rand > -0.5) {
        rand = randomIntFromInterval(-1, 1);
    }


    var container = $("<div class='carrot-container'></div>");

    // initialize pet
    $("body").parent().append(container);

    $('.carrot-container').prepend($('<img>', { id: "carrot", src: carrotImg }));
    $('.carrot-container').css({
        "z-index": "9999",
        "position": "fixed",
        "touch-action": "none",
        "left": '100px',
        "bottom": '300px'
    });

    $('.carrot-container').animate({ bottom: "+=" + 65 + "px", left: "+=" + rand * 25 + "px" }, {
        duration: 400,
        specialEasing: {
            top: "easeOutQuad",
            left: "linear",
        },

    });
    $('.carrot-container').animate({ bottom: "0", left: "+=" + rand * 50 + "px" }, {
        duration: 800,
        specialEasing: {
            bottom: "easeOutBounce",
            left: "linear",
        },

    });

}

function randomIntFromInterval(min, max) { // min and max included 
    return (Math.random() * (max - min + 1) + min)
}



chrome.runtime.onMessage.addListener(function(request, sender) {
    console.log("recieved message from background")
    console.log(request.message);
    if (request.message === "carrot") {
        addCarrot()
    }

});