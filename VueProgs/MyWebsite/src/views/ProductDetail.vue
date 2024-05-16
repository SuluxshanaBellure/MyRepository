<template>
  <div class="product-wrapper">
    <div class="product-image">
      <img :src="getFullImageUrl(product.image_url, category_id)" :alt="product.name" />
    </div>
    <div class="product-detail">
      <h1>{{ product.name }}</h1>
      <p>{{ product.description }}</p>
      <p style="font-weight:bold">Price: ${{ product.unit_price }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    sku: {
      type: String,
      required: true
    },
    category_id: {
      type: Number,
      required: true
    },
    productName: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      product: {}
    };
  },
  created() {
    this.fetchProductDetails(this.sku, this.productName, this.category_id);
  },
  methods: {
    async fetchProductDetails(sku, productName, category_id) {
      try {
        const apiUrl = `http://localhost:5174/${this.getCategoryRoute(category_id)}/${sku}/${productName}`;
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
          this.product = response.data;
        } else {
          throw new Error("Failed to fetch product details");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    },
    getFullImageUrl(imageUrl, category_id) {
      const imagePath = this.determineImagePath(imageUrl, category_id);
      console.log("Image Path:", imagePath);
      return imagePath;
    },
    determineImagePath(imageUrl, category_id) {
      switch (category_id) {
        case 1:
          return `/books/${imageUrl}`;
        case 2:
          return `/coffeemugs/${imageUrl}`;
        case 3:
          return `/mousepads/${imageUrl}`;
        case 4:
          return `/luggagetags/${imageUrl}`;
        default:
          return imageUrl;
      }
    },
    getCategoryRoute(category_id) {
      const categoryIdNumber = parseInt(category_id);
      switch (categoryIdNumber) {
        case 1:
          return 'books';
        case 2:
          return 'coffeemugs';
        case 3:
          return 'mousepads';
        case 4:
          return 'luggagetags';
        default:
          return null;
      }
    }
  }
};
</script>

<style scoped>
.product-wrapper {
  max-width: 800px;
  margin: 0 auto;
  display: flex; 
}

.product-image,
.product-detail {
  flex: 1; 
}

.product-detail {
  margin-left: 20px; 
}

.product-detail h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.product-detail p {
  font-size: 16px;
  line-height: 1.5;
}

.product-detail p:last-child {
  margin-bottom: 0;
}

.product-image img {
  max-width: 100%;
}
</style>