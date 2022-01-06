import { Research } from '@/entities/Research'
import { Unlock } from '@/entities/Unlock'

export class Engineering extends Research {

constructor(key: string, label: string, icon: Object, color: string, 
    isUnlocked: Boolean, unlocks: Array<Unlock>) {

    super(key, label, icon, color, isUnlocked, unlocks);
  }
}
