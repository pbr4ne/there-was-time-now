<template>
  <n-layout position="absolute">
    <t-header />
    <n-layout has-sider>
      <t-sider />
      <t-tabs />
    </n-layout>
    <t-footer />
  </n-layout>
</template>

<script>
import { NLayout } from 'naive-ui'

import TFooter from './TFooter.vue'
import THeader from './THeader.vue'
import TSider from './TSider.vue'
import TTabs from './TTabs.vue'

import useUnlockWatch from '../composables/useUnlockWatch'

export default {
  name: 'TGame',
  components: {
    NLayout,
    TFooter,
    THeader,
    TSider,
    TTabs,
  },
  setup () {
    useUnlockWatch();

    return {
    };
  }
}
</script>

