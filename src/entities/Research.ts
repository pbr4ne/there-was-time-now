import { Unlock } from '@/entities/Unlock'

export class Research {
  //todo - do i even need this field
  key: string;
  label: string;
  icon: Object;
  color: string;
  isUnlocked: Boolean;

  unlocks: Array<Unlock>;
  total: Number;
  current: Number;
  isIncrementing: Boolean;

  constructor(key: string, label: string, icon: Object, color: string, 
    isUnlocked: Boolean, unlocks: Array<Unlock>) {
    this.key = key;
    this.label = label;
    this.icon = icon;
    this.color = color;
    this.isUnlocked = isUnlocked;
    this.unlocks = unlocks;

    this.total = 0;
    this.current = 0;
    this.isIncrementing = false;
  }
}
