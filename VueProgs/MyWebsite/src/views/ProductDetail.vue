<template>
  <div class="product-detail">
    <h1>{{ product.name }}</h1>
    <img :src="getFullImageUrl(product.image_url, product.category_id)" :alt="product.name" />
    {{console.log("Category ID: ", product.category_id)}}
    <p>{{ product.description }}</p>
    <p>Price: ${{ product.unit_price }}</p>
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
      type: String,
      required: true
    }
  },
  data() {
    return {
      product: []
    };
  },
  created() {
    this.fetchProductDetails(this.sku, this.category_id);
  },
  methods: {
    async fetchProductDetails(sku, category_id) {
  try {
    const categoryRoute = this.getCategoryRoute(category_id);
    console.log("Category Route:", categoryRoute);
    const response = await axios.get(`http://localhost:5174/${categoryRoute}/${sku}`);
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
      switch (category_id) {
        case '1':
          return `/books/${imageUrl}`;
        case '2':
          return `/coffeemugs/${imageUrl}`;
        case '3':
          return `/mousepads/${imageUrl}`;
        case '4':
          return `/luggagetags/${imageUrl}`;
        default:
          return imageUrl;
      }
    },
    getCategoryRoute(category_id) {
      switch (category_id) {
        case '1':
          return 'books';
        case '2':
          return 'coffeemugs';
        case '3':
          return 'mousepads';
        case '4':
          return 'luggagetags';
        default:
          return category_id ;
      }
    }
  }
};
</script>

<style scoped>
.product-detail {
  max-width: 600px; 
  margin: 0 auto; 
  padding: 20px; 
}

.product-detail h1 {
  font-size: 24px; 
  margin-bottom: 10px;
}

.product-detail img {
  max-width: 100%; 
  margin-bottom: 20px; 
}

.product-detail p {
  font-size: 16px; 
  line-height: 1.5; 
}

.product-detail p:last-child {
  margin-bottom: 0; 
}
</style>
