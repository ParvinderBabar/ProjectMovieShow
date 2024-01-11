import { fetchAndDisplayMovieList } from "./searchMovies.js";
import { celebritySearch } from "./celebs.js";
import { tvList } from "./searchTVshow.js";

const form = document.querySelector("#form");
const inputSearch = document.querySelector("#inputSearch");
const searchBtn = document.querySelector("#search-btn");

searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  // Get the search input value
  const userInput = inputSearch.value;

  // Get the selected search option
  const searchOption = document.getElementById("search-option").value;

  // Define the fetchFunction variable
  let fetchFunction;

  if (searchOption === "All") {
    // Dynamically import the fetchAndDisplayMovieList function

    fetchFunction = fetchAndDisplayMovieList;
  } else if (searchOption === "people") {
    // Call the celebritySearch function
    fetchFunction = celebritySearch;
  } else if (searchOption === "shows") {
    fetchFunction = tvList;
  } else {
    console.error("Invalid search option:", searchOption);
    return; // Exit the function if the search option is invalid
  }

  // Call the dynamically imported function with userInput
  if (fetchFunction) {
    fetchFunction(userInput);
  }
});
