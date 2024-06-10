<template>
  <div class="weather">
    <div v-if="weather">
      <div class="bottom-header">
        <div class="brand-container">
          <i class="fas fa-cloud-sun" style="font-size: 30px; padding-right: 173px; margin-bottom: -13px"></i>
          <h2 class="brand">WeatherMe</h2>
          <p class="time">{{ currentTime }}</p>
        </div>
        <div class="navigation">
          <p :class="{ active: currentSlide === 0 }" @click="setSlide(0)">Yesterday</p>
          <p :class="{ active: currentSlide === 1 }" @click="setSlide(1)">Today</p>
          <p :class="{ active: currentSlide === 2 }" @click="setSlide(2)">Tomorrow</p>
        </div>
        <div class="switch-container">
          <div class="switch-labels">
            <span>°C</span>
            <label class="switch">
              <input type="checkbox" v-model="switchState" @change="toggleTemperatureUnit" />
              <span class="sliders round"></span>
            </label>
            <span>°F</span>
          </div>
        </div>
      </div>
      <div>
        <div class="search-container">
          <input type="text" v-model="searchQuery" @keyup.enter="searchWeather" @input="fetchCitySuggestions" placeholder="Search city..." style="padding-left: 100px; font-family: 'Poppins'" />
          <font-awesome-icon icon="search" class="search-icon" @click="searchWeather" />
        </div>

        <div>
          <ul v-if="suggestions.length" class="suggestions-list">
            <li v-for="(suggestion, index) in suggestions" :key="index" @click="selectCity(suggestion)">
              {{ suggestion.name }}, {{ suggestion.country }}
            </li>
          </ul>
        </div>
      </div>
      <div>
        <p v-if="!isValidCity && showErrorMessage" class="error-message">City name is invalid. Please enter a valid city name.</p>
      </div>
      <div class="carousel">
        <div class="slider" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
          <div class="slide" v-for="(slide, index) in slides" :key="index">
            <div class="row1">
              <div class="city-name">
                <span v-if="isValidCity">{{ city ? city : "" }}</span>
                <i style="margin-left: 4px" class="fas fa-map-marker-alt location-icon"></i>
              </div>
            </div>
            <div class="row2">
              <div class="temperature-info">
                <i class="fas fa-temperature-full temperature-icon"></i>
                <span class="temperature">
                  {{ getFormattedTemperature(slide.main.temp) }}°{{ switchState ? "F" : "C" }}
                </span>
                <i class="fas fa-cloud temperature-icon" style="color: #e4d9d9"></i>
                <br />
                <div>
                  <span class="date line">{{ getFormattedDate(index) }}</span>
                </div>
              </div>
            </div>

            <div class="row3">
              <div class="weather-info">
                <div class="column">
                  <p class="condition-heading">HUMIDITY</p>
                  <p class="condition-value">{{ slide.main.humidity }}%</p>
                </div>
                <div class="column">
                  <p class="condition-heading">VISIBILITY</p>
                  <p class="condition-value">{{ slide.visibility }} meters</p>
                </div>
                <div class="column">
                  <p class="condition-heading">AIR PRESSURE</p>
                  <p class="condition-value">{{ slide.main.pressure }} hPa</p>
                </div>
                <div class="column">
                  <p class="condition-heading">WIND</p>
                  <p class="condition-value">{{ slide.wind.speed }} m/s</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="arrow left-arrow" @click="prevSlide" :disabled="currentSlide === 0"></div>
        <div class="arrow right-arrow" @click="nextSlide" :disabled="isLastSlide"></div>
      </div>
    </div>
    <div v-else>
      <p>Loading weather data...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.css";

