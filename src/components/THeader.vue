<template>
  <n-layout-header bordered>
    <n-space justify="end">
      <n-tag>{{expandConstant}}</n-tag>
      <n-tag>{{timeLeft}}</n-tag>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <n-spin #icon>
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
  NTag,
} from 'naive-ui'

import {
  AccessTimeOutlined as TimeIcon
} from '@vicons/material'

import useTime from '../composables/useTime'

export default defineComponent({
  components: {
    NIcon,
    NLayoutHeader,
    NSpace,
    NSpin,
    NTag,
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
