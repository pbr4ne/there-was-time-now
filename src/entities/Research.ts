import { Unlock } from '@/entities/Unlock'

export class Research {
  key: string;
  label: string;
  icon: object;
  color: string;
  speed: number;

  isUnlocked: boolean = false;
  total: number = 0;
  current: number = 0;
  isIncrementing: boolean = false;
  numWorkers: number = 0;
  cost: number = 5; //todo - make configurable
  workerCost: number = 5; //todo - make configurable

  unlocks: Array<Unlock> = new Array<Unlock>();

  constructor(key: string, label: string, icon: object, color: string, speed: number) {
    this.key = key;
    this.label = label;
    this.icon = icon;
    this.color = color;
    this.speed = speed;
  }
}
