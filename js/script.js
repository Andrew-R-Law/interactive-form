

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
    const otherOption = '';
    if (e.target.value === 'other') {
        otherJobText.style.display = '';
    } else {
        otherJobText.style.display = 'none';
    }
});