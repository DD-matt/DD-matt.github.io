
// <!--
// Program name: scripts.js
// Author: Matthew Castaneda
// Date created: 2/5/2026
// Date last edited: 2/27/2026
// Version: 1.3
// Description: the javascript for the index.html for HW1
// !-->

// function to load the header and footer html templates
async function load() {

    header.innerHTML = await (await fetch("header.html")).text();
    footer.innerHTML = await (await fetch("footer.html")).text();

    links.textContent =
        "Today's Date | " + new Date().toLocaleDateString()
}

load();


const form = document.getElementById("registration");

//function for validating the form using javascript when needed
function validateForm()
{
    let valid = true;

    const dateOfBirth = document.getElementById("dateOfBirth").value.trim();
    const ssn = document.getElementById("ssn").value.trim();

    const emailAddress = document.getElementById("emailAddress").value.trim();
    const username = document.getElementById("usr").value.trim();
    const password1 = document.getElementById("password").value.trim();
    const password2 = document.getElementById("passwordConfirm").value.trim();
    

    const date = new Date(dateOfBirth);

    const ssnPattern = /^\d{9}$/;
    const userPattern = /^[A-Za-z0-9]{3,20}$/;

    if (isNaN(date))
    {
        alert("Date given not possible");
        valid = false;
    }

    if (!ssnPattern.test(ssn))
    {
        alert("SSN FIELD : No dashes, only numbers, and 9 digits");
        valid = false;
    }

    if (!userPattern.test(username))
    {
        alert("USERNAME FIELD : Name must be 3-20 characters and only have letters and numbers");
        valid = false;
    }

    if (password1 != password2)
    {
        alert("Passwords do not match!");
        valid = false;
    }

    return valid;
}

// event listener when form is submitted colling the validate form function and if any field == false prevents form submission and gives error message.
form.addEventListener("submit", function(event)
{
    if (!validateForm())
        event.preventDefault();
});

