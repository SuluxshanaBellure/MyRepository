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
