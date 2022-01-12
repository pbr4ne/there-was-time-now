import { Unlock } from '@/entities/Unlock'
import { ResearchKey } from '@/enum/Enums'

export class Research {
  key: ResearchKey;
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

  unlockedBy: string = null!;
  unlockThreshold: number = 0;
  // unlocks: Array<Unlock> = new Array<Unlock>();

  constructor(key: ResearchKey, label: string, icon: object, color: string, speed: number) {
    this.key = key;
    this.label = label;
    this.icon = icon;
    this.color = color;
    this.speed = speed;
  }

  setUnlock(unlockedBy: string, unlockThreshold: number) {
    this.unlockedBy = unlockedBy;
    this.unlockThreshold = unlockThreshold;
  }

}
