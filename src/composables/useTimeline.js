import { reactive } from 'vue'
import { timelineList as unreactiveTimelineList } from '../entities/Timeline'

let timelineList = reactive(unreactiveTimelineList);

export default function useTimeline() {
  return {
    timelineList,
  }
}