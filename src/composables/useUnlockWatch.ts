import { watchEffect } from 'vue'
import useInitialize from '@/composables/useInitialize'
// @ts-ignore
import useMessage from '@/composables/useMessage'
import useFlags from '@/composables/useFlags'
import { PersonKey } from '@/enum/Enums'

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
  });

  return {
  }
}