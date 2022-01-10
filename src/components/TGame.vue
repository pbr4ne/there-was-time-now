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
    v-model:show="showGameOverModal"
    :mask-closable="false"
    preset="dialog"
    positive-text="Dang"
    @positive-click="onPositiveClick"
  >
    GAME OVER
    #OUTATIME
  </n-modal>
</template>

<script>
import { ref, watchEffect } from 'vue'
import { NLayout, NModal } from 'naive-ui'
import TGameFooter from '@/components/TGameFooter.vue'
import TGameHeader from '@/components/TGameHeader.vue'
import TGameSider from '@/components/TGameSider.vue'
import TGameTabs from '@/components/TGameTabs.vue'
import useTime from '@/composables/useTime'
import useInitialize from '@/composables/useInitialize'
import useMessage from '@/composables/useMessage'
import useResearch from '@/composables/useResearch'
import useUnlockWatch from '@/composables/useUnlockWatch'
import { GameConstants } from '@/enum/Constants'
import { EngineeringKey, ScienceKey } from '@/enum/Enums'

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
    useUnlockWatch();
    const { engineeringList, scienceList } = useInitialize();
    const { sendEndOfWorldMessage, sendHalfwayMessage, sendInitialMessage } = useMessage();
    const { sellFeatureEnabled } = useResearch();
    const { countdownTimer } = useTime();
    const showGameOverModalRef = ref(false);
    let endOfWorld = false;

    sendInitialMessage();

    //SPECIAL - when countdown timer is expired, show end of game modal
    watchEffect(async() => {
      if(countdownTimer.isExpired()) {
        showGameOverModalRef.value = true;
      }
    });

    //SPECIAL - when first quantum computer is built, start the end of world timer
    watchEffect(() => {
      if(!endOfWorld && engineeringList[EngineeringKey.QUANTUM_COMPUTER].total == 1) {
        endOfWorld = true;
        sendEndOfWorldMessage();
        countdownTimer.start();
      }
    });

    //SPECIAL - when first quantum computing is researched, unlock buy/sell
    watchEffect(() => {
      if(scienceList[ScienceKey.QUANTUM_COMPUTING].total == 1) {
        sellFeatureEnabled.value = true;
      }
    });

    //SPECIAL - when time is halfway up, show message
    watchEffect(() => {
      if(countdownTimer.secondsLeft() == GameConstants.INITIAL_TIME / 2){
        sendHalfwayMessage();
      }
    });

    return {
      onPositiveClick () {
        showGameOverModalRef.value = false;
      },
      showGameOverModal: showGameOverModalRef,
    };
  }
}
</script>
