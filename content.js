var axlImg = chrome.runtime.getURL('/images/pet_axolotl.png');
var carrotImg = chrome.runtime.getURL("./images/carrot1.png");


const addPet = function(){
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
}

let stop = false;
let rand = randomIntFromInterval(0, 5);
let vY = 0.5;
let vX = rand * 3;
console.log(rand)
const addCarrot = function() {

    var container = $("<div class='carrot-container'></div>");


    // initialize pet
    $("body").parent().append(container);

    $('.carrot-container').prepend($('<img>', { id: "carrot", src: carrotImg }));
    $('.carrot-container').css({
        "z-index": "9999",
        "position": "fixed",
        "touch-action": "none",
        "left": '50px',
        "bottom": '300px'
    });


    setInterval(function() { pop(rand) }, 10);

}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pop(rand) {

    if (!stop) {
        vY += 0.5;
        console.log("top: " + $('.carrot-container').offset().top + "\navailHeight: " + window.screen.availHeight);
        console.log("left: " + $('.carrot-container').offset().left + "\navailWidth: " + window.screen.availWidth);
        if ($('.carrot-container').offset().top+50 > window.screen.availHeight) {
            $('.carrot-container').offset({ top: window.screen.availHeight - 30 });
            $('.carrot-container').css({
                "top": $('.carrot-container').offset().top + "px"
            })
            document.getElementsByClassName('carrot-container')[0].style.top = $('.carrot-container').offset().top + "px";
            console.log($('.carrot-container').offset().top)
            console.log($('.carrot-container').css("top"))
            console.log("left: " + document.getElementsByClassName('carrot-container')[0].style.left);
            console.log("top: " + document.getElementsByClassName('carrot-container')[0].style.top);
            stop = true;
        } else {
            $('.carrot-container').animate({ top: "+=" + vY + "px" }, 10);
        }

        if ($('.carrot-container').offset().left > window.screen.availWidth) {
            //vx != -1;

            $('.carrot-container').offset({ left: 0 });
        } else {
            $('.carrot-container').animate({ left: "+=" + vX + "px" }, 10);
        }
    }

}


chrome.runtime.onMessage.addListener(function(request, sender) {
    console.log("recieved message from " + sender);
    console.log(request.message);
    if (request.message === "carrot") {
        addCarrot()
    }

    if (request.message === "drop") {
        addPet();
    }
});