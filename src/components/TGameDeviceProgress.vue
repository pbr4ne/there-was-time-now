<template>
  <div>
    <n-h2 type="info" :style="{ color: research.color }">{{research.label}}</n-h2>
    <n-progress
        type="line"
        :percentage="research.current"
        :height="24"
        :border-radius="4"
        :fill-border-radius="0"
        :indicator-placement="'inside-label'"
        :color="research.color"
      />
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { NH2, NProgress } from 'naive-ui'
import { Research } from '@/entities/Research'

export default defineComponent({
  components: {
    NH2,
    NProgress,
  },
  props: {
    research: Research,
  },
  setup() {
    
  },
})
</script>
