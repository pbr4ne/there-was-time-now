import { Unlock } from '@/entities/Unlock'

export class Research {
  label: string;
  icon: object;
  color: string;
  speed: number;

  isUnlocked: boolean = false;
  total: number = 0;
  current: number = 0;
  isIncrementing: boolean = false;

  unlocks: Array<Unlock> = new Array<Unlock>();

  constructor(label: string, icon: object, color: string, speed: number) {
    this.label = label;
    this.icon = icon;
    this.color = color;
    this.speed = speed;
  }
}
