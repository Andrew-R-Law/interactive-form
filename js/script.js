

//Sets name field's focus property to 'true' when page is first loaded.
const nameText = document.getElementById('name');
nameText.focus();

//Hides 'Other Job Role' text area when page is first loaded.
const otherJobText = document.getElementById('other-job-role');
otherJobText.style.display = 'none';

//Listens for a change on the 'select job role' field.
//If user selects 'other', the 'Other Job Role' text area appears.
//If user selects anything else, 'Other Job Role' text area stays/becomes hidden.

const jobTitle = document.getElementById('title');

jobTitle.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherJobText.style.display = '';
    } else {
        otherJobText.style.display = 'none';
    }
});

//Sets the selector button for t-shirt color to disabled when page is loaded.

const colorSelector = document.getElementById('color');
colorSelector.disabled = true;

//Assigns constants to the design selector field as well as the color options available for 'js puns' and 'heart js', respectively.
const designSelector = document.getElementById('design');
const jsPunOptions = document.querySelectorAll('[data-theme = "js puns"]');
const jsHeartOptions = document.querySelectorAll('[data-theme = "heart js"]');


//Listens for a change on the design selector field. When user selects design, color selector becomes available.
//When user changes design on design selector, all options are unselected.
//If 'js puns' design is selected, relevant colors are displayed (and others hidden) as options.
//If 'heart js' design is selected, relevant colors are displayed (and others hidden) as options.

designSelector.addEventListener('change', (e) => {
    colorSelector.disabled = false;
    for(i = 0; i < colorSelector.options.length; i++){
        colorSelector.options[i].selected = false;
    }
    if (e.target.value === 'js puns') {
        jsPunOptions.forEach(option => option.style.display = '');
        jsHeartOptions.forEach(option => option.style.display = 'none');
    } else if (e.target.value === 'heart js'){
        jsPunOptions.forEach(option => option.style.display = 'none');
        jsHeartOptions.forEach(option => option.style.display = '');
    }
});

//Listens for a change in the 'Register for activities' section.
//If a box is checked, the data-cost for that box is added to the variable 'totalCost.'
//If a box is unchecked, the data-cost for that box is subtracted to the variable 'totalCost.'
//The inner text for the total cost element is updated to reflect the totalCost variable.

const activities = document.getElementById('activities');
let totalCost = 0;
activities.addEventListener('change', (e) => {
    const totalDisplay = document.getElementById('activities-cost');
    if (e.target.checked) {
        totalCost += parseInt(e.target.dataset.cost);
    } else {
        totalCost -= parseInt(e.target.dataset.cost);
    }
    totalDisplay.innerText = `Total: $${totalCost}`;
});

//Step 7

//Sets credit card option as selected when first loaded
const creditCardOption = document.querySelector('[value = "credit-card"]');
creditCardOption.selected = true;


//Hides paypal and bitcoin information when first loaded.
const creditCardInfo = document.getElementById('credit-card');
const paypalInfo = document.getElementById('paypal');
const bitcoinInfo = document.getElementById('bitcoin');

paypalInfo.style.display = 'none';
bitcoinInfo.style.display = 'none';

//When a user makes a change to payment method, credit card, paypal, and bitcoin information are all hidden
//Then, the selected information becomes available.

const paymentMethod = document.getElementById('payment');
paymentMethod.addEventListener('change', (e) => {
    creditCardInfo.style.display = 'none';
    paypalInfo.style.display = 'none';
    bitcoinInfo.style.display = 'none';
    if (e.target.value === 'credit-card') {
        creditCardInfo.style.display = '';
    } else if (e.target.value === 'paypal') {
        paypalInfo.style.display = '';
    } else {
        bitcoinInfo.style.display = '';
    }
});

//Step 8

//Helper function for validating name field.
const nameElement = document.getElementById('name');
function nameValidator () {
    const nameInput = nameElement.value;
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameInput);
    return nameIsValid;
}

//Helper function for validating email field.
const emailElement = document.getElementById('email');
function emailValidator () {
    const emailInput = emailElement.value;
    const emailIsValid = /^[^@]+@[^@.]+\.com$/i.test(emailInput);
    return emailIsValid;
}

