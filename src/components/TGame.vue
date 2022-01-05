<template>
  <n-layout position="absolute">
    <t-header />
    <n-layout has-sider>
      <t-sider />
      <n-layout>
        <n-tabs type="card" justify-content="space-evenly">
          <n-tab-pane 
            v-for="person in (personList.filter(person => person.isUnlocked))" 
            :key="person.key"
            :name="person.key" 
            :tab="person.personName"
          >
            <n-space horizontal style="padding-left: 20px;">
              <n-progress
                type="multiple-circle"
                :percentage="person.scienceList.filter(science => science.isUnlocked).map(({ current }) => current)"
                :color="person.scienceList.filter(science => science.isUnlocked).map(({ color }) => color)"
              >
                Science
              </n-progress>
              <n-space vertical>
                <n-button 
                  ghost
                  round
                  v-for="science in person.scienceList.filter(science => science.isUnlocked)"
                  :key="science.key"
                  :color="science.color"
                  @click="increment(science.key)"
                >
                  {{science.label}}
                </n-button>
              </n-space>
            </n-space>
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
      </n-layout>
    </n-layout>
    <t-footer />
  </n-layout>
</template>

<script>
import { ref } from 'vue'

import { 
  NButton,
  NCollapseTransition,
  NLayout,
  NProgress,
  NSpace,
  NSwitch,
  NTabs,
  NTabPane,
  NTimeline,
  NTimelineItem,
} from 'naive-ui'

import useScience from '../composables/useScience'
import usePerson from '../composables/usePerson'
import TFooter from '../components/TFooter.vue'
import THeader from '../components/THeader.vue'
import TSider from '../components/TSider.vue'

export default {
  name: 'TGame',
  components: {
    NButton,
    NCollapseTransition,
    NLayout,
    NProgress,
    NSpace,
    NSwitch,
    NTabs,
    NTabPane,
    NTimeline,
    NTimelineItem,
    TFooter,
    THeader,
    TSider,
  },
  setup () {
    let { increment } = useScience();
    let { personList } = usePerson();

    return {
      increment,
      show: ref(false),
      personList,
    };
  }
}
</script>

