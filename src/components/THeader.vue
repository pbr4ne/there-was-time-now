<template>
  <n-layout-header bordered>
    <n-space justify="end">
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
} from 'naive-ui'

import {
  AccessTimeOutlined as TimeIcon
} from '@vicons/material'

export default defineComponent({
  components: {
    NIcon,
    NLayoutHeader,
    NSpace,
    NSpin,
    TimeIcon,
  },
  setup() {
    return {
    }
  },
})
</script>
