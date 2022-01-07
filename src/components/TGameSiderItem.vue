<template>
  {{research.label}} <b :style="{ color: research.color }">{{research.total}}</b>
</template>

<script>
import { defineComponent } from 'vue'
import { Research } from '@/entities/Research'

export default defineComponent({
  //todo - i don't think you're supposed to do this 
  // with composition API? but it isn't working the other way
  props: {
    research: Research,
  },
  setup () {
  }
})
</script>