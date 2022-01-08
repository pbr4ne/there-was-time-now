<template>
  <n-space horizontal>
    <n-progress
      type="multiple-circle"
      :percentage="person.scienceList.filter(science => science.isUnlocked).map(({ current }) => current)"
      :color="person.scienceList.filter(science => science.isUnlocked).map(({ color }) => color)"
    >
      <h3>Science</h3>
    </n-progress>
    <n-space vertical>
      <t-game-research-button 
        ghost
        round
        v-for="science in person.scienceList.filter(science => science.isUnlocked)"
        :key="science.label"
        :color="science.color"
        @click="incrementScience(science)"
        :research = "science">
      </t-game-research-button >
    </n-space>
  </n-space>
</template>

<script>
//TODO - this file is super redundant
import { defineComponent } from 'vue'
import { NProgress, NSpace } from 'naive-ui'
import useScience from '@/composables/useScience'
import { Person } from '@/entities/Person'

export default defineComponent({
  components: {
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
