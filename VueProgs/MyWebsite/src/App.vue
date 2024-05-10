<template>
<div class="content">
  <div class="app">
    <!-- Header -->
    <header class="header">
      <!-- Logo and Home Link -->
      <div class="logo-home">
       <a href="/">
  <img
    alt="Vue logo"
    class="logo"
    src="@/assets/logo.svg"
    height="40px"
    width= "40px"  />
</a>

      </div>
      <!-- Navigation Links -->
      <nav class="nav">
        <div class="nav-section">
          
          <router-link to="/books">Books</router-link>
          <router-link to="/mugs">Coffee Mugs</router-link>

          <router-link to="/tags">Luggage Tags</router-link>

          <router-link to="/pads">Mouse Pads</router-link>

          <!-- Add more sections as needed -->
        </div>
      </nav>
    </header>

    <!-- Main Content Body -->
    <main>
      <router-view></router-view>
    </main>

    <!-- Footer -->
   
  </div>
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

</div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import BooksView from './views/BooksView.vue'

</script>

<style scoped>
/* App Styles */
.content{
  /* width:100%; */
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 88vh;
}

/* Header Styles */
.header {
  background-color: #333;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
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
}

.nav-section {
  margin-left: 1rem;
}

nav a {
  color: white;
  text-decoration: none;
  margin: 0 0.5rem;
}

/* Main Styles */
.main {
  flex: 1; /* Take remaining space */
  /* padding: 2rem; */
}

/* Footer Styles */
.footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 1rem;
  height: 60px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0rem; /* Add padding to create space between content and social links */
}

.social-links {
  display: flex;
}

.social-links a {
  color: white;
  text-decoration: none;
  margin-left: 0.5rem; /* Add margin between social links */
}

</style>

