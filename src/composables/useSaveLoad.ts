import * as localforage from 'localforage/dist/localforage.js'
import useCurrency from '@/composables/useCurrency'
import useInitialize from '@/composables/useInitialize'
import useTime from '@/composables/useTime'
import useFlags from '@/composables/useFlags'
import { GameState } from '@/dto/GameState'
import { GameStatePerson } from '@/dto/GameStatePerson'
import { GameStateResearch } from '@/dto/GameStateResearch'
import { GameConstants } from '@/enum/Constants'
import { PersonKey, SaveKey, ResearchKey } from '@/enum/Enums'

localforage.config({
  name: GameConstants.DB_NAME,
});

export default function useSaveLoad() {
  const { currency } = useCurrency();
  const { personList, researchList } = useInitialize();
  const { countdownTimer, countupTimer, expandConstant } = useTime();
  const { countdownTriggered, currentPerson, gameEnded, gameStarted, isLoading, sellFeatureEnabled, slowdownEnabled } = useFlags();

  //todo - missing initial message
  //todo - the countup timer is getting messed up
  const clearGameState = () => {
    return localforage.setItem(SaveKey.GAME_STATE, null)
    .then(function() {
      Object.values(personList).forEach((person: any) => {
        if(person.key != PersonKey.LENNOX_OLD) {
          person.isUnlocked = false;
        }
        person.messageList = [];
      });
      Object.keys(researchList).forEach((key: string) => {
        const research = researchList[key];
        if(key != ResearchKey.PHYSICS) {
          research.isUnlocked = false;
        }
        research.total = 0;
        research.current = 0;
        research.numWorkers = 0;
      });
      currency.value = 0;
      sellFeatureEnabled.value = false;
      gameStarted.value = true;
      gameEnded.value = false;
      countdownTriggered.value = false;
      expandConstant.value = GameConstants.INITIAL_EXPANSION_CONSTANT;
      countdownTimer.restart(GameConstants.INITIAL_TIME);
      countdownTimer.stop();
      countupTimer.restart(0);
      countupTimer.start();
      currentPerson.value = PersonKey.LENNOX_OLD;
    })
    .catch(function(err: any) {
      console.log(`Error saving game state: ${err}`);
    });
  }

  const saveGameState = () => {
    console.log('saving...');
    if(isLoading.value) {
      console.log('busy loading, will skip saving'); //todo - lol this is lazy
      return;
    }
    const savedPeople = new Array<GameStatePerson>();
    Object.values(personList)
      .forEach((person: any) => {
      const gameStatePerson = new GameStatePerson(person.key, person.isUnlocked, JSON.stringify(person.messageList));
      savedPeople.push(gameStatePerson);
    });

    const savedResearch = new Array<GameStateResearch>();
    Object.keys(researchList).forEach((key: string) => {
      const research = researchList[key];
      const gameStateResearch = new GameStateResearch(key, research.isUnlocked, research.total, research.current, research.numWorkers);
      savedResearch.push(gameStateResearch);
    });

    const gameState = new GameState(currency.value, sellFeatureEnabled.value, gameStarted.value, gameEnded.value, 
      countdownTriggered.value, countdownTimer.secondsLeft(), countupTimer.secondsElapsed(), expandConstant.value, 
      slowdownEnabled.value, savedPeople, savedResearch);

    console.log('done saving');
    return localforage.setItem(SaveKey.GAME_STATE, gameState)
      .catch(function(err: any) {
        console.log(`Error saving game state: ${err}`);
      });
  }

  const loadGameState = () => {
    console.log('loading...');
    isLoading.value = true;
    return localforage.getItem(SaveKey.GAME_STATE)
    .then(function(gameState: GameState) {
      if(!gameState) {
        isLoading.value = false;
        console.log('didn\'t end up loading');
        return;
      }
      gameState.people.forEach((gameStatePerson: GameStatePerson) => {
        const person = personList[gameStatePerson.key];
        person.isUnlocked = gameStatePerson.isUnlocked;
        person.messageList = JSON.parse(gameStatePerson.messageList);
      });

      gameState.researches.forEach((gameStateResearch: GameStateResearch) => {
        const research = researchList[gameStateResearch.key];
        research.isUnlocked = gameStateResearch.isUnlocked;
        research.total = gameStateResearch.total;
        research.current = gameStateResearch.current;
        research.numWorkers = gameStateResearch.numWorkers;
      });

      currency.value = gameState.currency;
      sellFeatureEnabled.value = gameState.sellFeatureEnabled;
      gameStarted.value = gameState.gameStarted;
      gameEnded.value = gameState.gameEnded;
      countdownTriggered.value = gameState.countdownTriggered;
      countupTimer.restart(gameState.countupSecondsPassed);
      slowdownEnabled.value = gameState.slowdownEnabled;
      if(countdownTriggered.value) {
        expandConstant.value = gameState.expandConstant;
        if(!gameEnded.value) {
          countdownTimer.restart(gameState.countdownSecondsLeft);
        }
        countupTimer.stop();
      }
      isLoading.value = false;
      console.log('done loading');
    })
    .catch(function(err: any) {
      console.log(`Error loading gameStarted: ${err}`);
    });
  }

  return {
    clearGameState,
    loadGameState,
    saveGameState,
  }
}
