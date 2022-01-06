import { watchEffect } from 'vue'
import { useNotification } from 'naive-ui'
import useInitialize from './useInitialize'

export default function useUnlockWatch() {
  const notification = useNotification();
  const { personList, scienceList } = useInitialize();

  //todo - this is very not good 
  watchEffect(() => {
    console.log(`========= WATCHING ${scienceList.length} SCIENCES =========`);
    scienceList.forEach(science => {
      console.log(`science ${science.label} (${science.unlocks.length} unlocks)`)
      science.unlocks.forEach(unlock => {
        console.log(`--checking unlock ${unlock.key}`)
        if(science.total >= unlock.threshold) {
          console.log(`----beat threshold`)
          if(unlock.type === 'person') {
            const person = personList.find(person => person.key === unlock.key);
            if(!person.isUnlocked) {
              console.log('------unlocked')
              person.isUnlocked = true;
              const message = unlock.message;
              console.log(`--------notification ${message.name}`)
              notification.create({
                title: message.name,
                content: message.text,
                meta: message.timestamp,
                duration: 1000,
              })
              person.timeline.unshift(message);
            }
          } else if(unlock.type === 'science') {
            const science = scienceList.find(science => science.key === unlock.key);
            if(!science.isUnlocked){
              console.log(`------unlocked`)
              science.isUnlocked = true;
              const person = personList.find(person => person.key === unlock.person);
              const message = unlock.message;
              console.log(`--------notification ${message.name}`)
              notification.create({
                title: message.name,
                content: message.text,
                meta: message.timestamp,
                duration: 1000,
              })
              person.timeline.unshift(message);
            }
          }
        }
      });
    });
  });

  return {
  }
}