export default {
  name: "Weather",
  data() {
    return {
      city: "Hyderabad",
      searchQuery: "",
      apiKey: "1065e6454106eb069a211e15e0b7c4a1",
      weather: null,
      slides: [],
      currentSlide: 0,
      currentTime: this.getCurrentTime(),
      switchState: false,
      suggestions: [],
      isValidCity: true,
      showErrorMessage: false
    };
  },
  created() {
    this.fetchWeather();
    this.startClock();
  },
  methods: {
    async fetchWeather() {
      this.isValidCity = true;
      this.showErrorMessage = false;
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&appid=${this.apiKey}&units=metric`;
      try {
        const response = await axios.get(url);
        if (response.data && response.data.list && response.data.list.length > 0) {
          this.weather = response.data;
          this.slides = this.extractWeatherData();
          this.isValidCity = true;
        } else {
          this.slides = this.getEmptySlides();
          this.isValidCity = false;
          this.showError();
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        this.slides = this.getEmptySlides();
        this.isValidCity = false;
        this.showError();
      }
    },
    extractWeatherData() {
      const slides = [];
      if (this.weather && this.weather.list && this.weather.list.length > 0) {
        const dailyData = this.weather.list.filter((item) =>
          item.dt_txt.includes("12:00:00")
        );

        const currentDate = new Date();
        const yesterdayDate = new Date(currentDate);
        yesterdayDate.setDate(currentDate.getDate() - 1);
        const tomorrowDate = new Date(currentDate);
        tomorrowDate.setDate(currentDate.getDate() + 1);

        const yesterdayData = this.weather.list.find((item) => {
          const date = new Date(item.dt_txt);
          return (
            date.getDate() === yesterdayDate.getDate() &&
            date.getMonth() === yesterdayDate.getMonth() &&
            date.getFullYear() === yesterdayDate.getFullYear()
          );
        });

        const todayData = dailyData.find((item) => {
          const date = new Date(item.dt_txt);
          return (
            date.getDate() === currentDate.getDate() &&
            date.getMonth() === currentDate.getMonth() &&
            date.getFullYear() === currentDate.getFullYear()
          );
        });

        const tomorrowData = dailyData.find((item) => {
          const date = new Date(item.dt_txt);
          return (
            date.getDate() === tomorrowDate.getDate() &&
            date.getMonth() === tomorrowDate.getMonth() &&
            date.getFullYear() === tomorrowDate.getFullYear()
          );
        });

        slides.push(yesterdayData ? yesterdayData : this.getEmptySlide());
        slides.push(todayData ? todayData : this.getEmptySlide());
        slides.push(tomorrowData ? tomorrowData : this.getEmptySlide());
      } else {
        slides.push(this.getEmptySlide());
        slides.push(this.getEmptySlide());
        slides.push(this.getEmptySlide());
      }
      return slides;
    },
    getEmptySlide() {
      return {
        main: {
          temp: 0,
          humidity: 0,
          pressure: 0,
        },
        visibility: 0,
        wind: {
          speed: 0,
        },
      };
    },
    getEmptySlides() {
      return [this.getEmptySlide(), this.getEmptySlide(), this.getEmptySlide()];
    },
    searchWeather() {
      if (this.searchQuery.trim() !== "") {
        this.city = this.searchQuery.trim();
        this.fetchWeather();
        this.searchQuery = "";
      } else {
        this.isValidCity = false;
        this.showError();
      }
    },
      showError() {
      this.showErrorMessage = true;
      setTimeout(() => {
        this.showErrorMessage = false;
      }, 2000);
    },
    fetchCitySuggestions() {
      const url = `https://api.openweathermap.org/data/2.5/find?q=${this.searchQuery}&appid=${this.apiKey}`;
      axios
        .get(url)
        .then((response) => {
          this.suggestions = response.data.list.map((item) => ({
            name: item.name,
            country: item.sys.country,
          }));
        })
        .catch((error) => {
          console.error("Error fetching city suggestions:", error);
          this.suggestions = [];
        });
    },
    selectCity(city) {
      this.searchQuery = city.name;
      this.city = city.name;
      this.suggestions = [];
      this.fetchWeather();
    },
    getCurrentTime() {
      const now = new Date();
      return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    },
    startClock() {
      setInterval(() => {
        this.currentTime = this.getCurrentTime();
      }, 60000);
    },
     getFormattedTemperature(temp) {
      if (this.switchState) {
        return ((temp * 9) / 5 + 32).toFixed(1); 
      }
      return temp.toFixed(1); 
    },
    getFormattedDate(index) {
      const date = new Date();
      date.setDate(date.getDate() + index - 1);
      const options = { weekday: "short", day: "numeric", month: "short" };
      return date.toLocaleDateString(undefined, options);
    },
    formatTemperature() {
      this.slides = this.slides.map((slide) => ({
        ...slide,
        main: {
          ...slide.main,
          temp: this.getFormattedTemperature(slide.main.temp),
        },
      }));
    },
    setSlide(index) {
      this.currentSlide = index;
    },
    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
      }
    },
    nextSlide() {
      if (this.currentSlide < this.slides.length - 1) {
        this.currentSlide++;
      }
    },
  },
};
</script>

