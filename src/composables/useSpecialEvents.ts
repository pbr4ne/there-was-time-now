import { watchEffect } from 'vue'
import { useDialog } from 'naive-ui'
import useInitialize from '@/composables/useInitialize'
import useTime from '@/composables/useTime'

export default function useSpecialEvents() {

  const { gameEnded, isLoading } = useInitialize();
  const { countdownTimer } = useTime();
  const dialog = useDialog();

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