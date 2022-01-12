<template>
  <n-layout position="absolute">
    <t-game-header />
    <n-layout has-sider>
      <t-game-sider />
      <t-game-tabs />
    </n-layout>
    <t-game-footer />
  </n-layout>
</template>

<script>
import { watch } from 'vue'
import { NLayout } from 'naive-ui'
import TGameFooter from '@/components/TGameFooter.vue'
import TGameHeader from '@/components/TGameHeader.vue'
import TGameSider from '@/components/TGameSider.vue'
import TGameTabs from '@/components/TGameTabs.vue'
import useMessage from '@/composables/useMessage'
import useSaveLoad from '@/composables/useSaveLoad'
import useSpecialEvents from '@/composables/useSpecialEvents'
import useUnlockWatch from '@/composables/useUnlockWatch'
import useFlags from '@/composables/useFlags'
import { GameConstants } from '@/enum/Constants'

export default {
  components: {
    NLayout,
    TGameFooter,
    TGameHeader,
    TGameSider,
    TGameTabs,
  },
  setup () {
    const { loadGameState, saveGameState } = useSaveLoad();
    const { sendInitialMessage } = useMessage();
    const { gamePaused, gameStarted, isLoading, saveStopwatch } = useFlags();
    
    loadGameState().then(function() {
      if(!gameStarted.value) {
        sendInitialMessage();
        gameStarted.value = true;
      }
    });

    useSpecialEvents();
    useUnlockWatch();

    //Autosave
    setTimeout(function() {
      watch(saveStopwatch.seconds, () => {
        if((saveStopwatch.seconds.value % GameConstants.SAVE_INTERVAL === 0 && !isLoading.value && !gamePaused.value)){
          saveGameState();
        }
      });
    }, GameConstants.SAVE_INTERVAL * 1000);

    return {
    };
  }
}
</script>
