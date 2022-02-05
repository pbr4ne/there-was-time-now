<template>
  <n-popover 
    trigger="hover" 
    :placement="placement()" 
    :style="{ maxWidth: '200px' }" 
    :keep-alive-on-hover="false"
  >
    <template #trigger>
      <div @click="changeTab()">
        {{ research.label }} <b :style="{ color: research.color }">{{ research.total }}</b>
      </div>
    </template>
    <div>
      <span :style="{color: research.color}">{{ research.label }}</span><br>
      {{ messages[research.key].messageSections[0].text }}
    </div>
  </n-popover>
</template>

<script>
import { defineComponent } from 'vue'
import { NPopover } from 'naive-ui'
import { Research } from '@/entities/Research'
import { messages } from '@/locales/en'
import useFlags from '@/composables/useFlags'

export default defineComponent({
  components: {
    NPopover,
  },
  props: {
    research: Research,
  },
  setup (props) {
    const { currentPerson } = useFlags();
    const placement = () => window.innerWidth > 700 ? "right" : "bottom";

    const changeTab = () => {
      currentPerson.value = props.research.personKey;
    }

    return {
      changeTab,
      messages,
      placement,
    }
  }
})
</script>