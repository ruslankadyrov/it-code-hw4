const link =
  "http://api.weatherstack.com/current?access_key=fa13843b5a845d90d96ced7587d61391";

const content = document.querySelector("#weather-content");

let store = {
  city: "London",
  feelslike: 0,
  temperature: 0,
  cloudcover: 0,
  humidity: 0,
  observationTime: "00:00 AM",
  pressure: 0,
  uvIndex: 0,
  visibility: 0,
  isDay: "yes",
  description: "",
  windSpeed: 0,
};

const fetchData = async () => {
  // const result = await fetch(`${link}&query=${store.city}`);
  // const data = await result.json();

  console.log(data);

  const {
    current: {
      feelslike,
      temperature,
      cloudcover,
      humidity,
      observation_time: observationTime,
      pressure,
      uv_index: uvIndex,
      visibility,
      is_day: isDay,
      weather_descriptions: description,
      windSpeed,
    },
    location: { name },
  } = data;

  store = {
    ...store,
    feelslike,
    temperature,
    cloudcover,
    humidity,
    observationTime,
    pressure,
    uvIndex,
    visibility,
    isDay,
    description: description[0],
    windSpeed,
  };

  renderComponent();
};

const renderComponent = () => {
  content.innerHTML = `${store.temperature}°C`;
};

fetchData();
