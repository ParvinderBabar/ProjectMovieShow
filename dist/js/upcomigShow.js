document.addEventListener("DOMContentLoaded", function () {
  async function fetchData() {
    try {
      const response = await axios.get(
        " https://api.tvmaze.com/schedule?country=US&date="
      );
      const list = response.data;
      console.log(list[0]);
      // Create carousel container
      const carouselList = document.getElementById("carousel-list");
      const carouselContainer = document.createElement("div");
      carouselContainer.classList.add("swiper-wrapper");

      // Create Swiper container
      const swiperContainer = document.createElement("div");
      swiperContainer.classList.add("swiper-container");

      // Append Swiper container to carousel container
      carouselList.appendChild(swiperContainer);
      swiperContainer.appendChild(carouselContainer);

      list.forEach((item) => {
        // Create a new div for each item
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("swiper-slide");

        // Create an img element for each image
        const imgElement = document.createElement("img");
        imgElement.src = item.show.image.medium;
        imgElement.alt = item.show.name;
        imgElement.classList.add("card-image", "shrink-0");
        // Additional details for each slide
        const detailsContainer = document.createElement("div");
        // detailsContainer.innerHTML = `<p>${item.show.name}</p><p>${item.airdate}</p>`;
        // <img src="${img}" alt="${name}" class="w-full h-48 object-cover ">
        // <div class="p-4">
        //     <h2 class="text-xl font-bold mb-2">${name}</h2>
        //     <p class="text-gray-200">${summary}</p>
        // </div>
        // <div class="p-3 bg-blue-900">
        //     <button onclick="showDetails(${showId})" class="bg-yellow-400 text-blue-900 px-4 py-2 rounded-full">Details</button>
        // </div>
        detailsContainer.innerHTML = `









    <h2 class="text-xl font-bold text-white mb-2">${item.show.name}</h2>
    <ul class="text-gray-300">
        <li class="flex items-center mb-2">
            <strong class="mr-2">Airdate:</strong>
            <span>${item.airdate}</span>
        </li>
        
    </ul>

  `;
        carouselItem.appendChild(imgElement);
        carouselItem.appendChild(detailsContainer);

        carouselContainer.appendChild(carouselItem);
      });

      // Initialize Swiper
      const swiper = new Swiper(swiperContainer, {
        slidesPerView: 6,
        spaceBetween: 6,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Invoke fetchData inside the DOMContentLoaded event listener
  fetchData();
});
