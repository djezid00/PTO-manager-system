# PTO Management System

A web application for managing Paid Time Off (PTO) requests, built with HTML, CSS, and Vanilla JavaScript as a project for the "Programming for Internet" university course.

## Overview

This project provides a simplified system for administrators to manage PTO requests. Key features include admin authentication, employee database integration, and custom calendar functionality.

## Key Features

*   **User Registration and Login:**
    *   Users can register accounts, with registration data stored in browser cookies.
    *   Login form validates credentials against the data stored in cookies.
*   **Employee Database Management:**
    *   Fetches employee data from a mock API ([https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)).
    *   Displays a list of employees.
    *   "Details" button for each employee to display detailed information from the API.
*   **Custom Calendar:**
    *   Custom-built calendar for selecting PTO dates.
    *   Seasonal images corresponding to the year's seasons are displayed within the calendar.
*   **PTO Request Management:**
    *   Administrator can add PTO requests using the custom calendar.
    *   PTO data (dates, etc.) is stored in the browser's local storage.
    *   Visual representation of Past, Current and Upcoming PTO's with corresponding season picture.
    *   Administrator can delete PTO's
*   **User Interface:**
    *   Clean and intuitive user interface.
    *   Welcome message personalized with the logged-in user's name.
    *   Logout functionality.

## Technologies Used

*   HTML
*   CSS
*   Vanilla JavaScript (no frameworks)
*   [JSONPlaceholder](https://jsonplaceholder.typicode.com/) (for mock employee data)

## Screenshots


*   **Registration Form:**

    ![Registration Form](https://pplx-res.cloudinary.com/image/upload/v1741195752/user_uploads/TTdcvZzxzhOlyZx/Snimka-zaslona-2025-03-05-144254.jpg)

*   **PTO Management System:**

    ![PTO Management System](https://pplx-res.cloudinary.com/image/upload/v1741195747/user_uploads/VpMfdiLAABUWvjq/Snimka-zaslona-2025-03-05-144400.jpg)

*   **Employee Details:**
  
    ![Employee Details](https://pplx-res.cloudinary.com/image/upload/v1741195752/user_uploads/FFJjTRCnIXVvrhh/Snimka-zaslona-2025-03-05-144412.jpg)
 
*   **PTO View:**
 
    ![PTO View](https://pplx-res.cloudinary.com/image/upload/v1741195752/user_uploads/GltDPfMHKGFqfBR/Snimka-zaslona-2025-03-05-144450.jpg)
  

## How to Use

1.  Register a new account using the registration form.
2.  Log in with your registered credentials.
3.  Browse the employee list.
4.  Click "Details" to view employee information fetched from the API.
5.  Use the calendar to select PTO dates and add PTO requests.


## Credits

*   This project was created as part of a university course.
*   Employee data provided by [JSONPlaceholder](https://jsonplaceholder.typicode.com/).


