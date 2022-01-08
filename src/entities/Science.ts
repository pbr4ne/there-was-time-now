import { Research } from '@/entities/Research'

export class Science extends Research {

constructor(label: string, icon: Object, color: string, speed: number) {

    super(label, icon, color, speed);
  }
}
