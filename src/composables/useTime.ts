import { computed, ref } from 'vue'
import { useTimer, UseTimer } from 'vue-timer-hook'
import { GameConstants } from '@/enum/Constants'

//todo - this is still a mess
const countdownTimer = {
  create: function() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + GameConstants.INITIAL_TIME);
    vueTimer = useTimer(time.getTime(), false);
  },
  
  start: function () {
    vueTimer.start();
  },

  restart: function(newTime: number) {
    vueTimer.restart(newTime);
  },

  secondsLeft: function() {
    return vueTimer.seconds.value 
      + vueTimer.minutes.value * 60 
      + vueTimer.hours.value * 3600
      + vueTimer.days.value * 86400;
  },

  isExpired: function() {
    return vueTimer.isExpired.value;
  },

  isRunning: function() {
    return vueTimer.isRunning.value;
  }
}

let vueTimer : UseTimer;
countdownTimer.create();
const expandConstant = ref(GameConstants.INITIAL_EXPANSION_CONSTANT);

//todo - this doesn't math the way i want. the "days left" should stay
//basically the same
function expandTime(expand: number) {
  if(countdownTimer.isRunning()) {
    expandConstant.value /= expand;

    const secondsLeft = countdownTimer.secondsLeft();

    const newTime = new Date();
    newTime.setSeconds(secondsLeft * expand);

    countdownTimer.restart(newTime.getTime());
  }
}

export default function useTime() {

  const timeElapsed = computed(() => {
    return GameConstants.INITIAL_TIME - timeLeft.value;
  });

  const timeLeft = computed(() => {
    let secondsLeft = countdownTimer.secondsLeft();
    secondsLeft *= expandConstant.value;
    return Math.round(secondsLeft);
  });

  return {
    countdownTimer,
    expandConstant,
    expandTime,
    timeElapsed,
    timeLeft,
  };
}