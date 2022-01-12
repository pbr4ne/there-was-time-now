<template>
  <n-layout position="absolute">
    <t-game-header />
    <n-layout has-sider>
      <t-game-sider />
      <t-game-tabs />
    </n-layout>
    <t-game-footer />
  </n-layout>
  <n-modal 
    v-model:show="showPausedModal"
    :mask-closable="false"
    preset="dialog"
    positive-text="Paused"
    @positive-click="onPositiveClickUnpause"
  >
    There was time now... to go to the bathroom. The game is paused.
  </n-modal>
</template>

<script>
import { ref, watch } from 'vue'
import { NLayout, NModal } from 'naive-ui'
import TGameFooter from '@/components/TGameFooter.vue'
import TGameHeader from '@/components/TGameHeader.vue'
import TGameSider from '@/components/TGameSider.vue'
import TGameTabs from '@/components/TGameTabs.vue'
import useTime from '@/composables/useTime'
import useInitialize from '@/composables/useInitialize'
import useMessage from '@/composables/useMessage'
import useSaveLoad from '@/composables/useSaveLoad'
import useSpecialEvents from '@/composables/useSpecialEvents'
import useUnlockWatch from '@/composables/useUnlockWatch'
import { GameConstants } from '@/enum/Constants'

export default {
  components: {
    NLayout,
    NModal,
    TGameFooter,
    TGameHeader,
    TGameSider,
    TGameTabs,
  },
  setup () {
    const { loadGameState, saveGameState } = useSaveLoad();
    const { 
      countdownTriggered, 
      gameEnded, 
      gamePaused, 
      gameStarted, 
      isLoading, 
      saveStopwatch,  
    } = useInitialize();
    const { sendInitialMessage } = useMessage();
    

    loadGameState().then(function() {
      if(!gameStarted.value) {
        sendInitialMessage();
        gameStarted.value = true;
      }
    });

    const { countdownTimer, countupTimer } = useTime();
    const showWinModalRef = ref(false);

    useSpecialEvents();
    useUnlockWatch();

    //Autosave
    setTimeout(function() {
      watch(saveStopwatch.seconds, () => {
        if((saveStopwatch.seconds.value % GameConstants.SAVE_INTERVAL === 0 && !isLoading.value && !gamePaused.value)){
          saveGameState();
        }
      });
    }, GameConstants.SAVE_INTERVAL * 1000);

    return {
      onPositiveClickWin() {
        showWinModalRef.value = true;
      },
      onPositiveClickUnpause() {
        gamePaused.value = false;
        if(countdownTriggered.value) {
          countdownTimer.start();
        } else if(!gameEnded.value) {
          countupTimer.start();
        }
      },
      showWinModal: showWinModalRef,
      showPausedModal: gamePaused,
    };
  }
}
</script>
