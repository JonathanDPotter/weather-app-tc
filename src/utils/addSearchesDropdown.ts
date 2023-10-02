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
      className: "list-group-item list-group-item-action",
    });

    const button = Object.assign(document.createElement("button"), {
      textContent: home
        ? `Home: ${area.location}, ${area.selectedState}`
        : `${area.location}, ${area.selectedState}`,
      className: "btn btn-outline-dark text-capitalize",
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

    const removeButton = Object.assign(document.createElement("button"), {
      textContent: "X",
      className: "btn btn-outline-danger",
      ariaLabel: "remove search",
      type: "button",
      onclick: () => {
        selectedAreas.removeArea(area.id);
        searchList.removeChild(li);
      },
    });

    const div = Object.assign(document.createElement("div"), {
      className: "btn-group",
    });

    div.appendChild(button);
    div.appendChild(removeButton);

    li.appendChild(div);

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
