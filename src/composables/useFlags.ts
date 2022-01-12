import { ref } from 'vue'
import { useStopwatch } from 'vue-timer-hook'

const gameStarted = ref(false);
const gamePaused = ref(false);
const gameEnded = ref(false);
const countdownTriggered = ref(false);
const isLoading = ref(true);
//todo - this isn't a flag
const saveStopwatch = useStopwatch(0, true);
const sellFeatureEnabled = ref(false);
const slowdownEnabled = ref(false);
const spokeToLennox = ref(false);

export default function useFlags() {
  return {
    countdownTriggered,
    gameEnded,
    gamePaused,
    gameStarted,
    isLoading,
    saveStopwatch,
    sellFeatureEnabled,
    slowdownEnabled,
    spokeToLennox,
  }
}