<template>
  <n-layout 
    position="absolute" 
    :native-scrollbar="false"
    content-style="height: 100%; display: flex; flex-direction: column"
  >
    <n-layout-header bordered style="padding-top: 5px">
      <t-game-header />
    </n-layout-header>
    <n-layout has-sider>
      <n-layout-sider
        bordered
        show-trigger
        collapse-mode="width"
        :collapsed-width="64"
        :collapsed="collapsed"
        :width="245"
        :native-scrollbar="false"
        @collapse="collapsed = true"
        @expand="collapsed = false" 
      >
        <t-game-sider :collapsed="collapsed" />
      </n-layout-sider>
      <n-layout-content>
        <t-game-tabs />
      </n-layout-content>
    </n-layout>
    <n-layout-footer bordered style="flex-shrink: 0">
      <t-game-footer />
    </n-layout-footer>
  </n-layout>
</template>

<script>
import { ref, watch } from 'vue'
import { NLayout, NLayoutContent, NLayoutFooter, NLayoutHeader, NLayoutSider, useMessage } from 'naive-ui'
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
    NLayoutContent,
    NLayoutFooter,
    NLayoutHeader,
    NLayoutSider,
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

    //initially collapse the sider for smol windows
    let collapsed = window.innerWidth < 700;
    
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
      collapsed: ref(collapsed),
    };
  }
}
</script>
