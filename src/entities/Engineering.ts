import { Research } from '@/entities/Research'
import { Unlock } from '@/entities/Unlock'

export class Engineering extends Research {

constructor(key: String, label: String, icon: Object, color: String, 
    isUnlocked: Boolean, unlocks: Array<Unlock>) {

    super(key, label, icon, color, isUnlocked, unlocks);
  }
}
