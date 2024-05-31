<template>
  <div class="weather">
    <div v-if="weather">
      <div class="bottom-header">
        <div class="brand-container">
          <i class="fas fa-cloud-sun" style="font-size:30px;padding-right: 173px;margin-bottom: -13px;"></i>
          <h2 class="brand">WeatherMe</h2>
          <p class="time">{{ currentTime }}</p>
        </div>
        <div class="navigation">
          <p class="active">Today</p>
          <p>Tomorrow</p>
          <p>Monthly Forecast</p>
        </div>
      </div>
      <label class="switch">
        <input type="checkbox" v-model="switchState" @change="formatTemperature">
        <span class="sliders round"></span>
      </label>
      <div class="search-container">
        <input type="text" v-model="searchQuery" @keyup.enter="searchWeather" placeholder="Search city..." style="padding-left:100px" />
        <font-awesome-icon icon="search" class="search-icon" @click="searchWeather" />
      </div>
      <div class="carousel">
        <div class="slider" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
          <div class="slide" v-if="weather" v-for="(slide, index) in slides" :key="index">
            <div class="row1">
              <div class="city-name">
                <span>{{ city }}</span>
                <i style="margin-left:4px" class="fas fa-map-marker-alt location-icon"></i>
              </div>
            </div>
            <div class="row2">
              <div class="temperature-info">
                <i class="fas fa-temperature-full temperature-icon"></i>
                <span v-if="weather" class="temperature">{{ formattedTemperature }}</span>
                <i class="fas fa-cloud temperature-icon" style="color: #E4D9D9;"></i>
                <br>
                <div>
                  <span class="date line">{{ formatDate(weather.dt) }}</span>
                </div>
              </div>
            </div>
            <div class="row3">
              <div class="weather-info">
                <div class="column">
                  <p class="condition-heading">HUMIDITY</p>
                  <p class="condition-value">{{ weather.main.humidity }}%</p>
                </div>
                <div class="column">
                  <p class="condition-heading">VISIBILITY</p>
                  <p class="condition-value">{{ weather.visibility }} meters</p>
                </div>
                <div class="column">
                  <p class="condition-heading">AIR PRESSURE</p>
                  <p class="condition-value">{{ weather.main.pressure }} hPa</p>
                </div>
                <div class="column">
                  <p class="condition-heading">WIND</p>
                  <p class="condition-value">{{ weather.wind.speed }} m/s</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="left-arrow" @click="prevSlide" :disabled="currentSlide === 0"></div>
        <div class="right-arrow" @click="nextSlide" :disabled="isLastSlide"></div>
      </div>
    </div>
    <div v-else>
      <p>Loading weather data...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.css'

