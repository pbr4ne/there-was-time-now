<template>
  <!-- <n-badge :value="person.numUnread()" :show="person.numUnread() > 0" dot processing color="#d4d4d5"> -->
  <span @click="person.markRead()">{{ person.name }}</span>
  <!-- </n-badge> -->
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
  setup () {
  }
})
</script>