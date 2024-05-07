<template>
  <div id="app">
<router-view :tasks="tasks"></router-view>
 <!-- Only the component for the current route will be displayed -->
  </div>
</template>

<script >
export default {
  data() {
    return {
      tasks: [
         { title: "ABC", description: "Description for ABC", completed: false },
        { title: "DEF", description: "Description for DEF", completed: false },
        { title: "GHI", description: "Description for GHI", completed: false },
      ]
    };
  }
}
</script>

