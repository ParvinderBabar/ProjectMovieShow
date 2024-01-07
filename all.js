// menu.js

// Wait for the DOM to be ready
document.addEventListener("DOMContentLoaded", function () {
  // Use document.querySelector to select the "All" button and the dropdown
  const allBtn = document.querySelector("#allBtn");
  const menuDropdown = document.querySelector("#menuDropdown");

  // Add an event listener to the "All" button
  allBtn.addEventListener("click", function () {
    // Toggle the visibility of the dropdown
    menuDropdown.classList.toggle("show");
  });

  // Close the dropdown if the user clicks outside of it
  document.addEventListener("click", function (event) {
    if (!event.target.matches("#allBtn")) {
      const dropdowns = document.getElementsByClassName("menu-dropdown");
      for (const dropdown of dropdowns) {
        if (dropdown.classList.contains("show")) {
          dropdown.classList.remove("show");
        }
      }
    }
  });
});
