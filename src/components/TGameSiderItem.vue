<template>
  <n-popover trigger="hover" :placement="placement()" :style="{ maxWidth: '200px' }">
   <template #trigger>
      <div>
        {{research.label}} <b :style="{ color: research.color }">{{research.total}}</b>
      </div>
   </template>
   <div>
    <span :style="{color: research.color}">{{research.label}}</span><br />
     {{messages[research.key].messageSections[0].text}}
    </div>
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
    const placement = () => window.innerWidth > 700 ? "right" : "bottom";
    return {
      messages,
      placement,
    }
  }
})
</script>