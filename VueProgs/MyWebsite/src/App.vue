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
              width="40px" />
          </a>
        </div>
        <!-- Navigation Links -->
        <nav class="nav">
          <div
            class="nav-section"
            @mouseover="showCategories = true"
            @mouseleave="showCategories = false"
          >
            <h4 class="categories-heading"> Categories </h4>
            <div class="categories" v-if="showCategories">
              <router-link v-for="(subcategory, index) in subcategories" :key="index" :to="`/${subcategory.route}`">
                {{ subcategory.name }}
              </router-link>
            </div>
          </div>
          <div class="cart-icon">
            <!-- Cart icon content -->
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
import { ref } from 'vue';

const subcategories = ref([
  { name: 'Books', route: 'books' },
  { name: 'Coffee Mugs', route: 'coffeemugs' },
  { name: 'Luggage Tags', route: 'luggagetags' },
  { name: 'Mouse Pads', route: 'mousepads' }
]);

const showCategories = ref(false);
</script>

<style scoped>
/* App Styles */
.content {
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
  height: 40px; 
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
  margin-left: 0rem;
  position: relative;
  cursor: pointer;
  padding-right: 650px;
}

.categories-heading {
  margin-left: 10px;
  font-size: 12px;
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
}

.nav-section:hover .categories {
  display: flex;
}

.cart-icon {
  margin-left: auto; /* Align to the right */
}

nav a {
  color: white;
  text-decoration: none;
  margin: 0.5rem 0; /* Margin to separate each category link */
}

/* Main Styles */
.main {
  flex: 1; /* Take remaining space */
}

/* Footer Styles */
.footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 1rem;
  height: 40px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -10px;
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
