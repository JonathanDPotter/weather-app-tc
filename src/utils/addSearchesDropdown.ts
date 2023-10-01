import { Dropdown } from "bootstrap";
import SelectedAreas from "../classes/SelectedAreas";
import fillWeatherCard from "./fillWeatherCard";

const addSearchesDropdown = (selectedAreas: SelectedAreas) => {
  const topSection = document.getElementById("top-section")!;
  const dropDownTemplate = document.getElementsByTagName("template")[0]!;
  const lastChild = topSection.lastElementChild;

  // if the lastChild of topSection isn't the form, remove it
  lastChild &&
    lastChild.id !== "search-form" &&
    topSection.removeChild(lastChild);

  const searchNode = dropDownTemplate.content.cloneNode(true);

  topSection.appendChild(searchNode);

  topSection.querySelectorAll(".dropdown-toggle")[1].textContent =
    "Saved Searches";

  const searchList = topSection.querySelectorAll(".dropdown > ul")[1];

  new Dropdown(searchList!);

  const addLI = (area: any, home = false) => {
    const li = Object.assign(document.createElement("li"), {
      className: "list-group-item list-group-item-action hover-highlight",
    });

    const button = Object.assign(document.createElement("button"), {
      textContent: home
        ? `Home: ${area.location}, ${area.selectedState}`
        : `${area.location}, ${area.selectedState}`,
      className: "btn text-capitalize",
      type: "button",
      onclick: () => {
        fillWeatherCard(
          area.location,
          area.selectedState,
          area.weather,
          selectedAreas,
          area.time
        );
      },
    });

    li.appendChild(button);

    searchList?.appendChild(li);
  };

  // if there is a home area add that first
  selectedAreas.homeArea !== null &&
    addLI(
      selectedAreas.savedAreas.find(
        (area) => area.id === selectedAreas.homeArea
      ),
      true
    );

  selectedAreas.savedAreas.forEach(
    (area) => area.id !== selectedAreas.homeArea && addLI(area)
  );
};

export default addSearchesDropdown;
