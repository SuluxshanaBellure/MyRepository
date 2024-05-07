<template>
  <div class="my-component">
    <h1>{{ title }}</h1>
    <button v-on:click="changeTitle">Change Title</button>
    <Teleport to="body">
          <div id="redDiv">Hello!</div>
        </Teleport>
  </div>
</template>

<script>
export default {
  name: 'MyComponent',
  data() {
    return {
      title: 'Hello, Vue!',
    };
  },
  methods: {
    changeTitle() {
      this.title = 'Title Changed';
    },
  },
};
</script>

<style>
.my-component h1 {
  color: #42b983;
}

 #redDiv {
    background-color: lightcoral;
    padding: 0px;
    display: inline-block;
  }
</style>
