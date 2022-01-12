<template>
  <n-popover trigger="hover" placement="right" :style="{ maxWidth: '200px' }">
   <template #trigger>
      <div>{{research.label}} <b :style="{ color: research.color }">{{research.total}}</b></div>
   </template>
   <span>{{messages[research.key].messageSections[0].text}}</span>
  </n-popover>
</template>

<script>
import { defineComponent } from 'vue'
import { NPopover } from 'naive-ui'
import { Research } from '@/entities/Research'
import { messages } from '@/locales/en'

export default defineComponent({
  components: {
    NPopover,
  },
  props: {
    research: Research,
  },
  setup () {
    return {
      messages,
    }
  }
})
</script>