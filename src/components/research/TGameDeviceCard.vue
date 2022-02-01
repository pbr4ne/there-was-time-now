<template>
  <n-popover :style="{ maxWidth: '200px' }" trigger="hover" placement="top-start">
    <template #trigger>
      <n-card :style="cardStyle()" @click="startResearch(research)">
        <t-game-device-progress :research="research" />
      </n-card>
    </template>
    <t-game-research-needs :research="research" />
  </n-popover>
</template>
<script>
import { defineComponent, h } from 'vue'
import { NCard, NPopover } from 'naive-ui'
import TGameDeviceProgress from '@/components/research/TGameDeviceProgress.vue'
import TGameResearchNeeds from '@/components/research/TGameResearchNeeds.vue'
import useResearch from '@/composables/useResearch'
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
  setup(props) {
    const { canIncrementResearch, incrementResearch } = useResearch();

    const cardStyle = () => {
      return { cursor: canIncrementResearch(props.research) || props.research.total == 1 ? "pointer" : "not-allowed" }
    }

    const startResearch = (research) => {
      if(canIncrementResearch(research)) {
        return incrementResearch(research);
      }
    }

    return {
      cardStyle,
      startResearch,
    }
  },
})
</script>
