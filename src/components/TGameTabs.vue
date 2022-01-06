<template>
  <n-tabs type="card" justify-content="space-evenly">
    <n-tab-pane 
      v-for="person in (personList.filter(person => person.isUnlocked))" 
      :key="person.key"
      :name="person.key" 
      :tab="renderTab(person)"
    >
      <t-game-tab-science :person="person" />
      <n-space vertical style="padding: 20px;">
        <!-- <n-badge value=5> -->
          <n-switch v-model:value="show">
            <template #checked>Hide Timeline</template>
            <template #unchecked>Show Timeline</template>
          </n-switch>
        <!-- </n-badge> -->
        <n-collapse-transition :show="show">
          <n-timeline>
            <n-timeline-item 
              v-for="timeline in person.timeline" 
              :key="timeline.key"
              :title="timeline.name"
              :content="timeline.text"
              :time="timeline.timestamp"
            />
          </n-timeline>
        </n-collapse-transition>
      </n-space>
    </n-tab-pane>
  </n-tabs>
</template>

<script>
import { defineComponent, h, ref } from 'vue'

import { 
  NCollapseTransition,
  NSpace,
  NSwitch,
  NTabs,
  NTabPane,
  NTimeline,
  NTimelineItem,
} from 'naive-ui'

import TGameTabCard from '@/components/TGameTabCard.vue'
import TGameTabScience from '@/components/TGameTabScience.vue'
import useScience from '@/composables/useScience'
import useInitialize from '@/composables/useInitialize'

function renderTab(person, name, numUnread) {
  return () => h(TGameTabCard, { person, name, numUnread });
}

export default defineComponent({
  components: {
    NCollapseTransition,
    NSpace,
    NSwitch,
    NTabs,
    NTabPane,
    NTimeline,
    NTimelineItem,
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