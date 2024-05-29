<template>
  <div class="modal">
    <div class="modal-content">
      <h3 class="heading">Log In</h3>
      <form @submit.prevent="handleSignIn">
        <div class="form-group">
          <label for="email" class="input-label">
            <i class="fas fa-envelope"></i>
          </label>
          <input type="email" id="email" v-model="email" required placeholder="Email" class="input-field" />
        </div>
        <div class="form-group">
          <label for="password" class="input-label">
            <i class="fas fa-lock"></i>
          </label>
          <input :type="passwordFieldType" id="password" v-model="password" required placeholder="Password" class="input-field" />
        </div>
        <div class="form-group checkbox-group">
          <label for="show-password" class="checkbox-label">
            <input type="checkbox" id="show-password" v-model="showPassword" @change="togglePasswordVisibility" />
            Show Password
          </label>
        </div>
        <!-- Error Message -->
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <button type="submit" class="signin-button">Log In</button>
      </form>
      <router-link to="/register" @click="openRegisterForm" class="login-link">
        <i class="fas fa-user-plus"></i>
        Don't have an account? Create one.
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import axios from 'axios';
import { state, setUsername } from '../store';

// Define props
const props = defineProps({
  username: String,
});

// Define emits
const emits = defineEmits(['loggedIn', 'close', 'openRegister']);

// State variables
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const passwordFieldType = ref('password');
const errorMessage = ref(''); // State variable for error message

// Handle sign-in process
async function handleSignIn() {
  try {
    const response = await axios.post('http://localhost:5174/login', {
      email: email.value,
      password: password.value,
    });

    if (response.data.success) {
      alert('Sign in successful!');
      setUsername(response.data.username);
      console.log("Logged in username: ", response.data.username);
      clearInputs();
      closeModal();
    } else {
      errorMessage.value = 'Invalid credentials. Please try again.'; 
    }
  } catch (error) {
    console.error(error);
    errorMessage.value = 'Invalid credentials. Please try again.'; 
  }
}

// Clear input fields
function clearInputs() {
  email.value = '';
  password.value = '';
}

// Close sign-in form
function closeSignInForm() {
  emits('close'); // Emit close event
}

// Toggle password visibility
function togglePasswordVisibility() {
  passwordFieldType.value = showPassword.value ? 'text' : 'password';
}

// Open register form
function openRegisterForm() {
  emits('close');
  emits('openRegister');
}

function closeModal() {
  // Find the modal element and hide it
  const modal = document.querySelector('.modal');
  if (modal) {
    modal.style.display = 'none';
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  position: relative;
}

.input-label {
  font-size: 20px;
  margin-right: 10px;
}

.input-field {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.checkbox-group {
  margin-bottom: 15px;
  text-align: left;
}

.checkbox-label {
  font-size: 14px;
  display: flex;
  align-items: center;
}

.checkbox-label input {
  margin-right: 5px;
}

.signin-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 10px;
}

.signin-button:hover {
  background-color: #0056b3;
}

.heading {
  text-align: center;
  font-family: cursive;
  font-size: 15px;
  margin-bottom: 20px;
}

.close-button {
  margin-top: 10px;
}

.login-link {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.login-link i {
  margin-right: 5px;
}

.error-message {
  color: red;
  margin-bottom: 15px;
}
</style>
