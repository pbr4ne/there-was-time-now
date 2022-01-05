import { reactive, watchEffect } from 'vue'
import { Person } from '../entities/Person'
import { scienceList } from './useScience'

//todo - eh find a better way to associate the sciences
export let personList = reactive([
  new Person(
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

  new Person(
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

export default function usePerson() {

  //const notification = useNotification();
  //todo - this is probably not good
  watchEffect(() => {
    scienceList.forEach(science => {
      science.unlocks.forEach(unlock => {
        if(unlock.threshold <= science.total) {
          if(unlock.type === 'person') {
            personList.find(person => person.key === unlock.key).isUnlocked = true;
          } else if(unlock.type === 'science') {
            scienceList.find(science => science.key === unlock.key).isUnlocked = true;
          }
        }
      });
    });
  });

  return {
    personList,
  }
}