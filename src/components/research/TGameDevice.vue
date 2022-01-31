<template>
  <n-grid :cols="1" responsive="screen" style="padding-left: 20px; max-width: 75%;">
    <n-grid-item>
      <t-game-device-card :research="research" />
    </n-grid-item>
  </n-grid>
</template>
<script>
import { defineComponent } from 'vue'
import { NGrid, NGridItem } from 'naive-ui'
import TGameDeviceCard from '@/components/research/TGameDeviceCard.vue'
import useResearch from '@/composables/useResearch'
import { Research } from '@/entities/Research'

export default defineComponent({
  components: {
    NGrid,
    NGridItem,
    TGameDeviceCard,
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