<template>
  <div class="mugs">
    <div v-if="loading">Loading...</div>
    <div v-else class="card-container">
      <div
        v-for="(mug, index) in paginatedMugs"
        :key="index"
        class="card"
        @click="viewProductDetail(mug.sku,mug.name,mug.category_id )"
        @mouseenter="setHovered(index, true)"
        @mouseleave="setHovered(index, false)"
        :class="{ hovered: hoveredIndex === index }"
      >
      {{console.log("qqqqqqq : ",mug.category_id)}}
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
              <button class="share-button">
                <i style="font-size: 10px" class="fas fa-share"></i>
                <p style="font-size: 10px">Share</p>
              </button>
              <button class="compare-button">
                <i style="font-size: 10px" class="fa fa-balance-scale"></i>
                <p style="font-size: 10px">Compare</p>
              </button>
              <button class="like-button">
                <i style="font-size: 10px" class="fa fa-heart"></i>
                <p style="font-size: 10px">Like</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="controls">
        <label for="product-count" class="product-count-label"
          >No. of products per page :
        </label>
        <select
          id="product-count"
          v-model="productsPerPage"
          @change="updateProductsPerPage"
        >
          <option
            v-for="count in [5, 10, 15, 'all']"
            :key="count"
            :value="count"
          >
            {{ count }}
          </option>
        </select>
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

const mugs = ref([]);
const loading = ref(true);
const hoveredIndex = ref(null);
const productsPerPage = ref("all");
const paginatedMugs = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:5174/coffeemugs");
    if (response.status === 200) {
      mugs.value = response.data;
      loading.value = false;
      paginatedMugs.value = mugs.value;
    } else {
      throw new Error("Failed to fetch mug");
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

const viewProductDetail = async (sku, product_name, category_id) => {
  try {
    category_id=2;
    const routeName = 'coffeemugsDetail'; 
    const url = `http://localhost:5174/coffemugs/${sku}/${encodeURIComponent(product_name)}`;
    router.push({ name: routeName, params: { pid: `${sku}`, pname: encodeURIComponent(product_name),category_id:`${category_id}` } });
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
};

const updateProductsPerPage = () => {
  if (productsPerPage.value === "all") {
    paginatedMugs.value = mugs.value;
  } else {
    paginatedMugs.value = mugs.value.slice(0, productsPerPage.value);
  }
};

</script>
