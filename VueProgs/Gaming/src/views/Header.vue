<template>
  <div class="navbar">
    <h4 style="color:#660000;" class="navbar-brand" href="#" >
      Brief
    </h4>
    <div class="vl"></div>
    <div class="navbar-content">
      <ul class="navbar-nav">
        <li class="nav-item"><a href="">Stories</a></li>
        <li class="nav-item"><a href="">Creator</a></li>
        <li class="nav-item"><a href="">Community</a></li>
        <li class="nav-item"><a href="">Subscribe</a></li>
        <li class="nav-item">
          <div class="dropdown">
            <button class="dropbtn">Language</button>
            <div class="dropdown-content">
              <a @click="changeLanguage('en')">English</a>
              <a  @click="changeLanguage('hi')">Hindi</a>
              <a  @click="changeLanguage('te')">Telugu</a>
            </div>
          </div>
        </li>
        <li class="nav-item">
          <div class="dropdown">
            <button class="dropbtn">Country</button>
            <div class="dropdown-content">
              <a @click="changeLanguage('in')">India</a>
              <a  @click="changeLanguage('ar')"></a>
              <a  @click="changeLanguage('it')"></a>
            </div>
          </div>
        </li>
      </ul>
      <ul class="navbar-nav" id="icon-list">
        <li class="nav-item"><i class="fas fa-edit"></i><a class="dropdown-item" href="#">Write</a></li>
        <li class="nav-item"><i class="fas fa-bookmark"></i></li>
        <li class="nav-item"><i class="fas fa-bell"></i></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['language-changed']);

function changeLanguage(language) {
  emit('language-changed', language);
}
</script>

<style>
/* * {
  font-family: Verdana, sans-serif;
} */

.navbar {
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.navbar-brand {
   color: #660000;
  text-decoration: none;
  font-weight: bold;
  font-size: 25px;
  margin-right: 30px; /* Increase spacing between brand and vertical line */
}

.vl {
  border-left: 2px solid black;
  height: 25px;
  margin: 0 30px; /* Increase spacing around the vertical line */
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1; /* Allow this container to grow and take available space */
}

.navbar-nav {
  display: flex;
  margin: 0;
  padding: 0;
  list-style-type: none;
  align-items: center;
}

.navbar-nav li {
  margin: 0 20px; /* Increase spacing between list items */
  font-weight: bold;
  font-size: 15px;
}

.navbar-nav li a {
  color: #000;
  text-decoration: none;
}

.navbar-nav li a:hover {
  background-color: #555;
  color: #fff; 
}

#icon-list .nav-item {
  display: flex;
  align-items: center;
}

#icon-list i {
  margin-right: 8px;
}

#icon-list .dropdown-item {
  padding-left: 0;
}

.dropbtn {
  background-color: #D3D3D3;
  color: black;
  padding: 16px;
  font-weight: bold;
  font-size: 15px;
  border: none;
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #f1f1f1}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}
</style>
