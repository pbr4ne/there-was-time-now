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
                Undergrads
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
                    <n-button>
                      Sell
                    </n-button>
                  </template>
                  <span>Not implemented yet</span>
                </n-popover>
              </td>
              <td>
                <n-popover trigger="hover">
                  <template #trigger>
                    <n-button-group size="small">
                      <n-button round>
                        <template #icon>
                          <n-icon><minus-icon /></n-icon>
                        </template>
                      </n-button>
                      <n-button disabled style="width: 40px">
                        5
                      </n-button>
                      <n-button round>
                        <template #icon>
                          <n-icon><plus-icon /></n-icon>
                        </template>
                      </n-button>
                      
                    </n-button-group>
                    </template>
                  <span>Not implemented yet</span>
                </n-popover>
              </td>
            </tr>
          </tbody>
        </n-table>
      </n-scrollbar>
    </n-space>
  </n-space>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { NButton, NIcon, NButtonGroup, NPopover, NProgress, NScrollbar, NSpace, NTable } from 'naive-ui'
import {
  MinusOutlined as MinusIcon,
  PlusOutlined as PlusIcon,
} from '@vicons/material'
import useResearch from '@/composables/useResearch'

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
  },
  setup() {
    let { incrementResearch } = useResearch();

    const sellIncrementList = [1, 5, 10];
    let sellIncrementIndex = ref(0);

    function changeSellIncrement() {
      console.log('change sell increment');
      sellIncrementIndex.value++;
      if(sellIncrementIndex.value > sellIncrementList.length - 1) {
        sellIncrementIndex.value = 0;
      }
    }

    return {
      changeSellIncrement,
      incrementResearch,
      sellIncrementIndex,
      sellIncrementList,
    }
  },
})
</script>
