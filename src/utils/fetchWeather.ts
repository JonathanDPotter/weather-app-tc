import api from "../api";
import SelectedAreas from "../classes/SelectedAreas";
import fillWeatherCard from "./fillWeatherCard";

export const fetchWeather = async (
  event: Event | undefined,
  location: string,
  selectedState: { code: string },
  selectedAreas: SelectedAreas,
  refresh: boolean = false
) => {
  event && event.preventDefault();
  const weatherCard = document.getElementById("weather-card")!;
  const spinner = document.getElementById("spinner")!;

  const show = (element: HTMLElement) =>
    element.classList.contains("d-none") && element.classList.remove("d-none");

  const hide = (element: HTMLElement) =>
    !element.classList.contains("d-none") && element.classList.add("d-none");

  hide(weatherCard!);
  // spinner is shown as loading component when fetch is initiated
  show(spinner!);

  try {
    const weather = await api.getCurrentWeather(location, selectedState.code);

    if (weather) {
      fillWeatherCard(
        location,
        selectedState.code,
        weather,
        selectedAreas,
        undefined,
        refresh
      );

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
    // spinner is hidden when the fetch returns the weather or an error
    hide(spinner!);
  }
};
