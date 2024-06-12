<template>
  <div>
    <div v-if="articles.length === 0">
      <p>No data available for the selected language and country combination.</p>
    </div>
    <div v-else>
      <div class="recent-news">
        <div class="grid-container">
          <div class="recent-grid-item">
            <div class="image-container-left">
              <img :src="recentArticle.urlToImage" alt="Article Image" class="left-image" />
            </div>
            <div class="content-container-right">
              <p v-if="recentArticle.source" class="source">
                {{ recentArticle.source.name }} &bull; {{ getTimeSincePublished(recentArticle.publishedAt) }}
              </p>
              <h3 class="right-title">{{ recentArticle.title }}</h3>
            </div>
          </div>
        </div>
      </div>
      <!-- Latest news carousel -->
      <div class="header">
        <h3>The latest News</h3>
        <button @click="toggleView">{{ showCarousel ? "See All" : "Close" }}</button>
      </div>

      <div class="grid-container">
        <div class="grid-item" v-for="(article, index) in showCarousel ? visibleArticles : articles" :key="index">
          <a :href="article.url" target="_blank" class="image-link">
            <div class="image-container">
              <img :src="article.urlToImage" alt="Article Image" />
            </div>
          </a>
          <p v-if="article.source" class="source">
            <span class="source-name">{{ article.source.name.toUpperCase() }}</span> &bull;
            <span class="published-time">{{ getTimeSincePublished(article.publishedAt) }}</span>
          </p>
          <h3 class="title-container">{{ article.title }}</h3>
        </div>
      </div>
    </div>

    <div class="header">
      <h3>Most Watched News</h3>
    </div>
    <!-- Most Watched News Carousel -->
    <div class="most-watched-grid-container">
      <div class="most-watched-grid-item" v-for="(article, index) in mostWatchedArticles" :key="index">
        <!-- Display index number at the left side -->
        <div class="index-container">{{ index + 1 }}</div>
        <!-- Display news title -->
        <h3 class="most-watched-title-container">{{ article.title }}</h3>
      </div>
    </div>
    <div class="footer">
      <h3>Brief</h3>
      <p>Let's subscribe so you don't miss the latest updates</p>
      <input placeholder="Your Email">
      <button>Subscribe</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios";

const props = defineProps(["language"]);

const articles = ref([]);
const recentArticle = ref({});
const showCarousel = ref(true);
const visibleArticles = ref([]);
const mostWatchedArticles = ref([]);
const apiKey = "0c2bb49889b24943aef024db0c85b447";

watch(
  () => props.language,
  (newLanguage) => {
    fetchLatestGameNews(newLanguage);
  }
);

function fetchLatestGameNews(language) {
  axios
    .get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        category: "technology",
        country: "in",
        language: language,
        apiKey: apiKey,
      },
    })
    .then((response) => {
      articles.value = response.data.articles.sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      );
      recentArticle.value = articles.value[0];
      visibleArticles.value = articles.value.slice(0, 4);
    })
    .catch((error) => {
      console.error("Error fetching latest game news:", error);
    });

  axios
    .get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        category: "sports",
        country: "in",
        language: language,
        sortBy: "popularity",
        apiKey: apiKey,
      },
    })
    .then((response) => {
      mostWatchedArticles.value = response.data.articles.slice(0, 5);
    })
    .catch((error) => {
      console.error("Error fetching most watched news:", error);
    });
}

function toggleView() {
  showCarousel.value = !showCarousel.value;
}

function getTimeSincePublished(publishedAt) {
  const publishedDate = new Date(publishedAt);
  const currentDate = new Date();
  const timeDifference = Math.floor((currentDate - publishedDate) / (1000 * 60));
  if (timeDifference < 60) {
    return `${timeDifference} minutes ago`;
  } else {
    const hours = Math.floor(timeDifference / 60);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }
}

fetchLatestGameNews(props.language);
setInterval(() => {
  fetchLatestGameNews(props.language);
}, 5 * 60 * 1000);
</script>

<style scoped>
.carousel {
  overflow-x: auto;
  white-space: nowrap;
  margin-bottom: 20px;
}

.carousel-wrapper {
  display: inline-flex;
}

.carousel-item {
  flex: 0 0 auto;
  width: 250px;
  margin-right: 20px;
  background-color: #999999;
  border-radius: 10px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

button {
  margin-top: 4px;
  padding: 10px 20px;
  color: #660000;
  background-color: #d3d3d3;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #1c86ee;
}

img {
  height: 225px;
  width: 330px;
  border-radius: 10px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 25px;
}

.recent-news {
  margin-bottom: 20px;
  margin-left: 20px;
}

.recent-news h4 {
  margin-bottom: 10px;
  color: #333333;
}

.source-info {
  margin-top: 10px;
}

.source-info p {
  margin: 4px 0;
}

.source {
  font-weight: 0;
}

.left-image {
  height: 324px;
  width: 440px;
  position: relative;
  left: -16px;
}

.recent-grid-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.image-container {
  height: 225px;
  width: 330px;
  margin-bottom: 10px;
}

.image-container-left {
  grid-column: 1;
  height: 324px;
  width: 440px;
}

.content-container-right {
  grid-column: 2;
  padding: 36px;
}

.content-container-right h3 {
  font-size: 30px;
}

.grid-item::after {
  content: "";
  display: table;
  clear: both;
}

.right-title {
  width: 525px;
}

.title-container {
  height: 100px;
  margin-top: 2px;
  font-size: 14px;
  margin-bottom: -42px;
}

.most-watched-title-container {
  height: 100px;
  margin-top: 8px;
  font-size: 14px;
  width: 175px;
  margin-left: 10px;
}

.source-name {
  color: #660000;
  font-size: 12px;
  font-weight: bold;
}

.published-time {
  color: #000000;
  font-size: 12px;
}

.index-container {
  color: #cc0000;
  font-weight: bold;
  font-size: 40px;
  font-family: Georgia, serif;
}

.most-watched-grid-item {
  display: flex;
}

.most-watched-grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

.footer {
  text-align: center;
  margin-top: 70px;
}

.footer h3 {
  color: #cc0000;
  font-size: xx-large;
}

.footer p {
  margin-top: -20px;
  font-weight: bold;
  font-size: 18px;
}

.footer input {
  border: none;
  width: 215px;
  height: 35px;
  border-radius: 10px;
  background-color: #b8b8b8;
  padding-left: 10px;
}

.footer button {
  background-color: #b30000;
  color: #e6e6e6;
  border-radius: 10px;
}
</style>
