import WeatherObject from "../interfaces/WeatherObject";

interface Area {
  id: string;
  location: string;
  selectedState: string;
  weather: WeatherObject;
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

  exists(id: string) {
    return this.savedAreas.find((area) => area.id === id);
  }

  addArea(newArea: Area) {
    // if an area already exists with the same location (id), this will update that Area, otherwise it will push a new Area onto the selectedAreas array 
    this.exists(newArea.id)
      ? (this.savedAreas[this.savedAreas.indexOf(this.exists(newArea.id)!)] =
          newArea)
      : this.savedAreas.push(newArea);
  }

  addHomeArea(newArea: Area) {
    this.exists(newArea.id)
      ? (this.homeArea = newArea.id)
      : this.savedAreas.push(newArea) && (this.homeArea = newArea.id);
  }

  removeArea(id: string) {
    this.savedAreas = this.savedAreas.filter((area) => area.id !== id);
  }
}

export default SelectedAreas;
