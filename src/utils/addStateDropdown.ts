import states from "./states.json";
import { Dropdown } from "bootstrap";

const addStateDropdown = (
  dropDownTemplate: HTMLTemplateElement,
  searchFieldset: HTMLElement,
  submit: HTMLElement,
  selectedState: { code: string }
) => {
  const stateNode = dropDownTemplate.content.cloneNode(true);

  searchFieldset.insertBefore(stateNode, submit);

  const stateButton = searchFieldset.getElementsByTagName("button")[0];
  stateButton.textContent = "State";

  const stateList = searchFieldset.querySelector(".dropdown > ul");

  new Dropdown(stateList!);

  states.forEach((state) => {
    const li = Object.assign(document.createElement("li"), {
      className: "list-group-item list-group-item-action hover-highlight",
    });

    const button = Object.assign(document.createElement("button"), {
      textContent: state.text,
      className: "btn",
      type: "button",
    });

    button.addEventListener("click", () => {
      selectedState.code = state.code;
      stateButton.textContent = selectedState.code;
    });

    li.appendChild(button);

    stateList?.appendChild(li);
  });
};

export default addStateDropdown;
