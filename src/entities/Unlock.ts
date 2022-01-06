import { Timeline } from '@/entities/Timeline'

export class Unlock {
  type: string;
  key: string;
  person: string;
  threshold: Number;
  message: Timeline;

  constructor(type: string, key: string, person: string, threshold: Number, message: Timeline) {
    this.type = type;
    this.key = key;
    this.person = person;
    this.threshold = threshold;
    this.message = message;
  }
}