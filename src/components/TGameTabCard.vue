<template>
  <n-badge :value="person.numUnread()" :show="person.numUnread() > 0" dot processing>
    <span @click="person.markRead()">{{person.name}}</span>
  </n-badge>
</template>

<script>
import { defineComponent } from 'vue'
import { NBadge } from 'naive-ui'
import { Person } from '@/entities/Person'

export default defineComponent({
  components: {
    NBadge,
  },
  props: {
    person: Person,
  },
  setup () {
  }
})
</script>