function validateText(userName, email, phoneNumber) {
    var issues = []

    // check if any of the fields are empty
    if (userName == "") {
        issues.push("No name entered.")
    }

    if (email == "") {
        issues.push("No email entered.")
    }

    if (phoneNumber == "") {
        issues.push("No phone number entered.")
    }

    // check the username is just letters (no numbers)
    // I will use regex for this and other similar predicates
    // this matches anything that is NOT a-z or A-Z or space (so any thing that is not a letter)
    if (userName.match(/[^a-zA-Z ]/)) {
        issues.push("Name must be only letters.")
    }

    // if trimming the string (removes spaces at start and end) produces a different string then there is trailing whitespace
    if (userName.trim() != userName) {
        issues.push("Cannot have trailing whitespace.")
    }

    // check if there are double (or more) spaces
    if (userName.match(/  /)) {
        issues.push("Name must only have single spaces.")
    }

    // check if the first letter is lowercase
    if (userName.match(/^[a-z]/)) {
        issues.push("First letter must be capitalised.")
    }

    // check if a there is a space followed by a lowercase letter (this means a word does not start with a capital letter)
    if (userName.match(/ [a-z]/)) {
        issues.push("All words need to be capitalised.")
    }

    // cannot have two capital letters in a row
    if (userName.match(/[A-Z][A-Z]/)) {
        issues.push("Capital letters cannot be consecutive.")
    }

    // cannot have a capital letter before a lowercase letter
    if (userName.match(/[a-z][A-Z]/)) {
        issues.push("Capital letters cannot directly follow a lowercase letter.")
    }

    // email cannot have any character that isnt lowercase, @ or .
    if (email.match(/[^\.@a-z0-9]/)) {
        issues.push("Email cannot contain invalid characters.")
    }

    // @ and . cannot be directly next to each other, they must be seperated by letters
    if (email.match(/(@|\.)(@|\.)/)) {
        issues.push("'@' and '.' cannot be consecutive.")
    }

    // email must have @
    // dont care if the email is empty because then lacking an @ is assumed
    if (!email.match(/@/) && email != "") {
        issues.push("Email must have '@'.")
    }

    // email must have @
    if (!email.match(/\./)  && email != "") {
        issues.push("Email must have '.'.")
    }

    // phone number must only contain numbesr
    if (phoneNumber.match(/[^0-9]/)) {
        issues.push("Phone number must only contain numbers.")
    }

    // phone number must have the length of 11 characters
    // make sure it is not blank because we don't want this warning to be spammed when the email is empty
    if (phoneNumber != "" && phoneNumber.length != 11) {
        issues.push("Phone number must be 11 characters long.")
    }

    return issues
}

function displayValidationMessage() {
    userName = $("#name").val()
    email = $("#email").val()
    phoneNumber = $("#phone-number").val()
    
    issues = validateText(userName, email, phoneNumber)

    issueList = issues.join(" ")

    $("#result").text(issueList)

    if (issues.length == 0) {
        $("#submit-button").removeClass("unsubmit-button")
        $("#submit-button").addClass("submit-button")
    } else {
        $("#submit-button").removeClass("submit-button")
        $("#submit-button").addClass("unsubmit-button")
    }
}

$(function() {
    // clear all the entered values of refresh
    $("#name").val("")
    $("#email").val("")
    $("#phone-number").val("")

    // make the submit button give feedback on click
    $("#submit-button").click(function () {
        // check it has the submit-button class (this means that form is valid)
        if($("#submit-button").hasClass("submit-button")) {
            $("#submit-button").text("Submission Received!")
        }

        // reset it
        setInterval(function() {
            $("#submit-button").text("Submit")
        }, 1000)
    }) 
})