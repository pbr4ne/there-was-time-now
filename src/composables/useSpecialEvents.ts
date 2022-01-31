import { watchEffect } from 'vue'
import useInitialize from '@/composables/useInitialize'
import useMessage from '@/composables/useMessage'
import useTime from '@/composables/useTime'
import useFlags from '@/composables/useFlags'
import { Research } from '@/entities/Research'
import { NarrativeKey, PersonKey, ResearchKey } from '@/enum/Enums'
import { messages } from '@/locales/en'

//todo - some of this could probably be triggered other ways
export default function useSpecialEvents() {

  const { personList, researchList, unlockableList } = useInitialize();
  const { sendNarrativeMessage, sendUnlockMessage, sendUnlockMessages } = useMessage();
  const { countdownTimer, countupTimer, } = useTime();
  const { confetti, countdownTriggered, gameEnded, gameWon, isLoading, sellFeatureEnabled, slowdownEnabled, 
          spokeToLennox, spokeToSama } = useFlags();

  //When first quantum computer is built, start the end of world timer
  watchEffect(() => {
    if(!countdownTriggered.value && researchList[ResearchKey.QUANTUM_COMPUTER].total >= 1 && !isLoading.value) {
      countdownTriggered.value = true;
      countdownTimer.start();
      countupTimer.stop();
      sendNarrativeMessage(messages[NarrativeKey.UNLOCK_COUNTDOWN], [PersonKey.LENNOX_OLD]);
    }
  });

  //When fifth quantum computer is built, unlock buy/sell
  watchEffect(() => {
    if(!sellFeatureEnabled.value && researchList[ResearchKey.QUANTUM_COMPUTER].total >= 5 && !isLoading.value) {
      sellFeatureEnabled.value = true;
      sendNarrativeMessage(messages[NarrativeKey.UNLOCK_WORKERS], [PersonKey.LENNOX_OLD]);
    }
  });

  //When first worker is purchased, unlock slowdown
  watchEffect(() => {
    if(!slowdownEnabled.value && Object.values(researchList).find((research: any) => research.numWorkers > 0)) {
      slowdownEnabled.value = true;
      sendNarrativeMessage(messages[NarrativeKey.UNLOCK_SLOWDOWN], [PersonKey.LENNOX_OLD]);
    }
  });

  //When tenth quantum computer is built and slowdown is enabled, unlock young lennox
  watchEffect(() => {
    if(!personList[PersonKey.LENNOX_YOUNG].isUnlocked && researchList[ResearchKey.QUANTUM_COMPUTER].total >= 10 && slowdownEnabled.value) {
      personList[PersonKey.LENNOX_YOUNG].isUnlocked = true;
      researchList[ResearchKey.BIOLOGY].isUnlocked = true;
      sendUnlockMessage(researchList[ResearchKey.BIOLOGY], personList[PersonKey.LENNOX_YOUNG]);
      sendNarrativeMessage(messages[NarrativeKey.UNLOCK_YOUNG_LENNOX], [PersonKey.LENNOX_OLD]);
    }
  });

  //When fifth biology is researched, send message
  watchEffect(() => {
    if(!spokeToLennox.value && researchList[ResearchKey.BIOLOGY].total >= 5 && !isLoading.value){
      spokeToLennox.value = true;
      sendNarrativeMessage(messages[NarrativeKey.SPEAK_TO_LENNOX], [PersonKey.LENNOX_OLD, PersonKey.LENNOX_YOUNG]);
    }
  });

  //When first telomere stretcher is researched, unlock sama, alchemy, crystal sarcophagus, chronocrystals, omegaperson, the fluid
  watchEffect(() => {
    if(!personList[PersonKey.SAMA].isUnlocked && researchList[ResearchKey.TELOMERE_STRETCHER].total >= 1 && !isLoading.value){
      personList[PersonKey.SAMA].isUnlocked = true;
      researchList[ResearchKey.ALCHEMY].isUnlocked = true;
      researchList[ResearchKey.CRYSTAL_SARCOPHAGUS].isUnlocked = true;
      researchList[ResearchKey.CHRONOCRYSTALS].isUnlocked = true;
      researchList[ResearchKey.OMEGAPERSON].isUnlocked = true;
      researchList[ResearchKey.THE_FLUID].isUnlocked = true;
      sendUnlockMessages([
        { research: researchList[ResearchKey.ALCHEMY], person: personList[PersonKey.SAMA] },
        { research: researchList[ResearchKey.THE_FLUID], person: personList[PersonKey.LENNOX_YOUNG] },
        { research: researchList[ResearchKey.OMEGAPERSON], person: personList[PersonKey.LENNOX_YOUNG] },
        { research: researchList[ResearchKey.CHRONOCRYSTALS], person: personList[PersonKey.LENNOX_OLD] },
        { research: researchList[ResearchKey.CRYSTAL_SARCOPHAGUS], person: personList[PersonKey.LENNOX_OLD] },
      ]);
      sendNarrativeMessage(messages[NarrativeKey.UNLOCK_SAMA], [PersonKey.LENNOX_OLD]);
    }
  });

  //When fifth alchemy is researched, send message
  watchEffect(() => {
    if(!spokeToSama.value && researchList[ResearchKey.ALCHEMY].total >= 5 && !isLoading.value){
      spokeToSama.value = true;
      sendNarrativeMessage(messages[NarrativeKey.SPEAK_TO_SAMA], [PersonKey.LENNOX_OLD, PersonKey.SAMA]);
    }
  });

  //When first distiller stretcher is researched, unlock itotia, philosopher's stone, eezo
  watchEffect(() => {
    if(!personList[PersonKey.ITOTIA].isUnlocked && researchList[ResearchKey.DISTILLER].total >= 1 && !isLoading.value){
      personList[PersonKey.ITOTIA].isUnlocked = true;
      researchList[ResearchKey.MATHEMATICS].isUnlocked = true;
      researchList[ResearchKey.PHILOSOPHERS_STONE].isUnlocked = true;
      researchList[ResearchKey.ELEMENT_ZERO].isUnlocked = true;
      sendUnlockMessages([
        { research: researchList[ResearchKey.MATHEMATICS], person: personList[PersonKey.ITOTIA] },
        { research: researchList[ResearchKey.ELEMENT_ZERO], person: personList[PersonKey.SAMA] },
        { research: researchList[ResearchKey.PHILOSOPHERS_STONE], person: personList[PersonKey.SAMA] },
      ]);
      sendNarrativeMessage(messages[NarrativeKey.UNLOCK_ITOTIA], [PersonKey.LENNOX_OLD, PersonKey.ITOTIA]);
    }
  });

  
  //When first nepohualtzintzin is researched, unlock nechtan, astronomy, tzolk'in, obsidian
  watchEffect(() => {
    if(!personList[PersonKey.NECHTAN].isUnlocked && researchList[ResearchKey.NEPOHUALTZINTZIN].total >= 1 && !isLoading.value){
      personList[PersonKey.NECHTAN].isUnlocked = true;
      researchList[ResearchKey.ASTRONOMY].isUnlocked = true;
      researchList[ResearchKey.TZOLKIN].isUnlocked = true;
      researchList[ResearchKey.OBSIDIAN].isUnlocked = true;
      sendUnlockMessages([
        { research: researchList[ResearchKey.ASTRONOMY], person: personList[PersonKey.NECHTAN] },
        { research: researchList[ResearchKey.OBSIDIAN], person: personList[PersonKey.ITOTIA] },
        { research: researchList[ResearchKey.TZOLKIN], person: personList[PersonKey.ITOTIA] },
      ]);
      sendNarrativeMessage(messages[NarrativeKey.UNLOCK_NECHTAN], [PersonKey.LENNOX_OLD, PersonKey.ITOTIA, PersonKey.NECHTAN]);
    }
  });

  //When you finish building all devices, you win
  watchEffect(() => {
    if(isLoading.value) {
      return;
    }
    const crystalSarcophagus = researchList[ResearchKey.CRYSTAL_SARCOPHAGUS];
    if(!gameEnded.value && crystalSarcophagus.total > 0) {
      countdownTimer.stop();
      gameEnded.value = true;
      gameWon.value = true;
      confetti.value = true;
      sendNarrativeMessage(messages[NarrativeKey.SUCCESS], [PersonKey.LENNOX_OLD, PersonKey.LENNOX_YOUNG, PersonKey.SAMA, PersonKey.ITOTIA, PersonKey.NECHTAN]);
    }
  });

  //When countdown timer is expired, you lose
  watchEffect(async() => {
    if(!gameEnded.value && countdownTimer.isExpired() && !isLoading.value) {
      gameEnded.value = true;
      gameWon.value = false;
      sendNarrativeMessage(messages[NarrativeKey.FAILURE], [PersonKey.LENNOX_OLD, PersonKey.LENNOX_YOUNG, PersonKey.SAMA, PersonKey.ITOTIA, PersonKey.NECHTAN]);
    }
  });

  watchEffect(() => {
    if (isLoading.value) {
      return;
    }
    for(const key in unlockableList){
      const unlockable = unlockableList[key];
      let person = null;
      if(unlockable instanceof Research) {
        person = personList[unlockable.personKey];   
        if(!unlockable.isUnlocked) {
          const unlock = researchList[unlockable.unlockedBy];
          if(unlock) {
            const threshold = unlockable.unlockThreshold;
            if(unlock.total >= threshold) {
              unlockable.isUnlocked = true;
              sendUnlockMessage(unlockable, person)
            }
          }
        }
      }
    }
  });
}