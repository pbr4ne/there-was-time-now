import useFlags from '@/composables/useFlags'
import useTime from '@/composables/useTime'

export default function usePause() {
  const { countdownTriggered, gameEnded, gamePaused } = useFlags();
  const { countdownTimer, countupTimer } = useTime();

  const pause = () => {
    countdownTimer.stop();
    countupTimer.stop();
    gamePaused.value = true;
  }

  const unpause = () => {
    gamePaused.value = false;
    if(countdownTriggered.value) {
      countdownTimer.resume();
    } else if(!gameEnded.value) {
      countupTimer.start();
    }
  }

  return {
    pause,
    unpause,
  }
}