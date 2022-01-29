<template>
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
  setup() {
  },
})
</script>
<style scoped>
</style>
