
// <!--
// Program name: scripts.js
// Author: Matthew Castaneda
// Date created: 3/27/2026
// Date last edited: 3/27/2026
// Version: 1
// Description: the javascript for the index.html for HW2
// !-->

//pattern constants
const namePattern = /^[A-Za-z]{1,30}$/;
const ssnPattern = /^\d{9}$/;
const userPattern = /^[A-Za-z0-9]{3,20}$/;
const zipPattern = /^\d{5}(-\d{4})?$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

// function to load the header and footer html templates
async function load() {

    header.innerHTML = await (await fetch("header.html")).text();
    footer.innerHTML = await (await fetch("footer.html")).text();

    links.textContent = "Today's Date | " + new Date().toLocaleDateString()
}

load();

const form = document.getElementById("registration");
// gives an array like list of all input elements in the form.id = "registration" 
const inputFields = form.getElementsByTagName("input")


function reviewInfo() {
    //function to review information of the form if all fields are filled out.

    if (!validateForm()) return;

    let oldReview = document.querySelector(".review");
    if (oldReview) oldReview.remove();

    let fname = document.getElementById("fname").value.trim();
    let mname = document.getElementById("minitial").value.trim();
    let lname = document.getElementById("lname").value.trim();
    const dateOfBirth = document.getElementById("dateOfBirth").value.trim();
    const ssn = document.getElementById("ssn").value.trim();
    const mainAddress = document.getElementById('addressline1').value.trim();
    const secondAddress = document.getElementById('addressline2').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('stateList').value.trim();
    const zipcode = document.getElementById('zipcode').value.trim();
    const gender = document.querySelector('input[name="gender"]:checked');
    const vacinated = document.querySelector('input[name="vac"]:checked');
    const insurance = document.querySelector('input[name="insurance"]:checked');
    const message = document.getElementById("perMessage").value.trim();
    const checkbox = Array.from(
    document.querySelectorAll('input[name="disease"]:checked')
    ).map(cb => cb.value);
    const slider = document.getElementById("feel").value;
    const emailAddress = document.getElementById("emailAddress").value.trim();
    const username = document.getElementById("usr").value.trim();
    const password1 = document.getElementById("password").value.trim();
    const password2 = document.getElementById("passwordConfirm").value.trim();
    const date = new Date(dateOfBirth);


    let reviewText = document.createElement("div");
    let node = document.createTextNode(''); 
    reviewText.appendChild(node);
    reviewText.className = 'review';
    document.getElementById("reviewSection").style.display = "block";

    reviewText.innerHTML = `
        <h3>Review Information</h3>
        <hr>
        <br>
        <p><strong>Full Name: </strong>${fname} ${mname} ${lname}</p>
        <hr>
        <p><strong>Date of Birth: </strong>${date.toLocaleDateString()}</p>
        <hr>
        <p><strong>SSN: </strong> ********</p>
        <hr>
        <p><strong>Main Addresss: </strong>${mainAddress}</p>
        <hr>
        <p><strong>Secondary Addresss: </strong>${secondAddress}</p>
        <hr>
        <p><strong>City, State, Zipcode: </strong>${city}, ${state}, ${zipcode}</p>
        <hr>
        <p><strong>Email Address: </strong>${emailAddress}</p>
        <hr>
        <p><strong>Personal Statement: </strong>${message}</p>
        <hr>
        <p><strong>Listed Diseases: </strong><${checkbox.join(", ")}/p>
        <hr>
        <p><strong>Gender: </strong>${gender ? gender.value : ''}</p>
        <hr>
        <p><strong>Vaccinated: </strong>${vacinated ? vacinated.value : ''}</p>
        <hr>
        <p><strong>Insurance: </strong>${insurance ? insurance.value : ''}</p>
        <hr>
        <p><strong>Pain level: </strong>${slider}</p>
        <hr>
        <p><strong>Username: </strong>${username}</p>
        <hr>
        <p><strong>Password: </strong> *********</p>
        <hr>

    `;

    let element = document.getElementById("reviewSection");
    element.appendChild(reviewText);
    

}

