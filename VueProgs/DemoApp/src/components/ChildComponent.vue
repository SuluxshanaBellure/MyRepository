<!-- ChildComponent.vue -->
<template>
  <div :class="$attrs.class" :title="$attrs.title" :data-id="$attrs['data-id']">
    <!-- Content passed from ParentComponent -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  inheritAttrs: false // Disable automatic attribute inheritance
}
</script>

<style scoped>
/* Additional styling for ChildComponent */
</style>
