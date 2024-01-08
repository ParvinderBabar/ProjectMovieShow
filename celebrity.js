// Define a function to handle general search for celebrity
const searchBtn = document.getElementById("search-btn").value;
async function celebritySearch() {
  try {
    const userInput = inputSearch.value;
    // const searchBtn = document.getElementById("search-btn").value;
    const searchOption = document.getElementById("search-option").value;
    // Update the API endpoint based on the selected search option
    const response = await axios.get(
      `https://api.tvmaze.com/search/${searchOption}?q=${userInput}`
    );
    // i added search option for various thing.this search option contain people
    const list = response.data;
    console.log(response.data);

    const celebDiv = document.querySelector(".celebs");

    // Clear previous search results
    // celebDiv.innerHTML = "";

    list.forEach((item) => {
      const name = item.person.name;
      const img = item.person.image
        ? item.person.image.medium
        : "default_image_url";
      const personId = item.person.id;

      // Create a container for each search result
      const celebResultContainer = document.createElement("div");
      celebResultContainer.classList.add("celebs", "celebrity-results");

      //   const link = `<a href="#" data-person-id="${personId}" onclick="showPersonDetails${personId};return false;"><img src="${img}" alt="${name}"><h2>${name}</h2></a>`;
      const link = `<a href="#" data-person-id="${personId}" onclick="showPersonDetails(${personId});return false;"><img src="${img}" alt="${name}"><h2>${name}</h2></a>`;

      celebResultContainer.innerHTML += link;
      // Append the container to the ".movies" container
      celebDiv.appendChild(celebResultContainer);
    });
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
  }
}

// Attach event listener to the search butto
document
  .getElementById("search-btn")
  .addEventListener("click", celebritySearch);

async function showPersonDetails(personId) {
  const personDetailsContainer = document.querySelector("#person-details");

  try {
    const response = await axios.get(
      `https://api.tvmaze.com/people/${personId}`
    );
    const person = response.data;

    // Create a container for person details
    const detailContainer = document.createElement("div");
    detailContainer.classList.add("person-details");
    //working on clearssection

    // Create HTML content for person details
    const detailsHTML = `
<img src="${person.image.medium}" alt="${person.name}">
    
     <h2> ${person.name}</h2>
      <ul>

       
        <li><strong>Gender</strong> ${
          person.gender ? person.gender : "N/A"
        }</li>
        <li><strong>Language</strong> ${
          person.language ? person.language : "N/A"
        }</li>
        <li><strong>Country</strong> ${
          person.country ? person.country.name : "N/A"
        }</li>
        <li><strong>Birthday</strong> ${person.birthday}</li>
       
      </ul>
    `;
    // Set the HTML content
    detailContainer.innerHTML = detailsHTML;

    // Append the container to the show details container
    personDetailsContainer.appendChild(detailContainer);
    document.querySelectorAll(".celebrity-results").forEach((result) => {
      result.style.display = "none";
    });
  } catch (error) {
    console.error("Error fetching person details:", error);
  }
}
