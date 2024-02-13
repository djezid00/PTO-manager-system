//page animation
const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~1
const form = document.getElementById("regForm");
const username = document.getElementById("regName");
const email = document.getElementById("regMail");
const password = document.getElementById("regPass");
const password2 = document.getElementById("regPass2");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validateInputs()) {
    console.log(validateInputs);
    showModal();
  }
//   validateInputs();
  
});

const setError = (element, message) => {
    let isValid = true;
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
  isValid=false;
  return isValid;
  
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
  isValid=true;
  return isValid;
};

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
    let isValid ;
  const usernameValue = username.value.trim(); //trim is used to avoid whitespace
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();

  if (usernameValue === "") {
    setError(username, "Username is required");
    
  } else {
    setSuccess(username);
    
  }

  if (emailValue === "") {
    setError(email, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Provide a valid email address");
  } else {
    setSuccess(email);
  }

  // if(passwordValue === '') {
  //     setError(password, 'Password is required');
  // } else if (passwordValue.length < 8 ) {
  //     setError(password, 'Password must be at least 8 character.')
  // } else {
  //     setSuccess(password);
  // }

  if (passwordValue === "") {
    setError(password, "Password is required");
  } else if (passwordValue.length < 8) {
    setError(password, "Password must be at least 8 characters.");
  } else if (!/[A-Z]/.test(passwordValue)) {
    setError(password, "Password must contain at least one uppercase letter.");
  } else if (!/[a-z]/.test(passwordValue)) {
    setError(password, "Password must contain at least one lowercase letter.");
  } else if (!/\d/.test(passwordValue)) {
    setError(password, "Password must contain at least one numeric digit.");
  } else if (!/[!@#$%^&*]/.test(passwordValue)) {
    setError(password, "Password must contain at least one special character.");
  } else {
    setSuccess(password);
  }

  if (password2Value === "") {
    setError(password2, "Please confirm your password");
  } else if (password2Value !== passwordValue) {
    setError(password2, "Passwords doesn't match");
  } else {
    setSuccess(password2);
  }


  document.querySelectorAll('.input-control').forEach((control) => {
    if (control.classList.contains('error')) {
        isValid = false;
    }
    else{
        isValid = true;
    }
});
console.log(isValid);
return isValid;
};

//TOOGLE VISIBILITY FOR BOTH PASSWORD AND REPEAT PASSWORD
const togglePassword = document.querySelector(".password-toggle-icon i");

togglePassword.addEventListener("click", function () {
  if (password.type === "password") {
    password.type = "text";
    togglePassword.classList.remove("fa-eye");
    togglePassword.classList.add("fa-eye-slash");
  } else {
    password.type = "password";
    togglePassword.classList.remove("fa-eye-slash");
    togglePassword.classList.add("fa-eye");
  }
});

const togglePassword2 = document.querySelector(".password-toggle-icon2 i");

togglePassword2.addEventListener("click", function () {
  if (password2.type === "password") {
    password2.type = "text";
    togglePassword2.classList.remove("fa-eye");
    togglePassword2.classList.add("fa-eye-slash");
  } else {
    password2.type = "password";
    togglePassword2.classList.remove("fa-eye-slash");
    togglePassword2.classList.add("fa-eye");
  }
});

function showModal() {
  const modal = document.getElementById("successModal");
  modal.style.display = "block";

  const closeBtn = document.querySelector(".close-button");
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}
