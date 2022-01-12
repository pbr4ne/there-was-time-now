import { Unlockable } from '@/entities/Unlockable'
import { PersonKey, ResearchKey } from '@/enum/Enums'

export class Research extends Unlockable {
  key: ResearchKey;
  label: string;
  icon: object;
  color: string;
  speed: number;
  expand: number;
  price: number;
  workerCost: number;
  isDevice: boolean;
  personKey: PersonKey;

  total: number = 0;
  current: number = 0;
  isIncrementing: boolean = false;
  numWorkers: number = 0;
  researchRequirementList: Array<ResearchRequirement> = new Array<ResearchRequirement>();

  constructor(key: ResearchKey, label: string, icon: object, color: string, speed: number, expand: number, price: number, workerCost: number, isDevice: boolean, personKey: PersonKey) {
    super();
    this.key = key;
    this.label = label;
    this.icon = icon;
    this.color = color;
    this.speed = speed;
    this.expand = expand;
    this.price = price;
    this.workerCost = workerCost;
    this.isDevice = isDevice;
    this.personKey = personKey;
  }
}

export class ResearchRequirement {
  researchKey: ResearchKey;
  quantity: number;

  constructor(researchKey: ResearchKey, quantity: number) {
    this.researchKey = researchKey;
    this.quantity = quantity;
  }
}
