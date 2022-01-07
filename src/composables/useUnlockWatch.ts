import { watchEffect } from 'vue'
import { useNotification } from 'naive-ui'
import useInitialize from '@/composables/useInitialize'
import { Person } from '@/entities/Person'
import { Unlock } from '@/entities/Unlock'
import { GameConstants, UnlockKey } from '@/enum/Constants'

function unlockResearch(unlock: Unlock, researchList: any, personList: Array<Person>, notification: any) {
  const research = researchList[unlock.key];
  if(!research.isUnlocked) {
    console.log(`------unlocked`)
    research.isUnlocked = true;
    const person = personList.find(person => person.key === unlock.person)!;
    sendUnlockMessage(unlock, person, notification);
  }
}

function sendUnlockMessage(unlock: Unlock, person: Person, notification: any) {
  const message = unlock.message;
  console.log(`--------notification ${message.name}`)
  notification.create({
    title: message.name,
    content: message.text,
    meta: message.timestamp,
    duration: GameConstants.NOTIFICATION_DURATION,
  })
  person.messageList.unshift(message);
}

export default function useUnlockWatch() {
  const notification = useNotification();
  const { deviceList, engineeringList, personList, researchList, scienceList } = useInitialize();

  //todo - this is very not good AT ALL
  watchEffect(() => {
    console.log(`========= WATCHING RESEARCHES =========`);
    for(const researchKey in researchList){
      const research = researchList[researchKey];
      console.log(`research ${research.label} (has ${research.unlocks.length} unlocks)`)
      research.unlocks.forEach((unlock : Unlock) => {
        console.log(`--checking unlock ${unlock.key}`)
        if(research.total >= unlock.threshold) {
          console.log(`----beat threshold`)
          if(unlock.type === 'person') {
            const person = personList.find(person => person.key === unlock.key)!;
            if(!person.isUnlocked) {
              console.log('------unlocked')
              person.isUnlocked = true;
              sendUnlockMessage(unlock, person, notification);
            }
          } else if(unlock.type === UnlockKey.SCIENCE) {
            unlockResearch(unlock, scienceList, personList, notification);
          } else if(unlock.type === UnlockKey.ENGINEERING) {
            unlockResearch(unlock, engineeringList, personList, notification);
          } else if(unlock.type === UnlockKey.DEVICE) {
            unlockResearch(unlock, deviceList, personList, notification);
          } else if(unlock.type === UnlockKey.MESSAGE) {
            const person = personList.find(person => person.key === unlock.key)!;
            sendUnlockMessage(unlock, person, notification);
          }
        }
      });
    }
  });

  return {
  }
}