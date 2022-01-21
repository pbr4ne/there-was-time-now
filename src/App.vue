<template>
  <n-config-provider :theme="theme()">
    <n-dialog-provider>
      <n-notification-provider>
        <n-message-provider>
          <t-game v-if="enableGame" />
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script>
import { 
  darkTheme,
  NConfigProvider,
  NDialogProvider,
  NMessageProvider,
  NNotificationProvider,
} from 'naive-ui'

import { ref } from 'vue'
import TGame from '@/components/TGame.vue'
import useSaveLoad from '@/composables/useSaveLoad'
import useTheme from '@/composables/useTheme'

export default {
  name: 'App',
  components: {
    NConfigProvider,
    NDialogProvider,
    NMessageProvider,
    NNotificationProvider,
    TGame,
  },
  setup () {
    const { lightMode } = useTheme(); 
    const enableGame = ref(false);
    const { loadGameState } = useSaveLoad();

    loadGameState().finally(function() {
      enableGame.value = true;
   });

    return {
      enableGame,
      theme: () => {
        if(lightMode.value){
          return null;
        } else {
          return darkTheme;
        }
      },
    };
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
