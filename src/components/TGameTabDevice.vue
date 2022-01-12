<template>
<n-grid :cols="1" responsive="screen" style="padding-left: 20px; max-width: 75%;">
  <n-grid-item>
    <n-card align="stretch" :title="research.label" @click="incrementResearch(research)" style="cursor: pointer;">
      <n-progress
          type="line"
          :percentage="research.current"
          :height="24"
          :border-radius="4"
          :fill-border-radius="0"
          :indicator-placement="'inside-label'"
          :color="research.color"
        />
    </n-card>
  </n-grid-item>
</n-grid>
</template>
<script>
import { defineComponent } from 'vue'
import { NCard, NGrid, NGridItem, NProgress } from 'naive-ui'
import { Research } from '@/entities/Research'
import useResearch from '@/composables/useResearch'

export default defineComponent({
  components: {
    NCard,
    NGrid,
    NGridItem,
    NProgress,
  },
  props: {
    research: Research,
  },
  setup() {
    let { incrementResearch } = useResearch();

    return {
      incrementResearch,
    }
  },
})
</script>