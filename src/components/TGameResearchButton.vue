<script>
import { defineComponent, h } from 'vue'
import { NButton } from 'naive-ui'
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

    return () => 
    h(
      NButton, 
      { 
        ghost: true, 
        round: true,
        color: props.research.color,
        disabled: !canIncrementResearch(props.research),
        onClick: () => incrementResearch(props.research)
      }, 
      {
        icon: () => h(props.research.icon),
        default: () => h('span', null, window.innerWidth > 700 || !sellFeatureEnabled.value ? props.research.label: null),
      }
    );
  },
})
</script>
