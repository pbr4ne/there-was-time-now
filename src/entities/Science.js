import { Research } from './Research'

export class Science extends Research {
  constructor(key, label, icon, color, isUnlocked, unlocks) {
    super(key, label, icon, color, isUnlocked, unlocks);
  }
}

