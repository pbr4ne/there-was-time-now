<template>
  <n-config-provider :theme="theme()">
    <n-dialog-provider>
      <n-notification-provider>
        <n-message-provider>
          <t-game />
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

import TGame from '@/components/TGame.vue'
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

    return {
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
