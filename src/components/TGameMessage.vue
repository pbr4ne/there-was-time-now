<template>
  <div 
    v-for="section in messageSections" 
    :key="section.text"
  >
    <span class="person">
      {{ section.person? section.person + ": " : null }}
    </span>
    <span>
      {{ section.text }}
    </span>
    <br><br>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
  },
  props: {
    messageSections: {
      type: Array,
      required: true,
    },
  },
  setup() {
  },
})
</script>
<style scoped>
  .person {
    font-weight: bold;
  }
</style>
