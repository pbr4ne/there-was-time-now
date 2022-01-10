<template>
<n-grid :cols="1" responsive="screen" style="padding-left: 20px; max-width: 75%;">
  <n-grid-item>
    <n-card align="stretch" :title="device.label" @click="incrementDevice(device)" style="cursor: pointer;">
      <n-progress
          type="line"
          :percentage="device.current"
          :height="24"
          :border-radius="4"
          :fill-border-radius="0"
          :indicator-placement="'inside-label'"
          :color="device.color"
        />
    </n-card>
  </n-grid-item>
</n-grid>
</template>
<script>
import { defineComponent } from 'vue'
import { NCard, NGrid, NGridItem, NProgress } from 'naive-ui'
import { Device } from '@/entities/Device'
import useDevice from '@/composables/useDevice'

export default defineComponent({
  components: {
    NCard,
    NGrid,
    NGridItem,
    NProgress,
  },
  props: {
    device: Device,
  },
  setup() {
    let { incrementDevice } = useDevice();

    return {
      incrementDevice,
    }
  },
})
</script>