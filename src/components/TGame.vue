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
import { 
  NLayout,
} from 'naive-ui'

import TFooter from '../components/TFooter.vue'
import THeader from '../components/THeader.vue'
import TSider from '../components/TSider.vue'
import TTabs from '../components/TTabs.vue'

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
    return {
    };
  }
}
</script>

