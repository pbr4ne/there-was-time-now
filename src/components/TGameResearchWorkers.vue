<template>
  <n-button-group size="small">
    <n-popover trigger="hover" :disabled="!canSellWorker(research)">
      <template #trigger>
        <n-button round @click="sellWorker(research)" :disabled="!canSellWorker(research)">
          <template #icon>
            <n-icon><minus-icon /></n-icon>
          </template>
        </n-button>
      </template>
      <span>Sell worker for {{sellWorkerCost(research)}}</span>
    </n-popover>
    <n-button style="width: 40px">
      {{research.numWorkers}}
    </n-button>
    <n-popover trigger="hover" :disabled="!canBuyWorker(research)">
      <template #trigger>
        <n-button round @click="buyWorker(research)" :disabled="!canBuyWorker(research)" >
          <template #icon>
            <n-icon><plus-icon /></n-icon>
          </template>
        </n-button>
      </template>
      <span>Buy worker for {{buyWorkerCost(research)}}</span>
    </n-popover>
  </n-button-group>
</template>

<script>
import { defineComponent } from 'vue'
import { NButton, NIcon, NButtonGroup, NPopover } from 'naive-ui'
import {
  MinusOutlined as MinusIcon,
  PlusOutlined as PlusIcon,
} from '@vicons/material'
import useResearch from '@/composables/useResearch'
import { Research } from '@/entities/Research'

export default defineComponent({
  components: {
    MinusIcon,
    NButton,
    NButtonGroup,
    NIcon,
    NPopover,
    PlusIcon,
  },
  props: {
    research: Research,
  },
  setup() {
    let {
      buyWorker,
      buyWorkerCost,
      canBuyWorker, 
      canSellWorker,
      sellWorker,
      sellWorkerCost,
    } = useResearch();

    return {
      buyWorker,
      buyWorkerCost,
      canBuyWorker,
      canSellWorker,
      sellWorker,
      sellWorkerCost,
    }
  },
})
</script>
