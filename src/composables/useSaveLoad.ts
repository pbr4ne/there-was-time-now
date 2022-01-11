import * as localforage from 'localforage/dist/localforage.js'
import useCurrency from '@/composables/useCurrency'
import useInitialize from '@/composables/useInitialize'
import useTime from '@/composables/useTime'
import { GameState } from '@/dto/GameState'
import { GameStateDevice } from '@/dto/GameStateDevice'
import { GameStatePerson } from '@/dto/GameStatePerson'
import { GameStateScience } from '@/dto/GameStateScience'
import { GameConstants } from '@/enum/Constants'
import { SaveKey } from '@/enum/Enums'

localforage.config({
  name: GameConstants.DB_NAME,
});

export default function useSaveLoad() {
  const { currency } = useCurrency();
  const { countdownTriggered, deviceList, gameEnded, gameStarted, isLoading, personList, scienceList, sellFeatureEnabled } = useInitialize();
  const { countdownTimer, expandConstant } = useTime();

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
      countdownTriggered.value, countdownTimer.secondsLeft(), 0, expandConstant.value, savedPeople, savedScience, savedDevice);

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
      if(countdownTriggered.value) {
        expandConstant.value = gameState.expandConstant;
        countdownTimer.create(gameState.countdownSecondsLeft);
        if(!gameEnded.value) {
          countdownTimer.start();
        }
      }
      isLoading.value = false;
      console.log('done loading');
    })
    .catch(function(err: any) {
      console.log(`Error loading gameStarted: ${err}`);
    });
  }

  return {
    loadGameState,
    saveGameState,
  }
}
