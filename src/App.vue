<template>
  <n-config-provider :theme="darkTheme">
    <n-layout position="absolute">
      <n-layout-header bordered>
        <n-space justify="end">
          <n-menu mode="horizontal" :options="topMenu" />
        </n-space>
      </n-layout-header>
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
              v-for="timeline in (timelineList.filter(timeline => timeline.isUnlocked))" 
              :key="timeline.key"
              :name="timeline.key" 
              :tab="timeline.personName"
            >
              <n-space vertical style="padding-left: 20px;">
                <n-progress
                  type="multiple-circle"
                  :percentage="timeline.scienceList.filter(science => science.isUnlocked).map(({ current }) => current)"
                  :color="timeline.scienceList.filter(science => science.isUnlocked).map(({ color }) => color)"
                >
                  Science
                </n-progress>
                <n-space>
                  <n-button 
                    ghost
                    round
                    v-for="science in timeline.scienceList"
                    :key="science.key"
                    :color="science.color"
                    @click="increment(science.key)"
                  >
                    {{science.label}}
                  </n-button>
                </n-space>

                <br />
                <n-badge value=5>
                  <n-switch v-model:value="show">
                    <template #checked>Hide Timeline</template>
                    <template #unchecked>Show Timeline</template>
                  </n-switch>
                </n-badge>
                <n-collapse-transition :show="show">
                  <n-timeline>
                    <n-timeline-item
                      type="success"
                      title="Start"
                      content="started your research. bloop blap a lot of flavour text"
                      time="2022-01-01 20:46"
                    />
                    <n-timeline-item
                      type="success"
                      title="Bwah"
                      content="figured out bwah"
                      time="2022-01-02 04:44"
                    />
                    <n-timeline-item
                      type="error"
                      title="Oh crap"
                      content="Some sort of issue"
                      time="2022-01-03 00:32"
                    />
                    <n-timeline-item
                      type="warning"
                      title="Warning"
                      content="warning content"
                      time="2022-01-04 03:09"
                    />
                    <n-timeline-item
                      type="info"
                      title="Info"
                      content="info content"
                      time="2022-01-05 22:53"
                    />
                  </n-timeline>
                </n-collapse-transition>
              </n-space>
            </n-tab-pane>
          </n-tabs>
        </n-layout>
      </n-layout>
      <n-layout-footer bordered>
        <n-space justify="end">
          <n-tooltip placement="left" trigger="click">
            <template #trigger>
              <!-- eslint-disable-next-line vue/valid-v-slot -->
              <n-button strong secondary circle #icon>
                <n-icon><bulb-icon /></n-icon>
              </n-button>
            </template>
            <span>Help Message? Or something</span>
          </n-tooltip>
        </n-space>
      </n-layout-footer>
    </n-layout>
  </n-config-provider>
</template>

<script>
/* eslint-disable */
import { computed, h, ref } from 'vue'

import { 
  darkTheme,

  NBadge,
  NButton,
  NCollapseTransition,
  NConfigProvider,
  NIcon,
  NLayout,
  NLayoutFooter,
  NLayoutHeader,
  NLayoutSider, 
  NMenu,
  NProgress,
  NSpace,
  NSwitch,
  NTabs,
  NTabPane,
  NTimeline,
  NTimelineItem,
  NTooltip,
} from 'naive-ui'

import {
  Microscope as ExperimentIcon,
} from '@vicons/carbon'

import {
  AlarmOutline as AlarmIcon,
  ApertureOutline as ApertureIcon,
  BulbOutline as BulbIcon,
  SettingsOutline as SettingsIcon,
} from '@vicons/ionicons5'

import {
  Atom2 as ResearchIcon,
} from '@vicons/tabler'

import useScience from './composables/useScience'
import useTimeline from './composables/useTimeline'
import TMenuItem from './components/TMenuItem.vue'

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

const topMenu = [
  {
    label: 'Settings',
    key: 'settings',
    icon: renderIcon(SettingsIcon),
    children: [
      {
        type: 'group',
        label: 'Bwah',
        key: 'bwah',
        children: [
          {
            label: 'Setting 1',
            key: 'setting-1',
            icon: renderIcon(AlarmIcon),
          },
          {
            label: 'Setting 2',
            key: 'setting-2',
            icon: renderIcon(ApertureIcon),
          }
        ]
      }
    ]
  }
]

export default {
  name: 'App',
  components: {
    BulbIcon,
    ExperimentIcon,
    ResearchIcon,

    NBadge,
    NButton,
    NCollapseTransition,
    NConfigProvider,
    NIcon,
    NLayout,
    NLayoutFooter,
    NLayoutHeader,
    NLayoutSider,
    NMenu,
    NProgress,
    NSpace,
    NSwitch,
    NTabs,
    NTabPane,
    NTimeline,
    NTimelineItem,
    NTooltip,
  },
  setup () {
    let { increment } = useScience();
    let { timelineList } = useTimeline();

    const sidebar = [];
    timelineList
      .filter(timeline => timeline.isUnlocked)
      .forEach(timeline => timeline.scienceList
        .filter(science => science.isUnlocked)
        .forEach(science => sidebar.push({
          label: renderLabel(science),
          key: science.key,
          icon: renderIcon(science.icon),
        }))
      );

    return {
      darkTheme,
      sidebar,
      show: ref(false),
      topMenu,
      TMenuItem,
      timelineList,
      increment,
    };
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