//Helper function for validating number of activities
let numOfActivities = 0;
activities.addEventListener('change', (e) => {
    if (e.target.checked) {
        numOfActivities++;
    } else {
        numOfActivities--;
    }
});

function activitiesValidator () {
    const numOfActivitiesIsValid = numOfActivities > 0;
    return numOfActivitiesIsValid;
}

//Helper functions for validating credit card information.
const ccNumberElement = document.getElementById('cc-num');
const ccZipElement = document.getElementById('zip');
const ccCVVElement = document.getElementById('cvv');

function ccNumValidator () {
    const numberInput = ccNumberElement.value;
    const numberIsValid = /^\d{13,16}$/.test(numberInput);    
    return numberIsValid;
}

function zipValidator () {
    const zipInput = ccZipElement.value;
    const zipIsValid = /^\d{5}$/.test(zipInput);
    return zipIsValid;
}

function cvvValidator () {
    const cvvInput = ccCVVElement.value;
    const cvvIsValid = /^\d{3}$/.test(cvvInput);
    return cvvIsValid;
}

//Submit handler

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    if (!nameValidator()){
        e.preventDefault();
        nameElement.parentElement.classList.add('not-valid');
        nameElement.parentElement.classList.remove('valid');
        nameElement.parentElement.lastElementChild.classList.remove('hint');
    } else {
        nameElement.parentElement.classList.add('valid');
        nameElement.parentElement.classList.remove('not-valid');
        nameElement.parentElement.lastElementChild.classList.add('hint');
    }
    if (!emailValidator()){
        e.preventDefault();
        emailElement.parentElement.classList.add('not-valid');
        emailElement.parentElement.classList.remove('valid');
        emailElement.parentElement.lastElementChild.classList.remove('hint');
    } else {
        emailElement.parentElement.classList.add('valid');
        emailElement.parentElement.classList.remove('not-valid');
        emailElement.parentElement.lastElementChild.classList.add('hint');
    }
    if (!activitiesValidator()){
        e.preventDefault();
        activities.classList.add('not-valid');
        activities.classList.remove('valid');
        activities.lastElementChild.classList.remove('hint');
    } else {
        activities.classList.add('valid');
        activities.classList.remove('not-valid');
        activities.lastElementChild.classList.add('hint');
    }
    if (creditCardInfo.style.display === '') {
        if (!ccNumValidator()) {
            e.preventDefault();
            ccNumberElement.parentElement.classList.add('not-valid');
            ccNumberElement.parentElement.classList.remove('valid');
            ccNumberElement.parentElement.lastElementChild.classList.remove('hint');
        } else {
            ccNumberElement.parentElement.classList.add('valid');
            ccNumberElement.parentElement.classList.remove('not-valid');
            ccNumberElement.parentElement.lastElementChild.classList.add('hint');
        }
        if (!zipValidator()) {
            e.preventDefault();
            ccZipElement.parentElement.classList.add('not-valid');
            ccZipElement.parentElement.classList.remove('valid');
            ccZipElement.parentElement.lastElementChild.classList.remove('hint');
        } else {
            ccZipElement.parentElement.classList.add('valid');
            ccZipElement.parentElement.classList.remove('not-valid');
            ccZipElement.parentElement.lastElementChild.classList.add('hint');
        }
        if (!cvvValidator()) {
            e.preventDefault();
            ccCVVElement.parentElement.classList.add('not-valid');
            ccCVVElement.parentElement.classList.remove('valid');
            ccCVVElement.parentElement.lastElementChild.classList.remove('hint');
        } else {
            ccCVVElement.parentElement.classList.add('valid');
            ccCVVElement.parentElement.classList.remove('not-valid');
            ccCVVElement.parentElement.lastElementChild.classList.add('hint');
        }
    }
});

//Step 9
const activityBoxes = document.querySelectorAll('[type = "checkbox"]');

for (i =0; i < activityBoxes.length; i++){
    let focusedActivity = activityBoxes[i];
    focusedActivity.addEventListener('focus', () => {
        focusedActivity.parentElement.className = 'focus';
    });
    focusedActivity.addEventListener('blur', () => {
        focusedActivity.parentElement.className = '';
    });
}





