//Page animation start
const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

// event listener for registering button
registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

// Event listener for login button
loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

//page animation end

//Sign up form JS logic start
const form = document.getElementById("regForm");
const username = document.getElementById("regName");
const email = document.getElementById("regMail");
const password = document.getElementById("regPass");
const password2 = document.getElementById("regPass2");
const signPassword = document.getElementById("inPass");

// Event listener for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validate inputs and show modal if valid
  const isValid = validateInputs();

  if (isValid) {
    showModal();
  }
});

// Function to set error message for input element
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

// Function to set success state for input element
const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};
// Function to validate email format
const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
// Function to validate all form inputs
const validateInputs = () => {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();

  let isValid = true;

  //missing username
  if (usernameValue === "") {
    setError(username, "Username is required");
    isValid = false;
  } else {
    setSuccess(username);
  }
//email validation 
  if (emailValue === "") {
    setError(email, "Email is required");
    isValid = false;
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Provide a valid email address");
    isValid = false;
  } else if (emailValue === getEmailFromCookie()) {
    setError(email, "Email is already in use");
    isValid = false;
  } else {
    setSuccess(email);
  }

  //password validation 
  if (passwordValue === "") {
    setError(password, "Password is required");
    isValid = false;
  } else if (passwordValue.length < 8) {
    setError(password, "Password must be at least 8 characters.");
    isValid = false;
  } else if (!/[A-Z]/.test(passwordValue)) {
    setError(password, "Password must contain at least one uppercase letter.");
    isValid = false;
  } else if (!/[a-z]/.test(passwordValue)) {
    setError(password, "Password must contain at least one lowercase letter.");
    isValid = false;
  } else if (!/\d/.test(passwordValue)) {
    setError(password, "Password must contain at least one numeric digit.");
    isValid = false;
  } else if (!/[!@#$%^&*]/.test(passwordValue)) {
    setError(password, "Password must contain at least one special character.");
    isValid = false;
  } else {
    setSuccess(password);
  }

  //repeated password validation
  if (password2Value === "") {
    setError(password2, "Please confirm your password");
    isValid = false;
  } else if (password2Value !== passwordValue) {
    setError(password2, "Passwords don't match");
    isValid = false;
  } else {
    setSuccess(password2);
  }

  return isValid;
};

//password toogle logic start
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

const togglePassword3 = document.querySelector(".password-toggle-icon3 i");

togglePassword3.addEventListener("click", function () {
  if (signPassword.type === "password") {
    signPassword.type = "text";
    togglePassword3.classList.remove("fa-eye");
    togglePassword3.classList.add("fa-eye-slash");
  } else {
    signPassword.type = "password";
    togglePassword3.classList.remove("fa-eye-slash");
    togglePassword3.classList.add("fa-eye");
  }
});
//password toogle logic end

// Function to show success modal and store form data in cookies
function showModal() {
  const modal = document.getElementById("successModal");
  modal.style.display = "block";

  const nameValue = username.value;
  const mailValue = email.value;
  const passwordValue = password.value;

  document.cookie = `name = ${nameValue}`;
  document.cookie = `email = ${mailValue}`;
  document.cookie = `password = ${passwordValue}`;

  const closeBtn = document.querySelector(".close-button");
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  //if modal is shown (submit is successfull), reload the page so the user can log in with newly created account
  if (modal) {
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  }
}

//function for retrieveng email from cookie (simulating already used mail) so the user can't use used mail for registration
function getEmailFromCookie() {
  const cookieName = "email=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }

  return null;
}

//sign in process

const inForm = document.getElementById("inForm");

const cookieMail = getEmailFromCookie();
const cookiePassword = getPassFromCookie();
/* console.log("cookie mail", cookieMail);
console.log("cookie pass", cookiePassword); */

inForm.addEventListener("submit", (e) => {
  e.preventDefault();

  signInFunction();
});

//retrieveng password from cookie for comparision of input password 
function getPassFromCookie() {
  const cookieName = "password=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }

  return null;
}

function signInFunction() {
  const inMail = document.getElementById("inMail").value;
  const inPass = document.getElementById("inPass").value;
  console.log(inMail);
  console.log(inPass);

  if (cookieMail === inMail && cookiePassword === inPass) {
    showLogModal();
  } else {
    document.querySelector(".badSignClass").style.display = "block";
  }
}

function showLogModal() {
  const modal = document.getElementById("logModal");
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

  //if modal is shown (log in is successfull), go to the main PTO page
  if (modal) {
    setTimeout(() => {
      window.location.href = "./pto_manager.html";
    }, 1500);
  }
}
