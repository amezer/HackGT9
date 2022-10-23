var axlImg = chrome.runtime.getURL('/images/axolotl.gif');
var carrotImg = chrome.runtime.getURL("./images/carrot1.png");
var carrotCount = 0;
const maxCarrot = 10;
var canAdd = true;
const addPet = function() {
    $(document).ready(function readyHandler() {
        if (canAdd) {
            var container = $("<div class='axl-container' id='axl-cont'></div>");
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
                "bottom": "-3px"
            });
            $("#axl").css({
                "width": "150%",
                "height": "auto",
                "position": "relative",
                "transform" : "scaleX(-1)"
            });

            console.log(window.screen.availWidth);
            var axlLeft = 0;
            var windowWidth = window.screen.availWidth + 25;
            var faceRight = true;
            canAdd = false;
            function walk() {
                checkCarrotPos(axlLeft);
                if (faceRight && (axlLeft < windowWidth)) {
                    //go right 
                    $('.axl-container').animate({ left: "+=3" }, 50, function(){axlLeft += 3});
                } else if (axlLeft > windowWidth) {
                    //face left
                    $('#axl').css({
                        "transform" : "scaleX(1)"
                    });
                    faceRight = false;
                } 
                if (!faceRight && (axlLeft > -30)){
                    //go left
                    $('.axl-container').animate({ left: "-=3" }, 50, function(){axlLeft -= 3});
                } else if (axlLeft < -30) {
                    //go right
                    $('#axl').css({
                        "transform" : "scaleX(-1)"
                    });
                    faceRight = true;
                }
            }
            setInterval(walk, 50);
        } else {
            document.getElementsByClassName('axl-container')[0].remove();
            canAdd = true;
        }
    }, () => chrome.runtime.lastError);
}
const carrotPos = [];

const addCarrot = function() {
    let rand = randomIntFromInterval(-1, 1);
    while (rand < 0.5 && rand > -0.5) {
        rand = randomIntFromInterval(-1, 1);
    }
    let spawnRand = randomIntFromInterval(100, 800);
    if (carrotCount == (maxCarrot-1)) {
        console.log('no more carrots!');
    } else {
        var container = $('<div class="carrot-container" id="carrot-'+carrotCount+'"></div>');
        // initialize pet
        $("body").parent().append(container);
    
        $('#carrot-'+carrotCount).prepend($('<img>', { id: "carrot", src: carrotImg }));
        $('#carrot-'+carrotCount).css({
            "z-index": "9999",
            "position": "fixed",
            "touch-action": "none",
            "left": spawnRand +'px',
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
        var posLeft = spawnRand + (rand * 25) + (rand * 50);
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