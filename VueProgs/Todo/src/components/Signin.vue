<template>
  <div>
    <div v-if="isSignUpActive" class="signinContainer">
      <h3 class="signUpTodo">To-Do App</h3>
      <p style="color:white,margin-bottom: 20px">Start organizing your life day-by-day.</p>
      <div class="username-wrapper">
        <input type="text" v-model="username" placeholder="Username">
      </div>
     <div class="password-wrapper">
  <input type="password" v-model="password" placeholder="Password" class="password-input">
  <button type="button" class="toggle-password" @click="togglePasswordVisibility">
    <i :class="{'fa': true, 'fa-eye': passwordVisible, 'fa-eye-slash': !passwordVisible}" aria-hidden="true"></i>
  </button>
</div>
      <button @click="signUp" class="signupButton">Sign Up</button>
      <p style="color:white;font-weight: bold;">Already have an account ? Sign In <a href="#" @click="toggleView" style="color:#BA5112;font-weight: bold;">here</a>.</p>
    </div>

    <div v-else class="signin-section">
      <h3 style="color:#BA5112;font-weight: bold;font-size:30px">To-Do App</h3>
      <p style="margin-bottom: 20px;font-weight:bold">Start organizing your life day-by-day.</p>
      <div class="signin-username-wrapper">
        <input type="text" v-model="username" placeholder="Enter your username">
      </div>
      <div class="signin-password-wrapper">
        <input type="password" v-model="password" placeholder="Enter your password">
        <button class="toggle-password">
        </button>
      </div>
      <button style="background-color:#EDB046"  class="signinButton" @click="signIn">Sign In</button>
      <p style="font-weight: bold;" >Don't have an account ? Click  <a href="#" @click="toggleView" style="font-weight: bold;" >here</a>.</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Signin',
  data() {
    return {
      isSignUpActive: true,
      username: '',
      password: '',
      passwordVisible: false,
    };
  },
  methods: {
    toggleView() {
      this.isSignUpActive = !this.isSignUpActive;
    },
signIn() {
  const credentials = {
    username: this.username.trim(),
    password: this.password.trim()
  };

  fetch('http://localhost:5174/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials)
  })
  .then(response => {
    if (!response.ok) {
      throw response;
    }
    return response.json();
  })
  .then(data => {
    if (data.valid) {
      this.$router.push('/dashboard');
    } else {
      alert(data.message);
    }
  })
  .catch(error => {
    error.json().then(errorMessage => {
      console.error('Error during sign in:', errorMessage);
      alert('An error occurred. Please try again later.');
    }).catch(() => {
      alert('An error occurred, and the response was not JSON.');
    });
  });
},
signUp() {
  // Check if username or password is empty
  if (!this.username.trim() || !this.password.trim()) {
    alert('Please enter both a username and a password.');
    return;
  }

  const userData = {
      username: this.username.trim(),
      password: this.password.trim()
  };

  fetch('http://localhost:5174/signup', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
  })
  .then(response => {
      if (!response.ok) {
          if (response.status === 409) {
              alert('Signup failed: A user with this username already exists. Try signing up with a different username.');
          } else {
              return response.json().then(data => {
                  alert('Signup failed: ' + data.message);
              });
          }
          throw new Error('Stop execution on failure');
      }
      return response.json();
  })
  .then(data => {
      alert('Signup successful! User created successfully.');
      this.$router.push({ name: 'dashboard' });
  })
  .catch(error => {
      if (error.message !== 'Stop execution on failure') { 
          alert('Signup failed: An unexpected error occurred.');
      }
  });
},
 
togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    let input = this.$el.querySelector('.password-input');
    if (this.passwordVisible) {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  },
  }
  }

</script>

<style>

.username-wrapper{
  position: relative;
  width: 300px;
  margin-bottom: 20px; 
}

.username-wrapper input[type="text"], .password-wrapper input[type="password"] {
  width: calc(100% - 40px); /* Adjust width to accommodate toggle button */
  padding-right: 40px; /* Space for toggle button */
}

.username-wrapper .toggle-username{
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 40px;
  border: none;
  background: none;
  cursor: pointer;
}

.username-wrapper  {
  font-size: 18px;
  color: #555;
}


input[type="password"] {
  width: 100%;
  padding: 10px;
  padding-right: 40px; /* space for the icon */
  box-sizing: border-box;
}

.toggle-username {
  position: absolute;
  right: 10px;
  top: 10px;
  border: none;
  background: none;
  cursor: pointer;
}

.fa {
  font-size: 18px;
}

.signinButton{
  background-color: #BA5112;
  border-radius:5px;
  border:none;
  padding: 10px;
  width: 100px;
}

.signinContainer{
  background-color:#EDB040;
  margin-left: 416px;
  padding: 40px;
}

input[type="username"], input[type="password"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc; /* Light grey border */
  border-radius: 4px; /* Rounded borders for the input fields */
  box-sizing: border-box;
  margin-top: 8px;
  font-size: 12px; /* Larger font size for better readability */
}


.signinButton {
  background-color: #BA5112;
  color: white; /* Text color for better contrast */
  border-radius: 5px;
  border: none;
  padding: 10px 20px;
  width: auto; /* Adjust width to fit text */
  cursor: pointer; /* Pointer cursor on hover */
  display: block; /* Center button */
  margin: 20px auto; /* Margin for top, bottom and auto for sides */
}

.signinContainer {
  background-color: #EDB040;
  padding: 40px;
  width: 400px; /* Fixed width */
  border-radius: 8px; /* Rounded corners for the container */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* Subtle shadow for depth */
}

/* Hover effects for buttons */
button:hover {
  opacity: 0.9;
}

/* Additional styling for links for better visibility and interaction */
a {
  color: #BA5112;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.signUpTodo{
  color:white;
  font-size:30px;
  font-weight: bold;
}

.signin-section {
  border-bottom: 2px solid #ccc; 
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); 
  padding-bottom: 20px; 
  padding: 20px;
  border-radius: 8px;
  margin-left: 416px;
  width:400px;
}

.signupButton {
  background-color: #BA5112;
  color: white; /* Text color for better contrast */
  border-radius: 5px;
  border: none;
  padding: 10px 20px;
  width: auto; /* Adjust width to fit text */
  cursor: pointer; /* Pointer cursor on hover */
  display: block; /* Center button */
  margin: 20px auto; /* Margin for top, bottom and auto for sides */
}

.signupContainer {
  background-color: #EDB040;
  padding: 40px;
  width: 400px; /* Fixed width */
  border-radius: 8px; /* Rounded corners for the container */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* Subtle shadow for depth */
}

.signin-username-wrapper input, .signin-password-wrapper input {
    width: 100%; /* Ensure full width */
    padding: 10px; /* Padding for better text alignment */
    box-sizing: border-box; /* Handles padding and border correctly */
    border: none; /* Removes all borders */
    border-bottom: 0.3px solid #ccc; /* Adds a bottom border only */
    background-color: transparent; /* Makes the background transparent */
}

.signin-username-wrapper input:focus, .signin-password-wrapper input:focus {
    outline: none; /* Removes the outline on focus */
    border-bottom: 2px solid #BA5112; /* Changes the bottom border color on focus */
}

.password-wrapper {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
}

.password-input {
  width: 100%;
  padding: 10px;
  padding-right: 40px; /* make space for the toggle icon */
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.toggle-password {
  position: absolute;
  right: 50px;
  top: 56%;
  transform: translateY(-50%);
  border: none;
  background: none;
  cursor: pointer;
  color: #888; /* Light grey icon color */
}

.fa {
  font-size: 18px; /* Size of the eye icon */
}

</style>