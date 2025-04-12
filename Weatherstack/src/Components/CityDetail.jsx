import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

const cityDescriptions = {
  Tokyo:
    "In two days, dive into Tokyo's buzz — walk through Shibuya Crossing, eat your way through Tsukiji Market, visit the Meiji Shrine, and catch skyline views from the Skytree or Shinjuku at night.",
  "New York":
    "With just 48 hours, you can hit Times Square, walk Central Park, see the Statue of Liberty, and squeeze in a Broadway show or a museum like the Met or MoMA.",
  Paris:
    "Spend a morning at the Eiffel Tower, grab pastries in a Montmartre café, explore the Louvre or Musée d'Orsay, then watch the sunset along the Seine.",
  London:
    "See Big Ben, stroll through Hyde Park, tour the Tower of London, and end your day with a pint in a cozy pub — or catch a West End show if you're feeling fancy.",
  Sydney:
    "Take in the Opera House and Harbour Bridge, relax on Bondi Beach, then ferry over to Manly for a chill afternoon. Don't skip the coastal walk or fish and chips by the water.",
  Dubai:
    "Check out the Burj Khalifa and Dubai Mall, wander the old souks, go on a desert safari, and maybe end with dinner at a rooftop overlooking the Marina skyline.",
  Singapore:
    "Visit Gardens by the Bay, walk through Chinatown and Little India, ride the cable car to Sentosa, and grab street food at a hawker center like Lau Pa Sat.",
  Berlin:
    "Walk the Berlin Wall, visit the Holocaust Memorial, hang out in a café near Kreuzberg, and maybe catch a techno night if you're up for it. The street art alone is worth the trip.",
  "Rio de Janeiro":
    "See Christ the Redeemer, take the cable car up Sugarloaf Mountain, chill on Copacabana beach, and enjoy samba music and fresh caipirinhas at night.",
  "Cape Town":
    "Hike or cable up Table Mountain, explore the V&A Waterfront, visit Robben Island, and if there’s time, drive out to the Cape of Good Hope — epic views guaranteed.",
};

const sunPhases = ["🌅", "🌄", "☀️", "🌇", "🌆", "🌃", "🌙"];

// Helper function to parse time into seconds
const parseTime = (time) => {
  if (!time) return 0;
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return hours * 3600 + minutes * 60 + (seconds || 0);
};

// Mock function to get the current time for a city (replace with actual logic if needed)
const getCurrentTime = (timeZone) => {
  return new Date().toLocaleTimeString("en-US", { timeZone });
};

// Mock city time zones (replace with actual data if available)
const cityTimeZones = {
  "New York": "America/New_York",
  "Los Angeles": "America/Los_Angeles",
  Chicago: "America/Chicago",
};

// Function to determine the sun phase emoji
const getSunPhaseEmoji = (city, data) => {
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

const CityDetail = () => {
  const params = useParams();
  const [data, setData] = useState({});
  const getSun = "https://api.sunrisesunset.io/json?";
  console.log("CityDetail", params.symbol);
  const city = params.symbol || "Paris";

  useEffect(() => {
    const fetchData = async () => {
      let results = {};
      try {
        const response = await fetch(getSun + cityLocations.get(city)); // Replace with actual lat/lng
        if (!response.ok) throw new Error("Network response was not ok");
        const json = await response.json();
        results[city] = json.results;
      } catch (error) {
        console.error("Error fetching data for", params, error);
      }
      setData(results);
    };
    fetchData();
    const interval = setInterval(fetchData, 1000); // Fetch every 60 seconds
    return () => clearInterval(interval);
  }, [params.symbol]);

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <table border="1">
        <thead>
          <tr>
            <th>City</th>
            <th>Sunrise</th>
            <th>Sunset</th>
            <th>Current Time</th>
            <th>Phase</th>
          </tr>
        </thead>
        <tbody>
          {city && (
            <tr key={city}>
              <td>
                {city} {data[city]?.sunrise ? "✅" : "❌"}
              </td>
              <td>{data[city]?.sunrise || "Loading..."}</td>
              <td>{data[city]?.sunset || "Loading..."}</td>
              <td>{getCurrentTime(cityTimeZones[city])}</td>
              <td>{getSunPhaseEmoji(city, data)}</td>
            </tr>
          )}
        </tbody>
      </table>
      <p>{cityDescriptions[city]}</p>
    </div>
  );
};

export default CityDetail; ////
