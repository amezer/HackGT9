var axlImg = chrome.runtime.getURL('/images/axolotl.gif');
var carrotImg = chrome.runtime.getURL("./images/carrot1.png");
var carrotCount = 0;
const maxCarrot = 10;
var canAdd = true;
var speed = 5;
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
                    $('.axl-container').animate({ left: "+=" + speed }, 50, function(){axlLeft += speed});
                } else if (axlLeft > windowWidth) {
                    //face left
                    $('#axl').css({
                        "transform" : "scaleX(1)"
                    });
                    faceRight = false;
                } 
                if (!faceRight && (axlLeft > -50)){
                    //go left
                    $('.axl-container').animate({ left: "-=" + speed }, 50, function(){axlLeft -= speed});
                } else if (axlLeft < -50) {
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

const avaliablePos = [0,0,0,0,0,0,0,0,0,0];

const addCarrot = function() {
    let rand = randomIntFromInterval(-1, 1);
    while (rand < 0.5 && rand > -0.5) {
        rand = randomIntFromInterval(-1, 1);
    }
    let spawnRand = randomIntFromInterval(100, 800);
    var randPos = Math.floor(randomIntFromInterval(0, 9));
    console.log(randPos)
    while (avaliablePos[randPos] != 0) {
        randPos = Math.floor(randomIntFromInterval(0, 9));
    } 
    console.log(randPos);
    if (carrotCount == (maxCarrot-1)) {
        console.log('no more carrots!');
    } else {
        var container = $('<div class="carrot-container" id="carrot-'+randPos+'"></div>');
        // initialize pet
        $("body").parent().append(container);
    
        $('#carrot-'+randPos).prepend($('<img>', { id: "carrot", src: carrotImg }));
        $('#carrot-'+randPos).css({
            "z-index": "9999",
            "position": "fixed",
            "touch-action": "none",
            "left": spawnRand +'px',
            "bottom": '300px'
        });
    
        $('#carrot-'+randPos).animate({ bottom: "+=" + 65 + "px", left: "+=" + rand * 25 + "px" }, {
            duration: 400,
            specialEasing: {
                top: "easeOutQuad",
                left: "linear",
            },
    
        });
        $('#carrot-'+randPos).animate({ bottom: "0", left: "+=" + rand * 50 + "px" }, {
            duration: 800,
            specialEasing: {
                bottom: "easeOutBounce",
                left: "linear",
            },
    
        });
        
        console.log("carrot added at pos: " + randPos);
        var posLeft = spawnRand + (rand * 25) + (rand * 50);
        carrotPos[randPos] = posLeft;
        console.log(carrotPos[randPos]);
        console.log(carrotPos);
        carrotCount += 1;
        avaliablePos[randPos] = 1;
    }
}

function randomIntFromInterval(min, max) { // min and max included 
    return (Math.random() * (max - min + 1) + min)
}

function checkCarrotPos(axlLeft){
    for (let i = 0; i < avaliablePos.length; i++) {
        var cPos = carrotPos[i];
        if (avaliablePos[i] == 1) {
            var upper = Math.floor(cPos)+speed;
            var lower = Math.floor(cPos)-speed;
            if ((axlLeft >= lower) && (axlLeft <= upper)){
                console.log('touched carrot-' + i);
                if (document.getElementById('carrot-' + i)){
                    console.log("upper bound: " + upper + " lower bound: " + lower);
                    console.log(axlLeft);
                    document.getElementById('carrot-' + i).remove();
                    carrotCount--;
                    console.log("carrot deleted: " + i + " axl pos: " + axlLeft);
                    avaliablePos[i] = 0;
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