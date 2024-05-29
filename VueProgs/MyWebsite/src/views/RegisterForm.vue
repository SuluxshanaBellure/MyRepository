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
          <label for="email-prefix" class="input-label">
            <i class="fas fa-envelope"></i>
          </label>
          <div class="email-group">
            <input
              type="text"
              id="email-prefix"
              v-model="emailPrefix"
              required
              placeholder="Email"
              class="input-field"
              :disabled="!username"
            />
            <select v-model="emailExtension" class="email-extension" :disabled="!username">
              <option value="@gmail.com">@gmail.com</option>
              <option value="@yahoo.com">@yahoo.com</option>
              <option value="@outlook.com">@outlook.com</option>
              <option value="@hotmail.com">@hotmail.com</option>
              <option value="@custom">@custom</option>
            </select>
            <input
              v-if="emailExtension === '@custom'"
              type="text"
              v-model="customEmailExtension"
              required
              placeholder="Enter domain"
              class="input-field"
            />
          </div>
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
            :disabled="!email"
            @input="onPasswordInput"
          />
          <span v-if="passwordFeedback && passwordInputTouched" class="feedback">{{ passwordFeedback }}</span>
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
            :disabled="!password"
            @input="onConfirmPasswordInput"
          />
          <span v-if="passwordMismatch && passwordInputTouched" class="feedback">Passwords do not match</span>
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
            :disabled="!confirmPassword"
          />
        </div>
        <button type="submit" class="register-button" :disabled="isRegisterButtonDisabled">Register</button>
        <button v-if="!registrationCompleted" class="login-link" @click="openSignInForm">
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

const emits = defineEmits(["close", "registered", "openSignIn"]);
const isModalVisible = ref(true);
const username = ref("");
const emailPrefix = ref("");
const emailExtension = ref("@gmail.com");
const customEmailExtension = ref("");
const password = ref("");
const confirmPassword = ref("");
const phone = ref("");
const showPassword = ref(false);
const passwordFieldType = ref("password");
const passwordInputTouched = ref(false);
const registrationCompleted = ref(false);

const props = defineProps({
  username: String,
});

const router = useRouter();

const passwordFeedback = computed(() => {
  if (!passwordInputTouched.value) return null;
  const passwordLength = password.value.length;
  let feedback = "";

  // Check for uppercase letter
  if (!/[A-Z]/.test(password.value)) {
    feedback += "Password must contain at least one uppercase letter. ";
  }
  
  // Check for special character
  if (!/[!@#$%^&*]/.test(password.value)) {
    feedback += "Password must contain at least one special character. ";
  }
  
  // Check for minimum length
  if (passwordLength < 8) {w
    feedback += `Password must be at least ${8 - passwordLength} more characters long. `;
  }

  return feedback.trim();
});

const passwordMismatch = computed(() => {
  return confirmPassword.value && password.value !== confirmPassword.value;
});

const isRegisterButtonDisabled = computed(() => {
  return !username.value || !emailPrefix.value || (emailExtension.value === "@custom" && !customEmailExtension.value) || !password.value || passwordFeedback.value || passwordMismatch.value || !phone.value;
});

const completeEmail = computed(() => {
  return emailExtension.value === "@custom" ? `${emailPrefix.value}${customEmailExtension.value}` : `${emailPrefix.value}${emailExtension.value}`;
});

const email = computed(() => {
  return emailPrefix.value && (emailExtension.value !== "@custom" || customEmailExtension.value);
});

function handleRegister() {
  passwordInputTouched.value = true;

  if (passwordFeedback.value || passwordMismatch.value) {
    return;
  }

  axios
    .post("http://localhost:5174/register", {
      username: username.value,
      email: completeEmail.value,
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
      emits('registered', response.data.username);
      closeRegisterModal();
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
  emailPrefix.value = "";
  emailExtension.value = "@gmail.com";
  customEmailExtension.value = "";
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

function onPasswordInput() {
  passwordInputTouched.value = true;
}

function onConfirmPasswordInput() {
  passwordInputTouched.value = true;
}

function openSignInForm() {
  closeRegisterModal();
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

.email-group {
  display: flex;
  align-items: center;
}

.email-extension {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-left: 10px;
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

/* New styles for password validation feedback */
.feedback {
  color: #ff4d4d;
  background: #ffe6e6;
  border: 1px solid #ff4d4d;
  border-radius: 4px;
  padding: 5px;
  font-size: 12px;
  position: absolute;
  width: 100%;
  top: 100%;
  left: 0;
  margin-top: 5px;
  z-index: 1;
}

.feedback:before {
  content: "⚠️ ";
  font-size: 14px;
}
</style>
