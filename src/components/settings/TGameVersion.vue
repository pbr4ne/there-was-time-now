<template>
  <n-h4 :style="{color: '#bc6c25'}">
    v0.8 - 2022-03-02
  </n-h4>
  <ul>
    <li>freeze footer to bottom</li>
    <li>minor balancing tweaks</li>
  </ul>
  <n-h4 :style="{color: '#FEFAE0'}">
    v0.7 - 2022-02-06
  </n-h4>
  <ul>
    <li>prevent time expansion from continuing to expand time at 1000</li>
  </ul>
  <n-h4 :style="{color: '#f4e285'}">
    v0.6 - 2022-02-06
  </n-h4>
  <ul>
    <li>fixed device button being incorrectly disabled</li>
  </ul>
  <n-h4 :style="{color: '#e0c3fc'}">
    v0.5 - 2022-02-04
  </n-h4>
  <ul>
    <li>tooltips no longer stay alive when you mouse over them</li>
    <li>added a button to device, for clarity</li>
    <li>fixed time expansion cap - limit of exactly 1000</li>
  </ul>
  <n-h4 :style="{color: '#4CC9F0'}">
    v0.4 - 2022-01-30
  </n-h4>
  <ul>
    <li>non-backwards-compatible change to saves, sorry!</li>
    <li>copy export to clipboard</li>
    <li>added icons and colours to the timelines and dialog boxes</li>
    <li>every character gets their own timeline messages</li>
    <li>fixed dialog bug attributing the wrong character</li>
    <li>fixed game countdown continuing after game has ended but you unpause</li>
  </ul>

  <n-h4 :style="{color: '#4361EE'}">
    v0.3 - 2022-01-29
  </n-h4>
  <ul>
    <li>added import & export</li>
    <li>added pause! also pauses automatically for all dialogs</li>
    <li>added autosave message</li>
    <li>added version history dialog</li>
    <li>fixed exploit where you could hold down enter to research too rapidly</li>
    <li>fixed some issues with internal timers</li>
    <li>fixed bug with local save</li>
  </ul>

  <n-h4 :style="{color: '#B5179E'}">
    v0.2 - 2022-01-16
  </n-h4>
  <ul>
    <li>fixed bug where win scenario did not trigger</li>
  </ul>

  <n-h4 :style="{color: '#F72585'}">
    v0.1 - 2022-01-15
  </n-h4>
  <ul>
    <li>initial version for new year's incremental game jam</li>
  </ul>
</template>

<script>
import { defineComponent } from 'vue'
import { NH4 } from 'naive-ui'

export default defineComponent({
  components: {
    NH4,
  },
})
</script>