function errorMessage(message, elemid) {
    //sets the error message beneath a group of fields taking a message and elemid argument

    let errorText = document.createElement("div");
    let node = document.createTextNode(message); 
    errorText.appendChild(node);
    errorText.style.color = 'red';
    errorText.style.marginTop = '10px';
    errorText.className = 'error';

    let element = document.getElementById(elemid);
    element.appendChild(errorText);

}

function clearErrors(err) {
    //clears all error messages to ensure duplicate error messages don't occur
    if (err === 0) {
        let errorList = document.querySelectorAll('.error');
        errorList.forEach(error => {
        error.remove();
    });
    }
    else {
        let container = document.getElementById(err);
        let errors = container.querySelectorAll(".error");
        errors.forEach(error => error.remove());
    }
}

function validateForm()
{
    ////function for validating the whole form on submission
    let valid = true;
    clearErrors(0);

    //form variables
    const fname = document.getElementById("fname").value.trim();
    const mname = document.getElementById("minitial").value.trim();
    const lname = document.getElementById("lname").value.trim();

    const dateOfBirth = document.getElementById("dateOfBirth").value.trim();
    const ssn = document.getElementById("ssn").value.trim();

    const mainAddress = document.getElementById('addressline1').value.trim();
    const secondAddress = document.getElementById('addressline2').value.trim();

    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('stateList').value.trim();
    const zipcode = document.getElementById('zipcode').value.trim();

    const gender = document.querySelector('input[name="gender"]:checked');
    const vacinated = document.querySelector('input[name="vac"]:checked');
    const insurance = document.querySelector('input[name="insurance"]:checked');
    const message = document.getElementById("perMessage").value.trim();
    const checkbox = Array.from(
    document.querySelectorAll('input[name="disease"]:checked')
    ).map(cb => cb.value);
    const slider = document.getElementById("feel");

    const emailAddress = document.getElementById("emailAddress").value.trim();
    const username = document.getElementById("usr").value.trim();
    const password1 = document.getElementById("password").value.trim();
    const password2 = document.getElementById("passwordConfirm").value.trim();

    const date = new Date(dateOfBirth);

    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!namePattern.test(fname) || !namePattern.test(mname) || !namePattern.test(lname))
    {
        errorMessage("Please only use letters for names.", "nameFields");
        valid = false;
    }

    if (isNaN(date.getTime()) || date>today)
    {
        errorMessage("Please enter a valid date", "dateOfBirthField");
        valid = false;
    }

    if (!ssnPattern.test(ssn))
    {
        errorMessage('Please enter a valid SSN', 'ssnField');
        valid = false;
    }

    if (!mainAddress)
    {
        errorMessage('Please enter a valid Main Address.', 'addressLineField1');
        valid = false;
    }

    if (!zipPattern.test(zipcode) || state === '') {
        errorMessage('Please enter a State and use a valid Zipcode', 'cityStateZipFields');
        valid = false;
    }

    if (!emailPattern.test(emailAddress)) {
        errorMessage('Please enter a valid email address', 'emailAddressField');
        valid = false;
    }

    if (!checkbox.length) {
        errorMessage("Please select at least one disease", "checkboxFields");
        valid = false;
    }

    if (!gender || !vacinated || !insurance) {
        errorMessage("Please select a gender, Y/N to vaccine question, and Y/N to Insurance question", "radioButtonFields");
        valid = false;
    }

    if (!userPattern.test(username) || /^[0-9]/.test(username))
    {
        errorMessage("Username can't start with a number, and can only contain letter A-Z, 0-9.", 'usernameField');
        valid = false;
    }

    if (!passPattern.test(password1)) {
        errorMessage("Password must have one lowercase letter, one uppercase letter, one number, one special character (! @ # $ % ^ & *) and be at least 8 characters long", 'passwordField');
        valid = false;
    }

    if (password1 != password2 || !password2)
    {
        errorMessage("Passwords do not match", 'passwordConfirmField');
        valid = false;
    }

    return valid;
}