export default {
  name: "Weather",
  data() {
    return {
      city: "Hyderabad",
      searchQuery: "",
      apiKey: "1065e6454106eb069a211e15e0b7c4a1",
      weather: null,
      slides: ["Slide 1 Content", "Slide 2 Content", "Slide 3 Content"],
      currentSlide: 0,
      currentTime: this.getCurrentTime(),
      switchState: false,
      formattedTemperature: "",
    };
  },
  created() {
    this.fetchWeather();
    this.startClock();
  },
  beforeDestroy() {
    clearInterval(this.clockInterval);
  },
  methods: {
    async fetchWeather() {
  const currentDate = new Date();
  const prevDate = new Date(currentDate);
  const nextDate = new Date(currentDate);
  
  prevDate.setDate(prevDate.getDate() - 1); // Previous day
  nextDate.setDate(nextDate.getDate() + 1); // Next day
  
  const prevDay = prevDate.getDate();
  const currentDay = currentDate.getDate();
  const nextDay = nextDate.getDate();
  
  let day;
  
  if (this.currentSlide === 0) {
    day = prevDay;
  } else if (this.currentSlide === 1) {
    day = currentDay;
  } else {
    day = nextDay;
  }
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric`;
  
  try {
    const response = await axios.get(url);
    this.weather = response.data;
    this.formatTemperature(); 
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
    formatTime(timestamp) {
      const date = new Date(timestamp * 1000);
      const hours = date.getHours();
      const period = hours >= 12 ? 'pm' : 'am';
      const formattedHours = hours % 12 || 12;
      return `${formattedHours}:${String(date.getMinutes()).padStart(2, '0')} ${period}`;
    },
    formatDate(timestamp) {
      const options = { month: 'long', day: 'numeric', weekday: 'long' };
      const date = new Date(timestamp * 1000);
      return date.toLocaleDateString(undefined, options);
    },
    getCurrentTime() {
      const date = new Date();
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
    startClock() {
      this.clockInterval = setInterval(() => {
        this.currentTime = this.getCurrentTime();
      }, 1000);
    },
    nextSlide() {
      if (this.currentSlide < this.slides.length - 1) {
        this.currentSlide++;
      }
    },
    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
      }
    },
    formatTemperature() {
      if (this.switchState) {
        // Convert temperature to Fahrenheit
        this.formattedTemperature = `${(this.weather.main.temp * 9/5 + 32).toFixed(2)}°F`;
      } else {
        // Display temperature in Celsius
        this.formattedTemperature = `${this.weather.main.temp.toFixed(2)}°C`;
      }
    },
  },
  computed: {
  isLastSlide() {
    return this.currentSlide === this.slides.length - 1;
  }
},
};
</script>

<style scoped>
.weather {
  text-align: center;
  font-family: system-ui;
  background-color: #595959;
  height: 500px;
}

.bottom-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  color: white;
  padding-top: 11px;
}

.brand-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.brand {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 2.5em;
  line-height: 1.5;
  padding-left: 70px;
}

.time {
  font-family: 'Roboto', sans-serif;
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
  font-family: 'Roboto', sans-serif;
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
  pointer-events: none; /* Prevents click event */
}

.navigation {
  display: flex;
  gap: 20px;
  padding-right: 70px;
}

.navigation p {
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-size: 1.2em;
  line-height: 1.5;
  margin: 0;
  width: 150px;
}

.navigation p.active::after {
  content: '';
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
  width: 60%;
  margin: 30px auto;
}

.left-arrow {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  color: black;
  font-size: 2em;
  cursor: pointer;
  user-select: none;
  width: 40px;
  height: 40px;
}

.right-arrow {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  color: black;
  font-size: 2em;
  cursor: pointer;
  user-select: none;
  width: 40px;
  height: 40px;
}

/* Custom arrow styles */
.left-arrow::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  width: 30px;
  height: 30px;
  border-left: 2px solid black;
  border-bottom: 2px solid black;
}

.right-arrow::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-135deg);
  width: 30px;
  height: 30px;
  border-left: 2px solid black;
  border-bottom: 2px solid black;
}

/* Hover styles */
.left-arrow:hover::before,
.right-arrow:hover::before {
  border-color: #555;
}

.slider {
  display: flex;
  transition: transform 0.5s ease;
  margin-left: 20px;
  margin-right: 20px;
}

.slide {
  min-width: 60%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  height: 250px;
  margin-right: 80px;
  border-radius: 20px;
}

.slide:last-child {
  margin-right: 0;
}

.slide:nth-child(1) {
  background: linear-gradient(#10C38E, #0E8494);
}

.slide:nth-child(2) {
  background: linear-gradient(#AD36CB, #333333);
}

.slide:nth-child(3) {
  background: linear-gradient(#10C38E, #0E8494);
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
  margin-left: -328px;
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
  font-family: 'Poppins', sans-serif;
}

.column {
  flex: 1;
  text-align: center;
}

.column p {
  margin: 5px 0;
  font-family: 'Poppins', sans-serif;
}

.condition-heading {
  font-size: 12px;
  font-family: 'Poppins', sans-serif;
}

.condition-value {
  font-size: 10px;
  font-family: 'Poppins', sans-serif;
}

.date {
  color: white;
  font-size: 12px;
  left: -170px;
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
  margin-top: 20px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
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
  background: linear-gradient(to right,  #43d143 100%, #c2ecbc 80%);
  transition: .4s;
  border-radius: 34px;
}

.sliders:before {
  position: absolute;
  content: "";
  height: 11px;
  width: 13px;
  left: 4px;
  bottom: 2px;
  background-color: #181515;
  transition: .4s;
}

input:checked + .sliders {
  background-color: #2196F3;
}

input:focus + .sliders {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .sliders:before {
  transform: translateX(26px);
}

.sliders.round {
  border-radius: 34px;
  width: 47px;
  height: 15px;
  left: -604px;
  top: -23px;
}

.sliders.round:before {
  border-radius: 50%;
}

.switch-label {
  margin-left: 10px;
  font-family: 'Poppins', sans-serif;
  color: white;
}

.temperature {
  color: white;
  font-size: 32px;
  margin-right: 10px;
}

.temperature-icon {
  margin-right: 10px;
}
</style>
