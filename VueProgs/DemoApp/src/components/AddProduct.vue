<template>
  <div style="width: 1000px; margin-bottom: 20px;">
    <h3>Products</h3>
    <table class="product-table">
      <!-- Table header -->
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Image</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <!-- Loop through paginated products -->
        <tr v-for="product in paginatedProducts" :key="product.sku">
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>
            <img :src="getImageUrl(product)" alt="Product Image" style="max-width: 150px;">
          </td>
          <td>&#8377;{{ product.unit_price }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="pagination-container">
      <button @click="previousPage" :disabled="currentPage === 1" class="pagination-button">Previous</button>
      <span v-if="visiblePages[0] > 1">
        <button @click="goToPage(1)" class="pagination-button">1</button>
        <span class="ellipsis">...</span>
      </span>
      <span v-for="pageNumber in visiblePages" :key="pageNumber">
        <button @click="goToPage(pageNumber)" :class="{ 'active': currentPage === pageNumber }" class="pagination-button">{{ pageNumber }}</button>
      </span>
      <span v-if="visiblePages[visiblePages.length - 1] < totalPages">
        <span class="ellipsis">...</span>
        <button style="background-color:#666666" @click="goToPage(totalPages)" class="pagination-button">{{ totalPages }}</button>
      </span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-button">Next</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      itemsPerPage: 10,
      currentPage: 1
    };
  },
  computed: {
    paginatedProducts() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = Math.min(startIndex + this.itemsPerPage, this.products.length);
      return this.products.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.products.length / this.itemsPerPage);
    },
   visiblePages() {
  const pages = [];
  const totalPages = this.totalPages;
  const currentPage = this.currentPage;

  // Always show the current page
  pages.push(currentPage);

  // Show the previous page if not the first page
  if (currentPage > 1) {
    pages.unshift(currentPage - 1);
  }

  // Show the next page if not the last page
  if (currentPage < totalPages) {
    pages.push(currentPage + 1);
  }

  // Add ellipsis if necessary
  if (pages[0] > 2) {
    pages.unshift('...');
  }
  if (pages[pages.length - 1] < totalPages - 1) {
    pages.push('...');
  }

  return pages;
}

  },
  async created() {
    try {
      const response = await axios.get('http://localhost:5174/products');
      this.products = response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },
  methods: {
    getImageUrl(product) {
      const categoryId = product.category_id;
      let imageUrl = '';

      switch (categoryId) {
        case 1:
          imageUrl = '/images/products/books/' + product.image_url;
          break;
        case 2:
          imageUrl = '/images/products/coffeemugs/' + product.image_url;
          break;
        case 3:
          imageUrl = '/images/products/mousepads/' + product.image_url;
          break;
        case 4:
          imageUrl = '/images/products/luggagetags/' + product.image_url;
          break;
        default:
          break;
      }

      return imageUrl;
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    goToPage(pageNumber) {
      this.currentPage = pageNumber;
    }
  }
};
</script>

<style scoped>
.product-table {
  border-collapse: collapse;
  width: 100%;
}

.product-table th,
.product-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.product-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.product-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.product-table tr:hover {
  background-color: #f5f5f5;
}

.pagination {
  margin-top: 10px;
}

.pagination-button {
  background-color: #007bff;
  border: 1px solid #007bff;
  color: #fff;
  padding: 8px 12px;
  cursor: pointer;
  margin-right: 8px;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-button.active {
  font-weight: bold;
  cursor: default;
  border-color: #0056b3;
}

.ellipsis {
  padding: 0 5px;
}

/* Only the first button */
.pagination-button:first-child {
  background-color: #ccc;
  border-color: #ccc;
}

/* Only the last button */
.pagination-button:last-child {
  background-color: #ccc;
  border-color: #ccc;
}

.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination-button {
  background-color: #007bff;
  border: 1px solid #007bff;
  color: #fff;
  padding: 8px 12px;
  cursor: pointer;
  margin: 0 2px;
  transition: background-color 0.3s ease;
}

.pagination-button:hover {
  background-color: #0056b3;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-button.active {
  font-weight: bold;
  cursor: default;
  background-color: #0056b3;
}

.ellipsis {
  padding: 0 5px;
}

</style>
