import { watchEffect } from 'vue'
import useInitialize from '@/composables/useInitialize'
import useMessage from '@/composables/useMessage'
import useFlags from '@/composables/useFlags'
import { Person } from '@/entities/Person'
import { Research } from '@/entities/Research'

export default function useUnlockWatch() {
  const { sendUnlockMessage } = useMessage();
  const { personList, researchList, unlockableList } = useInitialize();
  const { isLoading } = useFlags();

  watchEffect(() => {
    if (isLoading.value) {
      return;
    }
    for(const key in unlockableList){
      const unlockable = unlockableList[key];
      let person = null;
      if(unlockable instanceof Person) {
        person = unlockable;
      } else if(unlockable instanceof Research) {
        person = personList[unlockable.personKey];
      }
      if(!unlockable.isUnlocked) {
        const unlock = researchList[unlockable.unlockedBy];
        if(unlock) {
          const threshold = unlockable.unlockThreshold;
          if(unlock.total >= threshold) {
            unlockable.isUnlocked = true;
            sendUnlockMessage(key, person)
          }
        }
      }
    }
  });

  return {
  }
}