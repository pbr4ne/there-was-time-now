import { watchEffect } from 'vue'
import useInitialize from '@/composables/useInitialize'
// @ts-ignore
import useMessage from '@/composables/useMessage'
import useFlags from '@/composables/useFlags'
import { Unlock } from '@/entities/Unlock'
import { PersonKey, UnlockKey } from '@/enum/Enums'

//function unlockResearch(unlock: Unlock, researchList: any, personList: any, sendUnlockMessage: Function) {
//   const research = researchList[unlock.key];
//   if(!research.isUnlocked) {
//     research.isUnlocked = true;
//     const person = personList[unlock.person];
//     sendUnlockMessage(unlock, person, research.label);
//   }
// }

export default function useUnlockWatch() {
  const { sendPersonUnlockMessage, sendResearchUnlockMessage } = useMessage();
  const { deviceList, personList, researchList, scienceList } = useInitialize();
  const { isLoading } = useFlags();

  //todo - this seems inefficient
  watchEffect(() => {
    if (isLoading.value) {
      return;
    }
    for(const ResearchKey in scienceList){
      const science = scienceList[ResearchKey];
      if(!science.isUnlocked) {
        const unlock = researchList[science.unlockedBy];
        const threshold = science.unlockThreshold;
        if(unlock.total >= threshold) {
          science.isUnlocked = true;
          sendResearchUnlockMessage(science, personList[PersonKey.LENNOX_OLD])
        }
      }
    }
    for(const personKey in personList) {
      const person = personList[personKey];
      if(!person.isUnlocked) {
        const unlock = researchList[person.unlockedBy];
        const threshold = person.unlockThreshold;
        if(unlock.total >= threshold) {
          person.isUnlocked = true;
          sendPersonUnlockMessage(person);
        }
      }
    }

      // research.unlocks.forEach((unlock : Unlock) => {
      //   if(research.total >= unlock.threshold) {
      //     if(unlock.type === UnlockKey.PERSON) {
      //       const person = personList[unlock.key];
      //       if(!person.isUnlocked) {
      //         person.isUnlocked = true;
      //         sendUnlockMessage(unlock, person, person.name);
      //       }
      //     } else if(unlock.type === UnlockKey.SCIENCE) {
      //       unlockResearch(unlock, scienceList, personList, sendUnlockMessage);
      //     } else if(unlock.type === UnlockKey.DEVICE) {
      //       unlockResearch(unlock, deviceList, personList, sendUnlockMessage);
      //     } else if(unlock.type === UnlockKey.MESSAGE) {
      //       const person = personList[unlock.key];
      //       sendUnlockMessage(unlock, person, null!);
      //     }
      //   }
      // });
    //}
  });

  return {
  }
}