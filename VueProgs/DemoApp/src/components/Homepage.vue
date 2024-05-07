<template>
  <header>
    <div class="wrapper">
      <nav>
        <router-link to="/home" class="nav-link">Home</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
        <router-link to="/addProduct" class="nav-link">AddProduct</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
header {
  background-color:  #a3c2c2;
  padding: 10px 0;
  width: 100%; /* Set the header width to 100% */
  position: fixed; /* Fix the header to the top */
  top: 0; /* Position the header at the top */
  z-index: 1000; /* Ensure the header appears above other content */
}

.wrapper {
  max-width: 100%; /* Set the wrapper width to 100% */
  margin: 0; /* Remove any margin */
}

nav {
  display: flex;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  padding: 10px;
}

.nav-link:hover {
  background-color: #d6d6c2;
  border-radius: 4px;
}

.nav-link.active {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
