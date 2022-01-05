<template>
  <n-layout-footer bordered>
    <n-space justify="end">
      <n-tooltip placement="left" trigger="click">
        <template #trigger>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <n-button strong secondary circle #icon>
            <n-icon><bulb-icon /></n-icon>
          </n-button>
        </template>
        <span>Help Message? Or something</span>
      </n-tooltip>
    </n-space>
  </n-layout-footer>
</template>

<script>
import { defineComponent } from 'vue'

import { 
  NButton,
  NIcon,
  NLayoutFooter,
  NSpace,
  NTooltip,
} from 'naive-ui'

import {
  BulbOutline as BulbIcon,
} from '@vicons/ionicons5'

export default defineComponent({
  components: {
    BulbIcon,
    NButton,
    NIcon,
    NLayoutFooter,
    NSpace,
    NTooltip,
  },
  setup() {
    return {
    }
  },
})
</script>