<template>
  <n-popover trigger="hover" :disabled="!canSellResearch(research, sellIncrement())">
    <template #trigger>
      <n-button :disabled="!canSellResearch(research, sellIncrement())" @click="sellResearch(research, sellIncrement())">
        Sell
      </n-button>
    </template>
    <span>Sell {{ research.label }} for {{ sellResearchPrice(research, sellIncrement()) }}</span>
  </n-popover>
</template>

<script>
import { defineComponent } from 'vue'
import { NButton, NPopover } from 'naive-ui'
import useResearch from '@/composables/useResearch'
import { Research } from '@/entities/Research'

export default defineComponent({
  components: {
    NButton,
    NPopover,
  },
  props: {
    research: Research,
  },
  setup() {
    const { canSellResearch, incrementResearch, sellIncrement, sellResearch, sellResearchPrice } = useResearch();

    return {
      canSellResearch,
      incrementResearch,
      sellIncrement,
      sellResearch,
      sellResearchPrice,
    }    
  },
})
</script>
