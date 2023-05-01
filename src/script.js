const link =
  "http://api.weatherstack.com/current?access_key=10abf6b825c6580b068c4fa7355f04dc";

const store = {
  city: "London",
};

const fetchData = async () => {
  const result = await fetch(`${link}&query=${store.city}`);
  const data = await result.json();

  console.log(data);

  const {
    current: { feelslike, temprature, cloudcover },
  } = data;

  console.log(1, feelslike);
  console.log(2, temprature);
};

fetchData();
