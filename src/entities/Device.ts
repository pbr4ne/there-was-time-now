import { Research } from '@/entities/Research'

export class Device extends Research {

  cost: any;

  constructor(key: string, label: string, icon: Object, color: string, speed: number, cost: any) {
    super(key, label, icon, color, speed);
    this.cost = cost;
  }
}
