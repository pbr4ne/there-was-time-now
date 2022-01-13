<template>
  Needs:<br />
  <div 
    v-for="researchRequirement in research.researchRequirementList" 
    :key="researchRequirement.researchKey" 
  >
    {{researchRequirement.quantity}} {{researchList[researchRequirement.researchKey].label}}
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import useInitialize from '@/composables/useInitialize'
import { Research } from '@/entities/Research'

export default defineComponent({
  props: {
    research: Research,
  },
  setup() {
    const { researchList } = useInitialize();

    return {
      researchList,
    }
  },
})
</script>
