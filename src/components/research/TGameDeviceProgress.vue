<template>
  <div>
    <n-space vertical>
      <n-space>
        <n-icon :color="research.color" size="36">
          <component :is="renderIcon(research.icon)" />
        </n-icon>
        <n-h2 v-if="displayText()" type="info" :style="{ color: research.color }">
          {{ research.label }}
        </n-h2>
        <n-button 
          :color="research.color" 
          :disabled="canIncrementResearch(research)"
          ghost 
          round 
          @click="startResearch(research)"
        >
          Start
        </n-button>
      </n-space>
      <n-progress
        type="line"
        :percentage="research.current"
        :height="24"
        :border-radius="4"
        :fill-border-radius="0"
        :indicator-placement="'inside-label'"
        :color="research.color"
      />
    </n-space>
  </div>
</template>
<script>
import { defineComponent, h } from 'vue'
import { NButton, NH2, NIcon, NProgress, NSpace } from 'naive-ui'
import TGameResearchButton from '@/components/research/TGameResearchButton.vue'
import useResearch from '@/composables/useResearch'
import { Research } from '@/entities/Research'

export default defineComponent({
  components: {
    NButton,
    NH2,
    NIcon,
    NProgress,
    NSpace,
    TGameResearchButton,
  },
  props: {
    research: Research,
  },
  setup() {
    const { canIncrementResearch, incrementResearch } = useResearch();

    const renderIcon = (icon) => {
      return () => h(icon)
    }

    const displayText = () => {
      return window.innerWidth > 700;
    }

    const startResearch = (research) => {
      if(canIncrementResearch(research)) {
        return incrementResearch(research);
      }
    }

    return {
      canIncrementResearch,
      startResearch,
      displayText,
      renderIcon,
    }
  },
})
</script>
