<template>
<div>
  <h3>Todo List</h3>  
  <ul>
    <TodoItem
      v-for="x in items"
      :key="x"
      :itemName="x"
    />
  </ul>
  <input v-model="newItem">
  <button @click="addItem">Add</button>
</div>
</template>

<script>
  export default {
    data() {
      return {
        newItem: '',
        items: ['Buy apples','Make pizza','Mow the lawn']
      };
    },
    methods: {
      addItem() {
        this.items.push(this.newItem),
        this.newItem = '';
      }
    }
  }
</script>