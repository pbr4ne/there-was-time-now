<template>
  <n-space horizontal>
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
        @click="incrementScience(science.key)"
      >
        {{science.label}}
      </n-button>
    </n-space>
  </n-space>
</template>

<script>
//TODO - this file is super redundant
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
    let { incrementScience } = useScience();

    return {
      incrementScience,
    }
  },
})
</script>
