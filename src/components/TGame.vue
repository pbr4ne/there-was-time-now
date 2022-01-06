<template>
  <n-layout position="absolute">
    <t-game-header />
    <n-layout has-sider>
      <t-game-sider />
      <t-tabs />
    </n-layout>
    <t-game-footer />
  </n-layout>
</template>

<script>
import { NLayout } from 'naive-ui'
import TGameFooter from '@/components/TGameFooter.vue'
import TGameHeader from '@/components/TGameHeader.vue'
import TGameSider from '@/components/TGameSider.vue'
import TTabs from '@/components/TTabs.vue'
import { Timeline } from '@/entities/Timeline'
import useUnlockWatch from '@/composables/useUnlockWatch'
import useInitialize from '@/composables/useInitialize'
import { useNotification } from 'naive-ui'

export default {
  components: {
    NLayout,
    TGameFooter,
    TGameHeader,
    TGameSider,
    TTabs,
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
      '1984-03-05 20:24:00',
    );
    notification.create({
      title: initialMessage.name,
      content: initialMessage.text,
      meta: initialMessage.timestamp,
    });
    personList.find(person => person.key === 'lennox-old').timeline.push(initialMessage);

    return {
    };
  }
}
</script>

