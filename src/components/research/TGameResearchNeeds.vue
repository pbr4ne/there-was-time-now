<template>
  <div v-if="research != null">
    <span :style="{color: research.color}">{{ research.label }}</span><br>
    <div v-if="research.isDevice && research.total == 1">
      Complete!
    </div>
    <div v-else>
      {{ messages[research.key]?.messageSections[0]?.text }}
      <div 
        v-for="researchRequirement in research.researchRequirementList" 
        :key="researchRequirement.researchKey" 
      >
        <span :style="{color: '#969696'}">Needs: </span>
        <span :style="{color: researchList[researchRequirement.researchKey].color}">
          <span v-if="!researchList[researchRequirement.researchKey].isUnlocked">???</span>
          <span v-else>{{ researchRequirement.quantity }} {{ researchList[researchRequirement.researchKey].label }}</span>
        </span>
        <span v-if="research.expand != 1 && slowdownEnabled">
          <br><i>This will slow down time by {{ research.expand }}%</i>
        </span>
      </div>
    </div>
  </div>
  <div v-else>
    Click on a button to start researching!
    <div v-if="sellFeatureEnabled">
      Sell research to increase your budget.<br>{{ paymentName() }} {{ person.workerTitle }} may speed up your research!
    </div>
    <div v-if="slowdownEnabled">
      Some research may slow down time...
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import useFlags from '@/composables/useFlags'
import useInitialize from '@/composables/useInitialize'
import useResearch from '@/composables/useResearch'
import { Person } from '@/entities/Person'
import { Research } from '@/entities/Research'
import { messages } from '@/locales/en'

export default defineComponent({
  props: {
    research: Research,
    person: Person,
  },
  setup() {
    const { sellFeatureEnabled, slowdownEnabled } = useFlags();
    const { researchList } = useInitialize();
    const { canIncrementResearch } = useResearch();

    //could make this dynamic
    const paymentName = () => {
      return 'Bribing';
    }

    return {
      canIncrementResearch,
      messages,
      paymentName,
      researchList,
      sellFeatureEnabled,
      slowdownEnabled,
    }
  },
})
</script>
