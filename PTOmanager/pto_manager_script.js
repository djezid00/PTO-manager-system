document.addEventListener("DOMContentLoaded", async function () {
  // Event listener setup
  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn.addEventListener("click", deleteAllCookies);

  // Function to handle logout action (not just deletion of cookies as name states)
  function deleteAllCookies() {
    // Retrieve modal elements and necessary buttons from the DOM
    const modal = document.getElementById("logoutModal");
    const modalContent = document.querySelector(".modal-content");
    const farewellModal = document.getElementById("farewell");
    // const logotuBtns = document.querySelector(".logotuBtns");

    // Add "show" class to modal to display it
    modal.classList.add("show");

    // Attach event listener to the "Yes" button for confirming logout
    const yesBtn = document.getElementById("yesLogOut");
    yesBtn.addEventListener("click", confirmDelete);

    // Attach event listener to the "No" button for cancelling logout
    const noBtn = document.getElementById("noLogOut");
    noBtn.addEventListener("click", cancelDelete);

    // Function to confirm logout and delete cookies
    function confirmDelete() {
      // Code for deleting cookies
      const cookies = document.cookie.split(";");
      cookies.forEach((cookie) => {
        const cookiePair = cookie.trim().split("=");
        const cookieName = cookiePair[0]; // Get the cookie name
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/PTOmanager;`; // Delete the cookie from current page
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`; // Delete the cookie from prev page
      });

      // Hide the modal and show farewell message
      hideModal();
      showFarewellModal();

      // Redirect to sign in / register page after a delay
      setTimeout(() => {
        window.location.href = "./LOG_REG.html";
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

  // ~~~~~~~~~~~~~~~~~~~~~AddPTO START~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  function displayPTO(employeeId) {
    const ptoListSection = document.getElementById("ptoList");
    ptoListSection.innerHTML = ""; // Clear previous content

    // Retrieve PTO data from local storage
    const ptoList = JSON.parse(localStorage.getItem("ptoList")) || {};
    if (ptoList[employeeId]) {
      const today = new Date(); // Get today's date
      const ptoListSection = document.getElementById("ptoList");

      // If columns do not exist, create them
      let pastColumn = ptoListSection.querySelector("#pastPtoColumn");
      let currentColumn = ptoListSection.querySelector("#currentPtoColumn");
      let futureColumn = ptoListSection.querySelector("#futurePtoColumn");

      if (!pastColumn) {
        pastColumn = document.createElement("div");
        pastColumn.classList.add("pto-column");
        pastColumn.id = "pastPtoColumn";
        const title = document.createElement("span");
        title.innerText = "PAST PTO";
        pastColumn.appendChild(title);
        ptoListSection.appendChild(pastColumn);
      }

      if (!currentColumn) {
        currentColumn = document.createElement("div");
        currentColumn.classList.add("pto-column");
        currentColumn.id = "currentPtoColumn";
        const title = document.createElement("span");
        title.innerText = "CURRENT PTO";
        currentColumn.appendChild(title);
        ptoListSection.appendChild(currentColumn);
      }

      if (!futureColumn) {
        futureColumn = document.createElement("div");
        futureColumn.classList.add("pto-column");
        futureColumn.id = "futurePtoColumn";
        const title = document.createElement("span");
        title.innerText = "UPCOMING PTO";
        futureColumn.appendChild(title);
        ptoListSection.appendChild(futureColumn);
      }

      ptoList[employeeId].forEach(function (pto, index) {
        const startDate = new Date(pto.startDate);
        const endDate = new Date(pto.endDate);

        // Determine if PTO is past, current, or future
        let ptoStatus = "";
        if (endDate < today) {
          ptoStatus = "Past";
        } else if (startDate <= today && endDate >= today) {
          ptoStatus = "Current";
        } else {
          ptoStatus = "Future";
        }

        const startMonthSeason = startDate.getMonth();
        const startDateNumSeason = startDate.getDate();

        let seasonClass = "";

        // Define season ranges
        if (
          (startMonthSeason === 11 && startDateNumSeason >= 21) || // Winter (from December 21st)
          (startMonthSeason === 0 && startDateNumSeason <= 31) ||
          (startMonthSeason === 1 && startDateNumSeason <= 31) ||
          (startMonthSeason <= 2 && startDateNumSeason <= 20) // Winter (until March 20th)
        ) {
          seasonClass = "winter";
        } else if (
          (startMonthSeason === 2 && startDateNumSeason >= 21) || // Spring (from March 21st)
          (startMonthSeason >= 3 && startMonthSeason <= 5) ||
          (startMonthSeason <= 5 && startDateNumSeason <= 20) // Spring (until June 20th)
        ) {
          seasonClass = "spring";
        } else if (
          (startMonthSeason === 5 && startDateNumSeason >= 21) || // Summer (from June 21st)
          (startMonthSeason >= 6 && startMonthSeason <= 8) ||
          (startMonthSeason <= 8 && startDateNumSeason <= 21) // Summer (until September 21st)
        ) {
          seasonClass = "summer";
        } else if (
          (startMonthSeason === 8 && startDateNumSeason >= 22) || // Autumn (from September 22nd)
          (startMonthSeason >= 9 && startMonthSeason <= 11) ||
          (startMonthSeason <= 11 && startDateNumSeason <= 20) // Autumn (until December 20th)
        ) {
          seasonClass = "autumn";
        }

        // Create a card element for the PTO
        const ptoCard = document.createElement("div");
        ptoCard.classList.add("pto-card");
        if (seasonClass !== "") {
          ptoCard.classList.add(seasonClass);
        }

        // Set time status based on PTO status
        if (ptoStatus === "Past") {
          ptoCard.classList.add("past-pto");
          pastColumn.appendChild(ptoCard);
        } else if (ptoStatus === "Current") {
          ptoCard.classList.add("current-pto");
          currentColumn.appendChild(ptoCard);
        } else {
          ptoCard.classList.add("future-pto");
          futureColumn.appendChild(ptoCard);
        }

        //Add pto start and end date to the image div (PTO)
        const image_text = document.createElement("div");
        image_text.classList.add("image_text");
        image_text.textContent = pto.startDate + " to " + pto.endDate;
        ptoCard.appendChild(image_text);

        // dELETE OF pto
        const deleteIcon = document.createElement("div");
        deleteIcon.classList.add("delete-icon");
        deleteIcon.textContent = "×";
        deleteIcon.addEventListener("click", function () {
          ptoCard.remove();
          // Remove the corresponding PTO data from the ptoList array
          ptoList[employeeId].splice(index, 1);
          // Update the local storage to reflect the changes
          localStorage.setItem("ptoList", JSON.stringify(ptoList));
        });
        ptoCard.appendChild(deleteIcon);
      });
    }
  }

  //Function to add PTO for an employee
  const PTObtn = document.querySelector(".PTObtn");
  PTObtn.addEventListener("click", addPTO);

  function addPTO() {
    const startDate = document.querySelector(".date_space1 #date1");
    const endDate = document.querySelector(".date_space2 #date2");
    //containers of calendars
    const container1 = document.querySelector(".date_space1");
    const container2 = document.querySelector(".date_space2");
    //retrieve values of input dates
    const startDateInput = startDate.value;
    const endDateInput = endDate.value;

    const startDateRealDate = new Date(startDateInput);
    const endDateRealDate = new Date(endDateInput);

    if (startDateRealDate > endDateRealDate) {
      alert("Start date must not be greater than end date");
      //Reset calendar to current date after alert
      resetCalendar1(container1);
      resetCalendar2(container2);
      return;
    }

    // Get the ID of the selected employee
    const selectedEmployeeId = document.querySelector(
      ".employees__names--item.selected"
    ).id;

    // Create an object to store PTO information
    const pto = {
      startDate: startDateInput,
      endDate: endDateInput,
    };

    // Retrieve existing PTO data from local storage
    let ptoList = JSON.parse(localStorage.getItem("ptoList")) || {};

    // Add the new PTO to the list for the selected employee
    if (!ptoList[selectedEmployeeId]) {
      ptoList[selectedEmployeeId] = [];
    }
    ptoList[selectedEmployeeId].push(pto);

    // Store the updated PTO data back to local storage
    localStorage.setItem("ptoList", JSON.stringify(ptoList));

    // Display added PTO for the selected employee
    displayPTO(selectedEmployeeId);
    // Clear input fields after adding PTO

    resetCalendar1(container1);
    resetCalendar2(container2);
  }

  // ~~~~~~~~~~~~~~~~~~~~~AddPTO END~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  //~~~~~~~~~~~~~~~~~hello message start~~~~~~~~~~~~~~~~~~~~~
  const cookies = document.cookie.split(";");
  // Function to get the value of a specific cookie by name
  function getCookieValue(cookieName) {
    for (let cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name.trim() === cookieName) {
        return value;
      }
    }

    return null;
  }

  // Get the value of the "name" cookie
  const nameCookieValue = getCookieValue("name");

  // Select the <div> element with the class "helloMessage"
  const helloMessageDiv = document.querySelector(".helloMessage");

  // Create a text node containing a greeting message using the retrieved name
  const text = document.createTextNode(
    `Hello ${nameCookieValue || "Guest"}, nice to see you`
  );

  // Append the text node to the selected <div> element
  helloMessageDiv.appendChild(text);
  //~~~~~~~~~~~~~~~~~hello message end~~~~~~~~~~~~~~~~~~~~~

  //~~~~~~~~~~~~~~~~~~~~~~~~fetching data~~~~~~~~~~~~~~~~~~

  //retrieve elements from https://jsonplaceholder.typicode.com/users
  const employeeArray = await getEmployees();
  for (let i = 0; i < employeeArray.length; i++) {
    const employee = employeeArray[i];
    //function to add emoployees to list and display them
    AddAllEmployees(
      employee.id,
      employee.name,
      employee.username,
      employee.email,
      employee.address,
      employee.phone,
      employee.website,
      employee.company
    );
  }

  //~~~~~~~~~~~~~~~default action (page loads) start~~~~~~~~~~~~~~~~~~~~~~~~
  // Display details of the first employee
  const firstEmployee = document.querySelector(".employees__names--item");
  if (firstEmployee) {
    displayEmployeeDetails(firstEmployee.id);
  }

  // Function to display details of a specific employee (first employee in this case)
  async function displayEmployeeDetails(employeeId) {
    const employeeDetails = await fetchEmployeeDetails(employeeId);
    if (employeeDetails) {
      addSingleEmployee(
        employeeDetails.id,
        employeeDetails.name,
        employeeDetails.username,
        employeeDetails.email,
        employeeDetails.address,
        employeeDetails.phone,
        employeeDetails.website,
        employeeDetails.company
      );

      // Display PTO entries for the selected employee
      displayPTO(employeeId);
      //initialise calendars after page loads
      initializeCalendar1(".date_space1");
      initializeCalendar2(".date_space2");
    }
  }

  //~~~~~~~~~~~~~~~default action end~~~~~~~~~~~~~~~~~~~~~~~~

  //actual fetching function
  async function getEmployees() {
    try {
      const URL = "https://jsonplaceholder.typicode.com/users";
      const res = await fetch(URL);
      if (!res) {
        console.error("Network error, missing OK");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  //gloval variables for selected employee
  let selectedItem = document.querySelector(".employees__names--item");
  selectedItem.classList.add("selected");
  //let selectedEmployee = document.querySelector(".selected");

  function AddAllEmployees(
    id,
    name,
    username,
    email,
    address,
    phone,
    website,
    company
  ) {
    const listTemplate = document.getElementById("listTemplate");
    const employeeNode = document.importNode(listTemplate.content, true);
    const employeeElement = employeeNode.querySelector(
      ".employees__names--item"
    );
    employeeElement.setAttribute("id", id);
    employeeElement.innerHTML = `${name}`;

    const employeeContainer = document.querySelector(".employees__names--list");

    employeeContainer.appendChild(employeeElement);
  }

  //function to add and render single employee after fetching
  function addSingleEmployee(
    id,
    name,
    username,
    email,
    address,
    phone,
    website,
    company
  ) {
    //employee name
    const employeeName = document.querySelector(".employeeName");
    employeeName.innerHTML = `
    <p><strong>Name:</strong> ${name}</p>`;
    //emplyoee details modal start
    employeesSingle = document.querySelector(".modal-content3");
    employeesSingle.innerHTML = `
    <span class="close-button2">&times;</span>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Username:</strong> ${username}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Address:</strong> ${
      address
        ? `${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}, Lat: ${address.geo.lat}, Lng: ${address.geo.lng}`
        : "N/A"
    }</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Website:</strong> ${website}</p>
    <p><strong>Company:</strong> ${company ? company.name : "N/A"}</p>
    <p><strong>Company Phrase:</strong> ${
      company ? company.catchPhrase : "N/A"
    }</p>
    <p><strong>Company Business:</strong> ${company ? company.bs : "N/A"}</p>
    `;

    const detailsBtn = document.getElementById("detailsBtn");
    const detailsModal = document.querySelector(".detailsModal");
    const detailContent = document.querySelector(".modal-content3");
    const closeBtn = document.querySelector(".close-button2");
    closeBtn.addEventListener("click", hideDetails);

    detailsBtn.addEventListener("click", showDetailsFunction);
    function showDetailsFunction() {
      detailsModal.classList.add("show");
    }

    function hideDetails() {
      detailContent.classList.remove("show");
      detailsModal.classList.remove("show");
      detailsModal.classList.add("hide");
    }
  }
  //emplyoee details modal end

  const employeeList = document.querySelectorAll(
    ".employees__names--list .employees__names--item"
  );

  employeeList.forEach((employee) => {
    employee.addEventListener("click", changeMainEmployee);
  });

  //function for actual render of selected employee based on selected global variable
  async function changeMainEmployee(e) {
    const clickedEmployee = e.currentTarget;

    // Remove "selected" class from all employees (restart logic)
    employeeList.forEach((employee) => {
      employee.classList.remove("selected");
    });

    // Add "selected" class to the clicked employee
    clickedEmployee.classList.add("selected");
    selectedEmployee = clickedEmployee;

    //calendar1 (start date)
    const container1 = document.querySelector(".date_space1");
    const calendar1 = container1.querySelector("#date_picker1");
    //if calendar doesn't exist, initialise it , or if it exists, then reset calendar to today date
    if (!calendar1) {
      initializeCalendar1(".date_space1");
    } // Reset the calendar to today's date
    else resetCalendar1(container1);

    //calendar2 (end date)

    const container2 = document.querySelector(".date_space2");
    const calendar2 = container2.querySelector("#date_picker2");

    if (!calendar2) {
      initializeCalendar2(".date_space2");
    } // Reset the calendar to today's date
    else resetCalendar2(container2);

    //dynamically adding PTO table end
    const id = clickedEmployee.id;
    const employeeDetails = await fetchEmployeeDetails(id);

    // Call addSingleEmployee function with the fetched employee details
    addSingleEmployee(
      employeeDetails.id,
      employeeDetails.name,
      employeeDetails.username,
      employeeDetails.email,
      employeeDetails.address,
      employeeDetails.phone,
      employeeDetails.website,
      employeeDetails.company
    );

    // Display PTO entries for the selected employee
    displayPTO(id);
  }

  //calendars reset functions
  function resetCalendar1(container) {
    const calendar = container.querySelector("#date_picker1");
    calendar.remove();
    initializeCalendar1(".date_space1");
  }

  function resetCalendar2(container) {
    const calendar = container.querySelector("#date_picker2");
    calendar.remove();
    initializeCalendar2(".date_space2");
  }

  async function fetchEmployeeDetails(employeeId) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${employeeId}`
      );
      const employeeDetails = await response.json();
      return employeeDetails;
    } catch (error) {
      console.error("Error fetching employee details:", error);
      return null;
    }
  }

  //function to initialise and render start date calendar
  function initializeCalendar1(container) {
    // Select the container element where the calendar will be inserted
    const ptoContainer = document.querySelector(container);
    // Retrieve the calendar template from the document
    const calendarTemplate = document.getElementById("calendar_template1");
    // Clone the content of the calendar template and append it to the container
    const calendarNode = document.importNode(calendarTemplate.content, true);
    ptoContainer.appendChild(calendarNode);
    // Retrieve various elements and nodes within the inserted calendar template
    const calendar = ptoContainer.querySelector("#calendar_main1"),
      input = ptoContainer.querySelector("#date1"),
      calHeader = ptoContainer.querySelector("#calendar_header1"),
      calHeaderTitle = ptoContainer.querySelector("#calendar_header1 span"),
      calDays = ptoContainer.querySelector("#cal_days1"),
      days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

    //Timestamp and selected day calculation
    let oneDay = 60 * 60 * 24 * 1000;
    let todayTimestamp =
      Date.now() -
      (Date.now() % oneDay) +
      new Date().getTimezoneOffset() * 1000 * 60;

    let selectedDay = todayTimestamp;
    // Function to get the number of days in a month
    const getNumberOfDays = (year, month) => {
      return 40 - new Date(year, month, 40).getDate();
    };

    // // Function to calculate day details
    const getDayDetails = (args) => {
      let date = args.index - args.firstDay;
      let day = args.index % 7;

      let prevMonth = args.month - 1;
      let prevYear = args.year;
      if (prevMonth < 0) {
        prevMonth = 11;
        prevYear--;
      }
      let prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);

      let _date =
        (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) +
        1;

      let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
      let timestamp = new Date(args.year, args.month, _date).getTime();

      return {
        date: _date,
        day,
        month,
        timestamp,
        dayString: days[day],
      };
    };

    const getMonthDetails = (year, month) => {
      let firstDay = new Date(year, month, 1).getDay(); // Get the correct first day of the month
      if (firstDay === 0)
        firstDay = 6; // Adjust Sunday (0) to be 6 (Saturday) to align with your desired starting day
      else firstDay--; // Adjust other days to match your desired starting day
      let numberOfDays = getNumberOfDays(year, month);
      let monthArray = [];
      let rows = 5;
      let currentDay = null;
      let index = 0;
      let cols = 7;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          currentDay = getDayDetails({
            index,
            numberOfDays,
            firstDay,
            year,
            month,
          });
          monthArray.push(currentDay);
          index++;
        }
      }
      return monthArray;
    };

    // Variables that get updated with state changes
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let monthDetails = getMonthDetails(year, month);

    const isCurrentDay = (day, cell) => {
      if (day.timestamp === todayTimestamp) {
        cell.classList.add("active");
        cell.classList.add("isCurrent");
      }
    };

    // Checks if day is one selected
    const isSelectedDay = (day, cell) => {
      if (day.timestamp === selectedDay) {
        cell.classList.add("active");
        cell.classList.add("isSelected");
        ptoContainer
          .querySelector("#date_picker_calendar1")
          .classList.add("hidden");
      }
    };

    // Get month str
    const getMonthStr = (month) =>
      months[Math.max(Math.min(11, month), 0)] || "Month";

    // Set year using arrows
    const setHeaderNav = (offset) => {
      month = month + offset;
      if (month === -1) {
        month = 11;
        year--;
      } else if (month === 12) {
        month = 0;
        year++;
      }
      monthDetails = getMonthDetails(year, month);

      return {
        year,
        month,
        monthDetails,
      };
    };

    // Set dynamic calendar header
    const setHeader = (year, month) => {
      calHeaderTitle.innerHTML = getMonthStr(month) + " " + year;
    };

    // Set calendar header
    setHeader(year, month);

    // 1677139200000 => "2023-02-23"
    const getDateStringFromTimestamp = (timestamp) => {
      let dateObject = new Date(timestamp);
      let month = dateObject.getMonth();
      let date = dateObject.getDate();

      return `${getMonthStr(month)} ${date}, ${dateObject.getFullYear()}`;
    };

    const setDateToInput = (timestamp) => {
      let dateString = getDateStringFromTimestamp(timestamp);
      input.value = dateString;
    };
    setDateToInput(todayTimestamp);

    // Add days row to calendar
    for (let i = 0; i < days.length; i++) {
      let div = document.createElement("div"),
        span = document.createElement("span");

      div.classList.add("cell_wrapper");

      span.classList.add("cell_item");

      span.innerText = days[i].slice(0, 2);

      div.appendChild(span);
      calDays.appendChild(div);
    }

    // Add dates to calendar
    const setCalBody = (monthDetails) => {
      // Add dates to calendar
      for (let i = 0; i < monthDetails.length; i++) {
        let div = document.createElement("div"),
          span = document.createElement("span");

        div.classList.add("cell_wrapper");
        div.classList.add("cal_date");
        monthDetails[i].month === 0 && div.classList.add("current");
        monthDetails[i].month === 0 && isCurrentDay(monthDetails[i], div);
        span.classList.add("cell_item");

        span.innerText = monthDetails[i].date;

        div.appendChild(span);
        calendar.appendChild(div);
      }
    };

    setCalBody(monthDetails);

    const updateCalendar = (btn) => {
      let newCal, offset;
      if (btn.classList.contains("back")) {
        // let { year, month, monthDetails } = setHeaderNav(-1);
        offset = -1;
      } else if (btn.classList.contains("front")) {
        // let { year, month, monthDetails } = setHeaderNav(1);
        offset = 1;
      }
      newCal = setHeaderNav(offset);
      // console.log(monthDetails)
      setHeader(newCal.year, newCal.month);
      calendar.innerHTML = "";
      setCalBody(newCal.monthDetails);
    };

    // Only one calendar date is selected
    const selectOnClick = () => {
      document.querySelectorAll(".cell_wrapper").forEach((cell) => {
        cell.classList.contains("isSelected") &&
          cell.classList.remove("active");

        if (
          cell.classList.contains("isCurrent") &&
          !cell.classList.contains("active")
        ) {
          cell.querySelector("span").classList.add("inactive_indicator");
        }
      });
    };

    const updateInput = () => {
      let currentDay = ptoContainer.querySelector(".isCurrent");

      // Update input based on clicked cell
      ptoContainer.querySelectorAll(".cell_wrapper").forEach((cell) => {
        if (cell.classList.contains("current")) {
          cell.addEventListener("click", (e) => {
            let cell_date = e.target.textContent;

            currentDay !== null && currentDay.classList.remove("active");

            for (let i = 0; i < monthDetails.length; i++) {
              if (monthDetails[i].month === 0) {
                if (monthDetails[i].date.toString() === cell_date) {
                  selectedDay = monthDetails[i].timestamp;
                  setDateToInput(selectedDay);
                  selectOnClick();

                  isSelectedDay(monthDetails[i], cell);

                  cell
                    .querySelector("span")
                    .classList.contains("inactive_indicator") &&
                    cell
                      .querySelector("span")
                      .classList.remove("inactive_indicator");
                }
              }
            }
          });
        }
      });
    };

    updateInput();

    // Set header nav actions
    ptoContainer.querySelectorAll(".cal-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        updateCalendar(btn);
        updateInput();
      });
    });

    //On click of selected date show / hide calendar body
    input.addEventListener("click", inputFunction);
    function inputFunction() {
      if (
        !ptoContainer
          .querySelector("#date_picker_calendar1")
          .classList.contains("hidden")
      ) {
        ptoContainer
          .querySelector("#date_picker_calendar1")
          .classList.add("hidden");
      } else {
        ptoContainer
          .querySelector("#date_picker_calendar1")
          .classList.remove("hidden");
        ptoContainer
          .querySelector("#date_picker_input1")
          .classList.toggle("showCal");
        ptoContainer.querySelector("#date1").classList.toggle("onFocus");
      }
    }
  }

  function initializeCalendar2(container) {
    const ptoContainer = document.querySelector(container);

    const calendarTemplate = document.getElementById("calendar_template2");
    const calendarNode = document.importNode(calendarTemplate.content, true);
    ptoContainer.appendChild(calendarNode);

    const calendar = ptoContainer.querySelector("#calendar_main2"),
      input = ptoContainer.querySelector("#date2"),
      calHeader = ptoContainer.querySelector("#calendar_header2"),
      calHeaderTitle = ptoContainer.querySelector("#calendar_header2 span"),
      calDays = ptoContainer.querySelector("#cal_days2"),
      days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

    let oneDay = 60 * 60 * 24 * 1000;
    let todayTimestamp =
      Date.now() -
      (Date.now() % oneDay) +
      new Date().getTimezoneOffset() * 1000 * 60;

    let selectedDay = todayTimestamp;
    // console.log(selectedDay); // Str in millisec

    // Get num of days in month
    // month param 0-11
    const getNumberOfDays = (year, month) => {
      return 40 - new Date(year, month, 40).getDate();
    };
    // getNumberOfDays(2023, 1);

    // Calc day details
    const getDayDetails = (args) => {
      let date = args.index - args.firstDay;
      let day = args.index % 7;
      // console.log(day)
      let prevMonth = args.month - 1;
      let prevYear = args.year;
      if (prevMonth < 0) {
        prevMonth = 11;
        prevYear--;
      }
      let prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);

      let _date =
        (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) +
        1;
      // console.log(_date)
      let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
      let timestamp = new Date(args.year, args.month, _date).getTime();
      // console.log(timestamp)
      return {
        date: _date,
        day,
        month,
        timestamp,
        dayString: days[day],
      };
    };

    //new first day calculation (from monday)
    const getMonthDetails = (year, month) => {
      let firstDay = new Date(year, month, 1).getDay(); // Get the correct first day of the month
      if (firstDay === 0)
        firstDay = 6; // Adjust Sunday (0) to be 6 (Saturday) to align with your desired starting day
      else firstDay--; // Adjust other days to match your desired starting day
      let numberOfDays = getNumberOfDays(year, month);
      let monthArray = [];
      let rows = 5;
      let currentDay = null;
      let index = 0;
      let cols = 7;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          currentDay = getDayDetails({
            index,
            numberOfDays,
            firstDay,
            year,
            month,
          });
          monthArray.push(currentDay);
          index++;
        }
      }
      return monthArray;
    };

    // Variables that get updated with "state" changes
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let monthDetails = getMonthDetails(year, month);

    const isCurrentDay = (day, cell) => {
      if (day.timestamp === todayTimestamp) {
        cell.classList.add("active");
        cell.classList.add("isCurrent");
      }
    };

    // Checks if day is one selected
    const isSelectedDay = (day, cell) => {
      if (day.timestamp === selectedDay) {
        cell.classList.add("active");
        cell.classList.add("isSelected");
        ptoContainer
          .querySelector("#date_picker_calendar2")
          .classList.add("hidden");
      }
    };

    // Get month str
    const getMonthStr = (month) =>
      months[Math.max(Math.min(11, month), 0)] || "Month";
    // console.log(getMonthStr(month))

    // Set year using arrows
    const setHeaderNav = (offset) => {
      month = month + offset;
      if (month === -1) {
        month = 11;
        year--;
      } else if (month === 12) {
        month = 0;
        year++;
      }
      monthDetails = getMonthDetails(year, month);
      // console.log(getMonthDetails(year, month))
      return {
        year,
        month,
        monthDetails,
      };
    };

    // Set dynamic calendar header
    const setHeader = (year, month) => {
      calHeaderTitle.innerHTML = getMonthStr(month) + " " + year;
    };

    // Set calendar header
    setHeader(year, month);

    // 1677139200000 => "2023-02-23"
    const getDateStringFromTimestamp = (timestamp) => {
      let dateObject = new Date(timestamp);
      let month = dateObject.getMonth();
      let date = dateObject.getDate();
      
      return `${getMonthStr(month)} ${date}, ${dateObject.getFullYear()}`;
    };

    const setDateToInput = (timestamp) => {
      let dateString = getDateStringFromTimestamp(timestamp);
      input.value = dateString;
    };
    setDateToInput(todayTimestamp);

    // Add days row to calendar
    for (let i = 0; i < days.length; i++) {
      let div = document.createElement("div"),
        span = document.createElement("span");

      div.classList.add("cell_wrapper");
      // div.classList.add("cal_days");
      span.classList.add("cell_item");

      span.innerText = days[i].slice(0, 2);

      div.appendChild(span);
      calDays.appendChild(div);
    }

    // Add dates to calendar
    const setCalBody = (monthDetails) => {
      // Add dates to calendar
      for (let i = 0; i < monthDetails.length; i++) {
        let div = document.createElement("div"),
          span = document.createElement("span");

        div.classList.add("cell_wrapper");
        div.classList.add("cal_date");
        monthDetails[i].month === 0 && div.classList.add("current");
        monthDetails[i].month === 0 && isCurrentDay(monthDetails[i], div);
        span.classList.add("cell_item");

        span.innerText = monthDetails[i].date;

        div.appendChild(span);
        calendar.appendChild(div);
      }
    };

    setCalBody(monthDetails);

    const updateCalendar = (btn) => {
      let newCal, offset;
      if (btn.classList.contains("back")) {
        // let { year, month, monthDetails } = setHeaderNav(-1);
        offset = -1;
      } else if (btn.classList.contains("front")) {
        // let { year, month, monthDetails } = setHeaderNav(1);
        offset = 1;
      }
      newCal = setHeaderNav(offset);
      // console.log(monthDetails)
      setHeader(newCal.year, newCal.month);
      calendar.innerHTML = "";
      setCalBody(newCal.monthDetails);
    };

    const selectOnClick = () => {
      document.querySelectorAll(".cell_wrapper").forEach((cell) => {
        cell.classList.contains("isSelected") &&
          cell.classList.remove("active");

        if (
          cell.classList.contains("isCurrent") &&
          !cell.classList.contains("active")
        ) {
          cell.querySelector("span").classList.add("inactive_indicator");
        }
      });
    };

    const updateInput = () => {
      let currentDay = ptoContainer.querySelector(".isCurrent");

      // Update input based on clicked cell
      ptoContainer.querySelectorAll(".cell_wrapper").forEach((cell) => {
        if (cell.classList.contains("current")) {
          cell.addEventListener("click", (e) => {
            let cell_date = e.target.textContent;

            currentDay !== null && currentDay.classList.remove("active");

            for (let i = 0; i < monthDetails.length; i++) {
              if (monthDetails[i].month === 0) {
                if (monthDetails[i].date.toString() === cell_date) {
                  selectedDay = monthDetails[i].timestamp;
                  setDateToInput(selectedDay);
                  selectOnClick();

                  isSelectedDay(monthDetails[i], cell);

                  cell
                    .querySelector("span")
                    .classList.contains("inactive_indicator") &&
                    cell
                      .querySelector("span")
                      .classList.remove("inactive_indicator");
                }
              }
            }
          });
        }
      });
    };

    updateInput();

    // Set header nav actions
    ptoContainer.querySelectorAll(".cal-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        updateCalendar(btn);
        updateInput();
      });
    });

    
    input.addEventListener("click", inputFunction);
    function inputFunction() {
      if (
        !ptoContainer
          .querySelector("#date_picker_calendar2")
          .classList.contains("hidden")
      ) {
        ptoContainer
          .querySelector("#date_picker_calendar2")
          .classList.add("hidden");
      } else {
        ptoContainer
          .querySelector("#date_picker_calendar2")
          .classList.remove("hidden");
        ptoContainer
          .querySelector("#date_picker_input2")
          .classList.toggle("showCal");
        ptoContainer.querySelector("#date2").classList.toggle("onFocus");
      }
    }
  }
});
