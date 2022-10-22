chrome.storage.sync.get('positionLeft', function(result) {
    console.log(result)
    if (result.positionLeft == undefined) {
        posLeft = '100px'
        console.log('null, but set to 100, 400' + posLeft)
    } else {
        posLeft = result.positionLeft;
        console.log('LeftValue currently is ' + result.positionLeft);
    }
    
});


let mark = document.getElementById('questionMark');
let block = document.getElementById('questionHover');
mark.style.cursor = "pointer"
mark.onmouseenter = function(){block.style.opacity = 1;};
mark.onmouseleave = function(){block.style.opacity = 0;};