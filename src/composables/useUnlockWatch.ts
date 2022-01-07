import { watchEffect } from 'vue'
import useInitialize from '@/composables/useInitialize'
import useMessage from '@/composables/useMessage'
import { Person } from '@/entities/Person'
import { Unlock } from '@/entities/Unlock'
import { UnlockKey } from '@/enum/Enums'

function unlockResearch(unlock: Unlock, researchList: any, personList: Array<Person>, sendUnlockMessage: Function) {
  const research = researchList[unlock.key];
  if(!research.isUnlocked) {
    research.isUnlocked = true;
    const person = personList.find(person => person.key === unlock.person)!;
    sendUnlockMessage(unlock, person);
  }
}

export default function useUnlockWatch() {
  const { sendUnlockMessage } = useMessage();
  const { deviceList, engineeringList, personList, researchList, scienceList } = useInitialize();

  //todo - this seems inefficient
  watchEffect(() => {
    for(const researchKey in researchList){
      const research = researchList[researchKey];
      research.unlocks.forEach((unlock : Unlock) => {
        if(research.total >= unlock.threshold) {
          if(unlock.type === UnlockKey.PERSON) {
            const person = personList.find(person => person.key === unlock.key)!;
            if(!person.isUnlocked) {
              person.isUnlocked = true;
              sendUnlockMessage(unlock, person);
            }
          } else if(unlock.type === UnlockKey.SCIENCE) {
            unlockResearch(unlock, scienceList, personList, sendUnlockMessage);
          } else if(unlock.type === UnlockKey.ENGINEERING) {
            unlockResearch(unlock, engineeringList, personList, sendUnlockMessage);
          } else if(unlock.type === UnlockKey.DEVICE) {
            unlockResearch(unlock, deviceList, personList, sendUnlockMessage);
          } else if(unlock.type === UnlockKey.MESSAGE) {
            const person = personList.find(person => person.key === unlock.key)!;
            sendUnlockMessage(unlock, person);
          }
        }
      });
    }
  });

  return {
  }
}