<style scoped>
.weather {
  text-align: center;
  font-family: "Poppins";
  background-color: #595959;
  height: 500px;
}

.bottom-header {
  align-items: center;
  margin-bottom: 40px;
  color: white;
  padding-top: 11px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.brand-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.brand {
  margin: 0;
  font-weight: 400;
  font-size: 2.5em;
  line-height: 1.5;
  padding-left: 70px;
}

.time {
  font-size: 12px;
  color: #fff;
  margin-top: 5px;
  padding-left: 216px;
  margin-top: -8px;
}

.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-right: auto;
  padding-left: 20px;
  border-radius: 30px;
  margin-top: -43px;
}

.search-container input {
  font-size: 1.2em;
  padding: 10px 20px 10px 40px;
  border-radius: 15px;
  border: none;
  outline: none;
  background-color: #e6e6e6;
  width: 300px;
}

.search-container .search-icon {
  position: absolute;
  left: 500px;
  font-size: 1.5em;
  cursor: pointer;
  color: #333;
  pointer-events: none;
}

.navigation {
  display: flex;
  gap: 20px;
  padding-right: 70px;
}

.navigation p {
  font-weight: 300;
  font-size: 1.2em;
  line-height: 1.5;
  margin: 0;
  width: 150px;
}

.navigation p.active::after {
  content: "";
  display: block;
  width: 100%;
  height: 3px;
  background-color: #e6e6e6;
  margin-top: 3px;
  margin-bottom: 5px;
}

.carousel {
  position: relative;
  background-color: #595959;
  width: 34%;
  margin: 30px auto;
}

.arrow {
  position: absolute;
  top: 50%;
  font-size: 2em;
  cursor: pointer;
  user-select: none;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.left-arrow {
  left: -50px;
}

.right-arrow {
  right: -50px;
}

.left-arrow::before {
  content: "\f104";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
}

.right-arrow::before {
  content: "\f105";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
}

.slider {
  display: flex;
  transition: transform 0.5s ease;
}

.slide {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  /* align-items: center; */
  padding: 20px;
  height: 250px;
  width: 467px;
  margin-right: 20px;
  border-radius: 20px;
}

.slide:nth-child(1) {
  background: linear-gradient(#10c38e, #0e8494);
}

.slide:nth-child(2) {
  background: linear-gradient(#ad36cb, #333333);
}

.slide:nth-child(3) {
  background: linear-gradient(#10c38e, #0e8494);
}

.row1 {
  width: 100%;
  text-align: center;
  color: white;
  padding: 10px 0;
  border-radius: 5px;
}

.row2 {
  width: 100%;
  text-align: center;
  color: white;
  padding: 8px 0;
  border-radius: 5px;
}

.row3 {
  width: 100%;
  text-align: center;
  color: white;
  padding: -5px 0;
  border-radius: 5px;
}

.city-name {
  color: white;
  margin-left: -250px;
}

.temperature-info {
  padding-top: 29px;
  position: relative;
  top: -18px;
  font-size: 32px;
  margin-right: 10px;
}

.weather-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
  color: white;
  width: 400px;
  line-height: 15px;
}

.column {
  flex: 1;
  text-align: center;
}

.column p {
  margin: 5px 0;
}

.condition-heading {
  font-size: 12px;
}

.condition-value {
  font-size: 10px;
}

.date {
  color: white;
  font-size: 12px;
  left: -138px;
  position: relative;
  top: -20px;
  border-bottom: 0.5px solid white;
}

.line {
  padding-top: 0px;
  height: 3px;
}

.switch-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -8px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 47px;
  height: 26px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.sliders {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 26px;
}

.sliders:before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .sliders {
  background-color: #2196f3;
}

input:checked + .sliders:before {
  transform: translateX(20px);
}

.switch-labels {
  display: flex;
  justify-content: space-between;
  width: 80px;
  color: white;
}

.suggestions-list {
  position: absolute;
  background-color: white;
  border: 1px solid #ddd;
  width: 500px;
  z-index: 1000;
  list-style: none;
  padding: 0;
  margin-left: 410px;
}

.suggestions-list li {
  padding: 10px;
  cursor: pointer;
}

.suggestions-list li:hover {
  background-color: #f0f0f0;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

</style>