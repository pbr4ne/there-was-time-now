<template>
  {{science.label}} <b>{{science.total}}</b>
</template>

<script>
import { defineComponent } from 'vue'
import { Science } from '@/entities/Science'

export default defineComponent({
  //todo - i don't think you're supposed to do this 
  // with composition API? but it isn't working the other way
  props: {
    science: Science,
  },
  setup () {
  }
})
</script>