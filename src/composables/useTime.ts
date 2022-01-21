import { computed, ref } from 'vue'
import { ResUseStopwatch, useStopwatch, useTimer, UseTimer} from 'vue-timer-hook'
import { GameConstants } from '@/enum/Constants'

class CountupTimer {
  stopwatch: ResUseStopwatch;

  constructor() {
    this.stopwatch = useStopwatch(0, true);
  }

  restart(existingTime: number) {
    this.stopwatch.reset(existingTime);
  }

  secondsElapsed() {
    return this.stopwatch.seconds.value 
    + this.stopwatch.minutes.value * 60 
    + this.stopwatch.hours.value * 3600
    + this.stopwatch.days.value * 86400;
  }

  start() {
    this.stopwatch.start();
  }

  stop() {
    this.stopwatch.pause();
  }
}

class CountdownTimer {
  timer: UseTimer;

  constructor() {
    const time = new Date();
    const seconds = time.getSeconds() + GameConstants.INITIAL_TIME;
    time.setSeconds(seconds);
    this.timer = useTimer(time.getTime(), false);
  }
  
  resume() {
    this.timer.resume();
  }

  start() {
    this.timer.start();
  }

  restart(newTime: number) {
    const time = new Date();
    const seconds = time.getSeconds() + newTime;
    time.setSeconds(seconds);
    this.timer.restart(time.getTime(), true);
  }

  stop() {
    this.timer.pause();
  }

  realPeopleTimeLeft() {
    const days = this.timer.days.value > 0 ? " " + this.timer.days.value + " days" : "";
    const hours = this.timer.hours.value > 0 ? " " + this.timer.hours.value + " hours" : "";
    const minutes = this.timer.minutes.value > 0 ? " " + this.timer.minutes.value + " minutes" : ""
    const seconds = this.timer.seconds.value > 0 ? " " + this.timer.seconds.value + " seconds" : ""
    return days + hours + minutes + seconds;
  }

  secondsLeft() {
    return this.timer.seconds.value 
      + this.timer.minutes.value * 60 
      + this.timer.hours.value * 3600
      + this.timer.days.value * 86400;
  }

  isExpired() {
    return this.timer.isExpired.value;
  }

  isRunning() {
    return this.timer.isRunning.value;
  }
}

const countdownTimer = new CountdownTimer();
const countupTimer = new CountupTimer();
const expandConstant = ref(GameConstants.INITIAL_EXPANSION_CONSTANT);

function expandTime(expand: number) {
  if(countdownTimer.isRunning()) {
    //hard cap
    if(expandConstant.value > 1000) {
      return;
    }
    expandConstant.value *= expand;

    const secondsLeft = countdownTimer.secondsLeft();

    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + (secondsLeft * expand));

    countdownTimer.restart((secondsLeft * expand));
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