<template>
  <div>
    <h2>Users</h2>
    <!-- Display loading message -->
    <div v-if="loading">
      Loading users...
    </div>
    <!-- Display error message -->
    <div v-else-if="error">
      Failed to load users. Please try again later.
    </div>
    <!-- Display users list -->
    <ul v-else>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>
  </div>
</template>

<script>

export default {
  data() {
    return {
      users: [],
      loading: true,
      error: null
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
          this.users = response.data;
          this.loading = false;
        })
        .catch(error => {
          console.error('There was an error!', error);
          this.error = error;
          this.loading = false;
        });
    }
  }
}
</script>
