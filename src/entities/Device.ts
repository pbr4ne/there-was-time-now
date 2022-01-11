import { Research } from '@/entities/Research'

export class Device extends Research {

  cost: any;

  constructor(label: string, icon: Object, color: string, speed: number, cost: any) {
    super(label, icon, color, speed);
    this.cost = cost;
  }
}
