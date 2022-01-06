<template>
  <n-tabs type="card" justify-content="space-evenly">
    <n-tab-pane 
      v-for="person in (personList.filter(person => person.isUnlocked))" 
      :key="person.key"
      :name="person.key" 
      :tab="renderTab(person)"
    >
      <n-space horizontal style="padding: 20px">
        <t-game-tab-science :person="person" v-if="person.scienceList.filter(science => science.isUnlocked).length > 0" />
        <t-game-tab-engineering :person="person" v-if="person.engineeringList.filter(engineering => engineering.isUnlocked).length > 0" />
      </n-space>
      <t-game-tab-messages :person="person" />
    </n-tab-pane>
  </n-tabs>
</template>

<script>
import { defineComponent, h, ref } from 'vue'

import { 
  NSpace,
  NTabs,
  NTabPane,
} from 'naive-ui'

import TGameTabCard from '@/components/TGameTabCard.vue'
import TGameTabEngineering from '@/components/TGameTabEngineering'
import TGameTabMessages from '@/components/TGameTabMessages.vue'
import TGameTabScience from '@/components/TGameTabScience.vue'
import useInitialize from '@/composables/useInitialize'

function renderTab(person, name, numUnread) {
  return () => h(TGameTabCard, { person, name, numUnread });
}

export default defineComponent({
  components: {
    NTabs,
    NTabPane,
    NSpace,
    TGameTabEngineering,
    TGameTabMessages,
    TGameTabScience,
  },
  setup() {
    let { personList } = useInitialize();

    return {
      personList,
      renderTab,
      show: ref(false),
    }
  },
})
</script>