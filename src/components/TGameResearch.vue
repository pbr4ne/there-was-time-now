<template>
  <n-space horizontal>
    <n-progress
      type="multiple-circle"
      :percentage="researchList.slice().reverse().filter(research => research.isUnlocked).map(({ current }) => current)"
      :color="researchList.slice().reverse().filter(research => research.isUnlocked).map(({ color }) => color)"
    >
      <n-icon size="40">
        <build-icon />
      </n-icon>
    </n-progress>
    <n-space vertical>
      <n-scrollbar x-scrollable>
        <n-table 
          :bordered="false" 
          :single-line="true" 
          :single-column="true" 
          :size="'small'"
        >
          <thead>
            <tr>
              <th>
                Research
              </th>
              <th style="text-align: center;">
                <n-button size="tiny" @click="changeSellIncrement()">
                  ×{{sellIncrement()}}
                </n-button>
              </th>
              <th style="text-align: center;">
                {{person.workerTitle}}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="research in researchList.filter(research => research.isUnlocked)"
              :key="research.label"
            >
              <td>
                <t-game-research-button 
                  ghost
                  round
                  :color="research.color"
                  @click="incrementResearch(research)"
                  :research = "research">
                </t-game-research-button>
              </td>
              <td>
                <t-game-research-sell :research="research" />
              </td>
              <td>
                <t-game-research-workers :research="research" />
              </td>
            </tr>
          </tbody>
        </n-table>
      </n-scrollbar>
    </n-space>
  </n-space>
</template>

<script>
import { defineComponent } from 'vue'
import { NButton, NIcon,  NProgress, NScrollbar, NSpace, NTable } from 'naive-ui'
import {
  BuildOutline as BuildIcon,
} from '@vicons/ionicons5'
import TGameResearchSell from '@/components/TGameResearchSell'
import TGameResearchWorkers from '@/components/TGameResearchWorkers'
import useResearch from '@/composables/useResearch'
import { Person } from '@/entities/Person'

export default defineComponent({
  components: {
    BuildIcon,
    NButton,
    NIcon,
    NProgress,
    NScrollbar,
    NSpace,
    NTable,
    TGameResearchSell,
    TGameResearchWorkers,
  },
  props: {
    researchList: Array,
    person: Person,
  },
  setup() {
    const { changeSellIncrement, incrementResearch, sellIncrement } = useResearch();

    return {
      changeSellIncrement,
      sellIncrement,
      incrementResearch,
    }
  },
})
</script>
