<template>
  <n-layout-header bordered>
    <n-space justify="end">
      <n-menu mode="horizontal" :options="topMenu" />
    </n-space>
  </n-layout-header>
</template>

<script>
import { defineComponent, h } from 'vue'

import { 
  NIcon,
  NLayoutHeader,
  NMenu,
  NSpace,
} from 'naive-ui'

import {
  AlarmOutline as AlarmIcon,
  ApertureOutline as ApertureIcon,
  SettingsOutline as SettingsIcon,
} from '@vicons/ionicons5'

function renderIcon (icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

export default defineComponent({
  components: {
    NLayoutHeader,
    NMenu,
    NSpace,
  },
  setup() {
    const topMenu = [
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
      topMenu,
    }
  },
})
</script>
