$(function() {
    $(".speaker-select").click(function(event) {
        //each speaker-select element has target attribute which points to the id of the bio to show
        var target = event.target.getAttribute("target")
        //show the target
        $(".bio").addClass("undisplayed")
        $(`#${target}`).removeClass("undisplayed")
    })
})