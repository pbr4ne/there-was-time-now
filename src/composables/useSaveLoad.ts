import * as localforage from 'localforage/dist/localforage.js'
import useCurrency from '@/composables/useCurrency'
import useFlags from '@/composables/useFlags'
import useInitialize from '@/composables/useInitialize'
import useTime from '@/composables/useTime'
import { GameState } from '@/dto/GameState'
import { GameStateMessage } from '@/dto/GameStateMessage'
import { GameStatePerson } from '@/dto/GameStatePerson'
import { GameStateResearch } from '@/dto/GameStateResearch'
import { Message } from '@/entities/Message'
import { GameConstants } from '@/enum/Constants'
import { PersonKey, SaveKey, ResearchKey } from '@/enum/Enums'
import { messages } from '@/locales/en'

localforage.config({
  name: GameConstants.DB_NAME,
});

export default function useSaveLoad() {
  const { currency } = useCurrency();
  const { countdownTriggered, currentPerson, gameEnded, gameStarted, gameWon, isLoading, sellFeatureEnabled, slowdownEnabled, 
          spokeToLennox, spokeToSama } = useFlags();
  const { personList, researchList } = useInitialize();
  const { countdownTimer, countupTimer, expandConstant } = useTime();

  const clearGameState = () => {
    console.log(`clearing game state in ${localforage.driver()}`);
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
      gameWon.value = false;
      gameEnded.value = false;
      countdownTriggered.value = false;
      expandConstant.value = GameConstants.INITIAL_EXPANSION_CONSTANT;
      slowdownEnabled.value = false;
      spokeToLennox.value = false;
      spokeToSama.value = false;
      countdownTimer.restart(GameConstants.INITIAL_TIME);
      countdownTimer.stop();
      countupTimer.restart(0);
      currentPerson.value = PersonKey.LENNOX_OLD;
    })
    .catch(function(err: any) {
      console.log(`Error saving game state: ${err}`);
    });
  }

  const populateGameStateFromRuntime = () => {
    const savedPeople = new Array<GameStatePerson>();
    Object.values(personList)
      .forEach((person: any) => {
      const gameStateMessageList = new Array<GameStateMessage>();
      person.messageList.forEach((message: Message) => {
        //todo this seems error-prone
        const gameKey = Object.keys(messages).find(key => messages[key].title === message.title);
        gameStateMessageList.push(new GameStateMessage(gameKey!, message.timestamp, message.isRead, message.wasSent))
      });
      const gameStatePerson = new GameStatePerson(person.key, person.isUnlocked, gameStateMessageList);
      savedPeople.push(gameStatePerson);
    });

    const savedResearch = new Array<GameStateResearch>();
    Object.keys(researchList).forEach((key: string) => {
      const research = researchList[key];
      const gameStateResearch = new GameStateResearch(key, research.isUnlocked, research.total, research.current, research.numWorkers);
      savedResearch.push(gameStateResearch);
    });

    return new GameState(currency.value, sellFeatureEnabled.value, gameStarted.value, gameWon.value, gameEnded.value, 
      countdownTriggered.value, countdownTimer.secondsLeft(), countupTimer.secondsElapsed(), expandConstant.value, 
      slowdownEnabled.value, spokeToLennox.value, spokeToSama.value, savedPeople, savedResearch);
  }

  const saveGameState = () => {
    console.log(`saving to ${localforage.driver()}`);
    if(isLoading.value) {
      console.log('busy loading, will skip saving'); //todo - lol this is lazy
      return;
    }
    
    return localforage.setItem(SaveKey.GAME_STATE, populateGameStateFromRuntime())
      .catch(function(err: any) {
        console.log(`Error saving game state: ${err}`);
      });
  }

  const populateRuntimeFromGameState = (gameState: GameState) => {
    gameState.people.forEach((gameStatePerson: GameStatePerson) => {
      const person = personList[gameStatePerson.key];
      person.isUnlocked = gameStatePerson.isUnlocked;
      const messageList = new Array<Message>();
      gameStatePerson.messageList.forEach((gameStateMessage: GameStateMessage) => {
        const message = messages[gameStateMessage.key];
        const research = researchList[gameStateMessage.key];
        if(research) {
          message.icon = research.icon;
          message.color = research.color;
        }
        message.isRead = gameStateMessage.isRead;
        message.wasSent = gameStateMessage.wasSent;
        message.timestamp = gameStateMessage.timestamp;
        messageList.push(message);
      });
      person.messageList = messageList;
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
    gameWon.value = gameState.gameWon;
    gameEnded.value = gameState.gameEnded;
    countdownTriggered.value = gameState.countdownTriggered;
    countupTimer.restart(gameState.countupSecondsPassed);
    slowdownEnabled.value = gameState.slowdownEnabled;
    spokeToLennox.value = gameState.spokeToLennox;
    spokeToSama.value = gameState.spokeToSama;
    if(countdownTriggered.value) {
      expandConstant.value = gameState.expandConstant;
      if(!gameEnded.value) {
        countdownTimer.restart(gameState.countdownSecondsLeft);
      }
      countupTimer.stop();
    }
  }

  const loadGameInternal = () => {
    console.log(`loading from ${localforage.driver()}`);
    isLoading.value = true;
    return localforage.getItem(SaveKey.GAME_STATE)
    .then(function(gameState: GameState) {
      if(!gameState) {
        isLoading.value = false;
        console.log('didn\'t end up loading');
        return;
      }
      populateRuntimeFromGameState(gameState);
      isLoading.value = false;
      console.log('done loading');
    })
    .catch(function(err: any) {
      isLoading.value = false;
      console.log(`Error loading game state: ${err}`);
    });
  }

  const loadGameState = () => {
    return localforage.ready().then(loadGameInternal);
  }

  const importGameState = (value: string) => {
    console.log('import game state');
    try {
      populateRuntimeFromGameState(JSON.parse(decodeURIComponent(atob(value))));
      return true;
    } catch (exception) {
      return false;
    }
  }

  const exportGameState = () => {
    return btoa(encodeURIComponent(JSON.stringify(populateGameStateFromRuntime())));
  }

  return {
    clearGameState,
    exportGameState,
    importGameState,
    loadGameState,
    saveGameState,
  }
}
