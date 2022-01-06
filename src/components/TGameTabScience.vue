<template>
  <n-space horizontal style="padding-left: 20px;">
    <n-progress
      type="multiple-circle"
      :percentage="person.scienceList.filter(science => science.isUnlocked).map(({ current }) => current)"
      :color="person.scienceList.filter(science => science.isUnlocked).map(({ color }) => color)"
    >
      Science
    </n-progress>
    <n-space vertical>
      <n-button 
        ghost
        round
        v-for="science in person.scienceList.filter(science => science.isUnlocked)"
        :key="science.key"
        :color="science.color"
        @click="increment(science.key)"
      >
        {{science.label}}
      </n-button>
    </n-space>
  </n-space>
</template>

<script>
import { defineComponent } from 'vue'
import { NButton, NProgress, NSpace } from 'naive-ui'
import { Person } from '@/entities/Person'
import useScience from '@/composables/useScience'

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
    let { increment } = useScience();

    return {
      increment,
    }
  },
})
</script>