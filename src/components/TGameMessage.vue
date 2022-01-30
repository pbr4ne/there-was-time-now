<template>
  <div>
    <br>
    <div v-for="message in messageList" :key="message.title">
      <span v-if="displayMessageTitle">
        <n-h4>{{ message.title }}</n-h4>
      </span>
      <div 
        v-for="section in message.messageSections" 
        :key="section.text"
      >
        <span v-if="section.person" class="person">
          {{ section.person? section.person + ": " : null }}
        </span>
        <span>
          {{ section.text }}
        </span>
        <br><br>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { NH4 } from 'naive-ui'

export default defineComponent({
  components: {
    NH4,
  },
  props: {
    messageList: {
      type: Array,
      required: true,
    },
    displayMessageTitle: {
      type: Boolean,
      default: false,
    }
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
