import { computed, ref } from 'vue'
import { useTimer, UseTimer } from 'vue-timer-hook'
import { GameConstants } from '@/enum/Constants'

const time = new Date();
time.setSeconds(time.getSeconds() + GameConstants.INITAL_TIME);
const endOfWorldTimer = useTimer(time.getTime());

const expandConstant = ref(1);

function getSecondsLeft(endOfWorldTimer: UseTimer) {
  return endOfWorldTimer.seconds.value 
      + endOfWorldTimer.minutes.value * 60 
      + endOfWorldTimer.hours.value * 3600
      + endOfWorldTimer.days.value * 86400;
}

export default function useTime() {

  const timeElapsed = computed(() => {
    return GameConstants.INITAL_TIME - timeLeft.value;
  });

  const timeLeft = computed(() => {
    let secondsLeft = getSecondsLeft(endOfWorldTimer);
    secondsLeft *= expandConstant.value;
    
    //console.log(`oldSecondsLeft: ${oldSecondsLeft} 
    //expandConstant: ${expandConstant.value} new secondsLeft: ${secondsLeft}`);

    return Math.round(secondsLeft);
  });

  const expandTime = (expand: number) => {
    expandConstant.value /= expand;

    const secondsLeft = getSecondsLeft(endOfWorldTimer);

    const newTime = new Date();
    newTime.setSeconds(secondsLeft * expand);
    endOfWorldTimer.restart(newTime.getTime());
  }

  return {
    expandConstant,
    expandTime,
    timeElapsed,
    timeLeft,
    endOfWorldTimer,
  };
}