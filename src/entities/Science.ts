import { Research } from '@/entities/Research'

export class Science extends Research {

expand: number;

constructor(key: string, label: string, icon: Object, color: string, speed: number, expand: number) {
    super(key, label, icon, color, speed);
    this.expand = expand;
  }
}
