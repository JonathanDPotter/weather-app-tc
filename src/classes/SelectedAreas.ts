import Current from "../interfaces/Current";

interface Area {
  id: string;
  location: string;
  selectedState: string;
  weather: Current;
  time: Date;
}

interface SelectedAreas {
  homeArea: string | null;
  savedAreas: Area[];
}

class SelectedAreas {
  constructor() {
    this.homeArea = null;
    this.savedAreas = [];
  }

  addArea(newArea: Area) {
    const exists = this.savedAreas.find((area) => area.id === newArea.id);

    exists
      ? (this.savedAreas[this.savedAreas.indexOf(exists)] = newArea)
      : this.savedAreas.push(newArea);
  }

  addHomeArea(newArea: Area) {
    const exists = this.savedAreas.find((area) => area.id === newArea.id);

    console.log(exists)

    exists
      ? (this.homeArea = exists.id)
      : this.savedAreas.push(newArea) && (this.homeArea = newArea.id);
  }

  removeArea(id: string) {
    this.savedAreas = this.savedAreas.filter((area) => area.id !== id);
  }
}

export default SelectedAreas;