// function for real time validation of required fields and pattern matching
function validateField() {

    const value = this.value.trim();
    const date = new Date(value);
    const today = new Date()
    const password1 = document.getElementById("password").value.trim();

    if (!(value)) {
        this.style.border = "2px solid red";
        }
    else {
        this.style.border = "";
        }

    if ( (this.id === 'fname' || this.id === 'minitial' || this.id === 'lname') ) {

        clearErrors("nameFields");

        if (!namePattern.test(value)) {
            errorMessage("Please only use letters for names.", "nameFields");
        }
    }

    if (!isNaN(date.getTime())) {
        clearErrors("dateOfBirthField");

        if(!(date <= today)) {
            errorMessage("Please enter a valid date", "dateOfBirthField");
        }
    }

    if (this.id === 'ssn') {
        clearErrors("ssnField");

        if (!ssnPattern.test(value)) {
            errorMessage("Please enter a valid ssn", 'ssnField');
        }
    }

    if (this.id === 'addressline1') {
        clearErrors("addressLineField1");
        
        if (!(value != '')) {
            errorMessage("Please enter a valid address", 'addressLineField1');
        }
    }

    if ((this.id === 'stateList') || (this.id === 'zipcode')) {
        clearErrors('cityStateZipFields');

        if (value === '' || !zipPattern.test(value)) {
            errorMessage('Please enter a city, state, and zipcode', 'cityStateZipFields');
        }
    }

    if(this.id === 'emailAddress') {
        clearErrors('emailAddressField');

        if (!emailPattern.test(value)) {
            errorMessage('Please enter a valid email address', 'emailAddressField');
        }
    }

    if (this.type === 'checkbox') {
        clearErrors('checkboxFields');
    }

    if (this.type === 'radio') {
        clearErrors('radioButtonFields')
    }

    if(this.id === 'usr') {
        clearErrors('usernameField');

        if (!userPattern.test(value) || /^[0-9]/.test(value)) {
            errorMessage("Username can't start with a number, and can only contain letter A-Z, 0-9.", 'usernameField');
        }
    }

    if(this.id === 'password') {
        clearErrors('passwordField');

        if (!passPattern.test(value)) {
            errorMessage("Password must have one lowercase letter, one uppercase letter, one number, one special character (! @ # $ % ^ & *) and be at least 8 characters long", 'passwordField');
        }
    }
    
    if(this.id === 'passwordConfirm') {
        clearErrors('passwordConfirmField');

        if (!(value === password1)) {
            errorMessage("Passwords do not match", 'passwordConfirmField');
        }
    }
    
}

// for loop to assign event listeners for real time error checking
// for input fields. Call validateField function using i as the input

for (let i=0; i<inputFields.length; i++) {

    if (inputFields[i].type === "submit" ||
        inputFields[i].type === "reset" ||
        inputFields[i].id === "addressline2") {
        continue;
    }

    inputFields[i].addEventListener("input", validateField);
    inputFields[i].addEventListener("blur", validateField);

}

//some additional event listeners validateField calls
document.getElementById('stateList').addEventListener("input", validateField);
document.getElementById('stateList').addEventListener("blur", validateField);

//slider event listener
document.getElementById('feel').addEventListener("input", function () {
    document.getElementById('rangeVal').textContent = this.value;
});


/////////////////////////

// event listener to validate the whole form
form.addEventListener("submit", function(event)
{
    if (!validateForm())
        event.preventDefault();
});

// event listener to reset form
form.addEventListener("reset", function() {
    for( let i=0; i<inputFields.length; i++ ) {
        inputFields[i].style.border = "";
    }
    clearErrors(0);
});

// event listener to review form
document.getElementById("review").addEventListener("click", reviewInfo);





