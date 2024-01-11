const form = document.querySelector("#form");
const inputSearch = document.querySelector("#inputSearch");
const searchBtn = document.querySelector("#search-btn");

// Function to fetch and display search results
async function fetchAndDisplayMovieList(userInput) {
  try {
    // Clear previous search results
    document.querySelector(".movies").innerHTML = "";
    // Clear previous show details
    document.querySelector("#show-details").innerHTML = "";

    // const userInput = inputSearch.value; // Uncomment this line to retrieve user input

    // Check if userInput is not empty
    if (userInput.trim() === "") {
      console.log("User input is empty.");
      return;
    }

    const searchOption = document.getElementById("search-option").value;

    // Update the API endpoint based on the selected search option
    const response = await axios.get(
      `http://www.omdbapi.com/?s=All&${userInput}&page=1&apikey=41815297`
    );
    if (searchOption === "All") {
      const searchResults = response.data.Search; // Access the "Search" property

      console.log(searchResults);

      const movieList = document.getElementById("movieList");

      const displayEntries = (entries) => {
        entries.forEach((item) => {
          const listItem = document.createElement("li");
          listItem.classList.add(
            "bg-white",
            "rounded-md",
            "overflow-hidden",
            "shadow-lg",
            "transition-transform",
            "hover:scale-105",
            "cursor-pointer",
            "mb-4",
            "w-full"
          );

          listItem.innerHTML = `
          <div class="flex items-center">
              <img src="${item.Poster}" alt="${item.Title}" class="w-16 h-16 object-scale-down">
              <div class="flex flex-col p-4 ">
                  <h2 class="text-xl font-bold mb-2 text-blue-900">${item.Title}</h2>
                  <p class="text-yellow-500">${item.Year}</p>
              </div>
          </div>
        `;

          // Append the container to the ".movies" container
          movieList.appendChild(listItem);
        });
      };

      // Display initial entries
      const initialEntries = searchResults.slice(0, 6); // Display the first 5 entries
      displayEntries(initialEntries);

      // Load more entries when the button is clicked
      let startIndex = 5; // Start index for loading more entries

      const loadMoreBtn = document.createElement("button");
      loadMoreBtn.id = "loadMoreBtn";
      loadMoreBtn.classList.add(
        "bg-blue-500",
        "text-white",
        "py-2",
        "px-4",
        "mt-4",
        "rounded-full",
        "mx-auto", // Center the button
        "hover:bg-blue-600" // Hover effect
      );
      loadMoreBtn.innerText = "More Popular Matches";
      loadMoreBtn.addEventListener("click", () => {
        const moreEntries = searchResults.slice(startIndex, startIndex + 5);
        displayEntries(moreEntries);
        startIndex += 5;

        // Hide the button if all entries have been displayed
        if (startIndex >= searchResults.length) {
          loadMoreBtn.style.display = "none";
        }
      });

      // Append the button after the movieList
      movieList.parentElement.appendChild(loadMoreBtn);
    } else {
      console.log(error);
    }
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
  }
}

// // Event listener for search button click
// searchBtn.addEventListener("click", async (e) => {
//   e.preventDefault();
//   const userInput = inputSearch.value;
//   await fetchAndDisplayMovieList(userInput);
// });

// Initial call without user input
export { fetchAndDisplayMovieList };
