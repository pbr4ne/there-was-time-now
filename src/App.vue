<template>
  <n-config-provider :theme="darkTheme">
    <n-message-provider>
      <t-game />
    </n-message-provider>
  </n-config-provider>
</template>

<script>
import { 
  darkTheme,
  NConfigProvider,
  NMessageProvider,
} from 'naive-ui'

import TGame from './components/TGame.vue'

export default {
  name: 'App',
  components: {
    NConfigProvider,
    NMessageProvider,
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
