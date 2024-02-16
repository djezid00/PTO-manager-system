/* const logoutBtn = document.getElementById("logoutBtn");
console.log(logoutBtn);
logoutBtn.addEventListener("click", deleteAllCookies);

// Function to delete all cookies

function deleteAllCookies() {
  //show modal (add confirmation window (if true =>  delete; else do nothing (exit modal)))------to implement!!!!!
  const modal = document.getElementById("logoutModal");
  const modalContent = document.querySelector(".modal-content");
  const farewellModal = document.getElementById("farewell");
  const logotuBtns = document.querySelector(".logotuBtns");
  const closeBtn = document.querySelector(".close-button");

  modal.classList.add("show");

  const yesBtn = document.getElementById("yesLogOut");
  const noBtn = document.getElementById("noLogOut");

  if (yesBtn) {
    yesBtn.addEventListener("click", actualDelete);
  } else {
    noBtn.addEventListener("click", abortFn);
  }

  logotuBtns.classList.add("show");
  // modal.classList.add("show");


 /*  closeBtn.onclick = function () {
    modal.style.display = "none";
  }; */

/* //anywhere on widndow exit
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  //~~~~~~~~~~~~~~~~~~~~~yes function~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  //~~~~~~~~~~~~~~~~~~~~~~~actual delete of cookies~~~~~~~
  function actualDelete() {
    // Split document.cookie string into individual cookie "key=value" pairs
    const cookies = document.cookie.split(";");
    // Loop through each cookie pair
    cookies.forEach((cookie) => {
      const cookiePair = cookie.trim().split("="); // Split each pair into name and value
      const cookieName = cookiePair[0]; // Get the cookie name
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`; // Delete the cookie
    });

    // First, hide the modal
    modalContent.classList.remove("show");
    modal.classList.remove("show");
    modal.classList.add("hide");

    // Then, show the farewellModal
    farewellModal.classList.remove("hide");
    farewellModal.classList.add("show");

    //if modal is shown (logout is successfull), go to the sign in / register page
    if (modal) {
      setTimeout(() => {
        window.location.href = "..//LOG_REG.html"; //reload is test, actual redirect to be implemented
      }, 1500);
    }
  }

  //~~~~~~~~~~~~~~no function~~~~~~~~~~~~~~~~
  function abortFn() {
    //close button exit
   
    modal.classList.add('hide');
    //  modal.style.display = "none";
    //console.log(logoutBtn);
  }
}
 
 */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//cookie test only function
/* setTimeout(() => {
  document.cookie = "name = david";
  document.cookie = "surname = jez";
}, 2000); */
// Event listener setup
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", deleteAllCookies);

// Function to handle logout action
function deleteAllCookies() {
  // Retrieve modal elements and necessary buttons from the DOM
  const modal = document.getElementById("logoutModal");
  const modalContent = document.querySelector(".modal-content");
  const farewellModal = document.getElementById("farewell");
  const logotuBtns = document.querySelector(".logotuBtns");

  // Add "show" class to modal to display it
  modal.classList.add("show");

  // Attach event listener to the "Yes" button for confirming logout
  const yesBtn = document.getElementById("yesLogOut");
  yesBtn.addEventListener("click", confirmDelete);

  // Attach event listener to the "No" button for cancelling logout
  const noBtn = document.getElementById("noLogOut");
  noBtn.addEventListener("click", cancelDelete);

  // Add event listener to close the modal if user clicks outside it
  /*  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }; */

  // Function to confirm logout and delete cookies
  function confirmDelete() {
    // Delete cookies
    // Code for deleting cookies...
    // Split document.cookie string into individual cookie "key=value" pairs
    const cookies = document.cookie.split(";");
    // Loop through each cookie pair
    cookies.forEach((cookie) => {
      const cookiePair = cookie.trim().split("="); // Split each pair into name and value
      const cookieName = cookiePair[0]; // Get the cookie name
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/PTOmanager;`; // Delete the cookie from current page
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`; // Delete the cookie from prev page

      // Perform actions after deleting each cookie
      // For example, you can display a message after each deletion
      console.log(`Deleted cookie: ${cookieName}`);
    });

    // Hide the modal and show farewell message
    hideModal();
    showFarewellModal();

    // Redirect to sign in / register page after a delay
    setTimeout(() => {
       window.location.href = "../LOG_REG.html";
      // window.location.reload();
    }, 1500);
  }

  // Function to cancel logout
  function cancelDelete() {
    // Hide the modal
    hideModal();
  }

  // Function to hide the modal
  function hideModal() {
    modalContent.classList.remove("show");
    modal.classList.remove("show");
    modal.classList.add("hide");
  }

  // Function to show the farewell message
  function showFarewellModal() {
    farewellModal.classList.remove("hide");
    farewellModal.classList.add("show");
  }
}

// AddPTO and displayPTO functions remain unchanged

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Array to store added PTO
var ptoList = [];

// Function to add PTO for an employee
function addPTO() {
  var startDate = document.getElementById("startDate").value;
  var endDate = document.getElementById("endDate").value;

  // Create an object to store PTO information
  var pto = {
    startDate: startDate,
    endDate: endDate,
  };

  // Add the PTO to the list
  ptoList.push(pto);

  // Display added PTO
  displayPTO();

  // Clear input fields after adding PTO
  document.getElementById("startDate").value = "";
  document.getElementById("endDate").value = "";
}

// Function to display added PTO
function displayPTO() {
  var ptoListSection = document.getElementById("ptoList");
  ptoListSection.innerHTML = ""; // Clear previous content

  // Iterate through the PTO list and display each PTO
  ptoList.forEach(function (pto, index) {
    var ptoItem = document.createElement("div");
    ptoItem.textContent =
      "PTO " + (index + 1) + ": " + pto.startDate + " to " + pto.endDate;
    ptoListSection.appendChild(ptoItem);
  });
}
