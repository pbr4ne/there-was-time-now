import { watchEffect } from 'vue'
import { useDialog } from 'naive-ui'
import useInitialize from '@/composables/useInitialize'
// @ts-ignore
import useMessage from '@/composables/useMessage'
import useTime from '@/composables/useTime'
import useFlags from '@/composables/useFlags'
import { Research } from '@/entities/Research'
import { GameConstants } from '@/enum/Constants'
import { ResearchKey } from '@/enum/Enums'

//todo - some of this could probably be triggered other ways
export default function useSpecialEvents() {

  const dialog = useDialog();
  const { researchList } = useInitialize();
  const { sendUnlockCountdownMessage, sendHalfwayMessage, sendSpeakToLennoxMessage, sendUnlockSlowdownMessage, sendUnlockWorkersMessage } = useMessage();
  const { countdownTimer, countupTimer, } = useTime();
  const { countdownTriggered, gameEnded, isLoading, sellFeatureEnabled, slowdownEnabled, spokeToLennox } = useFlags();
  

  //When first quantum computer is built, start the end of world timer
  watchEffect(() => {
    if(!countdownTriggered.value && researchList[ResearchKey.QUANTUM_COMPUTER].total == 1 && !isLoading.value) {
      countdownTriggered.value = true;
      sendUnlockCountdownMessage();
      countdownTimer.start();
      countupTimer.stop();
    }
  });

  //When fifth quantum computer is built, unlock buy/sell
  watchEffect(() => {
    if(!sellFeatureEnabled.value && researchList[ResearchKey.QUANTUM_COMPUTER].total == 5 && !isLoading.value) {
      sellFeatureEnabled.value = true;
      sendUnlockWorkersMessage();
    }
  });

  //When first worker is purchased, unlock slowdown
  watchEffect(() => {
    if(!slowdownEnabled.value && Object.values(researchList).find((research: any) => research.numWorkers > 0)) {
      slowdownEnabled.value = true;
      sendUnlockSlowdownMessage();
    }
  });

  watchEffect(() => {
    if(!spokeToLennox.value && researchList[ResearchKey.BIOLOGY].total == 5 && !isLoading.value){
      spokeToLennox.value = true;
      sendSpeakToLennoxMessage();
    }
  });

  //When time is halfway up, show message
  watchEffect(() => {
    if(countdownTimer.secondsLeft() == GameConstants.INITIAL_TIME / 2 && !isLoading.value){
      sendHalfwayMessage();
    }
  });

  //When you finish building all devices, you win
  watchEffect(() => {
    if(isLoading.value) {
      return;
    }
    const devices = Object.values(researchList).filter((research: any) => research.isDevice);
    const devicesComplete = devices.filter((research: any) => research.total == 1);
    if(devices.length == devicesComplete.length) {
      countdownTimer.stop();
      gameEnded.value = true;
      dialog.success({
        title: 'Game Won',
        content: 'You successfully stopped the end of the world!'
      });
    }
  });

  //When countdown timer is expired, show end of game modal
  watchEffect(async() => {
    if(countdownTimer.isExpired() && !isLoading.value) {
      gameEnded.value = true;

      dialog.error({
        title: 'Game Over',
        content: '#OUTATIME'
      });
    }
  });
}