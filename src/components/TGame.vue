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
import useUnlockWatch from '@/composables/useUnlockWatch'
import useInitialize from '@/composables/useInitialize'
import { Message } from '@/entities/Message'
import { GameConstants } from '@/enum/Constants'

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

    //todo - eh should this be here?
    const notification = useNotification();
    const { personList } = useInitialize();
    const { timer } = useTime();
    const showGameOverModalRef = ref(false);

    let initialMessage = new Message(
      'lennox-old',
      'lennox-old-1',
      '1984',
      'The year is 1984. You are Lennox, a physicist researching the most cutting-edge technology: Quantum Computing! With enough research, you should be able to build your own Quantum Computer. Let’s get started…',
      '1984-03-05',
      true,
    );
    notification.create({
      title: initialMessage.name,
      content: initialMessage.text,
      meta: initialMessage.timestamp,
      duration: GameConstants.NOTIFICATION_DURATION,
    });
    personList.find(person => person.key === 'lennox-old').messageList.push(initialMessage);

    watchEffect(async() => {
        if(timer.isExpired.value) {
          showGameOverModalRef.value = true;
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

