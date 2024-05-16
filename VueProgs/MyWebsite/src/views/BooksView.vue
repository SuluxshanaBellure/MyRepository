<template>
  <div class="books">
    <div v-if="loading">Loading...</div>
    <div v-else class="card-container">
      <div
        v-for="(book, index) in books"
        :key="index"
        class="card"
        @click="viewProductDetail(book.sku,book.name,book.category_id )"
        @mouseenter="setHovered(index, true)"
        @mouseleave="setHovered(index, false)"
        :class="{ hovered: hoveredIndex === index }"
      >{{console.log("qqqqqqq : ",book.category_id)}}
        <div>
          <img :src="getFullImageUrl(book.image_url)" :alt="book.name" />
        </div>
        <div class="content">
          <h2 class="name">{{ book.name }}</h2>
          <p class="description">{{ truncateDescription(book.description) }}</p>
          <p class="price">${{ book.unit_price }}</p>
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
import "../assets/plp.css";

const router = useRouter();

const books = ref([]);
const loading = ref(true);
const hoveredIndex = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:5174/books");
    if (response.status === 200) {
      books.value = response.data;
      loading.value = false;
    } else {
      throw new Error("Failed to fetch books");
    }
  } catch (error) {
    console.error("Error fetching books:", error);
    loading.value = false;
  }
});

const getFullImageUrl = (imageUrl) => {
  return `/books/${imageUrl}`;
};

const truncateDescription = (description) => {
  return description.slice(0, 30);
};

const setHovered = (index, value) => {
  hoveredIndex.value = value ? index : null;
};

const viewProductDetail = async (sku, product_name, category_id) => {
  try {
    category_id=1;
    const routeName = 'booksDetail'; 
    const url = `http://localhost:5174/books/${sku}/${encodeURIComponent(product_name)}`;
    router.push({ name: routeName, params: { pid: `${sku}`, pname: encodeURIComponent(product_name),category_id: `${category_id}` } });
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
};

</script>
