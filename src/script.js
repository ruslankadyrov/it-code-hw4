const link =
  "http://api.weatherstack.com/current?access_key=c385ff3e404c8acb735e3cac865f4137";

const content = document.querySelector("#weather-content");

const dom = {
  city: document.querySelector("#city-input"),
  show: document.querySelector("#city-submit"),
};

let store = {
  city: "",
  feelslike: 0,
  temperature: 0,
  cloudcover: 0,
  humidity: 0,
  observationTime: "00:00 AM",
  pressure: 0,
  uvIndex: 0,
  visibility: 0,
  isDay: "yes",
  description: "undefined",
  windSpeed: 0,
};

dom.show.onclick = () => {
  store.city = dom.city.value;
  if (store.city) {
    fetchData();
  } else {
    alert("Enter city!");
  }
};

const fetchData = async () => {
  let catchError;
  try {
    const result = await fetch(`${link}&query=${store.city}`, {
      redirect: "manual",
    });
    const data = await result.json();

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
        wind_speed: windSpeed,
      },
      location: { name },
    } = data;

    store = {
      ...store,
      name,
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
  } catch (error) {
    catchError = error;
    alert("Сheck the city or try again later!");
  }

  if (!catchError) {
    renderComponent();
  }
};

const renderComponent = () => {
  const wetherHTML = `          
  <div class="weather-top">${store.name}, ${store.description}, ${store.observationTime}</div>

  <div class="current-weather">
    <div class="weather-column">
      <div class="current-indicators">
        <img src="./images/temp.png" alt="Temperature" />
        <div class="curent-text">
          <div class="indicators-text">${store.temperature}°C feels like ${store.feelslike}°C</div>
          <div class="discription">Temperature</div>
        </div>
      </div>

      <div class="current-indicators">
        <img src="./images/cloud.png" alt="Cloudcover" />
        <div class="curent-text">
          <div class="indicators-text">${store.cloudcover}%</div>
          <div class="discription">Cloudcover</div>
        </div>
      </div>

      <div class="current-indicators">
        <img src="./images/pressure.png" alt="Pressure" />
        <div class="curent-text">
          <div class="indicators-text">${store.pressure} mmHg</div>
          <div class="discription">Pressure</div>
        </div>
      </div>
    </div>

    <div class="weather-column">
      <div class="current-indicators">
        <img src="./images/uvIndex.png" alt="UV Index" />
        <div class="curent-text">
          <div class="indicators-text">${store.uvIndex} of 10</div>
          <div class="discription">UV Index</div>
        </div>
      </div>

      <div class="current-indicators">
        <img src="./images/humidity.png" alt="Humidity" />
        <div class="curent-text">
          <div class="indicators-text">${store.humidity}%</div>
          <div class="discription">Humidity</div>
        </div>
      </div>

      <div class="current-indicators">
        <img src="./images/windspeed.png" alt="Wind speed" />
        <div class="curent-text">
          <div class="indicators-text">${store.windSpeed} km/h</div>
          <div class="discription">Wind speed</div>
        </div>
      </div>
    </div>
  </div>
  `;
  content.innerHTML = wetherHTML;
};
