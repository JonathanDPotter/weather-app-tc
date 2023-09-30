import Current from "../interfaces/Current";

const WEATHER_KEY = "08053f3ac16b00cea446de59d7d2a352";
const GIPHY_KEY = "QngqxMH9kx6gbyq8eXZrLjJy7BHBT4OM";

const getCurrentWeather = async (location: string, stateCode: string) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location},${stateCode},001&units=imperial&appid=${WEATHER_KEY}`
    );
    const json: Current = await response.json();

    // response contains a message property if there is an error, the try/catch doesn't catch it, so I have to look for it and throw the error manually
    // @ts-ignore
    if (json.hasOwnProperty("message")) throw new Error(json.message);

    return json;
  } catch (error: any) {
    throw new Error(error);
  }
};

const getGif = async (condition: string) => {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?apiKey=${GIPHY_KEY}&s=${condition}`
    );

    const json = await response.json();

    return json;
  } catch (error: any) {
    console.log(error);
  }
};

const api = { getCurrentWeather, getGif };

export default api;
