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
          <n-button strong circle #icon @click="switchTheme">
            <n-icon>
              <light-mode-icon v-if="!lightMode"/>
              <dark-mode-icon v-if="lightMode"/>
            </n-icon>
          </n-button>
        </template>
        <span>{{otherThemeName()}}</span>
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
          <n-button strong circle #icon @click="restart()">
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
import useFlags from '@/composables/useFlags'
import useSaveLoad from '@/composables/useSaveLoad'
import useTheme from '@/composables/useTheme'
import useTime from '@/composables/useTime'

export default defineComponent({
  components: {
    AboutIcon,
    DarkModeIcon,
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
    const { gameEnded, gamePaused } = useFlags();
    const { clearGameState } = useSaveLoad();
    const { lightMode, switchTheme } = useTheme();
    const { countdownTimer, countdownTriggered, countupTimer } = useTime();

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

      dialog.info({
        title: 'Paused',
        content: 'There was time now... to go to the bathroom.',
        onClose: () => {
          console.log('on close');
          gamePaused.value = false;
          if(countdownTriggered.value) {
            countdownTimer.start();
          } else if(!gameEnded.value) {
            countupTimer.start();
          }
        }
      })
    }

    const otherThemeName = () => {
      if (lightMode.value) {
        return 'Dark Mode';
      } else {
        return 'Light Mode';
      }
    }

    const restart = () => {
      dialog.warning({
        title: 'Restart Game?',
        content: 'You will lose all of your progress!',
        positiveText: 'I\'m going back to the start',
        negativeText: 'Oops, never mind',
        onPositiveClick: () => {
          clearGameState();
        }
      })
    }

    return {
      about,
      clearGameState,
      gamePaused,
      lightMode,
      otherThemeName,
      pause,
      restart,
      switchTheme,
    }
  },
})
</script>