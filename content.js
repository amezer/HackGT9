var axlImg = chrome.runtime.getURL('/images/pet_axolotl.png');
var carrotImg = chrome.runtime.getURL("./images/carrot1.png");
var carrotCount = 0;
const maxCarrot = 10;
const addPet = function() {
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
            "left": '0px',
            "bottom": "0"
        });
        $("#axl").css({
            "width": "77px",
            "height": "auto",
            "position": "relative"
            //"top": 0
        });

        console.log(window.screen.availWidth);
        var axlLeft = 0;
        var windowWidth = window.screen.availWidth;
        function walk() {
            if (axlLeft > windowWidth) {
                $('.axl-container').animate({ left: 0 }, 0, function(){axlLeft = 0});
            } else {
                $('.axl-container').animate({ left: "+=3" }, 50, function(){axlLeft += 3});
            }
            checkCarrotPos(axlLeft);
        }
        setInterval(walk, 50);
    }, () => chrome.runtime.lastError);
}
const carrotPos = [];

const addCarrot = function() {
    let rand = randomIntFromInterval(-1, 1);
    while (rand < 0.5 && rand > -0.5) {
        rand = randomIntFromInterval(-1, 1);
    }
    if (carrotCount == (maxCarrot-1)) {
        console.log('no more carrots! get out!');
    } else {
        var container = $('<div class="carrot-container" id="carrot-'+carrotCount+'"></div>');
        // initialize pet
        $("body").parent().append(container);
    
        $('#carrot-'+carrotCount).prepend($('<img>', { id: "carrot", src: carrotImg }));
        $('#carrot-'+carrotCount).css({
            "z-index": "9999",
            "position": "fixed",
            "touch-action": "none",
            "left": '100px',
            "bottom": '300px'
        });
    
        $('#carrot-'+carrotCount).animate({ bottom: "+=" + 65 + "px", left: "+=" + rand * 25 + "px" }, {
            duration: 400,
            specialEasing: {
                top: "easeOutQuad",
                left: "linear",
            },
    
        });
        $('#carrot-'+carrotCount).animate({ bottom: "0", left: "+=" + rand * 50 + "px" }, {
            duration: 800,
            specialEasing: {
                bottom: "easeOutBounce",
                left: "linear",
            },
    
        });
        
        console.log("carrot added: " + carrotCount);
        var posLeft = 100 + (rand * 25) + (rand * 50);
        carrotPos[carrotCount] = posLeft;
        console.log(carrotPos[carrotCount]);
        console.log(carrotPos);
        carrotCount += 1;
    }
}

function randomIntFromInterval(min, max) { // min and max included 
    return (Math.random() * (max - min + 1) + min)
}

function checkCarrotPos(axlLeft){
    for (let i = 0; i < carrotPos.length; i++) {
        var cPos = carrotPos[i];
        if (carrotPos[i] > 0) {
            console.log(axlLeft);
            var upper = Math.floor(cPos)+1;
            var lower = Math.floor(cPos)-1;
            console.log("upper bound: " + upper + " lower bound: " + lower);
            if ((axlLeft >= lower) && (axlLeft <= upper)){
                console.log('touched carrot-' + i);
                if ($('#carrot-' + i).length){
                    document.getElementById('carrot-' + i).remove();
                    carrotCount--;
                    console.log("carrot deleted: " + i + " axl pos: " + axlLeft);
                    carrotPos[i] = -100;
                    console.log("updated: " + carrotPos);
                }
            }
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