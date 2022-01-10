import { watchEffect } from 'vue'
import useInitialize from '@/composables/useInitialize'
import useMessage from '@/composables/useMessage'
import { Unlock } from '@/entities/Unlock'
import { UnlockKey } from '@/enum/Enums'

function unlockResearch(unlock: Unlock, researchList: any, personList: any, sendUnlockMessage: Function) {
  const research = researchList[unlock.key];
  if(!research.isUnlocked) {
    research.isUnlocked = true;
    const person = personList[unlock.person];
    sendUnlockMessage(unlock, person, research.label);
  }
}

export default function useUnlockWatch() {
  const { sendUnlockMessage } = useMessage();
  const { deviceList, personList, researchList, scienceList } = useInitialize();

  //todo - this seems inefficient
  watchEffect(() => {
    for(const researchKey in researchList){
      const research = researchList[researchKey];
      research.unlocks.forEach((unlock : Unlock) => {
        if(research.total >= unlock.threshold) {
          if(unlock.type === UnlockKey.PERSON) {
            const person = personList[unlock.key];
            if(!person.isUnlocked) {
              person.isUnlocked = true;
              sendUnlockMessage(unlock, person, person.name);
            }
          } else if(unlock.type === UnlockKey.SCIENCE) {
            unlockResearch(unlock, scienceList, personList, sendUnlockMessage);
          } else if(unlock.type === UnlockKey.DEVICE) {
            unlockResearch(unlock, deviceList, personList, sendUnlockMessage);
          } else if(unlock.type === UnlockKey.MESSAGE) {
            const person = personList[unlock.key];
            sendUnlockMessage(unlock, person, null!);
          }
        }
      });
    }
  });

  return {
  }
}