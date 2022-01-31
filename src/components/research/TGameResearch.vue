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
          :style="tableStyle"
        >
          <thead>
            <tr>
              <th style="text-align: center;">
                Research
              </th>
              <th v-if="sellFeatureEnabled" style="text-align: center;">
                <n-button size="tiny" @click="changeSellIncrement()">
                  ×{{ sellIncrement() }}
                </n-button>
              </th>
              <th v-if="sellFeatureEnabled" style="text-align: center;">
                {{ person.workerTitle }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="research in researchList.filter(research => research.isUnlocked)"
              :key="research.label"
            >
              <td @mouseover="currentResearch = research" @mouseleave="currentResearch = null">
                <t-game-research-button :research="research" />
              </td>
              <td v-if="sellFeatureEnabled">
                <t-game-research-sell :research="research" />
              </td>
              <td v-if="sellFeatureEnabled">
                <t-game-research-workers :research="research" />
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td :style="extraStyle" :colspan="sellFeatureEnabled? 3 : 1">
                <t-game-research-needs :research="currentResearch" :person="person" />
              </td>
            </tr>
          </tfoot>
        </n-table>
      </n-scrollbar>
    </n-space>
  </n-space>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { NButton, NIcon,  NProgress, NScrollbar, NSpace, NTable } from 'naive-ui'
import { BuildOutline as BuildIcon } from '@vicons/ionicons5'
import TGameResearchNeeds from '@/components/research/TGameResearchNeeds.vue'
import TGameResearchSell from '@/components/research/TGameResearchSell.vue'
import TGameResearchWorkers from '@/components/research/TGameResearchWorkers.vue'
import useFlags from '@/composables/useFlags'
import useResearch from '@/composables/useResearch'
import { Person } from '@/entities/Person'
import { messages } from '@/locales/en'

export default defineComponent({
  components: {
    BuildIcon,
    NButton,
    NIcon,
    NProgress,
    NScrollbar,
    NSpace,
    NTable,
    TGameResearchNeeds,
    TGameResearchSell,
    TGameResearchWorkers,
  },
  props: {
    researchList: {
      type: Array,
      required: true,
    },
    person: Person,
  },
  setup() {
    const { sellFeatureEnabled } = useFlags();
    const { canIncrementResearch, changeSellIncrement, incrementResearch, sellIncrement } = useResearch();

    const currentResearch = ref(null);
    const tableStyle = {
      width: window.innerWidth > 700 || !sellFeatureEnabled.value ? '205px' : '36px'
    }
    const extraStyle = {
      maxWidth: '205px', 
      height: !sellFeatureEnabled.value ? '150px' : '125px', 
      wordWrap: 'break-word'
    }

    return {
      currentResearch,
      canIncrementResearch,
      changeSellIncrement,
      extraStyle,
      sellFeatureEnabled,
      sellIncrement,
      incrementResearch,
      messages,
      tableStyle,
    }
  },
})
</script>
