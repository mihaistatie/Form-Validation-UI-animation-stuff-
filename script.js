const body = document.getElementsByTagName('BODY')[0];
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', e => {
    e.preventDefault();

    checkInputs();
});
function checkInputs() {
    // trim to remove the whitespaces
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if (usernameValue === '') {
        setErrorFor(username, 'Username cannot be blank');
        username.style.animation = 'shake 0.5s ease';
        body.style.animation = 'colorChange 1s ease';
    } else if (usernameValue.length < 6) {
        setErrorFor(username, 'Username must have 6 characters');
        username.style.animation = 'shake 0.5s ease';
        body.style.animation = 'colorChange 1s ease';
    }
    else {
        setSuccessFor(username);
    }

    //conditional for the email 
    if (emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
        body.style.animation = 'colorChange 1s ease';
        email.style.animation = 'shake 0.5s ease';
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email');
        body.style.animation = 'colorChange 1s ease';
        email.style.animation = 'shake 0.5s ease';
    } else {
        setSuccessFor(email);
    }

    //conditional for the password
    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
        body.style.animation = 'colorChange 1s ease';
        password.style.animation = 'shake 0.5s ease';
    } else if (!specialPassword(passwordValue)) {
        setErrorFor(password, 'at least: 1 number, 1 special character, 1 Uppercase');
        body.style.animation = 'colorChange 1s ease';
        password.style.animation = 'shake 0.5s ease';
    } else {
        setSuccessFor(password);
    }

    if (password2Value === '') {
        setErrorFor(password2, 'Password2 cannot be blank');
        body.style.animation = 'colorChange 1s ease';
        password2.style.animation = 'shake 0.5s ease';
    } else if (passwordValue !== password2Value) {
        setErrorFor(password2, 'Passwords does not match');
        body.style.animation = 'colorChange 1s ease';
        password2.style.animation = 'shake 0.5s ease';
    } else {
        setSuccessFor(password2);
    }

    //repeat animation 
    username.addEventListener('animationend', () => {
        username.style.animation = '';
        body.style.animation = 'colorChange 1s ease';
    });
    email.addEventListener('animationend', () => {
        email.style.animation = '';
    });
    password.addEventListener('animationend', () => {
        password.style.animation = '';
    });
    password2.addEventListener('animationend', () => {
        password2.style.animation = '';
    });
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}
//regeex for email
function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
//regeex for password atelast: 1 Uppercase 1 Special Character 1 Number  Charactares between 8-18 characters 
function specialPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,18}$/.test(password);
}
