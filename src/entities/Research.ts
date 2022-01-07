import { Unlock } from '@/entities/Unlock'

export class Research {
  //todo - do i even need this field
  label: string;
  icon: object;
  color: string;
  isUnlocked: boolean = false;

  unlocks: Array<Unlock>;
  total: number;
  current: number;
  isIncrementing: boolean;

  constructor(label: string, icon: object, color: string, unlocks: Array<Unlock>) {
    this.label = label;
    this.icon = icon;
    this.color = color;
    this.unlocks = unlocks;

    this.total = 0;
    this.current = 0;
    this.isIncrementing = false;
  }
}
