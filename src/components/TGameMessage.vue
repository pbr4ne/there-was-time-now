<template>
  <div>
    <br>
    <div v-for="message in messageList" :key="message.title">
      <span v-if="displayMessageTitle">
        <n-button text>
          <template #icon>
            <n-icon :color="message.color"><component :is="messageIcon(message.icon)" /></n-icon>
          </template>
          <strong>{{ message.title }}</strong>
        </n-button>
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
import { defineComponent, h } from 'vue'
import { NButton, NH4, NIcon, NSpace } from 'naive-ui'
import { AccessTimeOutlined as TimeIcon } from '@vicons/material'

export default defineComponent({
  components: {
    NButton,
    NH4,
    NIcon,
    NSpace,
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
    return {
      messageIcon: (icon) => icon? h(icon) : h(TimeIcon),
    }
  },
})
</script>
<style scoped>
  .person {
    font-weight: bold;
  }
</style>
