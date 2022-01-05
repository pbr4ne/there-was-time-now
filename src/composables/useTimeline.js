import { reactive, watchEffect } from 'vue'
import { Timeline } from '../entities/Timeline'
import { scienceList } from '../composables/useScience'

//todo - eh find a better way to associate the sciences
export let timelineList = reactive([
  new Timeline(
    'lennox-old', 
    'Lennox', 
    1984, 
    [
      scienceList.find(science => science.key === 'quantum-mechanics'),
      scienceList.find(science => science.key === 'quantum-computing'),
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

  //todo - this is probably not good
  watchEffect(() => {
    scienceList.forEach(science => {
      science.unlocks.forEach(unlock => {
        if(unlock.threshold <= science.total) {
          if(unlock.type === 'timeline') {
            timelineList.find(timeline => timeline.key === unlock.key).isUnlocked = true;
          } else if(unlock.type === 'science') {
            scienceList.find(science => science.key === unlock.key).isUnlocked = true;
          }
        }
      });
    });
  });

  return {
    timelineList,
  }
}