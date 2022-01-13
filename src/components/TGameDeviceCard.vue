<script>
import { defineComponent, h } from 'vue'
import { NCard, NPopover } from 'naive-ui'
import TGameDeviceProgress from '@/components/TGameDeviceProgress'
import TGameResearchNeeds from '@/components/TGameResearchNeeds'
import useResearch from '@/composables/useResearch'
import { Research } from '@/entities/Research'

export default defineComponent({
  props: {
    research: Research
  },
  setup(props) {
    const { incrementResearch } = useResearch();

    return () => 
    h(
      NPopover, 
      {
        style: { maxWidth: '200px' },
        trigger: 'hover',
        placement: 'top-start',
      }, 
      {
        trigger: () => h(
          NCard, 
          { 
            style: { cursor: "pointer" },
            onClick: () => incrementResearch(props.research)
          },
          {
            default: () => h(TGameDeviceProgress, { research: props.research })
          } 
        ),
        default: () => h(TGameResearchNeeds, { research: props.research })
      }
    )
  },
})
</script>
