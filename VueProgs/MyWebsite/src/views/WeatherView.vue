<template>
  <div class="weather">
    <div v-if="weather">
      <div class="bottom-header">
        <h2 class="brand">WeatherMe</h2>
        <div class="navigation">
          <p class="active">Today</p>
          <p>Tomorrow</p>
          <p>Monthly Forecast</p>
        </div>
      </div>
      <div class="search-container">
        <input type="text" v-model="searchQuery" @keyup.enter="searchWeather" placeholder="Search city..." />
        <font-awesome-icon icon="search" class="search-icon" @click="searchWeather" />
      </div>
      <h1>Weather in {{ city }}</h1>
      <p>Temperature: {{ weather.main.temp }}°C</p>
      <p>Humidity: {{ weather.main.humidity }}%</p>
      <p>Visibility: {{ weather.visibility }} meters</p>
      <p>Air Pressure: {{ weather.main.pressure }} hPa</p>
      <p>Wind: {{ weather.wind.speed }} m/s</p>
      <p>Time: {{ new Date(weather.dt * 1000).toLocaleTimeString() }}</p>
      <p>Date: {{ new Date(weather.dt * 1000).toLocaleDateString() }}</p>
      <p>Condition: {{ weather.weather[0].description }}</p>
    </div>
    <div v-else>
      <p>Loading weather data...</p>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "Weather",
  data() {
    return {
      city: "Hyderabad",
      searchQuery: "",
      apiKey: "1065e6454106eb069a211e15e0b7c4a1",
      weather: null,
    };
  },
  created() {
    this.fetchWeather();
  },
  methods: {
    async fetchWeather() {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric`;
      try {
        const response = await axios.get(url);
        this.weather = response.data;
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    },
    searchWeather() {
      if (this.searchQuery) {
        this.city = this.searchQuery;
        this.fetchWeather();
        this.searchQuery = "";
      }
    },
  },
};
</script>

<style scoped>
.weather {
  text-align: center;
  font-family: Arial, sans-serif;
  background-color: #595959;
  height: 493px;
}

.bottom-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  color: white;
  padding-top: 30px;
}

.brand {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 2.5em;
  line-height: 1.5;
  padding-left: 70px;
}

.search-container {
  display: flex;
  align-items: center;
  position: relative;
  margin-right: auto;
  padding-left: 20px;
}

.search-container input {
  font-family: 'Roboto', sans-serif;
  font-size: 1.2em;
  padding: 5px 10px 5px 35px; /* Add padding to the left for the icon */
  border-radius: 5px;
  border: none;
  outline: none;
}

.search-container .search-icon {
  position: absolute;
  left: 10px; /* Adjust this value as needed */
  font-size: 1.5em;
  cursor: pointer;
  color: #333; /* Change color as needed */
}

.navigation {
  display: flex;
  gap: 20px;
  padding-right: 70px;
}

.navigation p {
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 1.2em;
  line-height: 1.5;
  margin: 0;
}

.navigation p.active {
  text-decoration: underline;
  text-decoration-color: white;
}

h1 {
  font-size: 2em;
  margin-bottom: 0.5em;
}

p {
  font-size: 1.2em;
  margin: 0.3em 0;
}
</style>
