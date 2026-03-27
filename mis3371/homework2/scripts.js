
// <!--
// Program name: scripts.js
// Author: Matthew Castaneda
// Date created: 3/27/2026
// Date last edited: 3/27/2026
// Version: 1
// Description: the javascript for the index.html for HW2
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

// gives an array like list of all input elements in the form.id = "registration" 
const inputFields = form.getElementsByTagName("input")


function reviewInfo() {
    //function to review information of the form if all fields are filled out.

    if (!validateForm()) return;

    const oldReview = document.querySelector(".review");
    if (oldReview) oldReview.remove();

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


    const reviewText = document.createElement("div");
    const node = document.createTextNode(''); 
    reviewText.appendChild(node);
    reviewText.className = 'review';
    document.getElementById("reviewSection").style.display = "block";

    reviewText.innerHTML = `
        <h3>Review Information</h3>
        <hr>
        <br>
        <p><strong>Full Name: </strong>${fname} ${mname} ${lname}</p>
        <hr>
        <p><strong>Date of Birth: </strong>${date.today}</p>
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
        <p><strong>Listed Diseases: </strong><${checkbox}/p>
        <hr>
        <p><strong>Gender: </strong>${gender}</p>
        <hr>
        <p><strong>Vaccinated: </strong>${vacinated}</p>
        <hr>
        <p><strong>Insurance: </strong>${insurance}</p>
        <hr>
        <p><strong>Username: </strong>${username}</p>
        <hr>
        <p><strong>Password: </strong> *********</p>
        <hr>

    `;

    const element = document.getElementById("reviewSection");
    element.appendChild(reviewText);
    

}

function errorMessage(message, elemid) {
    //sets the error message beneath a group of fields taking a message and elemid argument

    const errorText = document.createElement("div");
    const node = document.createTextNode(message); 
    errorText.appendChild(node);
    errorText.style.color = 'red';
    errorText.style.marginTop = '10px';
    errorText.className = 'error';

    const element = document.getElementById(elemid);
    element.appendChild(errorText);

}

function clearErrors(arg) {
    //clears all error messages to ensure duplicate error messages don't occur
    if (arg === 0) {
        const errorList = document.querySelectorAll('.error');
        errorList.forEach(error => {
        error.remove();
    });
    }
    else {
        const container = document.getElementById(arg);
        const errors = container.querySelectorAll(".error");
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

    const namePattern = /^[A-Za-z]{1,30}$/;
    const ssnPattern = /^\d{9}$/;
    const userPattern = /^[A-Za-z0-9]{3,20}$/;
    const zipPattern = /^\d{5}(-\d{4})?$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/; 
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // const error = document.getElementById('fnameerror')
    // if (error)
    //     error.remove();

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

    if (mainAddress === '' )
    {
        errorMessage('Please enter a valid Main Address', 'addressLineField1');
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

    if (checkbox.length === 0) {
        errorMessage("Please select at least one disease", "checkboxFields");
        valid = false;
    }

    if (!gender || !vacinated || !insurance) {
        errorMessage("Please select a gender, Y/N to vaccine question, and Y/N to Insurance question", "radioButtonFields");
        valid = false;
    }

    if (!userPattern.test(username))
    {
        errorMessage("Username can only contain letter A-Z, 0-9, and be between 3-20 characters", 'usernameField');
        valid = false;
    }

    if (!passPattern.test(password1)) {
        errorMessage("Password must have one lowercase letter, one uppercase letter, one number, one special character (! @ # $ % ^ & *) and be at least 8 characters long", 'passwordField');
        valid = false;
    }

    if (password1 != password2)
    {
        errorMessage("Passwords do not match", 'passwordConfirmField');
        valid = false;
    }

    return valid;
}

// function for real time validation of required fields and pattern matching
function validateField() {
    const namePattern = /^[A-Za-z]{1,30}$/;
    const ssnPattern = /^\d{9}$/;
    const userPattern = /^[A-Za-z0-9]{3,20}$/;
    const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/; 

    const value = this.value.trim();
    const date = new Date(value);
    const today = new Date()
    const password1 = document.getElementById("password").value.trim();

    if (value === "") {
        this.style.border = "2px solid red";
        }
    else {
        this.style.border = "";
        }

    if ( (this.id === 'fname' || this.id === 'minitial' || this.id === 'lname') 
          && namePattern.test(value)) {

        clearErrors("nameFields");
    }

    if (!isNaN(date.getTime()) && date <= today) {
        clearErrors("dateOfBirthField");
    }

    if (this.id === 'ssn' && ssnPattern.test(value)) {
        clearErrors("ssnField");
    }

    if (this.id === 'addressline1' && value != '') {
        clearErrors("addressLineField1");       
    }

    if ((this.id === 'stateList' && value != '') || (this.id === 'zipcode' && zipPattern.test(value))) {
        clearErrors('cityStateZipFields');
    }

    if(this.id === 'emailAddress' && emailPattern.test(value))
        clearErrors('emailAddressField');

    if (this.type === 'checkbox') {
        clearErrors('checkboxFields');
    }

    if (this.type === 'radio') {
        clearErrors('radioButtonFields')
    }

    if(this.id === 'usr' && userPattern.test(value)) {
        clearErrors('usernameField');
    }

    if(this.id === 'password' && passPattern.test(value)) {
        clearErrors('passwordField');
    }
    
    if(this.id === 'passwordConfirm' && value === password1) {
        clearErrors('passwordConfirmField');
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

document.getElementById('stateList').addEventListener("input", validateField);
document.getElementById('stateList').addEventListener("blur", validateField);


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





