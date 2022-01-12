import { Research } from '@/entities/Research'
import { ResearchKey } from '@/enum/Enums'

export class Device extends Research {

  cost: any;

  constructor(key: ResearchKey, label: string, icon: Object, color: string, speed: number, cost: any) {
    super(key, label, icon, color, speed);
    this.cost = cost;
  }
}
