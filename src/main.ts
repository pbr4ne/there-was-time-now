import { createApp, h } from 'vue'
import TGameResearchButton from '@/components/TGameResearchButton.vue'
import App from './App.vue'

const app = createApp(App)

//todo - not sure why i have to register this one
app.component('t-game-research-button', TGameResearchButton);

app.mount('#app');