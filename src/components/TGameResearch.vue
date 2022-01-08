<template>
  <n-space horizontal>
    <n-progress
      type="multiple-circle"
      :percentage="researchList.filter(research => research.isUnlocked).map(({ current }) => current)"
      :color="researchList.filter(research => research.isUnlocked).map(({ color }) => color)"
    >
      <h3>{{label}}</h3>
    </n-progress>
    <n-space vertical>
      <t-game-research-button 
        ghost
        round
        v-for="research in researchList.filter(research => research.isUnlocked)"
        :key="research.label"
        :color="research.color"
        @click="incrementResearch(research)"
        :research = "research">
      </t-game-research-button >
    </n-space>
  </n-space>
</template>

<script>
import { defineComponent } from 'vue'
import { NProgress, NSpace } from 'naive-ui'
import useResearch from '@/composables/useResearch'

export default defineComponent({
  components: {
    NProgress,
    NSpace,
  },
  props: {
    label: String,
    researchList: Array,
  },
  setup() {
    let { incrementResearch } = useResearch();

    return {
      incrementResearch,
    }
  },
})
</script>
