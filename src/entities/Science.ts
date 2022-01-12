import { Research } from '@/entities/Research'
import { ResearchKey } from '@/enum/Enums'

export class Science extends Research {

expand: number;

constructor(key: ResearchKey, label: string, icon: Object, color: string, speed: number, expand: number) {
    super(key, label, icon, color, speed);
    this.expand = expand;
  }
}
