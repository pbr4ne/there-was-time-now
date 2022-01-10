<template>
  <n-layout position="absolute">
    <t-game-header />
    <n-layout has-sider>
      <t-game-sider />
      <t-game-tabs />
    </n-layout>
    <t-game-footer />
  </n-layout>
  <n-modal 
    v-model:show="showGameOverModal"
    :mask-closable="false"
    preset="dialog"
    positive-text="Dang"
    @positive-click="onPositiveClick"
  >
    GAME OVER
    #OUTATIME
  </n-modal>
</template>

<script>
import { ref, watchEffect } from 'vue'
import { NLayout, NModal, useNotification } from 'naive-ui'
import TGameFooter from '@/components/TGameFooter.vue'
import TGameHeader from '@/components/TGameHeader.vue'
import TGameSider from '@/components/TGameSider.vue'
import TGameTabs from '@/components/TGameTabs.vue'
import useTime from '@/composables/useTime'
import useInitialize from '@/composables/useInitialize'
import useResearch from '@/composables/useResearch'
import useUnlockWatch from '@/composables/useUnlockWatch'
import { Message } from '@/entities/Message'
import { GameConstants } from '@/enum/Constants'
import { EngineeringKey, PersonKey, ScienceKey } from '@/enum/Enums'

export default {
  components: {
    NLayout,
    NModal,
    TGameFooter,
    TGameHeader,
    TGameSider,
    TGameTabs,
  },
  setup () {
    useUnlockWatch();
    const notification = useNotification();
    const { engineeringList, personList, scienceList } = useInitialize();
    const { sellFeatureEnabled } = useResearch();
    const { countdownTimer, timeElapsed } = useTime();
    const showGameOverModalRef = ref(false);
    let endOfWorld = false;

    let initialMessage = new Message(
      '1984',
      'The year is 1984. You are Lennox, a physicist researching the most cutting-edge technology: Quantum Computing! With enough research, you should be able to build your own Quantum Computer. Let’s get started…',
    );
    initialMessage.isRead = true;
    initialMessage.timestamp = '1984-01-01';
    
    notification.create({
      title: initialMessage.title,
      content: initialMessage.text,
      meta: initialMessage.timestamp,
      duration: GameConstants.NOTIFICATION_DURATION,
    });
    personList[PersonKey.LENNOX_OLD].messageList.push(initialMessage);

    watchEffect(async() => {
      if(countdownTimer.isExpired()) {
        showGameOverModalRef.value = true;
      }
    });

    //SPECIAL - when first quantum computer is built, start the end of world timer
    watchEffect(() => {
      console.log('watching for quantum computer == 5');
      if(!endOfWorld && engineeringList[EngineeringKey.QUANTUM_COMPUTER].total == 1) {
        endOfWorld = true;
        //todo - this message stuff should probably have been done via a normal unlock, idk
        let endOfWorldMessage = new Message(
          'Whoaaaa', 
          'Quantum Computer: Beep Boop. Detecting timelines. ALERT. ALERT. YOUR QUANTUM REALITY HAS SKEWED INTO A TANGENT. TIME IS ENDING. DOOMSDAY IMMINENT.'
        );
        const d = new Date(1984, 0);
        d.setDate(d.getDate() + timeElapsed.value);
        endOfWorldMessage.timestamp = d.toISOString().split('T')[0];

        notification.create({
          title: endOfWorldMessage.title,
          content: endOfWorldMessage.text,
          meta: endOfWorldMessage.timestamp,
          duration: GameConstants.NOTIFICATION_DURATION,
        });
        personList[PersonKey.LENNOX_OLD].messageList.unshift(endOfWorldMessage);

        

        countdownTimer.start();
      }
    });

    //SPECIAL - when first quantum computing is researched, unlock buy/sell
    watchEffect(() => {
      if(scienceList[ScienceKey.QUANTUM_COMPUTING].total == 1) {
        sellFeatureEnabled.value = true;
      }
    });

    return {
      onPositiveClick () {
        showGameOverModalRef.value = false;
      },
      showGameOverModal: showGameOverModalRef,
    };
  }
}
</script>
