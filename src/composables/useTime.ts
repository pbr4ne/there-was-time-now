import { computed, ref } from 'vue'
import { useTimer } from 'vue-timer-hook'

const time = new Date();
time.setSeconds(time.getSeconds() + 600);
const timer = useTimer(time.getTime());

const expandConstant = ref(1);

export default function useTime() {
  const timeLeft = computed(() => {
    let secondsLeft = timer.seconds.value 
      + timer.minutes.value*60 
      + timer.hours.value*60*60 
      + timer.days.value*60*60*24;

    secondsLeft *= expandConstant.value;
    
    //console.log(`oldSecondsLeft: ${oldSecondsLeft} expandConstant: ${expandConstant.value} new secondsLeft: ${secondsLeft}`);

    return Math.round(secondsLeft);
  });

  const expandTime = (expand: number) => {
    expandConstant.value /= expand;

    const secondsLeft = timer.seconds.value 
      + timer.minutes.value*60 
      + timer.hours.value*60*60 
      + timer.days.value*60*60*24;

    const newTime = new Date();
    newTime.setSeconds(secondsLeft * expand);
    timer.restart(newTime.getTime());
  }

  return {
    expandConstant,
    expandTime,
    timeLeft,
  };
}