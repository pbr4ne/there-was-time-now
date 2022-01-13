<script>
import { defineComponent, h } from 'vue'
import { NButton, NPopover } from 'naive-ui'
import TGameResearchNeeds from '@/components/TGameResearchNeeds'
import useResearch from '@/composables/useResearch'
import { Research } from '@/entities/Research'

export default defineComponent({
  props: {
    research: Research,
    disabled: Boolean,
  },
  setup(props) {
    const { canIncrementResearch, incrementResearch } = useResearch();

    return () => 
      h(NPopover, {
        style: { maxWidth: '200px' },
        trigger: 'hover',
        placement: 'top',
      }, 
      {
        trigger: () => h(
          NButton, { 
            ghost: true, 
            round: true,
            color: props.research.color,
            disabled: !canIncrementResearch(props.research),
            onClick: () => incrementResearch(props.research)
          }, { 
            icon: () => h(props.research.icon),
            default: () => props.research.label,
          }
        ),
        default: () => h(TGameResearchNeeds, { research: props.research })
      }
    )
  },
})
</script>
