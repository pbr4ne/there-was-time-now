<script>
import { defineComponent, h } from 'vue'
import { NButton } from 'naive-ui'
import { Research } from '@/entities/Research'

export default defineComponent({
  render() {
    return h(NButton, null, { 
      icon: () => h(this.research.icon),
      default: () => this.research.label,
    })
  },
  props: {
    research: Research,
  },
  setup() {
    
  },
})
</script>
