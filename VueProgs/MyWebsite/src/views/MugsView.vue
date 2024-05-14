<template>
  <div class="mugs">
    <div v-if="loading">Loading...</div>
    <div v-else class="card-container">
      <div
        v-for="(mug, index) in mugs"
        :key="index"
        class="card"
        @click="viewProductDetail(mug.sku, mug.category_id)"
        @mouseenter="setHovered(index, true)"
        @mouseleave="setHovered(index, false)"
        :class="{ hovered: hoveredIndex === index }"
      >{{console.log("qqqqqqq : ",mug.category_id)}}
        <div>
          <img :src="getFullImageUrl(mug.image_url)" :alt="mug.name" />
        </div>
        <div class="content">
          <h2 class="name">{{ mug.name }}</h2>
          <p class="description">{{ truncateDescription(mug.description) }}</p>
          <p class="price">${{ mug.unit_price }}</p>
          <div class="cart-button">
            <button v-if="hoveredIndex === index" class="add-to-cart">
              Add to Cart
            </button>
            <div class="additional-options" v-if="hoveredIndex === index">
              <!-- Share button/icon -->
              <button class="share-button">
                <i style="font-size: 10px" class="fas fa-share"></i>
                <p style="font-size: 10px">Share</p>
              </button>
              <!-- Compare button/icon -->
              <button class="compare-button">
                <i style="font-size: 10px" class="fa fa-balance-scale"></i>
                <p style="font-size: 10px">Compare</p>
              </button>
              <!-- Like button/icon -->
              <button class="like-button">
                <i style="font-size: 10px" class="fa fa-heart"></i>
                <p style="font-size: 10px">Like</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const mugs = ref([]);
const loading = ref(true);
const hoveredIndex = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:5174/coffeemugs");
    if (response.status === 200) {
      mugs.value = response.data;
      loading.value = false;
    } else {
      throw new Error("Failed to fetch mugs");
    }
  } catch (error) {
    console.error("Error fetching mugs:", error);
    loading.value = false;
  }
});

const getFullImageUrl = (imageUrl) => {
  return `/coffeemugs/${imageUrl}`;
};

const truncateDescription = (description) => {
  return description.slice(0, 30);
};

const setHovered = (index, value) => {
  hoveredIndex.value = value ? index : null;
};

const viewProductDetail = async (sku, category_id) => {
  try {
    let routeName = '';
    switch (category_id) {
      case 1:
        routeName = 'booksDetail';
        break;
        case 2:
        routeName = 'coffeemugsDetail';
        break;
        case 3:
        routeName = 'mousepadsDetail';
        break;
        case 4:
        routeName = 'luggagetagsDetail';
        break;
      default:
        throw new Error("Invalid category ID");
    }
    
    const response = await axios.get(`http://localhost:5174/coffeemugs/${sku}`);
    if (response.status === 200) {
      router.push({ name: routeName, params: { sku: sku } });
    } else {
      throw new Error("Failed to fetch product details");
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
};

</script>


<style scoped>
.mugs {
  display: flex;
  justify-content: center;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 1200px;
  padding-top: 20px;
  padding-bottom: 20px;
}

.name {
  font-weight: bold;
  font-family: "Robotics", sans-serif;
  font-size: 13px;
  height: 20px;
}

.description {
  height: 30px;
  font-family: "Robotics", sans-serif;
  color: grey;
  font-size: 13px;
  height: 20px;
}

.price {
  font-weight: bold;
  font-size: 13px;
}

.card {
  position: relative;
  border: 1px solid #f8f8f8;
  border-radius: 5px;
  padding: 10px;
  width: calc(20% - 16px);
  box-sizing: border-box;
  background-color: #f8f8f8;
  transition: background-color 0.3s ease;
  z-index: 1; /* Set a default z-index */
}

.card:hover {
  background-color: #595959;
  z-index: 2; /* Increase z-index on hover */
}

.card img {
  width: 100%;
  position: relative; /* Ensure the image respects z-index */
  z-index: 1; /* Ensure the image stays behind hover background */
}

.content {
  position: relative;
  background-color: #f0f0f0;
  margin-left: -10px;
  margin-right: -10px;
  padding-left: 20px;
  z-index: 2; /* Ensure content is above image */
}

.add-to-cart {
  display: none;
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  background-color: white;
  color: #b88e2f;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 15px;
  top: 10px;
  width: 150px;
  height: 40px;
  font-family: "Robotics", sans-serif;
  /* border: 1px solid #cccccc; */
  z-index: 1;
}

.hovered .add-to-cart {
  display: block;
  margin-bottom: 150px;
}

.card:hover img {
  filter: brightness(0.3); /* Darken the image */
}

.card:hover .content {
  background-color: #595959; /* Change background color of content */
}

.additional-options {
  display: flex;
  justify-content: center;
  align-items: center; /* Align items vertically */
  margin-top: 10px; /* Adjust as needed */
  margin-left: 10px;
}

.additional-options button {
  margin-right: 10px;
  cursor: pointer;
  font-size: 5px; /* Change font size */
  font-family: "Robotics", sans-serif;
  display: flex;
  align-items: center; /* Align items vertically */
}

.additional-options button i {
  margin-right: 3px;
}

.share-button,
.compare-button,
.like-button {
  background-color: #595959;
  color: white;
  border: none;
  font-family: "Roboto", sans-serif;
  padding: 4px 4px; /* Increase padding to increase button size */
  margin-right: 2px; /* Adjust margin between buttons */
  display: flex;
  align-items: center; /* Center button content vertically */
}
</style>
