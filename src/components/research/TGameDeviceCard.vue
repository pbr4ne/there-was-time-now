<template>
  <n-popover 
    :style="{ maxWidth: '200px' }" 
    trigger="hover" 
    placement="top-start"
    :keep-alive-on-hover="false"
  >
    <template #trigger>
      <!--todo - i might regret this hacky styling-->
      <n-card :style="{ maxWidth: '620px' }">
        <t-game-device-progress :research="research" />
      </n-card>
    </template>
    <t-game-research-needs :research="research" />
  </n-popover>
</template>
<script>
import { defineComponent } from 'vue'
import { NCard, NPopover } from 'naive-ui'
import TGameDeviceProgress from '@/components/research/TGameDeviceProgress.vue'
import TGameResearchNeeds from '@/components/research/TGameResearchNeeds.vue'
import { Research } from '@/entities/Research'

export default defineComponent({
  components: {
    NCard,
    NPopover,
    TGameDeviceProgress,
    TGameResearchNeeds,
  },
  props: {
    research: Research
  },
  setup() {
  },
})
</script>
