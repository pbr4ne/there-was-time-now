/* eslint-disable */
import { reactive, watch } from 'vue'
import { Timeline } from '../entities/Timeline'
import { scienceList } from '../composables/useScience'

//todo - eh find a better way to associate the sciences
export let timelineList = reactive([
  new Timeline(
    'lennox-old', 
    'Lennox', 
    1984, 
    [
      scienceList.find(science => science.key === 'quantum-mechanics')
    ],
    [],
    [],
    true,
  ),

  new Timeline(
    'lennox-young',
    'Lennox2',
    1934,
    [
      scienceList.find(science => science.key === 'biology')
    ],
    [],
    [],
    false,
  ),
])

export default function useTimeline() {

  watch(timelineList, (timelineList, prevTimelineList) => {
    console.log('watching timeline');
  });

  return {
    timelineList,
  }
}