import { GameStatePerson } from '@/dto/GameStatePerson';
import { GameStateResearch } from '@/dto/GameStateResearch';

export class GameState {
  currency: number;
  sellFeatureEnabled: boolean;
  gameStarted: boolean;
  gameEnded: boolean;
  countdownTriggered: boolean;
  countdownSecondsLeft: number;
  countupSecondsPassed: number;
  expandConstant: number;
  slowdownEnabled: boolean;
  people: Array<GameStatePerson>;
  researches: Array<GameStateResearch>;

  constructor(currency: number, sellFeatureEnabled: boolean, gameStarted: boolean, gameEnded: boolean, countdownTriggered: boolean, 
    countdownSecondsLeft: number, countupSecondsPassed: number, expandConstant: number, slowdownEnabled: boolean, people: Array<any>, researches: Array<any>) {
    this.currency = currency;
    this.sellFeatureEnabled = sellFeatureEnabled;
    this.gameStarted = gameStarted;
    this.gameEnded = gameEnded;
    this.countdownTriggered = countdownTriggered;
    this.countdownSecondsLeft = countdownSecondsLeft;
    this.countupSecondsPassed = countupSecondsPassed;
    this.expandConstant = expandConstant;
    this.slowdownEnabled = slowdownEnabled;
    this.people = people;
    this.researches = researches;
  }
}