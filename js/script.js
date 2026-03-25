// making sure giJS is connected
console.log("JS CONNECTED");

// Giphy API key
const apiKey = "cK4AIeZIVkQwBiQrOpolu5LUkNWmysSW";

// grabbing elements from the page
const gifContainer = document.querySelector("#gif-container");
const fetchGifBtn = document.querySelector("#fetch-gif-btn");
const searchInput = document.querySelector("#search-input");

// when the button is clicked
fetchGifBtn.addEventListener("click", async function () {

  // getting what the user typed (default = dogs if empty)
  const searchTerm = searchInput.value.trim() || "dogs";

  // building the API request URL
  const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=12&rating=g`;

  try {
    // sending request to Giphy
    const response = await fetch(endpoint);

    // checking if request worked
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    // converting response to JSON
    const data = await response.json();

    // getting only the gif image URLs
    const images = data.data.map(gif => gif.images.original.url);

    // clearing old gifs
    gifContainer.innerHTML = "";

    // displaying gifs on the page
    for (let image of images) {
      gifContainer.innerHTML += `
        <div class="col-3 mb-3">
          <img src="${image}" class="img-fluid rounded shadow-sm" alt="GIF">
        </div>
      `;
    }

  } catch (error) {
    // showing error if something fails
    console.log("Error:", error);

    gifContainer.innerHTML = `
      <p class="text-danger text-center">
        Failed to load GIFs. Check your API key.
      </p>
    `;
  }

});

