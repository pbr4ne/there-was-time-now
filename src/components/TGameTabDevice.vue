<template>
  <!-- todo - figure out how to get this to render nice -->
  <n-card align="stretch" :title="device.label" style="width: 300px;">
    <n-progress
        type="line"
        :percentage="device.current"
        :height="24"
        :border-radius="4"
        :fill-border-radius="0"
        :color="device.color"
        style="cursor: pointer;"
        @click="incrementDevice(device)"
      />
  </n-card>
</template>
<script>
/*eslint-disable*/
import { defineComponent } from 'vue'
import { NCard, NProgress, NSpace, } from 'naive-ui'
import { Device } from '@/entities/Device'
import useDevice from '@/composables/useDevice'

export default defineComponent({
  components: {
    NCard,
    NProgress,
    NSpace,
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