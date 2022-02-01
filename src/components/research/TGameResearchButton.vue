<template>
  <n-button 
    ghost 
    round 
    :color="research.color" 
    :disabled="!canIncrementResearch(research)" 
    @click="incrementResearch(research)"
  >
    <template #icon>
      <component :is="renderIcon(research.icon)" />
    </template>
    <span v-if="displayButtonText()">
      {{ research.label }}
    </span>
  </n-button>
</template>
<script>
import { defineComponent, h } from 'vue'
import { NButton } from 'naive-ui'
import useFlags from '@/composables/useFlags'
import useResearch from '@/composables/useResearch'
import { Research } from '@/entities/Research'

export default defineComponent({
  components: {
    NButton,
  },
  props: {
    research: Research,
  },
  setup() {
    const { sellFeatureEnabled } = useFlags();
    const { canIncrementResearch, incrementResearch } = useResearch();

    const displayButtonText = () => {
      return window.innerWidth > 700 || !sellFeatureEnabled.value;
    }

    const renderIcon = (icon) => {
      return h(icon)
    }

    return {
      canIncrementResearch,
      displayButtonText,
      incrementResearch,
      renderIcon,
    }
  },
})
</script>
