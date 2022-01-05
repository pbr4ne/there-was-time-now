<template>
  <n-layout position="absolute">
    <t-header />
    <n-layout has-sider>
      <n-layout-sider
        bordered
        show-trigger
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :native-scrollbar="false"
      >
        <n-menu
          :collapsed-width="64"
          :collapsed-icon-size="32"
          :icon-size="32"
          :options="sidebar"
        />
      </n-layout-sider>
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
import { computed, h, ref } from 'vue'

import { 
  NButton,
  NCollapseTransition,
  NIcon,
  NLayout,
  NLayoutSider, 
  NMenu,
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
import TMenuItem from '../components/TMenuItem.vue'
import THeader from '../components/THeader.vue'

function renderIcon (icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

function renderLabel(science) {
  //todo - seems overkill to have a whole-ass SFC
  return () => h(TMenuItem, {}, {
    label: () => h('span', {}, science.label),
    total: () => h('span', {}, science.total), 
  });
}

export default {
  name: 'TGame',
  components: {
    NButton,
    NCollapseTransition,
    NLayout,
    NLayoutSider,
    NMenu,
    NProgress,
    NSpace,
    NSwitch,
    NTabs,
    NTabPane,
    NTimeline,
    NTimelineItem,
    THeader,
  },
  setup () {
    let { increment } = useScience();
    let { personList } = usePerson();

    const sidebar = computed(() => {
      const sidebar = [];
      personList
        .filter(person => person.isUnlocked)
        .forEach(person => person.scienceList
          .filter(science => science.isUnlocked)
          .forEach(science => sidebar.push({
            label: renderLabel(science),
            key: science.key,
            icon: renderIcon(science.icon),
          }))
        );
      sidebar.push({
        key: 'divider-1',
        type: 'divider',
      });
      return sidebar;
    });

    return {
      increment,
      sidebar,
      show: ref(false),
      personList,
      TMenuItem,
    };
  }
}
</script>

