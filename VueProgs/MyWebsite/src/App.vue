<template>
  <div class="content">
    <div class="app">
      <!-- Header -->
      <header class="header">
        <!-- Logo and Categories Link -->
        <div class="logo-categories">
          <a href="/" class="logo-home">
            <img
              alt="Vue logo"
              class="logo"
              src="@/assets/logo.svg"
              height="40px"
              width="40px"
            />
          </a>
          <div
            class="nav-section"
            @mouseover="showCategories = true"
            @mouseleave="showCategories = false"
          >
            <h4 class="categories-heading">Categories</h4>
            <div class="categories" v-if="showCategories">
              <router-link
                v-for="(subcategory, index) in subcategories"
                :key="index"
                :to="`/${subcategory.route}`"
              >
                {{ subcategory.name }}
              </router-link>
            </div>
          </div>
        </div>
        <!-- Navigation Links -->
        <nav class="nav">
          <div v-if="state.username" class="user-info">
            <span class="greeting">Hello, {{ state.username }}</span>
            <h4 style="color:red; cursor: pointer;" @click="signOut">Sign Out</h4>
          </div>    
          <span v-if="!state.username" class="user-icon" @click="openSignInForm">
            <b-button class="primary">LogIn/Register</b-button>
          </span>
          
          <!-- <button class="weather-button" @click="openWeatherView">Weather</button> -->

          <div class="cart-icon">
            <i class="fas fa-shopping-cart"></i>
          </div>
        </nav>
      </header>

      <!-- Main Content Body -->
      <main>
        <router-view></router-view>
        <WeatherView/>
      </main>

      <!-- Footer -->
      <footer class="footer">
        <div class="footer-content">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
          <div class="social-links">
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </footer>

      <!-- Modals -->
      <div class="modals">
        <div v-if="showSignInForm" class="modal">
          <SignInForm @loggedIn="updateUsername" @close="closeSignInForm" />
        </div>

        <div v-if="showRegisterForm" class="modal">
          <RegisterForm @close="closeRegisterForm" @registered="handleRegistered" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SignInForm from "./views/SignInForm.vue";
import RegisterForm from "./views/RegisterForm.vue";
import { state, clearUsername } from './store';
import WeatherView from "./views/WeatherView.vue";
import router from "../src/router/index";

const subcategories = ref([
  { name: "Books", route: "books" },
  { name: "Coffee Mugs", route: "coffeemugs" },
  { name: "Luggage Tags", route: "luggagetags" },
  { name: "Mouse Pads", route: "mousepads" },
]);

const showCategories = ref(false);
const showSignInForm = ref(false);
const showRegisterForm = ref(false);

function openSignInForm() {
  showSignInForm.value = true;
}

function closeSignInForm() {
  showSignInForm.value = false;
}

function closeRegisterForm() {
  showRegisterForm.value = false;
}

function signOut() {
  clearUsername();
}

function updateUsername(username) {
  state.username = username;
  showSignInForm.value = false;
}

function handleRegistered(username) {
  state.username = username;
  showRegisterForm.value = false;
  // showSignInForm.value = true;
}

function openWeatherView() {
  router.push('/weather');
}

</script>

<style scoped>
.content {
  /* width:100%; */
}


.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Header Styles */
.header {
  background-color: #333;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-categories {
  display: flex;
  align-items: center;
}

.logo {
  display: block;
}

.logo-home {
  display: flex;
  align-items: center;
}

.nav {
  display: flex;
  margin-left: auto; /* Align navigation to the right */
}

.nav-section {
  position: relative;
  cursor: pointer;
  margin-left: 10px;
}

.categories-heading {
  font-size: 16px;
}

.categories {
  position: absolute;
  background-color: black;
  border: 1px solid #ccc;
  padding: 5px;
  display: flex;
  flex-direction: column;
  top: 100%;
  left: 0;
  z-index: 10;
  width: 150px;
}

.nav-section:hover .categories {
  display: flex;
}

.cart-icon {
  margin-left: 20px; /* Add some space to the right */
}

.user-icon {
  margin-right: 10px; /* Add some space to the right */
  cursor: pointer; /* Add cursor pointer */
}

.user-icon i {
  font-size: 1.5rem; /* Adjust the size of the user icon */
  color: white; /* Set the color of the user icon to white */
  display: inline-block; /* Ensure the icon is displayed inline */
}

/* Main Styles */
main {
  flex: 1; /* Take remaining space */
}

/* Footer Styles */
.footer {
  background-color: #333;
  color: white;
  padding: 1rem;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.social-links {
  display: flex;
}

.social-links a {
  color: white;
  text-decoration: none;
  margin-left: 0.5rem;
}

.weather-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}

.weather-button:hover {
  background-color: #0056b3;
}

</style>
