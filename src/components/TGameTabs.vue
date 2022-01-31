<template>
  <n-tabs v-model:value="currentPerson" type="card">
    <n-tab-pane 
      v-for="person in (Object.values(personList).filter(person => person.isUnlocked))" 
      :key="person.key"
      :name="person.key" 
      :tab="renderTab(person)"
    >
      <n-space style="padding: 20px">
        <t-game-research v-if="unlockedResearchList(person).length > 0" :person="person" :research-list="unlockedResearchList(person)" />
      </n-space>
      <t-game-device v-if="unlockedDevice(person)" :research="unlockedDevice(person)" />
      <t-game-timeline v-if="countdownTriggered" :person="person" />
    </n-tab-pane>
  </n-tabs>
</template>

<script>
import { defineComponent, h } from 'vue'
import { NSpace, NTabs, NTabPane } from 'naive-ui'
import TGameTabCard from '@/components/TGameTabCard.vue'
import TGameDevice from '@/components/research/TGameDevice.vue'
import TGameTimeline from '@/components/TGameTimeline.vue'
import TGameResearch from '@/components/research/TGameResearch.vue'
import useFlags from '@/composables/useFlags'
import useInitialize from '@/composables/useInitialize'

function renderTab(person, name, numUnread) {
  return () => h(TGameTabCard, { person, name, numUnread });
}

export default defineComponent({
  components: {
    NTabs,
    NTabPane,
    NSpace,
    TGameDevice,
    TGameTimeline,
    TGameResearch,
  },
  setup() {
    let { countdownTriggered, currentPerson } = useFlags();
    let { personList, researchList } = useInitialize();

    function unlockedResearchList(person) {
      return Object.values(researchList).filter(research => research.isUnlocked && !research.isDevice && research.personKey == person.key);
    }

    function unlockedDevice(person) {
      return Object.values(researchList).find(research => research.isUnlocked && research.isDevice && research.personKey == person.key);
    }

    return {
      countdownTriggered,
      currentPerson,
      personList,
      renderTab,
      unlockedDevice,
      unlockedResearchList,
    }
  },
})
</script>
