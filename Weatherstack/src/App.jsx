import { useState, useEffect } from "react";

import "./App.css";

const cityLocations = new Map([
  ["Tokyo", "lat=35.6895&lng=139.6917"],
  ["New York", "lat=40.7128&lng=-74.0060"],
  ["Paris", "lat=48.8566&lng=2.3522"],
  ["London", "lat=51.5074&lng=-0.1278"],
  ["Sydney", "lat=-33.8688&lng=151.2093"],
  ["Dubai", "lat=25.276987&lng=55.296249"],
  ["Singapore", "lat=1.3521&lng=103.8198"],
  ["Berlin", "lat=52.5200&lng=13.4050"],
  ["Rio de Janeiro", "lat=-22.9068&lng=-43.1729"],
  ["Cape Town", "lat=-33.9249&lng=18.4241"],
]);

const cityCoordinates = {
  Tokyo: { lat: 35.6895, lng: 139.6917 },
  "New York": { lat: 40.7128, lng: -74.006 },
  Paris: { lat: 48.8566, lng: 2.3522 },
  London: { lat: 51.5074, lng: -0.1278 },
  Sydney: { lat: -33.8688, lng: 151.2093 },
  Dubai: { lat: 25.276987, lng: 55.296249 },
  Singapore: { lat: 1.3521, lng: 103.8198 },
  Berlin: { lat: 52.52, lng: 13.405 },
  "Rio de Janeiro": { lat: -22.9068, lng: -43.1729 },
  "Cape Town": { lat: -33.9249, lng: 18.4241 },
};

const cityTimeZones = {
  Tokyo: "Asia/Tokyo",
  "New York": "America/New_York",
  Paris: "Europe/Paris",
  London: "Europe/London",
  Sydney: "Australia/Sydney",
  Dubai: "Asia/Dubai",
  Singapore: "Asia/Singapore",
  Berlin: "Europe/Berlin",
  "Rio de Janeiro": "America/Sao_Paulo",
  "Cape Town": "Africa/Johannesburg",
};

const getSun = "https://api.sunrisesunset.io/json?";

