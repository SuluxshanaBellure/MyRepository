<template>
  <div class="modal">
    <div class="modal-content">
      <h3 class="heading">Register yourself</h3>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="username" class="input-label">
            <i class="fas fa-user"></i>
          </label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
            placeholder="Username"
            class="input-field"
          />
        </div>
        <div class="form-group">
          <label for="email" class="input-label">
            <i class="fas fa-envelope"></i>
          </label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="Email"
            class="input-field"
          />
        </div>
        <div class="form-group">
          <label for="password" class="input-label">
            <i class="fas fa-lock"></i>
          </label>
          <input
            :type="passwordFieldType"
            minlength="8"
            id="password"
            v-model="password"
            required
            placeholder="Password"
            class="input-field"
          />
        </div>
        <div class="form-group">
          <label for="confirmPassword" class="input-label">
            <i class="fas fa-lock"></i>
          </label>
          <input
            :type="passwordFieldType"
            id="confirmPassword"
            v-model="confirmPassword"
            required
            placeholder="Confirm Password"
            class="input-field"
          />
        </div>
        <div class="form-group checkbox-group">
          <label for="show-password" class="checkbox-label">
            <input type="checkbox" id="show-password" v-model="showPassword" @change="togglePasswordVisibility" />
            Show Passwords
          </label>
        </div>
        <div class="form-group">
          <label for="phone" class="input-label">
            <i class="fas fa-phone"></i>
          </label>
          <input
            type="tel"
            id="phone"
            maxlength="10"
            v-model="phone"
            required
            placeholder="Phone"
            class="input-field"
            @input="validatePhoneInput"
          />
        </div>
        <button type="submit" class="register-button">Register</button>
      </form>
      <router-link to="/login" @click="closeRegisterModal">
        <i class="fas fa-sign-in-alt"></i>
        Already have an account? Sign In
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import axios from "axios";

const emits = defineEmits(["close", "registered"]);
const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const phone = ref("");
const showPassword = ref(false);
const passwordFieldType = ref("password");

const router = useRouter();

function handleRegister() {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
  if (!passwordRegex.test(password.value)) {
    alert(
      "Password must contain at least one uppercase letter, one special character, and be at least 8 characters long."
    );
    return;
  }

  if (password.value !== confirmPassword.value) {
    alert("Password and confirm password do not match.");
    return;
  }

  axios
    .post("http://localhost:5174/register", {
      username: username.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
      phone: phone.value,
    })
    .then((response) => {
      console.log(response); // Log the entire response object
      clearInputs();
      alert("Registration successful!");
      emits('registered', username.value);
      closeRegisterModal();      
      // Log specific values from the response
      console.log("Registered username: ", response.data.values);
      router.push({ name: 'login', query: { registered: true } });

    })
    .catch((error) => {
      console.error(error);
      if (error.response && error.response.data === 'Email already in use') {
        alert('This email is already in use. Please use a different email.');
      } else {
        alert("Registration failed: " + error.response.data);
      }
    });
}

function clearInputs() {
  username.value = "";
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
  phone.value = "";
}

function closeRegisterModal() {
  emits("close");
}

function togglePasswordVisibility() {
  passwordFieldType.value = showPassword.value ? "text" : "password";
}

function validatePhoneInput(event) {
  const value = event.target.value;
  if (!/^\d*$/.test(value)) {
    event.target.value = value.replace(/[^\d]/g, "");
    phone.value = event.target.value;
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
  width: 400px;
}

.form-group {
  margin-bottom: 1rem;
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

.register-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 10px;
}

.register-button:hover {
  background-color: #0056b3;
}

.heading {
  text-align: center;
  font-family: cursive;
  font-size: 15px;
  margin-bottom: 20px;
}
</style>
