<template>
  <n-tabs type="card" justify-content="space-evenly">
    <n-tab-pane 
      v-for="person in (personList.filter(person => person.isUnlocked))" 
      :key="person.key"
      :name="person.key" 
      :tab="renderTab(person)"
    >
      <t-game-tab-science :person="person" />
      <t-game-tab-messages :person="person" />
    </n-tab-pane>
  </n-tabs>
</template>

<script>
import { defineComponent, h, ref } from 'vue'

import { 
  NTabs,
  NTabPane,
} from 'naive-ui'

import TGameTabCard from '@/components/TGameTabCard.vue'
import TGameTabMessages from '@/components/TGameTabMessages.vue'
import TGameTabScience from '@/components/TGameTabScience.vue'
import useScience from '@/composables/useScience'
import useInitialize from '@/composables/useInitialize'

function renderTab(person, name, numUnread) {
  return () => h(TGameTabCard, { person, name, numUnread });
}

export default defineComponent({
  components: {
    NTabs,
    NTabPane,
    TGameTabMessages,
    TGameTabScience,
  },
  setup() {
    let { increment } = useScience();
    let { personList } = useInitialize();

    return {
      increment,
      personList,
      renderTab,
      show: ref(false),
    }
  },
})
</script>