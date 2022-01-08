<template>
  <n-layout-header bordered style="padding-top: 5px;">
    <n-space justify="end" style="height: 72.8px">
      <span></span>
      <n-statistic label="Time Expansion" v-if="endOfWorldTimer.isRunning.value">
        {{expandConstant}}
      </n-statistic>

      <n-statistic label="Days Left" v-if="endOfWorldTimer.isRunning.value">
        {{timeLeft}}
      </n-statistic>

      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <n-spin #icon style="vertical-align: middle;" v-if="endOfWorldTimer.isRunning.value">
        <n-icon><time-icon /></n-icon>
      </n-spin>

    </n-space>
  </n-layout-header>
</template>

<script>
import { defineComponent } from 'vue'

import { 
  NIcon,
  NLayoutHeader,
  NSpace,
  NSpin,
  NStatistic,
} from 'naive-ui'

import {
  AccessTimeOutlined as TimeIcon
} from '@vicons/material'

import useTime from '@/composables/useTime'

export default defineComponent({
  components: {
    NIcon,
    NLayoutHeader,
    NSpace,
    NSpin,
    NStatistic,
    TimeIcon,
  },
  setup() {
    const { endOfWorldTimer, expandConstant, timeLeft } = useTime();
    return {
      endOfWorldTimer,
      expandConstant,
      timeLeft,
    }
  },
})
</script>
