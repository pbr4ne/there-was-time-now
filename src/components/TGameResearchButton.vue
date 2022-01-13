<script>
import { defineComponent, h } from 'vue'
import { NButton, NPopover } from 'naive-ui'
import TGameResearchNeeds from '@/components/TGameResearchNeeds'
import useResearch from '@/composables/useResearch'
import { Research } from '@/entities/Research'
import { messages } from '@/locales/en'

export default defineComponent({
  props: {
    research: Research,
    disabled: Boolean,
  },
  setup(props) {
    const { canIncrementResearch, incrementResearch } = useResearch();

    function getTooltip(research) {
      if(canIncrementResearch(research)) {
        return messages[research.key].messageSections[0].text;
      } else {
        return h(TGameResearchNeeds, { research: props.research });
      }
    }

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
        default: () => getTooltip(props.research)
      }
    )
  },
})
</script>
