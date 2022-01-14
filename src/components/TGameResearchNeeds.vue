<template>
  <div v-if="research != null">
    <span :style="{color: research.color}">{{research.label}}</span><br />
    <div v-if="research.isDevice && research.total == 1">
      Complete!
    </div>
    <div v-else>
     {{messages[research.key]?.messageSections[0]?.text}}
      <div 
        v-for="researchRequirement in research.researchRequirementList" 
        :key="researchRequirement.researchKey" 
      >
        <span :style="{color: '#4f5d75'}">Needs: </span>
        <span :style= "{color: researchList[researchRequirement.researchKey].color}">
          {{researchRequirement.quantity}} {{researchList[researchRequirement.researchKey].label}}
        </span>
        <span v-if="research.expand != 1 && slowdownEnabled">
          <br /><i>This will slow down time by {{research.expand}}%</i>
        </span>
      </div>
    </div>
  </div>
  <div v-else>
    Click on a button to start researching!
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import useFlags from '@/composables/useFlags'
import useInitialize from '@/composables/useInitialize'
import useResearch from '@/composables/useResearch'
import { Research } from '@/entities/Research'
import { messages } from '@/locales/en'

export default defineComponent({
  props: {
    research: Research,
  },
  setup() {
    const { slowdownEnabled } = useFlags();
    const { researchList } = useInitialize();
    const { canIncrementResearch } = useResearch();

    return {
      canIncrementResearch,
      messages,
      researchList,
      slowdownEnabled,
    }
  },
})
</script>
