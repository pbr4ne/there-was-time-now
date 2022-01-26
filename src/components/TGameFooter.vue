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
          <n-button strong circle @click="pauseTime()">
            <template #icon>
              <n-icon><pause-icon /></n-icon>
            </template>
          </n-button>
        </template>
        <span>Pause</span>
      </n-tooltip>
      <n-tooltip placement="top" trigger="hover">
        <template #trigger>
          <n-button strong circle @click="importGame()">
            <template #icon>
              <n-icon><load-icon /></n-icon>
            </template>
          </n-button>
        </template>
        <span>Import</span>
      </n-tooltip>
      <n-tooltip placement="top" trigger="hover">
        <template #trigger>
          <n-button strong circle @click="exportGame()">
            <template #icon>
              <n-icon><save-icon /></n-icon>
            </template>
          </n-button>
        </template>
        <span>Export</span>
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
import { defineComponent, h, ref } from 'vue'

import { 
  NButton,
  NIcon,
  NInput,
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
import TGameImport from '@/components/TGameImport.vue'
import useMessage from '@/composables/useMessage'
import usePause from '@/composables/usePause'
import useSaveLoad from '@/composables/useSaveLoad'
import useTheme from '@/composables/useTheme'

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
    const { sendInitialMessage } = useMessage();
    const { pause, unpause } = usePause();
    const { clearGameState, exportGameState, importGameState } = useSaveLoad();
    const { lightMode, switchTheme } = useTheme();

    const about = () => {
      dialog.create({
        title: 'About',
        content: () => h(TGameAbout),
        'show-icon': false,
      });
    }

    const pauseTime = () => {
      pause();
      dialog.info({
        title: 'Paused',
        content: 'There was time now... to go to the bathroom.',
        positiveText: 'Back to it!',
        maskClosable: false,
        closable: false,
        onPositiveClick: unpause,
      });
    }

    const importGame = () => {
      pause();
      const importError = ref(false);
      const importDialog = dialog.warning({
        title: 'Import Game',
        content: () => h(TGameImport, { 
          importError,
          onCancelImport: () => { 
            unpause(); 
            importDialog.destroy(); 
          },
          onImportString: $event => {
            const successfulImport = importGameState($event.value);
            if(successfulImport) {
              importDialog.destroy();
            } else {
              importError.value = true;
            }
          },
        }),
        maskClosable: false,
        closable: false,
      });
    }

    const exportGame = () => {
      pause();
      dialog.info({
        title: 'Export Game',
        content: () => h(NInput, { 
          autosize: { maxRows: 10 }, 
          type: 'textarea',
          value: exportGameState() 
        }),
        positiveText: 'Done!',
        maskClosable: false,
        closable: false,
        onPositiveClick: unpause,
      });
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
      });
    }

    return {
      about,
      clearGameState,
      exportGame,
      importGame,
      lightMode,
      otherThemeName,
      pauseTime,
      restart,
      switchTheme,
    }
  },
})
</script>