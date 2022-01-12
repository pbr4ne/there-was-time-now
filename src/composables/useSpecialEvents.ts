import { watchEffect } from 'vue'
import { useDialog } from 'naive-ui'
import useInitialize from '@/composables/useInitialize'
import useMessage from '@/composables/useMessage'
import useTime from '@/composables/useTime'
import { GameConstants } from '@/enum/Constants'
import { ScienceKey } from '@/enum/Enums'


//todo - some of this could probably be triggered other ways
export default function useSpecialEvents() {

  const { countdownTriggered, deviceList, gameEnded, isLoading, scienceList, sellFeatureEnabled, slowdownEnabled } = useInitialize();
  const { sendEndOfWorldMessage, sendHalfwayMessage, sendSlowdownMessage, sendWorkersMessage } = useMessage();
  const { countdownTimer, countupTimer, } = useTime();
  const dialog = useDialog();

  //When first quantum computer is built, start the end of world timer
  watchEffect(() => {
    if(!countdownTriggered.value && scienceList[ScienceKey.QUANTUM_COMPUTER].total == 1 && !isLoading.value) {
      countdownTriggered.value = true;
      sendEndOfWorldMessage();
      countdownTimer.start();
      countupTimer.stop();
    }
  });

  //When fifth quantum computer is built, unlock buy/sell
  watchEffect(() => {
    if(!sellFeatureEnabled.value && scienceList[ScienceKey.QUANTUM_COMPUTER].total == 5 && !isLoading.value) {
      sellFeatureEnabled.value = true;
      sendWorkersMessage();
    }
  });

  //When first worker is purchased, unlock slowdown
  watchEffect(() => {
    if(!slowdownEnabled.value && Object.values(scienceList).find((science: any) => science.numWorkers > 0)) {
      slowdownEnabled.value = true;
      sendSlowdownMessage();
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
    const devices = Object.values(deviceList);
    let devicesUnlocked = 0;
    Object.values(deviceList).forEach((device: any) => {
      if(device.total == 1) {
        devicesUnlocked++
      }
    });
    if(devicesUnlocked == devices.length) {
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