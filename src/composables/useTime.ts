import { computed, ref } from 'vue'
import { useTimer, UseTimer } from 'vue-timer-hook'
import { GameConstants } from '@/enum/Constants'

const time = new Date();
time.setSeconds(time.getSeconds() + GameConstants.INITAL_TIME);
const timer = useTimer(time.getTime());

const expandConstant = ref(1);

function getSecondsLeft(timer: UseTimer) {
  return timer.seconds.value 
      + timer.minutes.value * 60 
      + timer.hours.value * 3600
      + timer.days.value * 86400;
}

export default function useTime() {

  const timeElapsed = computed(() => {
    return GameConstants.INITAL_TIME - timeLeft.value;
  });

  const timeLeft = computed(() => {
    let secondsLeft = getSecondsLeft(timer);
    secondsLeft *= expandConstant.value;
    
    //console.log(`oldSecondsLeft: ${oldSecondsLeft} 
    //expandConstant: ${expandConstant.value} new secondsLeft: ${secondsLeft}`);

    return Math.round(secondsLeft);
  });

  const expandTime = (expand: number) => {
    expandConstant.value /= expand;

    const secondsLeft = getSecondsLeft(timer);

    const newTime = new Date();
    newTime.setSeconds(secondsLeft * expand);
    timer.restart(newTime.getTime());
  }

  return {
    expandConstant,
    expandTime,
    timeElapsed,
    timeLeft,
    timer,
  };
}