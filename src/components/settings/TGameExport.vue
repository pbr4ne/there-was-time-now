<template>
  <n-space vertical>
    <span :style="{color: '#58c9a4'}">{{ exportMessage.value }}</span>
    <n-input 
      :value="exportString"
      :autosize="{minRows: 10, maxRows: 10}"
      type="textarea"
    />
    <n-space justify="end">
      <n-button @click="copyExport">
        Copy to Clipboard
      </n-button>
      <n-button type="warning" @click="closeExport">
        Done!
      </n-button>
    </n-space>
  </n-space>
</template>

<script>
import { defineComponent } from 'vue'
import { NButton, NInput, NSpace } from 'naive-ui'

export default defineComponent({
  components: {
    NButton,
    NInput,
    NSpace,
  },
  props: {
    exportMessage: {
      type: Object,
      required: true,
    },
    exportString: {
      type: String,
      required: true,
    }
  },
  emits: ['close-export', 'copy-to-clipboard'],
  setup(props, { emit }) {
    const copyExport = () => {
      emit('copy-to-clipboard', props.exportString);
    }

    const closeExport = () => {
      emit('close-export');
    }

    return {
      closeExport,
      copyExport,
    }
  },
})
</script>