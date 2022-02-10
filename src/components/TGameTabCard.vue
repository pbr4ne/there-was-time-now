<template>
  <span @click="person.markRead()">{{ person.name }}</span>
</template>

<script>
import { defineComponent } from 'vue'
import { Person } from '@/entities/Person'

export default defineComponent({
  components: {
  },
  props: {
    person: Person,
  },
})
</script>