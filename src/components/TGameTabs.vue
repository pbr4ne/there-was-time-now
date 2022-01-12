<template>
  <n-tabs type="card" v-model:value="currentPerson">
    <n-tab-pane 
      v-for="person in (Object.values(personList).filter(person => person.isUnlocked))" 
      :key="person.key"
      :name="person.key" 
      :tab="renderTab(person)"
    >
      <n-space style="padding: 20px">
        <t-game-research :person="person" :researchList="unlockedResearchList(person)" v-if="unlockedResearchList(person).length > 0" />
      </n-space>
      <t-game-tab-device v-if="unlockedDevice(person)" :research="unlockedDevice(person)" />
      <t-game-tab-messages :person="person" />
    </n-tab-pane>
  </n-tabs>
</template>

<script>
import { defineComponent, h } from 'vue'
import { NSpace, NTabs, NTabPane } from 'naive-ui'
import TGameTabCard from '@/components/TGameTabCard.vue'
import TGameTabDevice from '@/components/TGameTabDevice.vue'
import TGameTabMessages from '@/components/TGameTabMessages.vue'
import TGameResearch from '@/components/TGameResearch.vue'
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
    TGameTabDevice,
    TGameTabMessages,
    TGameResearch,
  },
  setup() {
    let { currentPerson } = useFlags();
    let { personList, researchList } = useInitialize();

    function unlockedResearchList(person) {
      return Object.values(researchList).filter(research => research.isUnlocked && !research.isDevice && research.personKey == person.key);
    }

    function unlockedDevice(person) {
      return Object.values(researchList).find(research => research.isUnlocked && research.isDevice && research.personKey == person.key);
    }

    return {
      currentPerson,
      personList,
      renderTab,
      unlockedDevice,
      unlockedResearchList,
    }
  },
})
</script>
