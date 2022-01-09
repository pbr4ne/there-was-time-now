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
                  ×{{sellIncrementList[sellIncrementIndex]}}
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
                <n-popover trigger="hover">
                  <template #trigger>
                    <n-button @click="sellResearch(research)" :disabled="!canSell(research)">
                      Sell
                    </n-button>
                  </template>
                  <span v-if="canSell(research)">Sell for {{sellAmount(research)}}</span>
                  <span v-else>Can't afford</span>
                </n-popover>
              </td>
              <td>
                <n-button-group size="small">
                  <n-popover trigger="hover">
                    <template #trigger>
                      <n-button round :disabled="!canSellWorker(research)" @click="sellWorker(research)">
                        <template #icon>
                          <n-icon><minus-icon /></n-icon>
                        </template>
                      </n-button>
                    </template>
                    <span>test</span>
                  </n-popover>
                  <n-button style="width: 40px">
                    {{research.numWorkers}}
                  </n-button>
                  <n-popover trigger="hover">
                    <template #trigger>
                      <n-button round :disabled="!canBuyWorker(research)" @click="buyWorker(research)">
                        <template #icon>
                          <n-icon><plus-icon /></n-icon>
                        </template>
                      </n-button>
                    </template>
                    <span>test</span>
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
import useInitialize from '@/composables/useInitialize'
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
    let { currency } = useInitialize();
    let { incrementResearch } = useResearch();

    const sellIncrementList = [1, 5, 10];
    let sellIncrementIndex = ref(0);

    function changeSellIncrement() {
      sellIncrementIndex.value++;
      if(sellIncrementIndex.value > sellIncrementList.length - 1) {
        sellIncrementIndex.value = 0;
      }
    }

    function canSell(research) {
      const amount = sellIncrementList[sellIncrementIndex.value];
      if(research.total < amount) {
        return false;
      }
      return true;
    }

    function sellAmount(research) {
      if(canSell(research)) {
        return sellIncrementList[sellIncrementIndex.value] * 5; //todo - make this configurable per research
      }
      return 0;
    }

    function sellResearch(research) {
      const amount = sellIncrementList[sellIncrementIndex.value];
      research.total -= amount;
      currency.value += amount * 5;
    }

    function canBuyWorker(research) {
      if(currency.value >= 5) {//todo - make this configurable per research
        return true;
      }
      return false;
    }

    function canSellWorker(research) {
      if(research.numWorkers > 0) {
        return true;
      }
      return false;
    }

    function buyWorker(research) {
      if(canBuyWorker(research)) {
        research.numWorkers++;
        currency.value -= 5;
      }
    }

    function sellWorker(research) {
      if(canSellWorker(research)){
        research.numWorkers--
        currency.value += 5;
      }
    }

    return {
      buyWorker,
      canBuyWorker,
      canSell,
      canSellWorker,
      changeSellIncrement,
      incrementResearch,
      sellAmount,
      sellIncrementIndex,
      sellIncrementList,
      sellResearch,
      sellWorker,
    }
  },
})
</script>
