document.addEventListener("DOMContentLoaded", async function () {
    // Array to store added PTO for each employee
    const ptoList = {};
  
    // Function to add PTO for an employee
    const PTObtn = document.querySelector('.PTObtn');
    PTObtn.addEventListener('click', addPTO);
  
    function addPTO() {
      const startDate = document.getElementById("startDate").value;
      const endDate = document.getElementById("endDate").value;
  
      // Get the ID of the selected employee
      const selectedEmployeeId = document.querySelector('.employees__names--item.selected').id;
  
      // Create an object to store PTO information
      const pto = {
        startDate: startDate,
        endDate: endDate,
      };
  
      // Add the PTO to the list for the selected employee
      if (!ptoList[selectedEmployeeId]) {
        ptoList[selectedEmployeeId] = [];
      }
      ptoList[selectedEmployeeId].push(pto);
  
      // Display added PTO for the selected employee
      displayPTO(selectedEmployeeId);
  
      // Clear input fields after adding PTO
      document.getElementById("startDate").value = "";
      document.getElementById("endDate").value = "";
    }
  
    // Function to display added PTO for the selected employee
    function displayPTO(employeeId) {
      const ptoListSection = document.getElementById("ptoList");
      ptoListSection.innerHTML = ""; // Clear previous content
  
      // Iterate through the PTO list for the selected employee and display each PTO
      if (ptoList[employeeId]) {
        ptoList[employeeId].forEach(function (pto, index) {
          const ptoItem = document.createElement("div");
          ptoItem.textContent =
            "PTO " + (index + 1) + ": " + pto.startDate + " to " + pto.endDate;
          ptoListSection.appendChild(ptoItem);
        });
      }
    }
  
    // Event listener to handle employee selection
    const employeeList = document.querySelectorAll(".employees__names--list .employees__names--item");
    employeeList.forEach((employee) => {
      employee.addEventListener("click", changeMainEmployee);
    });
  
    // Function to handle employee selection
    async function changeMainEmployee(e) {
      const clickedEmployee = e.currentTarget;
      console.log("clicked:", clickedEmployee);
  
      // Remove "selected" class from all employees
      employeeList.forEach((employee) => {
        employee.classList.remove("selected");
      });
  
      // Add "selected" class to the clicked employee
      clickedEmployee.classList.add("selected");
  
      // Display PTO for the selected employee
      const id = clickedEmployee.id;
      displayPTO(id);
  
      // Fetch and render details of the selected employee
      const employeeDetails = await fetchEmployeeDetails(id);
      renderEmployeeDetails(employeeDetails);
    }
  
    // Function to fetch employee details
    async function fetchEmployeeDetails(employeeId) {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${employeeId}`);
        const employeeDetails = await response.json();
        return employeeDetails;
      } catch (error) {
        console.error("Error fetching employee details:", error);
        return null;
      }
    }
  
    // Function to render employee details
    function renderEmployeeDetails(employeeDetails) {
      const employeesSingle = document.querySelector(".employees__single--info");
      employeesSingle.innerHTML = `
        <p><strong>Name:</strong> ${employeeDetails.name}</p>
        <p><strong>Username:</strong> ${employeeDetails.username}</p>
        <p><strong>Email:</strong> ${employeeDetails.email}</p>
        <p><strong>Address:</strong> ${
        employeeDetails.address
          ? `${employeeDetails.address.street}, ${employeeDetails.address.suite}, ${employeeDetails.address.city}, ${employeeDetails.address.zipcode}, Lat: ${employeeDetails.address.geo.lat}, Lng: ${employeeDetails.address.geo.lng}`
          : "N/A"
        }</p>
        <p><strong>Phone:</strong> ${employeeDetails.phone}</p>
        <p><strong>Website:</strong> ${employeeDetails.website}</p>
        <p><strong>Company:</strong> ${employeeDetails.company ? employeeDetails.company.name : "N/A"}</p>
        <p><strong>Company Phrase:</strong> ${employeeDetails.company ? employeeDetails.company.catchPhrase : "N/A"}</p>
        <p><strong>Company Business:</strong> ${employeeDetails.company ? employeeDetails.company.bs : "N/A"}</p>
      `;
    }
  });
  