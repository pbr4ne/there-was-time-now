<template>
  <n-layout position="absolute">
    <n-layout-header bordered style="padding-top: 5px;">
      <t-game-header />
    </n-layout-header>
    <n-layout has-sider>
      <t-game-sider />
      <t-game-tabs />
    </n-layout>
    <n-layout-footer bordered>
      <t-game-footer />
    </n-layout-footer>
  </n-layout>
</template>

<script>
import { watch } from 'vue'
import { NLayout, NLayoutFooter, NLayoutHeader, useMessage } from 'naive-ui'
import TGameFooter from '@/components/TGameFooter.vue'
import TGameHeader from '@/components/TGameHeader.vue'
import TGameSider from '@/components/TGameSider.vue'
import TGameTabs from '@/components/TGameTabs.vue'
import useFlags from '@/composables/useFlags'
import useGameMessage from '@/composables/useMessage'
import useResearch from '@/composables/useResearch'
import useSaveLoad from '@/composables/useSaveLoad'
import useSpecialEvents from '@/composables/useSpecialEvents'
import { GameConstants } from '@/enum/Constants'


export default {
  components: {
    NLayout,
    NLayoutFooter,
    NLayoutHeader,
    TGameFooter,
    TGameHeader,
    TGameSider,
    TGameTabs,
  },
  setup () {
    const message = useMessage();
    const { gamePaused, gameStarted, isLoading, saveStopwatch } = useFlags();
    const { sendInitialMessage } = useGameMessage();
    const { startIncrements } = useResearch();
    const { saveGameState } = useSaveLoad();
    
    if(!gameStarted.value) {
      sendInitialMessage();
      gameStarted.value = true;
    }

    startIncrements();
    useSpecialEvents();

    //Autosave
    setTimeout(function() {
      watch(saveStopwatch.seconds, () => {
        if((saveStopwatch.seconds.value % GameConstants.SAVE_INTERVAL === 0 && !isLoading.value && !gamePaused.value)){
          saveGameState().then(message.success('Autosaved'));
        }
      });
    }, GameConstants.SAVE_INTERVAL * 1000);

    return {
    };
  }
}
</script>
