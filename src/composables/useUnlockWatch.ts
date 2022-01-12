import { watchEffect } from 'vue'
import useInitialize from '@/composables/useInitialize'
// @ts-ignore
import useMessage from '@/composables/useMessage'
import useFlags from '@/composables/useFlags'
import { PersonKey } from '@/enum/Enums'

export default function useUnlockWatch() {
  const { sendPersonUnlockMessage, sendResearchUnlockMessage } = useMessage();
  const { personList, researchList, } = useInitialize();
  const { isLoading } = useFlags();

  //todo - this seems inefficient
  watchEffect(() => {
    if (isLoading.value) {
      return;
    }
    for(const ResearchKey in researchList){
      const research = researchList[ResearchKey];
      if(!research.isUnlocked) {
        const unlock = researchList[research.unlockedBy];
        const threshold = research.unlockThreshold;
        if(unlock.total >= threshold) {
          research.isUnlocked = true;
          sendResearchUnlockMessage(research, personList[PersonKey.LENNOX_OLD])
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
  });

  return {
  }
}