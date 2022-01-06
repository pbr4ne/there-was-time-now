<template>
  <n-layout-footer bordered>
    <n-space justify="space-between">
      <n-space justify="start">
        <n-menu mode="horizontal" :options="settings" />
      </n-space>
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
    </n-space>
  </n-layout-footer>
</template>

<script>
import { defineComponent } from 'vue'

import { 
  NButton,
  NIcon,
  NLayoutFooter,
  NMenu,
  NSpace,
  NTooltip,
} from 'naive-ui'

import {
  AlarmOutline as AlarmIcon,
  ApertureOutline as ApertureIcon,
  BulbOutline as BulbIcon,
  SettingsOutline as SettingsIcon,
} from '@vicons/ionicons5'

import useIcon from '@/composables/useIcon'

export default defineComponent({
  components: {
    BulbIcon,
    NButton,
    NIcon,
    NLayoutFooter,
    NMenu,
    NSpace,
    NTooltip,
  },
  setup() {
    const { renderIcon } = useIcon();

    const settings = [
      {
        label: 'Settings',
        key: 'settings',
        icon: renderIcon(SettingsIcon),
        children: [
          {
            type: 'group',
            label: 'Bwah',
            key: 'bwah',
            children: [
              {
                label: 'Setting 1',
                key: 'setting-1',
                icon: renderIcon(AlarmIcon),
              },
              {
                label: 'Setting 2',
                key: 'setting-2',
                icon: renderIcon(ApertureIcon),
              }
            ]
          }
        ]
      }
    ]
    return {
      settings
    }
  },
})
</script>