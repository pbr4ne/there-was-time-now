<template>
  <n-space horizontal>
    <n-progress
      type="multiple-circle"
      :percentage="person.engineeringList.filter(engineering => engineering.isUnlocked).map(({ current }) => current)"
      :color="person.engineeringList.filter(engineering => engineering.isUnlocked).map(({ color }) => color)"
    >
      <h3>Engineering</h3>
    </n-progress>
    <n-space vertical>
      <n-button 
        ghost
        round
        v-for="engineering in person.engineeringList.filter(engineering => engineering.isUnlocked)"
        :key="engineering.label"
        :color="engineering.color"
        @click="incrementEngineering(engineering)"
      >
        {{engineering.label}}
      </n-button>
    </n-space>
  </n-space>
</template>

<script>
//TODO - this file is super redundant
import { defineComponent } from 'vue'
import { NButton, NProgress, NSpace } from 'naive-ui'
import { Person } from '@/entities/Person'
import useEngineering from '@/composables/useEngineering'

export default defineComponent({
  components: {
    NButton,
    NProgress,
    NSpace,
  },
  props: {
    person: Person,
  },
  setup() {
    let { incrementEngineering } = useEngineering();

    return {
      incrementEngineering,
    }
  },
})
</script>