// /async function fetchData() {
const dataContainer = document.getElementById("data-container");
dataContainer.innerHTML = '<div class="loading">Loading...</div>';
const form = document.querySelector("#form");
const inputSearch = document.querySelector("#inputSearch");

// const searchBtn = document.querySelector("#search");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    console.log("form working");
    //this will clear the existing search
    document.querySelector(".movies").innerHTML = "";

    const userInput = form.elements.inputSearch.value;
    const response = await axios.get(
      ` https://api.tvmaze.com/search/shows?q=${userInput}`
    );
    // fetch details of search items

    console.log(response.data);

    // create an element to display images onscreen
    const list = response.data;

    // Create a container for each search result
    const movieDiv = document.querySelector(".movies");
    list.forEach((item) => {
      const name = item.show.name;
      const img = item.show.image.medium;
      const showId = item.show.id;

      // Create a container for each search result
      const resultContainer = document.createElement("div");
      resultContainer.classList.add("movies", "search-result"); // Use the correct class name
      // Create a link for each movie item

      const link = `<a href="#" data-show-id="${showId}" onclick="showDetails(${showId});return false;"><img src="${img}" alt="${name}"><h2>${name}</h2></a>`;
      resultContainer.innerHTML = link;
      // Append the container to the ".movies" container
      movieDiv.appendChild(resultContainer);
      form.reset();
    });
  } catch (error) {
    dataContainer.innerHTML = `<div class="loading">Error fetching data. Please try again.</div>`;
  }
});
// Function to handle the click event on movie links
async function showDetails(showId) {
  try {
    // Make an API request to get detailed information for the selected show
    const response = await axios.get(`https://api.tvmaze.com/shows/${showId}`);

    // Log the details to the console or do something else with the data
    console.log(response.data);
    const show = response.data;
    const detailContainer = document.createElement("div");
    const showDetailsContainer = document.querySelector("#show-details");
    detailContainer.classList.add("show-details");

    const navBar = createNavBar();
    showDetailsContainer.appendChild(navBar);

    console.log(show);

    // Create a list of details

    const detailsList = `
    <img src="${show.image.medium}" alt="${show.name}">
    
     <h2> ${show.name}</h2>
      <ul>
       
        <li><strong>Language</strong> ${show.language}</li>
        <li><strong>Genres</strong> ${show.genres.join(", ")}</li>
        <li><strong>Summary</strong> ${show.summary}</li>
       
      </ul>
    `;

    // // Update the content of the show details container
    // detailContainer.innerHTML = detailsList;
    // showDetailsContainer.innerHTML = "";

    // // Update the content of the show details container
    // showDetailsContainer.innerHTML = detailsList;
    // showDetailsContainer.appendChild(navBar);
    // showDetailsContainer.innerHTML += detailsList;
    // Update the content of the show details container
    detailContainer.innerHTML = detailsList;
    showDetailsContainer.appendChild(detailContainer);
    // console.log(detailsList);
    //  return navBar;
    // Hide other search results
    // Hide other search results
    document.querySelectorAll(".search-result").forEach((result) => {
      result.style.display = "none";
    });

    form.reset();
  } catch (error) {
    // Handle errors, e.g., display an error message

    console.error("Error fetching show details:", error);
  }
}
// Function to create and add a navigation bar to the show details div
// Function to create and add a navigation bar to the show details div
function createNavBar() {
  const showDetailsContainer = document.querySelector("#show-details");

  // Check if the navigation bar already exists
  let navBar = document.getElementById("navBar");
  if (!navBar) {
    // Create navigation bar elements
    navBar = document.createElement("nav");
    navBar.id = "navBar";
    navBar.style.display = "block";

    // Define nav items (Main, Episodes, Seasons, Cast, Crew, Characters, Gallery)
    const navItems = [
      "Main",
      "Episodes",
      "Seasons",
      "Cast",
      "Crew",
      "Characters",
      "Gallery",
    ];

    // Create list items for each nav item
    const navList = document.createElement("ul");
    navItems.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;

      // Add an event listener to each nav item to handle clicks
      listItem.addEventListener("click", () => handleNavItemClick(item));

      // Append list item to the navigation list
      navList.appendChild(listItem);
    });

    // Append the navigation list to the navigation bar
    navBar.appendChild(navList);

    // Add styles to the navigation bar (you can customize this based on your CSS)
    navBar.style.backgroundColor = "#272727";
    navBar.style.padding = "10px";

    // Append the navigation bar to the show details container
    // showDetailsContainer.appendChild(navBar);
    showDetailsContainer.insertBefore(navBar, showDetailsContainer.firstChild);
  }

  return navBar; // Return the navBar element
}
// Function to handle navigation item clicks
function handleNavItemClick(navItem) {
  // Handle the click event based on the selected navigation item
  console.log(`Clicked on ${navItem}`);
  // You can implement specific actions for each navigation item here
}
