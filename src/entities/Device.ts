import { Research } from '@/entities/Research'
import { Unlock } from '@/entities/Unlock'

export class Device extends Research {

constructor(label: string, icon: Object, color: string, 
    isUnlocked: Boolean, unlocks: Array<Unlock>) {

    super(label, icon, color, isUnlocked, unlocks);
  }
}
