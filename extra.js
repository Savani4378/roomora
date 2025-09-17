<script>
async function loadHotels() {
  try {
    const response = await fetch("/api/hotels"); // API endpoint from backend
    const hotels = await response.json();

    const container = document.getElementById("hotelContainer");

    // Group by city
    const groupedHotels = hotels.reduce((acc, hotel) => {
      if (!acc[hotel.city]) acc[hotel.city] = [];
      acc[hotel.city].push(hotel);
      return acc;
    }, {});

    for (const city in groupedHotels) {
      const cityTitle = document.createElement("h3");
      cityTitle.textContent = city;
      cityTitle.style.color = "#004aad";
      cityTitle.style.margin = "30px 0 10px 0";
      cityTitle.style.fontSize = "24px";
      container.appendChild(cityTitle);

      const cityContainer = document.createElement("div");
      cityContainer.classList.add("card-container");

      groupedHotels[city].forEach(hotel => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <img src="${hotel.img}" alt="${hotel.name}, ${hotel.city}">
          <h3>${hotel.name}</h3>
          <p class="location">${hotel.city}</p>
          <p class="rating">⭐ ${hotel.rating} · Excellent · ${hotel.reviews} reviews</p>
          <p class="price">Starting from ₹${hotel.price}/night</p>
          <button class="bookNow">Book Now</button>
        `;
        cityContainer.appendChild(card);
      });

      container.appendChild(cityContainer);
    }

    // Attach button events
    document.querySelectorAll(".bookNow").forEach(btn => {
      btn.addEventListener("click", () => {
        alert("Hotel booking feature coming soon!");
      });
    });

  } catch (error) {
    console.error("Error loading hotels:", error);
  }
}

// Load hotels when page is ready
window.onload = loadHotels;

const hotels = [
  // Goa
  {city: "Goa", name: "Seaside Hotel", rating: 9.1, reviews: 2100, price: 7000, img: "images/hotel1.png"},
  {city: "Goa", name: "Ocean View Inn", rating: 8.9, reviews: 1900, price: 6500, img: "images/hotel2.png"},
  {city: "Goa", name: "Palm Residency", rating: 9.0, reviews: 2000, price: 7200, img: "images/hotel3.png"},
  {city: "Goa", name: "Blue Lagoon Hotel", rating: 9.2, reviews: 2200, price: 7500, img: "images/hotel4.png"},
  {city: "Goa", name: "Sunshine Stay", rating: 8.8, reviews: 1800, price: 6000, img: "images/hotel5.png"},

  // Delhi
  {city: "Delhi", name: "Metro City Hotel", rating: 9.0, reviews: 2100, price: 8000, img: "images/hotel6.png"},
  {city: "Delhi", name: "Capital Comfort Inn", rating: 8.9, reviews: 1900, price: 7500, img: "images/hotel7.png"},
  {city: "Delhi", name: "Royal Heritage Hotel", rating: 9.2, reviews: 2200, price: 8200, img: "images/hotel8.png"},
  {city: "Delhi", name: "Garden Residency", rating: 9.1, reviews: 2000, price: 7900, img: "images/hotel9.png"},
  {city: "Delhi", name: "City View Hotel", rating: 8.8, reviews: 1800, price: 7200, img: "images/hotel10.png"}
];

// DOM references
const cityFilter = document.getElementById("cityFilter");
const ratingFilter = document.getElementById("ratingFilter");
const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");
const container = document.getElementById("hotelContainer");

// Populate city dropdown dynamically
const uniqueCities = [...new Set(hotels.map(h => h.city))];
uniqueCities.forEach(city => {
  const option = document.createElement("option");
  option.value = city;
  option.textContent = city;
  cityFilter.appendChild(option);
});

// Render hotels
function renderHotels(list) {
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p>No hotels found matching your filters.</p>";
    return;
  }

  const grouped = list.reduce((acc, h) => {
    if (!acc[h.city]) acc[h.city] = [];
    acc[h.city].push(h);
    return acc;
  }, {});

  for (const city in grouped) {
    const cityTitle = document.createElement("h3");
    cityTitle.textContent = city;
    cityTitle.style.color = "#004aad";
    cityTitle.style.margin = "30px 0 10px 0";
    cityTitle.style.fontSize = "24px";
    container.appendChild(cityTitle);

    const cityContainer = document.createElement("div");
    cityContainer.classList.add("card-container");

    grouped[city].forEach(hotel => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${hotel.img}" alt="${hotel.name}, ${hotel.city}">
        <h3>${hotel.name}</h3>
        <p class="location">${hotel.city}</p>
        <p class="rating">⭐ ${hotel.rating} · Excellent · ${hotel.reviews} reviews</p>
        <p class="price">Starting from ₹${hotel.price}/night</p>
        <button class="bookNow">Book Now</button>
      `;
      cityContainer.appendChild(card);
    });

    container.appendChild(cityContainer);
  }

  // Add click for book buttons
  document.querySelectorAll(".bookNow").forEach(btn => {
    btn.addEventListener("click", () => {
      alert("Hotel booking feature coming soon!");
    });
  });
}

// Apply filters
function applyFilters() {
  const selectedCity = cityFilter.value;
  const minPrice = parseInt(minPriceInput.value) || 0;
  const maxPrice = parseInt(maxPriceInput.value) || Infinity;
  const minRating = parseFloat(ratingFilter.value) || 0;

  const filtered = hotels.filter(h => {
    return (selectedCity === "" || h.city === selectedCity) &&
           h.price >= minPrice &&
           h.price <= maxPrice &&
           h.rating >= minRating;
  });

  renderHotels(filtered);
}

// Button click
document.getElementById("applyFilters").addEventListener("click", applyFilters);

// Initial load
renderHotels(hotels);
</script>
