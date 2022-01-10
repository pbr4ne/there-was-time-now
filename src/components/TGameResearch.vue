<template>
  <n-space horizontal>
    <n-progress
      type="multiple-circle"
      :percentage="researchList.slice().reverse().filter(research => research.isUnlocked).map(({ current }) => current)"
      :color="researchList.slice().reverse().filter(research => research.isUnlocked).map(({ color }) => color)"
    >
      <h3>{{label}}</h3>
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
                <n-popover trigger="hover" :disabled="!canSellResearch(research, sellIncrement())">
                  <template #trigger>
                    <n-button @click="sellResearch(research, sellIncrement())" :disabled="!canSellResearch(research, sellIncrement())">
                      Sell
                    </n-button>
                  </template>
                  <span>Sell {{research.label}} for {{sellResearchCost(research, sellIncrement())}}</span>
                </n-popover>
              </td>
              <td>
                <n-button-group size="small">
                  <n-popover trigger="hover" :disabled="!canSellWorker(research)">
                    <template #trigger>
                      <n-button round @click="sellWorker(research)" :disabled="!canSellWorker(research)">
                        <template #icon>
                          <n-icon><minus-icon /></n-icon>
                        </template>
                      </n-button>
                    </template>
                    <span>Sell worker for {{sellWorkerCost(research)}}</span>
                  </n-popover>
                  <n-button style="width: 40px">
                    {{research.numWorkers}}
                  </n-button>
                  <n-popover trigger="hover" :disabled="!canBuyWorker(research)">
                    <template #trigger>
                      <n-button round @click="buyWorker(research)" :disabled="!canBuyWorker(research)" >
                        <template #icon>
                          <n-icon><plus-icon /></n-icon>
                        </template>
                      </n-button>
                    </template>
                    <span>Buy worker for {{buyWorkerCost(research)}}</span>
                  </n-popover>
                </n-button-group>
              </td>
            </tr>
          </tbody>
        </n-table>
      </n-scrollbar>
    </n-space>
  </n-space>
</template>

<script>
/* eslint-disable */
import { defineComponent, ref } from 'vue'
import { NButton, NIcon, NButtonGroup, NPopover, NProgress, NScrollbar, NSpace, NTable } from 'naive-ui'
import {
  MinusOutlined as MinusIcon,
  PlusOutlined as PlusIcon,
} from '@vicons/material'
import useResearch from '@/composables/useResearch'
import { Person } from '@/entities/Person'

export default defineComponent({
  components: {
    MinusIcon,
    NButton,
    NButtonGroup,
    NIcon,
    NPopover,
    NProgress,
    NScrollbar,
    NSpace,
    NTable,
    PlusIcon,
  },
  props: {
    label: String,
    researchList: Array,
    person: Person,
  },
  setup() {
    let {
      buyWorker,
      buyWorkerCost,
      canBuyWorker, 
      canSellResearch, 
      canSellWorker, 
      incrementResearch, 
      sellResearch, 
      sellResearchCost,
      sellWorker,
      sellWorkerCost,
    } = useResearch();

    const sellIncrementList = [1, 5, 10];
    let sellIncrementIndex = ref(0);

    function changeSellIncrement() {
      sellIncrementIndex.value++;
      if(sellIncrementIndex.value > sellIncrementList.length - 1) {
        sellIncrementIndex.value = 0;
      }
    }

    function sellIncrement() {
      return sellIncrementList[sellIncrementIndex.value];
    }

    return {
      buyWorker,
      buyWorkerCost,
      canBuyWorker,
      canSellResearch,
      canSellWorker,
      changeSellIncrement,
      sellIncrement,
      incrementResearch,
      sellIncrementIndex,
      sellIncrementList,
      sellResearch,
      sellResearchCost,
      sellWorker,
      sellWorkerCost,
    }
  },
})
</script>
