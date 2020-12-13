function Validate() {
  var letters = /^[A-Za-z]+$/;
  var phoneno = /^\d{10}$/;
  let email = document.getElementById("email").value;
  var emailcheck = email.indexOf("@");
  var name = document.getElementById("name");

  var phone = document.getElementById("phone");

  if (emailcheck < 1) {
    document.getElementById("emailerr").innerHTML = "Enter proper mail";
    document.getElementById("email").style.border = "1px solid red";
  } else {
    document.getElementById("emailerr").innerHTML = "";
    document.getElementById("email").style.border = "1px solid green";
  }
  if (name.value == "") {
    document.getElementById("nameerr").innerHTML = "Fill your name Field";
    document.getElementById("name").style.border = "1px solid red";

  } else if (!name.value.match(letters)) {
    alert('Please input alphabet in name field');
    document.getElementById("name").style.border = "1px solid red";
    return false;
  } else {
    document.getElementById("nameerr").innerHTML = "";
    document.getElementById("name").style.border = "1px solid green";

  }
  if (phone.value == "") {
    document.getElementById("phoneerr").innerHTML = "Please fill you Phone Number";
    document.getElementById("phone").style.border = "2px solid red";
  } else if (!phone.value.match(phoneno)) {
    alert('Enter 10 digit number or numeric character only');
    document.getElementById("phone").style.border = "2px solid red";
    return false;
  } else {
    document.getElementById("phoneerr").innerHTML = "";
    document.getElementById("phone").style.border = "1px solid green";

  }
}

function loginValidate() {

  let username = document.getElementById("username");

  var pass = document.getElementById("pass");

  if (username.value == "") {
    document.getElementById("usernameerr").innerHTML = "Fill your name Field";
    document.getElementById("username").style.border = "1px solid red";

  } else {
    document.getElementById("usernameerr").innerHTML = "";
    document.getElementById("username").style.border = "1px solid green";

  }
  if (pass.value == "") {
    document.getElementById("passeerr").innerHTML = "Fill Your Password";
    document.getElementById("pass").style.border = "1px solid red";
  } else {
    document.getElementById("passeerr").innerHTML = "";
    document.getElementById("pass").style.border = "1px solid green";

  }
}





function load_details() {
  let loadmorebtn = document.querySelector('#loadmorebtn');
  loadmorebtn.style.display = 'none';

  let loadmore = document.querySelector('#loadmore');
  loadmore.style.display = 'block';

}


function mainSignup() {

  const form = document.querySelector('#form'),
    modal = document.querySelector('#modal'),
    inputs = form.querySelectorAll('.input'),
    rules = form.querySelectorAll('.rule'),
    errors = form.querySelectorAll('.error');

  const data = {
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  };

  function isInputValid(event) {
    const target = event.target;
    const name = target.name;
    const parent = target.closest('.form__item');
    const value = target.value;
    const error = parent.querySelector('.error');

    if (target.matches('.input-error')) {
      error.classList.remove('show-error');
      target.classList.remove('input-error');
    }

    if (name === 'firstname' || name === 'lastname') {
      isValidName(parent, value, name);
    }

    if (name === 'email') {
      isValidEmail(parent, value);
    }

    if (name === 'password') {
      isValidPassword(parent, value);
    }

    if (name === 'password-check') {
      passwordCheck(parent, value);
    }
  }

  function isValidName(parent, value, name) {
    const rule = parent.querySelector(`.${name}-rule`);

    if (value.length > 0 && !/[0-9]/.test(value)) {
      rule.classList.add('valid');
      data[name] = value.trim();
    } else {
      rule.classList.remove('valid');
      data[name] = '';
    }
  }

  function isValidEmail(parent, value) {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const rule = parent.querySelector('.email-rule');

    if (regex.test(value)) {
      rule.classList.add('valid');
      data.email = value;
    } else {
      rule.classList.remove('valid');
      data.email = '';
    }
  }

  function isValidPassword(parent, value) {
    const capital = parent.querySelector('.capital-rule');
    const special = parent.querySelector('.special-rule');
    const numbers = parent.querySelector('.numbers-rule');
    const char = parent.querySelector('.char-rule');

    if (/[0-9]/.test(value)) {
      numbers.classList.add('valid');
    } else {
      numbers.classList.remove('valid');
    }

    if (/[A-Z]/.test(value)) {
      capital.classList.add('valid');
    } else {
      capital.classList.remove('valid');
    }

    if (/[!@#$%^&*]/.test(value)) {
      special.classList.add('valid');
    } else {
      special.classList.remove('valid');
    }

    if (value.length > 7) {
      char.classList.add('valid');
    } else {
      char.classList.remove('valid');
    }

    if (/[A-Z0-9!@#$%^&*]/.test(value) &&
      value.length > 7) {
      data.password = value;
    }
  }

  function passwordCheck(parent, value) {
    const rule = parent.querySelector('.password-check-rule');

    if (data.password && value === data.password) {
      rule.classList.add('valid');
    } else {
      rule.classList.remove('valid');
    }
  }

  function removeShakeAnimation() {
    rules.forEach(rule => rule.classList.remove('shake'));
    errors.forEach(error => error.classList.remove('shake'));
    inputs.forEach(input => input.classList.remove('shake'));
  }

  inputs.forEach(input => input.addEventListener('input', isInputValid));

  form.addEventListener('submit', e => {
    e.preventDefault();
    const values = Object.values(data);

    if (values.every(Boolean)) {
      inputs.forEach(input => input.value = '');
      rules.forEach(rule => rule.classList.remove('valid'));

    } else {
      rules.forEach(rule => {
        if (!rule.classList.contains('valid')) {
          rule.classList.add('shake');
        }
      });

      inputs.forEach(input => {
        if (input.value === '') {
          const parent = input.closest('.form__item');
          const error = parent.querySelector('.error');

          error.classList.add('show-error', 'shake');
          input.classList.add('input-error', 'shake');
        }
      });

      setTimeout(removeShakeAnimation, 1000);
    }
  });


}