<template>
  <n-space vertical style="padding: 20px;">
      <n-switch v-model:value="showTimeline">
        <template #checked>Hide Timeline</template>
        <template #unchecked>Show Timeline</template>
      </n-switch>
    <n-collapse-transition :show="showTimeline">
      <n-timeline>
        <n-timeline-item 
          v-for="message in person.messageList" 
          :key="message.title"
          :title="message.title"
          :content= "renderMessageContent(message)"
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

import TGameMessage from '@/components/TGameMessage'
import useMessage from '@/composables/useMessage'
import { Person } from '@/entities/Person'

export default defineComponent({
  components: {
    NCollapseTransition,
    NSpace,
    NSwitch,
    NTimeline,
    NTimelineItem,
  },
  props: {
    person: Person,
  },
  setup() {
    const { showTimeline } = useMessage();
    
    const renderMessageContent = (message) => {
      return h(TGameMessage, { messageSections: message.messageSections});
    }

    return {
      renderMessageContent,
      showTimeline,
    }
  },
})
</script>