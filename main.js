var itemSelected = false
var handwritingCount = 1


$(function () {

    //animate the handwritten text
    setInterval(function() {
        //loop the count from 1 to 3 inclusive
        handwritingCount += 1
        if (handwritingCount > 3) {
            handwritingCount = 1
        }

        //set the label's class depending on the current value
        if (handwritingCount == 1) {
            $(".label").removeClass("handwriting2")
            $(".label").removeClass("handwriting3")
            $(".label").addClass("handwriting1")
        }
        if (handwritingCount == 2) {
            $(".label").removeClass("handwriting1")
            $(".label").removeClass("handwriting3")
            $(".label").addClass("handwriting2")
        }
        if (handwritingCount == 3) {
            $(".label").removeClass("handwriting1")
            $(".label").removeClass("handwriting2")
            $(".label").addClass("handwriting3")
        }
    }, 230) //change every 230ms

    // move the sun whenever it is clicked
    // the selectable class allows us to control if a sun element can actually be clicked on
    // sometimes we instead want it to transition to a different page
    $(".sun.selectable div").click(function () {
        if ($(".sun").hasClass("sun-centred")) {
            $(".sun").removeClass("sun-centred")
            $(".sun").addClass("sun-top")
            $(".planet").removeClass("hidden")
            $(".menu-container").addClass("selected")
        } else {
            $(".sun").removeClass("sun-top")
            $(".sun").addClass("sun-centred")
            $(".planet").removeClass("selected")
            $(".planet").addClass("hidden")
            $(".planet-text").removeClass("selected")
            $(".planet-text").removeClass("shown")
            $(".menu-container").removeClass("selected")
            //reset all the variables
            itemSelected = false
            speedMult = 1
        }
    })

    $(".planet").click(function (event) {
        if (!itemSelected) {
            // add the selected class to the clicked planet so it moves to the centre
            event.target.classList.add("selected")
            $(".planet").addClass("hidden")

            //fade out the stars
            setInterval(function() {
                starOpacity -= 0.02
            }, 1)
            
            setTimeout(function() {
                window.location = event.target.getAttribute("destination")
            }, 300)
        }
    })
})