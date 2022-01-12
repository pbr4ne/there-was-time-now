import { watchEffect } from 'vue'
import { useDialog } from 'naive-ui'
import useInitialize from '@/composables/useInitialize'
import useMessage from '@/composables/useMessage'
import useTime from '@/composables/useTime'
import { ScienceKey } from '@/enum/Enums'

export default function useSpecialEvents() {

  const { countdownTriggered, gameEnded, isLoading, scienceList, sellFeatureEnabled } = useInitialize();
  const { sendEndOfWorldMessage, sendWorkersMessage } = useMessage();
  const { countdownTimer, countupTimer, } = useTime();
  const dialog = useDialog();

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

  //SPECIAL - when countdown timer is expired, show end of game modal
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