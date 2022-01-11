export class GameStateScience {
  key: string;
  isUnlocked: boolean;
  total: number;
  current: number;
  numWorkers: number;

  constructor(key: string, isUnlocked: boolean, total: number, current: number, numWorkers: number) {
    this.key = key;
    this.isUnlocked = isUnlocked;
    this.total = total;
    this.current = current;
    this.numWorkers = numWorkers;
  }
}