<template>
  <n-layout-header bordered style="padding-top: 5px;">

    <n-space justify="space-between" class="twtnHeader">
      <n-space style="padding-left: 5px;" width="100%">
        <span :class="[titleFont]" v-if="showTitle">There Was Time Now</span>
      </n-space>

      <n-space width="209px">
        <n-statistic label="Time Expansion" v-if="countdownTimer.isRunning()">
          {{expandConstant.toFixed(2)}}
        </n-statistic>

        <n-statistic label="Days Left" v-if="countdownTimer.isRunning()">
          {{timeLeft}}
        </n-statistic>

        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <n-spin #icon style="vertical-align: middle;" v-if="countdownTimer.isRunning()">
          <n-icon><time-icon /></n-icon>
        </n-spin>
      </n-space>
    </n-space>
  </n-layout-header>
</template>

<script>
import { computed, defineComponent } from 'vue'

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
    const { countdownTimer, expandConstant, timeLeft } = useTime();

    //don't show title for smaller widths until I can figure out 
    let showTitle = window.innerWidth > 700;

    const titleFont = computed(() => {
      return {
        "title1984": true,
        "titleText": true,
      }
    });

    return {
      countdownTimer,
      expandConstant,
      showTitle,
      timeLeft,
      titleFont,
    }
  },
})
</script>
<style scoped>
  @font-face {
    font-family: "1984";
    src: local("lazenby-computer.liquid"),
    url("@/fonts/lazenby-computer.liquid.ttf")
    format("truetype");
  }

  @font-face {
    font-family: "1934";
    src: local("Joe Caps Underwood"),
    url("@/fonts/Joe Caps Underwood.ttf")
    format("truetype");
  }

   @font-face {
    font-family: "904";
    src: local("Ramadhan Karim"),
    url("@/fonts/Ramadhan Karim.ttf")
    format("truetype");
  }

   @font-face {
    font-family: "374";
    src: local("Maya Culpa"),
    url("@/fonts/Maya Culpa.ttf")
    format("truetype");
  }

   @font-face {
    font-family: "2524 BC";
    src: local("moria-citadel-regular"),
    url("@/fonts/moria-citadel.regular.ttf")
    format("truetype");
  }

  .titleText {
    font-size: 40px;
  }

  .title1984 {
    font-family: "1984";
  }

  .title1934 {
    font-family: "1934";
  }

  .title934 {
    font-family: "904";
  }

  .title374 {
    font-family: "374"
  }
  
  .twtnHeader {
    
  }
</style>
