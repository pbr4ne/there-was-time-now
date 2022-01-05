<template>
  <n-config-provider :theme="darkTheme">
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

import TGame from './components/TGame.vue'

export default {
  name: 'App',
  components: {
    NConfigProvider,
    NNotificationProvider,
    TGame,
  },
  setup () {    
    return {
      darkTheme,
      TGame,
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
