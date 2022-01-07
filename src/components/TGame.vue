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
import { NLayout, useNotification } from 'naive-ui'
import TGameFooter from '@/components/TGameFooter.vue'
import TGameHeader from '@/components/TGameHeader.vue'
import TGameSider from '@/components/TGameSider.vue'
import TGameTabs from '@/components/TGameTabs.vue'
import { Timeline } from '@/entities/Timeline'
import useUnlockWatch from '@/composables/useUnlockWatch'
import useInitialize from '@/composables/useInitialize'

export default {
  components: {
    NLayout,
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

    let initialMessage = new Timeline(
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
      duration: 1000,
    });
    personList.find(person => person.key === 'lennox-old').timeline.push(initialMessage);

    return {
    };
  }
}
</script>

