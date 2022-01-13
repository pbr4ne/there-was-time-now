<script>
import { defineComponent, h, reactive } from 'vue'
import { NButton, NPopover } from 'naive-ui'
import TGameResearchNeeds from '@/components/TGameResearchNeeds'
import useFlags from '@/composables/useFlags'
import useResearch from '@/composables/useResearch'
import { Research } from '@/entities/Research'

export default defineComponent({
  props: {
    research: Research,
    disabled: Boolean,
  },
  setup(props) {
    const { sellFeatureEnabled } = useFlags();
    const { canIncrementResearch, incrementResearch } = useResearch();

    const buttonSlots = {
      icon: () => h(props.research.icon),
    }
    if(window.innerWidth > 700 || !sellFeatureEnabled.value) {
      buttonSlots.default = reactive(props.research.label);
    }

    return () => 
      h(NPopover, {
        style: { maxWidth: '200px' },
        trigger: 'hover',
        placement: 'top',
      }, 
      {
        trigger: () => h(
          NButton, 
          { 
            ghost: true, 
            round: true,
            color: props.research.color,
            disabled: !canIncrementResearch(props.research),
            onClick: () => incrementResearch(props.research)
          }, 
          buttonSlots
        ),
        default: () => h(TGameResearchNeeds, { research: props.research })
      }
    )
  },
})
</script>
