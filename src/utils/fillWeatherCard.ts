import addSearchesDropdown from "./addSearchesDropdown";
import SelectedAreas from "../classes/SelectedAreas";
import Current from "../interfaces/Current";
import { fetchWeather } from "./fetchWeather";
import api from "../api";

const fillWeatherCard = (
  location: string,
  selectedState: string,
  weather: Current,
  selectedAreas: SelectedAreas,
  time: Date = new Date()
) => {
  const weatherCard = document.getElementById("weather-card")!;
  const cardTitle = weatherCard.getElementsByClassName("card-title")[0];
  const cardImg = weatherCard.getElementsByTagName("img")[0];
  const tempDisplay = document.getElementById("temp-display")!;
  const conditionDisplay = document.getElementById("condition-display")!;
  const low = document.getElementById("low")!;
  const high = document.getElementById("high")!;
  const homeButton = document.getElementById("home-button")!;
  const saveButton = document.getElementById("save-button")!;
  const refreshButton = document.getElementById("refresh-button")!;
  const timeDisplay = document.getElementById("time-display")!;
  const id = location + selectedState;

  cardTitle.textContent = `${location}, ${selectedState}`;
  cardImg.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  tempDisplay.textContent = `${weather?.main.temp.toFixed(0).toString()}°`;
  conditionDisplay.textContent = weather?.weather[0].description || "";
  low.textContent = `Low: ${weather?.main.temp_min.toFixed(0).toString()}°`;
  high.textContent = `High: ${weather?.main.temp_max.toFixed(0).toString()}°`;
  timeDisplay.textContent = `Updated: ${time.toLocaleDateString()} ${time.toLocaleTimeString()}`;

  const showAlert = (alertText: string) => {
    const alert = Object.assign(document.createElement("div"), {
      className: "alert alert-success",
      role: "alert",
      textContent: alertText,
    });

    const main = document.getElementsByTagName("main")[0];

    main.appendChild(alert);

    setTimeout(() => {
      main.removeChild(alert);
    }, 1990);
  };

  saveButton.addEventListener("click", () => {
    selectedAreas.addArea({ id, selectedState, location, weather, time });

    showAlert(`${location}, ${selectedState} added to saved searches.`);

    addSearchesDropdown(selectedAreas);
  });

  homeButton.onclick = () => {
    selectedAreas.addHomeArea({ id, selectedState, location, weather, time });

    showAlert(`${location}, ${selectedState} added as home search.`);

    addSearchesDropdown(selectedAreas);
  };

  refreshButton.onclick = (event) => {
    fetchWeather(event, location, { code: selectedState }, selectedAreas);
  };
  
  (async () => {
    const response = await api.getGif(weather.weather[0].description);
    cardImg.src = response.data.images.original.url;
  })();
};

export default fillWeatherCard;
