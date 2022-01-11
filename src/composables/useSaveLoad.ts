import * as localforage from 'localforage/dist/localforage.js'
import useCurrency from '@/composables/useCurrency'
import useInitialize from '@/composables/useInitialize'
import useTime from '@/composables/useTime'
import { GameState } from '@/dto/GameState'
import { GameStateDevice } from '@/dto/GameStateDevice'
import { GameStatePerson } from '@/dto/GameStatePerson'
import { GameStateScience } from '@/dto/GameStateScience'
import { GameConstants } from '@/enum/Constants'
import { PersonKey, SaveKey, ScienceKey } from '@/enum/Enums'

localforage.config({
  name: GameConstants.DB_NAME,
});

export default function useSaveLoad() {
  const { currency } = useCurrency();
  const { countdownTriggered, deviceList, gameEnded, gameStarted, isLoading, personList, scienceList, sellFeatureEnabled } = useInitialize();
  const { countdownTimer, countupTimer, expandConstant } = useTime();

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
      Object.keys(scienceList).forEach((key: string) => {
        const science = scienceList[key];
        if(key != ScienceKey.PHYSICS) {
          science.isUnlocked = false;
        }
        science.total = 0;
        science.current = 0;
        science.numWorkers = 0;
      });
      Object.keys(deviceList).forEach((key: string) => {
        const device = deviceList[key];
        device.isUnlocked = false;
        device.total = 0;
        device.current = 0;
        device.numWorkers = 0;
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

    const savedScience = new Array<GameStateScience>();
    Object.keys(scienceList).forEach((key: string) => {
      const science = scienceList[key];
      const gameStateScience = new GameStateScience(key, science.isUnlocked, science.total, science.current, science.numWorkers);
      savedScience.push(gameStateScience);
    });

    const savedDevice = new Array<GameStateDevice>();
    Object.keys(deviceList).forEach((key: string) => {
      const device = deviceList[key];
      const gameStateDevice = new GameStateDevice(key, device.isUnlocked, device.total, device.current, device.numWorkers);
      savedDevice.push(gameStateDevice);
    });

    const gameState = new GameState(currency.value, sellFeatureEnabled.value, gameStarted.value, gameEnded.value, 
      countdownTriggered.value, countdownTimer.secondsLeft(), countupTimer.secondsElapsed(), expandConstant.value, 
      savedPeople, savedScience, savedDevice);

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

      gameState.sciences.forEach((gameStateScience: GameStateScience) => {
        const science = scienceList[gameStateScience.key];
        science.isUnlocked = gameStateScience.isUnlocked;
        science.total = gameStateScience.total;
        science.current = gameStateScience.current;
        science.numWorkers = gameStateScience.numWorkers;
      });

      gameState.devices.forEach((gameStateDevice: GameStateDevice) => {
        const device = deviceList[gameStateDevice.key];
        device.isUnlocked = gameStateDevice.isUnlocked;
        device.total = gameStateDevice.total;
        device.current = gameStateDevice.current;
        device.numWorkers = gameStateDevice.numWorkers;
      });

      currency.value = gameState.currency;
      sellFeatureEnabled.value = gameState.sellFeatureEnabled;
      gameStarted.value = gameState.gameStarted;
      gameEnded.value = gameState.gameEnded;
      countdownTriggered.value = gameState.countdownTriggered;
      countupTimer.restart(gameState.countupSecondsPassed);
      if(countdownTriggered.value) {
        expandConstant.value = gameState.expandConstant;
        if(!gameEnded.value) {
          console.log(gameState.countdownSecondsLeft);
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