function App() {
  const [cities, setCities] = useState([
    "Tokyo",
    "New York",
    "Paris",
    "London",
    "Sydney",
    "Dubai",
    "Singapore",
    "Berlin",
    "Rio de Janeiro",
    "Cape Town",
  ]);
  const [removed, setRemoved] = useState([]);
  const [data, setData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedCity, setSearchedCity] = useState(null);

  function removeCity(city) {
    setCities((prevCities) => prevCities.filter((c) => c !== city));
    setRemoved((prevRemoved) =>
      prevRemoved ? [...prevRemoved, city] : [city]
    );
  }

  const filterByHemisphere = (direction) => {
    const filteredCities = cities.filter((city) => {
      const { lat, lng } = cityCoordinates[city];
      if (direction === "North") return lat > 0;
      if (direction === "South") return lat < 0;
      if (direction === "East") return lng > 0;
      if (direction === "West") return lng < 0;
      return false;
    });

    setCities((prevCities) =>
      prevCities.filter((city) => !filteredCities.includes(city))
    );
    setRemoved((prevRemoved) => [...prevRemoved, ...filteredCities]);
  };

  const handleSearch = () => {
    if (cities.includes(searchQuery)) {
      setSearchedCity(searchQuery);
      removeCity(searchQuery);
    } else if (removed.includes(searchQuery)) {
      alert("City is already in the removed list!");
      setSearchedCity(null);
    } else {
      alert("City not found!");
      setSearchedCity(null);
    }
    setSearchQuery("");
  };

  useEffect(() => {
    const fetchData = async () => {
      let results = {};
      for (let city of cities) {
        try {
          const response = await fetch(getSun + cityLocations.get(city));
          const json = await response.json();
          results[city] = json.results;
        } catch (error) {
          console.error("Error fetching data for", city, error);
        }
      }
      setData(results);
    };
    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, [cities]);

  const getCurrentTime = (timezone) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: timezone,
      hour12: false,
    }).format(new Date());
  };

  const sunPhases = ["🌅", "🌄", "☀️", "🌇", "🌆", "🌃", "🌙"];

  //sunphase[i] where i =
  //0 for 1 hour before and after sunrise time
  //1 for 1 hour after sunrise to 12:00
  //2 for 1 hour from 12 to one hour before sunset
  //3 for 1 hour before and after sunset
  //4 for all times 1 hour after sunset to 2 hours after sunset
  //5 for all times until 24:00
  //6 from 0:00 to 1 hour before sunrise

  const parseTime = (time) => {
    if (!time) return 0;
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60 + (seconds || 0);
  };

  const getSunPhaseEmoji = (city) => {
    if (!data[city]?.sunrise || !data[city]?.sunset) return "⏳";

    const currentTime = getCurrentTime(cityTimeZones[city]);
    const sunriseTime = data[city].sunrise;
    const sunsetTime = data[city].sunset;

    const currentSeconds = parseTime(currentTime);
    const sunriseSeconds = parseTime(sunriseTime);
    const sunsetSeconds = parseTime(sunsetTime);

    // Define phase time boundaries
    const sunriseStart = sunriseSeconds - 3600; // 1 hour before sunrise
    const sunriseEnd = sunriseSeconds + 3600; // 1 hour after sunrise
    const noonStart = 12 * 3600; // 12:00 PM in seconds
    const noonEnd = sunsetSeconds - 3600; // 1 hour before sunset
    const sunsetStart = sunsetSeconds - 3600; // 1 hour before sunset
    const sunsetEnd = sunsetSeconds + 3600; // 1 hour after sunset
    const duskEnd = sunsetSeconds + 7200; // 2 hours after sunset

    // Debugging logs
    console.log(city, {
      currentTime,
      sunriseTime,
      sunsetTime,
      currentSeconds,
      sunriseSeconds,
      sunsetSeconds,
      sunriseStart,
      sunriseEnd,
      noonStart,
      noonEnd,
      sunsetStart,
      sunsetEnd,
      duskEnd,
    });

    if (currentSeconds >= sunriseStart && currentSeconds <= sunriseEnd)
      return sunPhases[0]; // 🌅 1 hour before/after sunrise
    if (currentSeconds > sunriseEnd && currentSeconds < noonStart)
      return sunPhases[1]; // 🌄 1 hour after sunrise to 12:00
    if (currentSeconds >= noonStart && currentSeconds < noonEnd)
      return sunPhases[2]; // ☀️ 12:00 to 1 hour before sunset
    if (currentSeconds >= sunsetStart && currentSeconds <= sunsetEnd)
      return sunPhases[3]; // 🌇 1 hour before/after sunset
    if (currentSeconds > sunsetEnd && currentSeconds <= duskEnd)
      return sunPhases[4]; // 🌆 1 to 2 hours after sunset
    if (currentSeconds > duskEnd && currentSeconds < 86400) return sunPhases[5];
    return sunPhases[6]; // 🌙 00:00 to 1 hour before sunrise
  };

  const getLatestSunsetCity = () => {
    let latestCity = null;
    let latestTime = "00:00:00 PM";

    for (let city of cities) {
      const sunset = data[city]?.sunset;
      if (sunset && sunset > latestTime) {
        latestTime = sunset;
        latestCity = city;
      }
    }
    return latestCity;
  };

  const getEarliestSunriseCity = () => {
    let earliestCity = null;
    let earliestTime = Infinity;

    for (let city of cities) {
      const sunrise = data[city]?.sunrise;
      if (sunrise) {
        const sunriseDate = new Date(`1970-01-01 ${sunrise}`);
        const sunriseTime = sunriseDate.getTime();

        if (sunriseTime < earliestTime) {
          earliestTime = sunriseTime;
          earliestCity = city;
        }
      }
    }
    return earliestCity;
  };

  const addCity = (city) => {
    setRemoved((prevRemoved) => prevRemoved.filter((c) => c !== city));
    setCities((prevCities) => [...prevCities, city]);
  };

  return (
    <div>
      <h1>Sunrise & Sunset Times</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a city"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {searchedCity && (
        <div>
          <h3>Search Result:</h3>
          <p>City: {searchedCity}</p>
          <p>Current Time: {getCurrentTime(cityTimeZones[searchedCity])}</p>
        </div>
      )}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <button onClick={() => filterByHemisphere("North")}>
          Filter North
        </button>
        <button onClick={() => filterByHemisphere("South")}>
          Filter South
        </button>
        <button onClick={() => filterByHemisphere("East")}>Filter East</button>
        <button onClick={() => filterByHemisphere("West")}>Filter West</button>
      </div>
      <div style={{ display: "flex", gap: "20px" }}>
        <table border="1">
          <thead>
            <tr>
              <th>City</th>
              <th>Sunrise</th>
              <th>Sunset</th>
              <th>Current Time</th>
              <th>Phase</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((city) => (
              <tr key={city}>
                <td>{city}</td>
                <td>{data[city]?.sunrise || "Loading..."}</td>
                <td>{data[city]?.sunset || "Loading..."}</td>
                <td>{getCurrentTime(cityTimeZones[city])}</td>
                <td>{getSunPhaseEmoji(city)}</td>
                <td>
                  <button onClick={() => removeCity(city)}>❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <table border="1">
          <thead>
            <tr>
              <th>Removed Cities</th>
            </tr>
          </thead>
          <tbody>
            {removed?.map((city) => (
              <tr
                key={city}
                onClick={() => addCity(city)}
                style={{ cursor: "pointer" }}
              >
                <td>{city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3>City with Latest Sunset: {getLatestSunsetCity()}</h3>
      <h3>City with Earliest Sunrise: {getEarliestSunriseCity()}</h3>
    </div>
  );
}

export default App;
