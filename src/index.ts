import "./scss/styles.scss";
import SelectedAreas from "./classes/SelectedAreas";
import addStateDropdown from "./utils/addStateDropdown";
import { fetchWeather } from "./utils/fetchWeather";

const searchFieldset = document.getElementsByTagName("fieldset")[0];
const locationInput = document.getElementById("location")! as HTMLInputElement;
const submit = document.getElementById("submit")!;
const dropDownTemplate = document.getElementsByTagName("template")[0]!;

const selectedAreas = new SelectedAreas();

const selectedState = { code: "" };

submit?.addEventListener("click", (event) =>
  fetchWeather(
    event,
    locationInput.value.toLowerCase(),
    selectedState,
    selectedAreas
  )
);

addStateDropdown(dropDownTemplate, searchFieldset, submit, selectedState);
