<template>
  <n-layout-footer bordered>
    <n-space justify="end" style="padding: 5px;">
      <n-tooltip placement="top" trigger="hover">
        <template #trigger>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <n-button strong circle #icon>
            <n-icon><about-icon /></n-icon>
          </n-button>
        </template>
        <span>About</span>
      </n-tooltip>
      <n-tooltip placement="top" trigger="hover">
        <template #trigger>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <n-button strong circle #icon>
            <n-icon><light-mode-icon /></n-icon>
          </n-button>
        </template>
        <span>Light Mode</span>
      </n-tooltip>
      <n-tooltip placement="top" trigger="hover">
        <template #trigger>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <n-button strong circle #icon>
            <n-icon><pause-icon /></n-icon>
          </n-button>
        </template>
        <span>Pause</span>
      </n-tooltip>
      <n-tooltip placement="top" trigger="hover">
        <template #trigger>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <n-button strong circle #icon>
            <n-icon><load-icon /></n-icon>
          </n-button>
        </template>
        <span>Load</span>
      </n-tooltip>
      <n-tooltip placement="top" trigger="hover">
        <template #trigger>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <n-button strong circle #icon>
            <n-icon><save-icon /></n-icon>
          </n-button>
        </template>
        <span>Save</span>
      </n-tooltip>
       <n-tooltip placement="top" trigger="hover">
        <template #trigger>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <n-button strong circle #icon>
            <n-icon><restart-icon /></n-icon>
          </n-button>
        </template>
        <span>Restart</span>
      </n-tooltip>
    </n-space>
  </n-layout-footer>
</template>

<script>
/*eslint-disable*/
import { defineComponent } from 'vue'

import { 
  NButton,
  NIcon,
  NLayoutFooter,
  NMenu,
  NSpace,
  NTooltip,
} from 'naive-ui'

import {
  QuestionOutlined as AboutIcon,
  PauseOutlined as PauseIcon,
} from '@vicons/antd'

import {
  // BookQuestionMark24Regular as AboutIcon,
  // Pause24Regular as PauseIcon,
} from '@vicons/fluent'

import {
  AlarmOutline as AlarmIcon,
  ApertureOutline as ApertureIcon,
  BulbOutline as BulbIcon,
  SettingsOutline as SettingsIcon,
} from '@vicons/ionicons5'

import { 
  DarkModeOutlined as DarkModeIcon,
  FileUploadOutlined as LoadIcon,
  LightModeOutlined as LightModeIcon,
  RestartAltOutlined as RestartIcon,
  SaveOutlined as SaveIcon,
} from '@vicons/material'

import useIcon from '@/composables/useIcon'

export default defineComponent({
  components: {
    AboutIcon,
    BulbIcon,
    LightModeIcon,
    LoadIcon,
    NButton,
    NIcon,
    NLayoutFooter,
    NMenu,
    NSpace,
    NTooltip,
    PauseIcon,
    RestartIcon,
    SaveIcon,
  },
  setup() {
    const { renderIcon } = useIcon();

    const settings = [
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
    return {
      settings
    }
  },
})
</script>