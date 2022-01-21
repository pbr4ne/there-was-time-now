<template>
  <n-layout-footer bordered>
    <n-space justify="end" style="padding: 5px;">
      <n-tooltip placement="top" trigger="hover">
        <template #trigger>
          <n-button strong circle @click="about()">
            <template #icon>
              <n-icon><about-icon /></n-icon>
            </template>
          </n-button>
        </template>
        <span>About</span>
      </n-tooltip>
      <n-tooltip placement="top" trigger="hover">
        <template #trigger>
          <n-button strong circle @click="switchTheme">
            <template #icon>
              <n-icon>
                <light-mode-icon v-if="!lightMode" />
                <dark-mode-icon v-if="lightMode" />
              </n-icon>
            </template>
          </n-button>
        </template>
        <span>{{ otherThemeName() }}</span>
      </n-tooltip>
      <n-tooltip placement="top" trigger="hover">
        <template #trigger>
          <n-button strong circle @click="pause()">
            <template #icon>
              <n-icon><pause-icon /></n-icon>
            </template>
          </n-button>
        </template>
        <span>Pause (not implemented yet)</span>
      </n-tooltip>
      <n-tooltip placement="top" trigger="hover">
        <template #trigger>
          <n-button strong circle>
            <template #icon>
              <n-icon><load-icon /></n-icon>
            </template>
          </n-button>
        </template>
        <span>Import (not implemented yet)</span>
      </n-tooltip>
      <n-tooltip placement="top" trigger="hover">
        <template #trigger>
          <n-button strong circle>
            <template #icon>
              <n-icon><save-icon /></n-icon>
            </template>
          </n-button>
        </template>
        <span>Export (not implemented yet)</span>
      </n-tooltip>
      <n-tooltip placement="top" trigger="hover">
        <template #trigger>
          <n-button strong circle @click="restart()">
            <template #icon>
              <n-icon><restart-icon /></n-icon>
            </template>
          </n-button>
        </template>
        <span>Restart</span>
      </n-tooltip>
    </n-space>
  </n-layout-footer>
</template>

<script>
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
  DarkModeOutlined as DarkModeIcon,
  FileUploadOutlined as LoadIcon,
  LightModeOutlined as LightModeIcon,
  RestartAltOutlined as RestartIcon,
  SaveOutlined as SaveIcon,
} from '@vicons/material'

import TGameAbout from '@/components/TGameAbout.vue'
import useFlags from '@/composables/useFlags'
import useMessage from '@/composables/useMessage'
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
    SaveIcon,
  },
  setup() {
    const dialog = useDialog();
    const { countdownTriggered, gameEnded, gamePaused } = useFlags();
    const { sendInitialMessage } = useMessage();
    const { clearGameState } = useSaveLoad();
    const { lightMode, switchTheme } = useTheme();
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

      dialog.info({
        title: 'Paused',
        content: 'There was time now... to go to the bathroom.',
        positiveText: 'Back to it!',
        maskClosable: false,
        closable: false,
        onPositiveClick:  () => {
          gamePaused.value = false;
          if(countdownTriggered.value) {
            countdownTimer.resume();
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
          clearGameState().then(sendInitialMessage());
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