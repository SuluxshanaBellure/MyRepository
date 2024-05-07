<!-- CustomButton.vue -->
<template>
<div>
  <button class="custom-button">
    <!-- This slot can be filled with any content passed from the parent -->
    <slot name="firstSlot">First slot</slot>
  </button>
  <slot name="secondSlot">Second slot</slot>
</div>
</template>

<script>
export default {
  name: 'CustomButton'
}
</script>

<style>
.custom-button {
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
.custom-button:hover {
  background-color: #0056b3;
}
</style>
