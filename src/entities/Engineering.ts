import { Research } from '@/entities/Research'

export class Engineering extends Research {

  expand: number;

  constructor(label: string, icon: Object, color: string, speed: number, expand: number) {
    super(label, icon, color, speed);
    this.expand = expand;
  }
}
