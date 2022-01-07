import { Research } from '@/entities/Research'
import { Unlock } from '@/entities/Unlock'

export class Science extends Research {

constructor(label: string, icon: Object, color: string, unlocks: Array<Unlock>) {

    super(label, icon, color, unlocks);
  }
}
