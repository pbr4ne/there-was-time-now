<template>
  <span :style="{color: research.color}">{{research.label}}</span><br />
  <div v-if="!canIncrementResearch(research)">Needs:<br /></div>
  <div v-if="canIncrementResearch(research)">
    {{messages[research.key]?.messageSections[0]?.text}}
  </div>
  <div 
    v-else
    v-for="researchRequirement in research.researchRequirementList" 
    :key="researchRequirement.researchKey" 
  >
    {{researchRequirement.quantity}} {{researchList[researchRequirement.researchKey].label}}
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import useInitialize from '@/composables/useInitialize'
import useResearch from '@/composables/useResearch'
import { Research } from '@/entities/Research'
import { messages } from '@/locales/en'

export default defineComponent({
  props: {
    research: Research,
  },
  setup() {
    const { researchList } = useInitialize();
    const { canIncrementResearch } = useResearch();

    return {
      canIncrementResearch,
      messages,
      researchList,
    }
  },
})
</script>
