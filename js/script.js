

//Focuses the name field's text area when page is first loaded.
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


//Listens for a change on the design selector field. When user selects design, color selector becomes available and hidden option text changes to 'Choose a color'.
//When user changes design on design selector, all options are unselected.
//If 'js puns' design is selected, relevant colors are displayed (and others hidden) as options.
//If 'heart js' design is selected, relevant colors are displayed (and others hidden) as options.

designSelector.addEventListener('change', (e) => {
    colorSelector.disabled = false;
    for(i = 0; i < colorSelector.options.length; i++){
        colorSelector.options[i].selected = false;
        if (e.target.value === 'js puns') {
            jsPunOptions.forEach(option => option.selected = true);
            jsPunOptions.forEach(option => option.style.display = '');
            jsHeartOptions.forEach(option => option.style.display = 'none');
        } else if (e.target.value === 'heart js'){
            jsHeartOptions.forEach(option => option.selected = true);
            jsPunOptions.forEach(option => option.style.display = 'none');
            jsHeartOptions.forEach(option => option.style.display = '');
        }
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

//For accessibility: loops over the checkboxes in 'Activities' and listens for two events. If the checkbox is focused,
//it's parent element receives classname of 'focus'; if it is blurred, the parentElement has no class name.
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

/********Validation functions incoming *******/

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

//Helper function for validating number of activities is greater than 0.

function activitiesValidator () {
    const numOfActivitiesIsValid = totalCost > 0;
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

/*Master validator function that accepts a validator function, an element, and an event as parameters.
If the passed-in function returns false, the default behavior on the event is prevented,
the parent element receives the class 'not-valid', and loses the class 'valid', and the
last parent element's last child--the hidden hint--loses the class 'hint'.
*/

function masterValidator (validator, element, event) {
    if (!validator()) {
        event.preventDefault();
        element.parentElement.classList.add('not-valid');
        element.parentElement.classList.remove('valid');
        element.parentElement.lastElementChild.classList.remove('hint');
    } else {
        element.parentElement.classList.add('valid');
        element.parentElement.classList.remove('not-valid');
        element.parentElement.lastElementChild.classList.add('hint');
    }
}

//Submit handler that calls the masterValidator, passing in the all of the helper functions above with the relevant element.

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    masterValidator(nameValidator, nameElement, e);
    masterValidator(emailValidator, emailElement, e);
    masterValidator(activitiesValidator, activities.firstElementChild, e);
    if (creditCardInfo.style.display === '') {
        masterValidator(ccNumValidator, ccNumberElement, e);
        masterValidator(zipValidator, ccZipElement, e);
        masterValidator(cvvValidator, ccCVVElement, e);
    }
});








