<template>
  <n-config-provider :theme="theme()">
      <n-notification-provider>
        <t-game />
      </n-notification-provider>
  </n-config-provider>
</template>

<script>
import { 
  darkTheme,
  NConfigProvider,
  NNotificationProvider,
} from 'naive-ui'

import TGame from '@/components/TGame'
import useTheme from '@/composables/useTheme'

export default {
  name: 'App',
  components: {
    NConfigProvider,
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
