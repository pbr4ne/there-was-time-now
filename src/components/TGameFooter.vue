<template>
  <n-layout-footer bordered>
    <n-space justify="end" style="padding: 5px;">
      <n-tooltip placement="top" trigger="hover">
        <template #trigger>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <n-button strong circle #icon @click="about()">
            <n-icon><about-icon /></n-icon>
          </n-button>
        </template>
        <span>About (not implemented yet)</span>
      </n-tooltip>
      <n-tooltip placement="top" trigger="hover">
        <template #trigger>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <n-button strong circle #icon>
            <n-icon><light-mode-icon /></n-icon>
          </n-button>
        </template>
        <span>Light Mode (not implemented yet)</span>
      </n-tooltip>
      <n-tooltip placement="top" trigger="hover">
        <template #trigger>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <n-button strong circle #icon>
            <n-icon><pause-icon /></n-icon>
          </n-button>
        </template>
        <span>Pause (not implemented yet)</span>
      </n-tooltip>
      <n-tooltip placement="top" trigger="hover">
        <template #trigger>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <n-button strong circle #icon>
            <n-icon><load-icon /></n-icon>
          </n-button>
        </template>
        <span>Load (not implemented yet)</span>
      </n-tooltip>
      <n-tooltip placement="top" trigger="hover">
        <template #trigger>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <n-button strong circle #icon>
            <n-icon><save-icon /></n-icon>
          </n-button>
        </template>
        <span>Save (not implemented yet)</span>
      </n-tooltip>
       <n-tooltip placement="top" trigger="hover">
        <template #trigger>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <n-button strong circle #icon>
            <n-icon><restart-icon /></n-icon>
          </n-button>
        </template>
        <span>Restart (not implemented yet)</span>
      </n-tooltip>
    </n-space>
  </n-layout-footer>
</template>

<script>
/*eslint-disable*/
import { defineComponent, h } from 'vue'

import { 
  NButton,
  NIcon,
  NLayoutFooter,
  NSpace,
  NTooltip,
  useDialog,
} from 'naive-ui'

import {
  QuestionOutlined as AboutIcon,
  PauseOutlined as PauseIcon,
} from '@vicons/antd'

import {
} from '@vicons/fluent'

import { 
  DarkModeOutlined as DarkModeIcon,
  FileUploadOutlined as LoadIcon,
  LightModeOutlined as LightModeIcon,
  RestartAltOutlined as RestartIcon,
  SaveOutlined as SaveIcon,
} from '@vicons/material'

import TGameAbout from '@/components/TGameAbout'
import useInitialize from '@/composables/useInitialize'
import useTime from '@/composables/useTime'

export default defineComponent({
  components: {
    AboutIcon,
    LightModeIcon,
    LoadIcon,
    NButton,
    NIcon,
    NLayoutFooter,
    NSpace,
    NTooltip,
    PauseIcon,
    RestartIcon,
    TGameAbout,
    SaveIcon,
  },
  setup() {
    const dialog = useDialog();
    const { gamePaused } = useInitialize();
    const { countdownTimer, countupTimer } = useTime();

    const about = () => {
      dialog.create({
        title: 'About',
        content: () => h(TGameAbout),
        'show-icon': false,
      })
    }

    //todo - this isn't pausing the countdown properly
    const pause = () => {
      countdownTimer.stop();
      countupTimer.stop();
      gamePaused.value = true;
    }

    return {
      about,
      gamePaused,
      pause,
    }
  },
})
</script>