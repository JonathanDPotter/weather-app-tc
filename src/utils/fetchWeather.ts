import api from "../api";
import SelectedAreas from "../classes/SelectedAreas";
import fillWeatherCard from "./fillWeatherCard";

export const fetchWeather = async (
  event: Event,
  location: string,
  selectedState: { code: string },
  selectedAreas: SelectedAreas
) => {
  event.preventDefault();
  const weatherCard = document.getElementById("weather-card")!;
  const spinner = document.getElementById("spinner")!;

  const show = (element: HTMLElement) =>
    element.classList.contains("d-none") && element.classList.remove("d-none");

  const hide = (element: HTMLElement) =>
    !element.classList.contains("d-none") && element.classList.add("d-none");

  hide(weatherCard!);
  show(spinner!);

  try {
    const weather = await api.getCurrentWeather(location, selectedState.code);

    if (weather) {
      fillWeatherCard(location, selectedState.code, weather, selectedAreas);

      show(weatherCard!);
    }
  } catch (error: any) {
    const errorAlert = Object.assign(document.createElement("div"), {
      className: "alert alert-danger fs-6",
      role: "alert",
      textContent: error.message,
    });

    const main = document.getElementsByTagName("main")[0];

    main.appendChild(errorAlert);

    setTimeout(() => {
      main.removeChild(errorAlert);
    }, 2000);
  } finally {
    hide(spinner!);
  }
};
