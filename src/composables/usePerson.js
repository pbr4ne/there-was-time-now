/* eslint-disable */
import { reactive, watchEffect } from 'vue'
import { useNotification } from 'naive-ui'
import { Person } from '../entities/Person'
import { scienceList } from './useScience'
import { Timeline } from '@/entities/Timeline'

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
  const notification = useNotification();

  //todo - don't do this here
  //initial message
  let initialMessage = new Timeline(
    'lennox-old',
    'lennox-old-1',
    '1984',
    'The year is 1984. You are Lennox, a physicist researching the most cutting-edge technology: Quantum Computing! With enough research, you should be able to build your own Quantum Computer. Let’s get started…',
    '1984-03-05 20:24:00',
  );
  notification.create({
    title: initialMessage.name,
    content: initialMessage.text,
    meta: initialMessage.timestamp,
  });
  personList.find(person => person.key === 'lennox-old').timeline.push(initialMessage);

  //todo - this is very not good 
  watchEffect(() => {
    scienceList.forEach(science => {
      science.unlocks.forEach(unlock => {
        if(science.total >= unlock.threshold) {
          console.log(`${unlock.type} ${unlock.key}`)
          if(unlock.type === 'person') {
            const person = personList.find(person => person.key === unlock.key);
            if(!person.isUnlocked) {
              person.isUnlocked = true;
              const message = unlock.message;
              console.log(`notification ${message.name}`)
              notification.create({
                title: message.name,
                content: message.text,
                meta: message.timestamp,
              })
              person.timeline.unshift(message);
            }
          } else if(unlock.type === 'science') {
            const science = scienceList.find(science => science.key === unlock.key);
            if(!science.isUnlocked){
              science.isUnlocked = true;
              const person = personList.find(person => person.key === unlock.person);
              const message = unlock.message;
              console.log(`notification ${message.name}`)
              notification.create({
                title: message.name,
                content: message.text,
                meta: message.timestamp,
              })
              person.timeline.unshift(message);
            }
          }
        }
      });
    });
  });

  return {
    personList,
  }
}