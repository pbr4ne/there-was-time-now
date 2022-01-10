import { computed, ref } from 'vue'
import { ResUseStopwatch, useStopwatch, useTimer, UseTimer} from 'vue-timer-hook'
import { GameConstants } from '@/enum/Constants'

//todo - this is still a mess
const countupTimer = {
  create: function() {
    stopwatch = useStopwatch(0, true);
  },

  secondsElapsed: function() {
    return stopwatch.seconds.value 
    + stopwatch.minutes.value * 60 
    + stopwatch.hours.value * 3600
    + stopwatch.days.value * 86400;
  },

  stop: function() {
    stopwatch.pause();
  }
}

const countdownTimer = {
  create: function() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + GameConstants.INITIAL_TIME);
    timer = useTimer(time.getTime(), false);
  },
  
  start: function () {
    stopwatch.pause();
    timer.start();
  },

  restart: function(newTime: number) {
    timer.restart(newTime);
  },

  stop: function() {
    timer.pause();
  },

  secondsLeft: function() {
    return timer.seconds.value 
      + timer.minutes.value * 60 
      + timer.hours.value * 3600
      + timer.days.value * 86400;
  },

  isExpired: function() {
    return timer.isExpired.value;
  },

  isRunning: function() {
    return timer.isRunning.value;
  }
}

let timer : UseTimer;
let stopwatch : ResUseStopwatch;
countdownTimer.create();
countupTimer.create();
const expandConstant = ref(GameConstants.INITIAL_EXPANSION_CONSTANT);

function expandTime(expand: number) {
  if(countdownTimer.isRunning()) {
    expandConstant.value *= expand;

    const secondsLeft = countdownTimer.secondsLeft();

    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + (secondsLeft * expand));

    countdownTimer.restart(newTime.getTime());
  }
}

export default function useTime() {

  const timeElapsed = computed(() => {
    let time = GameConstants.INITIAL_TIME - timeLeft.value;
    time += countupTimer.secondsElapsed();
    return time;
  });

  const timeLeft = computed(() => {
    let secondsLeft = countdownTimer.secondsLeft();
    secondsLeft /= expandConstant.value;
    return Math.round(secondsLeft);
  });

  return {
    countdownTimer,
    countupTimer,
    expandConstant,
    expandTime,
    timeElapsed,
    timeLeft,
  };
}