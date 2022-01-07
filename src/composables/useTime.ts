import { computed, ref } from 'vue'
import { useTimer, UseTimer } from 'vue-timer-hook'

const time = new Date();
time.setSeconds(time.getSeconds() + 300);
const timer = useTimer(time.getTime());

const expandConstant = ref(1);

function getSecondsLeft(timer: UseTimer) {
  return timer.seconds.value 
      + timer.minutes.value*60 
      + timer.hours.value*60*60 
      + timer.days.value*60*60*24;
}

export default function useTime() {

  const timeLeft = computed(() => {
    let secondsLeft = getSecondsLeft(timer);
    secondsLeft *= expandConstant.value;
    
    //console.log(`oldSecondsLeft: ${oldSecondsLeft} expandConstant: ${expandConstant.value} new secondsLeft: ${secondsLeft}`);

    return Math.round(secondsLeft);
  });

  const expandTime = (expand: number) => {
    console.log('expandTime');
    expandConstant.value /= expand;

    const secondsLeft = getSecondsLeft(timer);

    const newTime = new Date();
    newTime.setSeconds(secondsLeft * expand);
    timer.restart(newTime.getTime());
  }

  return {
    expandConstant,
    expandTime,
    timeLeft,
    timer,
  };
}