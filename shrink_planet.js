$(function() {
    $(".planet").removeClass("hidden")
    $(".planet").removeClass("selected")
    $(".planet-text").removeClass("selected")
    $(".planet-text").removeClass("shown")
    
    //I have to set a timeout because otherwise itemSelected would be set back to false immediatley and then the .planet click event (which is triggered when you click "Back")
    //by setting a timeout itemSelected goes back to false AFTER the .plant click event is triggered, so the planets are not hidden

    starOpacity = 0.0
    var starOpacityInterval = setInterval(function() {
        starOpacity += 0.02
        if (starOpacity >= 1.0) {
            starOpacity = 1.0
            clearInterval(starOpacityInterval)
        }
    }, 1)

    setTimeout(function() {
        itemSelected = false
    }, 1) //1 milisecond

    // get the stars moving again
    speedMult = 1
})