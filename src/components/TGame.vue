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
    v-model:show="showWinModal"
    :mask-closable="false"
    preset="dialog"
    positive-text="YAY"
    @positive-click="onPositiveClickWin"
  >
    YOU WIN
  </n-modal>
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
import { ref, watch, watchEffect } from 'vue'
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
import { ScienceKey } from '@/enum/Enums'

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
      deviceList, 
      gameEnded, 
      gamePaused, 
      gameStarted, 
      isLoading, 
      saveStopwatch, 
      scienceList, 
      sellFeatureEnabled 
    } = useInitialize();
    const { sendEndOfWorldMessage, sendHalfwayMessage, sendInitialMessage, sendWorkersMessage } = useMessage();
    

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

    //SPECIAL - when first quantum computer is built, start the end of world timer
    watchEffect(() => {
      if(!countdownTriggered.value && scienceList[ScienceKey.QUANTUM_COMPUTER].total == 1 && !isLoading.value) {
        countdownTriggered.value = true;
        sendEndOfWorldMessage();
        countdownTimer.start();
        countupTimer.stop();
      }
    });

    //SPECIAL - when fifth quantum computer is built, unlock buy/sell
    watchEffect(() => {
      if(!sellFeatureEnabled.value && scienceList[ScienceKey.QUANTUM_COMPUTER].total == 5 && !isLoading.value) {
        sellFeatureEnabled.value = true;
        sendWorkersMessage();
      }
    });

    //SPECIAL - when time is halfway up, show message
    watchEffect(() => {
      if(countdownTimer.secondsLeft() == GameConstants.INITIAL_TIME / 2 && !isLoading.value){
        sendHalfwayMessage();
      }
    });

    //SPECIAL - when you finish building all devices, you win
    watchEffect(() => {
      if(isLoading.value) {
        return;
      }
      const devices = Object.values(deviceList);
      let devicesUnlocked = 0;
      Object.values(deviceList).forEach(device => {
        if(device.total == 1) {
          devicesUnlocked++
        }
      });
      if(devicesUnlocked == devices.length) {
        countdownTimer.stop();
        gameEnded.value = true;
        showWinModalRef.value = true;
      }
    });

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
