<template>
  <n-layout-header bordered style="padding-top: 5px;">
    <n-space justify="end">

      <n-statistic label="Time Expansion">
        {{expandConstant}}
      </n-statistic>

      <n-statistic label="Days Left">
        {{timeLeft}}
      </n-statistic>

      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <n-spin #icon style="vertical-align: middle;">
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
    const { expandConstant, timeLeft } = useTime();
    return {
      expandConstant,
      timeLeft,
    }
  },
})
</script>
