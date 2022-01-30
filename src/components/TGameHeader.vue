<template>
  <n-layout-header bordered style="padding-top: 5px;">
    <n-space justify="space-between" class="twtnHeader">
      <n-space style="padding-left: 5px;" width="100%">
        <span :class="[titleText, titleFont]">{{ titleValue }}</span>
      </n-space>

      <ConfettiExplosion
        v-if="confetti"
        :particle-count="200"
        :duration="5000"
        :stage-height="confettiHeight"
        :stage-width="confettiWidth"
        :colors="['#F72585', '#B5179E', '#4361EE', '#4CC9F0']"
      />

      <n-space width="209px">
        <n-statistic v-if="sellFeatureEnabled" label="Budget">
          {{ currency }}
        </n-statistic>

        <n-statistic v-if="slowdownEnabled && !gameEnded" label="Time Expansion">
          {{ expandConstantFormatted() }}
        </n-statistic>
        <n-popover trigger="hover">
          <template #trigger>
            <div>
              <n-statistic v-if="gameEnded" label="Days Left">
                0
              </n-statistic>
              <n-statistic v-else-if="countdownTriggered" label="Days Left">
                {{ timeLeft }}
              </n-statistic>
            </div>
          </template>
          <span>{{ countdownTimer.realPeopleTimeLeft() }} Real People Time™ left</span>
        </n-popover>
        <n-spin v-if="countdownTimer.isRunning()" size="large" style="vertical-align: middle;">
          <template #icon>
            <n-icon><time-icon /></n-icon>
          </template>
        </n-spin>
        <n-icon v-if="gamePaused && !gameEnded" color="#63e2b7" size="40">
          <pause-icon />
        </n-icon>
        <n-icon v-if="gameEnded && !gameWon" color="#63e2b7" size="40">
          <lost-icon color="#FF4136" />
        </n-icon>
        <n-icon v-if="gameEnded && gameWon" color="#63e2b7" size="40">
          <won-icon color="#FFDC00" />
        </n-icon>
      </n-space>
    </n-space>
  </n-layout-header>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import { NIcon, NLayoutHeader, NPopover, NSpace, NSpin, NStatistic} from 'naive-ui'
import ConfettiExplosion from 'vue-confetti-explosion'
import { PauseOutlined as PauseIcon } from '@vicons/antd'
import { CrownOutlined as WonIcon } from '@vicons/antd'
import { SkullOutline as LostIcon } from '@vicons/ionicons5'
import { AccessTimeOutlined as TimeIcon } from '@vicons/material'
import useCurrency from '@/composables/useCurrency'
import useInitialize from '@/composables/useInitialize'
import useTime from '@/composables/useTime'
import { PersonKey } from '@/enum/Enums'
import useFlags from '@/composables/useFlags'

export default defineComponent({
  components: {
    ConfettiExplosion,
    LostIcon,
    NIcon,
    NLayoutHeader,
    NPopover,
    NSpace,
    NSpin,
    NStatistic,
    PauseIcon,
    TimeIcon,
    WonIcon,
  },
  setup() {
    const { currency } = useCurrency();
    const { confetti, countdownTriggered, gameEnded, gamePaused, gameWon, sellFeatureEnabled, slowdownEnabled } = useFlags();
    const { personList } = useInitialize();
    const { countdownTimer, countupTimer, expandConstant, timeLeft } = useTime();

    const titleValue = window.innerWidth > 700 ? ref('There Was Time Now') : ref('TWTN');

    //todo - this is so stupid how i did this, fix this eventually!
    const titleFont = computed(() => {
      if(personList[PersonKey.NECHTAN].isUnlocked) {
        return "title2524BC"
      } else if(personList[PersonKey.ITOTIA].isUnlocked) {
        return "title374";
      } else if(personList[PersonKey.SAMA].isUnlocked) {
        return "title904";
      } else if(personList[PersonKey.LENNOX_YOUNG].isUnlocked) {
        return "title1934"
      } else {
        return "title1984";
      }
    });

    const titleText = computed(() => {
      if(window.innerWidth > 900) {
        return "titleTextBig";
      } else if(personList[PersonKey.NECHTAN].isUnlocked) {
        return "titleText2524BC"
      } else if(personList[PersonKey.ITOTIA].isUnlocked) {
        return "titleText374";
      } else if(personList[PersonKey.SAMA].isUnlocked) {
        return "titleText904";
      } else if(personList[PersonKey.LENNOX_YOUNG].isUnlocked) {
        return "titleText1934"
      } else {
        return "titleText1984";
      }
    });

    function expandConstantFormatted() {
      if(expandConstant.value < 100) {
        return expandConstant.value.toFixed(2);
      } else {
        return expandConstant.value.toFixed(0);
      }
    }

    return {
      confetti,
      confettiHeight: window.innerHeight,
      confettiWidth: window.innerWidth,
      countdownTimer,
      countupTimer,
      countdownTriggered,
      currency,
      expandConstantFormatted,
      gameEnded,
      gamePaused,
      gameWon,
      sellFeatureEnabled,
      slowdownEnabled,
      timeLeft,
      titleFont,
      titleText,
      titleValue,
    }
  },
})
</script>
<!--todo I apparently need to learn how CSS works-->
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

  .titleTextBig {
    font-size: 40px;
  }

  .titleText1984 {
    font-size: 30px;
  }

  .titleText1934 {
    font-size: 30px;
  }

  .titleText904 {
    font-size: 30px;
  }

  .titleText374 {
    font-size: 15px;
  }

  .titleText2524BC {
    font-size: 20px;
  }

  .title1984 {
    font-family: "1984";
  }

  .title1934 {
    font-family: "1934";
  }

  .title904 {
    font-family: "904";
  }

  .title374 {
    font-family: "374"
  }

  .title2524BC {
    font-family: "2524 BC";
  }

  .twtnHeader {
    padding-right: 5px;
    padding-left: 5px;
  }
</style>
