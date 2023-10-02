import addSearchesDropdown from "./addSearchesDropdown";
import SelectedAreas from "../classes/SelectedAreas";
import { fetchWeather } from "./fetchWeather";
import api from "../api";
import WeatherObject from "../interfaces/WeatherObject";

const fillWeatherCard = (
  location: string,
  selectedState: string,
  weather: WeatherObject,
  selectedAreas: SelectedAreas,
  time: Date = new Date(),
  refresh: boolean = false
) => {
  const weatherCard = document.getElementById("weather-card")!;
  const cardTitle = weatherCard.getElementsByClassName("card-title")[0];
  const cardImg = weatherCard.getElementsByTagName("img")[0];
  const tempDisplay = document.getElementById("temp-display")!;
  const conditionDisplay = document.getElementById("condition-display")!;
  const lowDisplay = document.getElementById("low")!;
  const highDisplay = document.getElementById("high")!;
  const homeButton = document.getElementById("home-button")!;
  const saveButton = document.getElementById("save-button")!;
  const refreshButton = document.getElementById("refresh-button")!;
  const timeDisplay = document.getElementById("time-display")!;
  const main = document.getElementsByTagName("main")[0];
  const id = location + selectedState;

  const { cityState, temp, condition, low, high, img } = weather;

  cardTitle.textContent = cityState;
  tempDisplay.textContent = `${temp}°`;
  conditionDisplay.textContent = condition || "";
  lowDisplay.textContent = `Low: ${low}°`;
  highDisplay.textContent = `High: ${high}°`;
  timeDisplay.textContent = `Updated: ${time.toLocaleDateString()} ${time.toLocaleTimeString()}`;
  cardImg.src = img;

  const showAlert = (alertText: string) => {
    const alert = Object.assign(document.createElement("div"), {
      className: "alert alert-success",
      role: "alert",
      textContent: alertText,
    });

    main.appendChild(alert);

    setTimeout(() => {
      main.removeChild(alert);
    }, 1990);
  };

  const handleClick = (type: string) => {
    let message = "";

    switch (type) {
      case "save":
        selectedAreas.addArea({ id, selectedState, location, weather, time });
        message = refresh ? "refreshed" : "added to saved searches";
        break;

      case "home":
        selectedAreas.addHomeArea({
          id,
          selectedState,
          location,
          weather,
          time,
        });
        message = "added as home search";
        break;

      case "refresh":
        fetchWeather(
          undefined,
          location,
          { code: selectedState },
          selectedAreas,
          true
        );
        break;

      default:
        break;
    }

    showAlert(`${location}, ${selectedState} ${message}.`);

    addSearchesDropdown(selectedAreas);
  };

  main.style.backgroundImage = `url(${img})`;

  refresh && selectedAreas.exists(id) && handleClick("save");

  saveButton.onclick = () => handleClick("save");

  homeButton.onclick = () => handleClick("home");

  refreshButton.onclick = () => handleClick("refresh");

  (async () => {
    const response = await api.getGif(condition);
    cardImg.src = response.data.images.original.url;
  })();
};

export default fillWeatherCard;
