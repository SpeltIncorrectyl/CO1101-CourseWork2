//  draw a circle of the specified parameters
function drawStar(x, y, r) {
    var context = document.getElementById("star-scape").getContext("2d")
    context.globalAlpha = starOpacity
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI, false);
    context.fillStyle = 'white';
    context.fill();
}

// draw a blank rectangle over everything to clear the screen
function clear() {
    var canvas = document.getElementById("star-scape")
    var context = canvas.getContext("2d")
    context.clearRect(0, 0, canvas.width, canvas.height)
}

// stars are an array of javascript objects, here is the empty array stored in a global variable
var stars = []

// a multiplier of the speed (used to stop stars when reading text)
// this was superseded by starOpacity, and isn#t actually used.

var speedMult = 1
// how visibile the stars are (used to hide stars when reading text)
var starOpacity = 1

// here we iterate over each star manually by making a counter
function drawStars() {
    for (i = 0; i < stars.length; i++) {
        drawStar(stars[i].x, stars[i].y, stars[i].r)
    }
}

// iterate over every star like before and move them down according to their speed
function moveStars() {
    for (i = 0; i < stars.length; i++) {
        stars[i].y += stars[i].speed * speedMult
    }
}

// remove every star that is below the screen
// using filter, not only because it is more concise than a for loop but also because I don't think it's possible to do it with a for loop
// you can't iterate over an array and remove items from it at the same time
// and you could note down the elements you want to remove and then remove them after the loop but then it becomes difficult to know which element is which because the indexes change when you remove things...
// it's far easier just to have a simple 1 line solution
function cullStars() {
    var canvas = document.getElementById("star-scape")

    stars = stars.filter(star => star.y < canvas.height)
}

//create a star with the specified properties
function makeStar(x, y, r, speed) {
    stars.push({x: x, y: y, r: r, speed: speed})
}

// set the width and height of the canvas to match that of the window
// this means we get the stars in every part of the screen
function setupCanvas() {
    document.getElementById("star-scape").width = window.innerWidth
    document.getElementById("star-scape").height = window.innerHeight * 0.98
}

// clear and redraw stars, and move and cull them also
function starScapeTick() {
    clear()
    drawStars()
    moveStars()
    cullStars()
}

// this is a helper function to generate a random float between two points because javascript standard library lacks it
function randomRange(start, end) {
    return Math.random() * (end - start) + start
} 

// make a star with randomised parameters
// it could end up anywhere on the screen
function makeRandomStar() {
    var canvas = document.getElementById("star-scape")

    x = randomRange(0, canvas.width)
    y = randomRange(0, canvas.height)
    speed = randomRange(0.5, 5)
    size = randomRange(1, 2)
    
    makeStar(x, y, size, speed)
}

// make a star with randomised parameters
// it can only end up at the top of the screen
function makeRandomStarTop() {
    // don't bother making stars when everything has stopped
    if (speedMult == 0) {
        return
    }

    var canvas = document.getElementById("star-scape")

    x = randomRange(0, canvas.width)
    speed = randomRange(0.5, 5)
    size = randomRange(1, 2)
    
    makeStar(x, 0, size, speed)
}

$(function() {
    setupCanvas()

    // generate 100 starter stars so the starscape isn't empty when the webpage is loaded
    for (i = 0; i < 100; i++) {
        makeRandomStar()
    }
    
    //update the stars once every 5ms
    setInterval(starScapeTick, 5)

    //make a new star once every 30ms
    setInterval(makeRandomStarTop, 30)
})