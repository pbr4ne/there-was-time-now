<template>
  <n-space vertical style="padding: 20px;">
    <n-switch v-model:value="showTimeline">
      <template #checked>
        Hide Timeline
      </template>
      <template #unchecked>
        Show Timeline
      </template>
    </n-switch>
    <n-collapse-transition :show="showTimeline">
      <n-timeline>
        <n-timeline-item
          v-for="message in person.messageList" 
          :key="message.title"
          :title="message.title"
          :color="'#63e2b7'"
          :content="renderMessageContent(message)"
          :time="message.timestamp"
        />
      </n-timeline>
    </n-collapse-transition>
  </n-space>
</template>

<script>
import { defineComponent, h } from 'vue'

import { 
  NCollapseTransition,
  NSpace,
  NSwitch,
  NTimeline,
  NTimelineItem,
} from 'naive-ui'
import TGameMessage from '@/components/TGameMessage.vue'
import useMessage from '@/composables/useMessage'
import useInitialize from '@/composables/useInitialize'
import { PersonKey } from '@/enum/Enums'

export default defineComponent({
  components: {
    NCollapseTransition,
    NSpace,
    NSwitch,
    NTimeline,
    NTimelineItem,
  },
  setup() {
    const { showTimeline } = useMessage();
    const { personList } = useInitialize();

    //todo - this is spitting out warnings
    const renderMessageContent = (message) => {
      return h(TGameMessage, { messageList: [message] });
    }

    const person = personList[PersonKey.LENNOX_OLD];

    return {
      person,
      renderMessageContent,
      showTimeline,
    }
  },
})
</script>