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
} from '@vicons/fluent'

import { 
  DarkModeOutlined as DarkModeIcon,
  FileUploadOutlined as LoadIcon,
  LightModeOutlined as LightModeIcon,
  RestartAltOutlined as RestartIcon,
  SaveOutlined as SaveIcon,
} from '@vicons/material'

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
    SaveIcon,
  },
  setup() {
    const { gamePaused } = useInitialize();
    const { countdownTimer, countupTimer } = useTime();

    //todo - this isn't pausing the countdown properly
    const pause = () => {
      countdownTimer.stop();
      countupTimer.stop();
      gamePaused.value = true;
    }

    return {
      gamePaused,
      pause,
    }
  },
})
</script>