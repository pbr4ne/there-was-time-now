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
          :content="message.text"
          :time="message.timestamp"
        />
      </n-timeline>
    </n-collapse-transition>
  </n-space>
</template>

<script>
import { defineComponent } from 'vue'

import { 
  NCollapseTransition,
  NSpace,
  NSwitch,
  NTimeline,
  NTimelineItem,
} from 'naive-ui'

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
    
    return {
      showTimeline,
    }
  },
})
</script>