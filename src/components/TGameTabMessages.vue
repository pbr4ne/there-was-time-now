<template>
  <n-space vertical style="padding: 20px;">
      <n-switch v-model:value="show">
        <template #checked>Hide Timeline</template>
        <template #unchecked>Show Timeline</template>
      </n-switch>
    <n-collapse-transition :show="show">
      <n-timeline>
        <n-timeline-item 
          v-for="message in person.messageList" 
          :key="message.key"
          :title="message.name"
          :content="message.text"
          :time="message.timestamp"
        />
      </n-timeline>
    </n-collapse-transition>
  </n-space>
</template>

<script>
import { defineComponent, ref } from 'vue'

import { 
  NCollapseTransition,
  NSpace,
  NSwitch,
  NTimeline,
  NTimelineItem,
} from 'naive-ui'

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
    return {
      show: ref(false),
    }
  },
})
</script>