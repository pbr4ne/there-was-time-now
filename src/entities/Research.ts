import { Unlockable } from '@/entities/Unlockable'
import { ResearchKey } from '@/enum/Enums'

export class Research extends Unlockable {
  key: ResearchKey;
  label: string;
  icon: object;
  color: string;
  speed: number;
  expand: number;
  isDevice: boolean;

  total: number = 0;
  current: number = 0;
  isIncrementing: boolean = false;
  numWorkers: number = 0;
  cost: number = 5; //todo - make configurable
  workerCost: number = 5; //todo - make configurable

  constructor(key: ResearchKey, label: string, icon: object, color: string, speed: number, expand: number, isDevice: boolean) {
    super();
    this.key = key;
    this.label = label;
    this.icon = icon;
    this.color = color;
    this.speed = speed;
    this.expand = expand;
    this.isDevice = isDevice;
  }
}
