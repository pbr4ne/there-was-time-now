import { Unlock } from '@/entities/Unlock'

export class Research {
  label: string;
  icon: object;
  color: string;
  isUnlocked: boolean = false;

  total: number;
  current: number;
  isIncrementing: boolean;

  unlocks: Array<Unlock> = new Array<Unlock>();

  constructor(label: string, icon: object, color: string) {
    this.label = label;
    this.icon = icon;
    this.color = color;

    this.total = 0;
    this.current = 0;
    this.isIncrementing = false;
  }
}
