<template>
  <div v-if="isModalVisible" class="modal">
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
            @keydown="showEmailFeedback"
            :disabled="!username"
          />
          <span v-if="emailFeedback" class="feedback">{{ emailFeedback }}</span>
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
            @keydown="showPasswordFeedback"
            :disabled="!username || !email"
          />
          <span v-if="passwordFeedback" class="feedback">{{ passwordFeedback }}</span>
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
            :disabled="!username || !email || !password"
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
            :disabled="!username || !email || !password || !confirmPassword"
          />
        </div>
        <button type="submit" class="register-button">Register</button>
        <button v-if="!registrationCompleted" @click="navigateToLogin" class="login-link">
          <i class="fas fa-sign-in-alt"></i>
          Already have an account? Log In
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from 'vue-router';
import axios from "axios";
import { setUsername } from '../store';

const emits = defineEmits(["close", "registered"]);
const isModalVisible = ref(true);
const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const phone = ref("");
const showPassword = ref(false);
const passwordFieldType = ref("password");
const showEmailFeedbackFlag = ref(false);
const showPasswordFeedbackFlag = ref(false);
const registrationCompleted = ref(false); 

const props = defineProps({
  username: String,
});

const router = useRouter();

const passwordFeedback = computed(() => {
  if (!showPasswordFeedbackFlag.value) return null;
  const passwordLength = password.value.length;
  if (passwordLength < 8) {
    return `Password must be at least ${8 - passwordLength} more characters long.`;
  }
  if (!/[A-Z]/.test(password.value)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!/[!@#$%^&*]/.test(password.value)) {
    return "Password must contain at least one special character.";
  }
  return null;
});

const emailFeedback = computed(() => {
  if (!showEmailFeedbackFlag.value) return null;
  const emailLength = email.value.length;
  if (emailLength < 5) {
    return `Email must be at least ${5 - emailLength} more characters long.`;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.endsWith("@gmail.com")) {
    return "Email must end with @gmail.com.";
  }
  if (!emailRegex.test(email.value)) {
    return "Email is invalid.";
  }
  return null;
});

function handleRegister() {
  showEmailFeedbackFlag.value = true;
  showPasswordFeedbackFlag.value = true;

  if (password.value !== confirmPassword.value) {
    alert("Password and confirm password do not match.");
    return;
  }

  if (emailFeedback.value || passwordFeedback.value) {
    alert("Please fix the highlighted errors before submitting.");
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
      console.log(response);
      clearInputs();
      setUsername(response.data.username);
      console.log("REGISTER : ", response.data.username);
      alert("Registration successful!");
      navigateToLogin();
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
  isModalVisible.value = false;
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

function showEmailFeedback() {
  showEmailFeedbackFlag.value = true;
}

function showPasswordFeedback() {
  showPasswordFeedbackFlag.value = true;
}

function navigateToLogin() {
  router.push({ name: 'login', query: { registered: true } });
}
function openSignInForm() {
  emits('close');
  emits('openSignIn');
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

.feedback {
  color: red;
  font-size: 12px;
  margin-top: 5px;
  position: absolute;
  top: 100%;
  left: 40px;
  z-index: 1;
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
</style>
