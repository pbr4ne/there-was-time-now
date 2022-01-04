<template>
  <slot name="label" /> <b><slot name="total" /></b>
</template>

<script>
import { 
  defineComponent,
} from 'vue'

export default defineComponent({
  setup () {
  }
})
</script>