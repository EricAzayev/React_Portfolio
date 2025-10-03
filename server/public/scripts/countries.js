// Renders country cards to the #main-content element.
// Expected country object shape:
// {
//   name: "United States",
//   population_growth: 0.5,         // percent (e.g. 0.5 means 0.5%)
//   middle_class_growth: 1.5,       // percent
//   urbanization_rate: 82,          // percent
//   education_index: 90,            // percent (0-100)
//   economic_openness: 78           // percent (0-100)
// }
const renderCountries = async () => {
  const response = await fetch("/countries");
  const data = await response.json();
  const mainContent = document.getElementById("main-content");

  if (data && Array.isArray(data) && data.length > 0) {
    data.forEach((country) => {
      const card = document.createElement("div");
      card.className = "country-card";

      const name = document.createElement("h2");
      name.textContent = country.name || "(Unknown)";

      const popGrow = document.createElement("p");
      popGrow.textContent = `Population growth: ${country.population_growth}%`;

      const middleGrow = document.createElement("p");
      middleGrow.textContent = `Middle class growth: ${country.middle_class_growth}%`;

      const urban = document.createElement("p");
      urban.textContent = `Urbanization rate: ${country.urbanization_rate}%`;

      const education = document.createElement("p");
      education.textContent = `Education index: ${country.education_index}%`;

      const openness = document.createElement("p");
      openness.textContent = `Economic openness: ${country.economic_openness}%`;

      // Append elements to card
      card.appendChild(name);
      card.appendChild(popGrow);
      card.appendChild(middleGrow);
      card.appendChild(urban);
      card.appendChild(education);
      card.appendChild(openness);

      Object.assign(card.style, {
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        margin: "16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        maxWidth: "300px",
        background: "#fff",
        display: "inline-block",
        verticalAlign: "top",
      });

      mainContent.appendChild(card);
    });
  } else {
    const sorry = document.createElement("h2");
    sorry.textContent = "No countries available 😞";
    mainContent.appendChild(sorry);
  }
};

const countriesLastSegment =
  window.location.pathname.split("/").filter(Boolean).pop() || "";

if (countriesLastSegment && countriesLastSegment !== "404.html") {
  window.location.href = "/404.html";
} else if (countriesLastSegment !== "404.html") {
  renderCountries();
}

// requestedURL = window.location.href.split('/').pop();
// if (requestedURL) {
//   window.location.href = "../404.html";
// }
// else{
//   renderGifts();
// }
