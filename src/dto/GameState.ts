import { GameStateDevice } from '@/dto/GameStateDevice';
import { GameStatePerson } from '@/dto/GameStatePerson';
import { GameStateScience } from '@/dto/GameStateScience';

export class GameState {
  currency: number;
  sellFeatureEnabled: boolean;
  gameStarted: boolean;
  gameEnded: boolean;
  countdownTriggered: boolean;
  countdownSecondsLeft: number;
  countupSecondsPassed: number;
  expandConstant: number;
  people: Array<GameStatePerson>;
  sciences: Array<GameStateScience>;
  devices: Array<GameStateDevice>;

  constructor(currency: number, sellFeatureEnabled: boolean, gameStarted: boolean, gameEnded: boolean, countdownTriggered: boolean, 
    countdownSecondsLeft: number, countupSecondsPassed: number, expandConstant: number, people: Array<any>, sciences: Array<any>, devices: Array<any>) {
    this.currency = currency;
    this.sellFeatureEnabled = sellFeatureEnabled;
    this.gameStarted = gameStarted;
    this.gameEnded = gameEnded;
    this.countdownTriggered = countdownTriggered;
    this.countdownSecondsLeft = countdownSecondsLeft;
    this.countupSecondsPassed = countupSecondsPassed;
    this.expandConstant = expandConstant;
    this.people = people;
    this.sciences = sciences;
    this.devices = devices;
  }
}