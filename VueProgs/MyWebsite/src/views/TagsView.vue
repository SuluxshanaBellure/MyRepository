<template>
  <div class="tags">
    <div v-if="loading">Loading...</div>
    <div v-else class="card-container">
      <div
        v-for="(tag, index) in paginatedtags"
        :key="index"
        class="card"
        @click="viewProductDetail(tag.sku, tag.name, tag.category_id)"
        @mouseenter="setHovered(index, true)"
        @mouseleave="setHovered(index, false)"
        :class="{ hovered: hoveredIndex === index }"
      >
        <div>
          <img :src="getFullImageUrl(tag.image_url)" :alt="tag.name" />
        </div>
        <div class="content">
          <h2 class="name">{{ tag.name }}</h2>
          <p class="description">{{ truncateDescription(tag.description) }}</p>
          <p class="price">${{ tag.unit_price }}</p>
          <div class="cart-button" v-if="hoveredIndex === index">
            <button class="add-to-cart">Add to Cart</button>
            <div class="additional-options">
              <button class="share-button">
                <i class="fas fa-home"></i> <!-- Font Awesome home icon -->
                <p style="font-size: 10px">Share</p>
              </button>
              <button class="compare-button">
                <i class="fas fa-balance-scale"></i> <!-- Font Awesome balance-scale icon -->
                <p style="font-size: 10px">Compare</p>
              </button>
              <button class="like-button">
                <i class="fas fa-heart"></i> <!-- Font Awesome heart icon -->
                <p style="font-size: 10px">Like</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="pagination-controls">
        <div>
          <label for="product-count" class="product-count-label">No. of products per page:</label>
          <select id="product-count" v-model="productsPerPage" @change="updateProductsPerPage">
            <option v-for="count in [5, 10, 15, 'all']" :key="count" :value="count">{{ count }}</option>
          </select>
        </div>
        <div>
          <b-pagination
            v-if="productsPerPage !== 'all'"
            v-model="currentPage"
            :total-rows="tags.length"
            :per-page="productsPerPage"
            aria-controls="example-table"
          ></b-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import { BPagination } from 'bootstrap-vue-next';
import '../assets/plp.css';

const router = useRouter();
const tags = ref([]);
const loading = ref(true);
const hoveredIndex = ref(null);
const productsPerPage = ref('all');
const currentPage = ref(1);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:5174/luggagetags');
    if (response.status === 200) {
      tags.value = response.data;
    } else {
      throw new Error('Failed to fetch tags');
    }
  } catch (error) {
    console.error('Error fetching tags:', error);
  } finally {
    loading.value = false;
  }
});

const paginatedtags = computed(() => {
  if (productsPerPage.value === 'all') {
    return tags.value;
  }
  const start = (currentPage.value - 1) * parseInt(productsPerPage.value);
  const end = start + parseInt(productsPerPage.value);
  return tags.value.slice(start, end);
});

const getFullImageUrl = (imageUrl) => `/luggagetags/${imageUrl}`;

const truncateDescription = (description) => description.slice(0, 30);

const setHovered = (index, value) => {
  hoveredIndex.value = value ? index : null;
};

const viewProductDetail = async (sku, product_name, category_id) => {
  try {
    console.log("Navigating to product detail page...");
    category_id = 4;
    const routeName = "luggagetagsDetail";
    const url = `http://localhost:5174/luggagetags/${sku}/${encodeURIComponent(
      product_name
    )}`;
    console.log("Route URL:", url);
    router.push({
      name: routeName,
      params: {
        pid: `${sku}`,
        pname: encodeURIComponent(product_name),
        category_id: `${category_id}`,
      },
    });
  } catch (error) {
    console.error("Error navigating to product detail page:", error);
  }
};

const updateProductsPerPage = () => {
  currentPage.value = 1;
};
</script>
