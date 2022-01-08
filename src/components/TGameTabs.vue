<template>
  <n-tabs type="card" justify-content="space-evenly">
    <n-tab-pane 
      v-for="person in (Object.values(personList).filter(person => person.isUnlocked))" 
      :key="person.key"
      :name="person.key" 
      :tab="renderTab(person)"
    >
      <n-space horizontal style="padding: 20px">
        <t-game-research label="Science" :researchList="person.scienceList" v-if="person.scienceList.filter(science => science.isUnlocked).length > 0" />
        <t-game-research label="Engineering" :researchList="person.engineeringList" v-if="person.engineeringList.filter(engineering => engineering.isUnlocked).length > 0" />
      </n-space>
      <n-space horizontal style="padding: 20px">
        <t-game-tab-device 
          v-if="person.deviceList.filter(device => device.isUnlocked).length > 0"
          :device="person.deviceList.find(device => device.isUnlocked)" 
        />
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
import TGameTabDevice from '@/components/TGameTabDevice.vue'
import TGameTabMessages from '@/components/TGameTabMessages.vue'
import TGameResearch from '@/components/TGameResearch.vue'
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
    let { personList } = useInitialize();

    return {
      personList,
      renderTab,
      show: ref(false),
    }
  },
})
</script>