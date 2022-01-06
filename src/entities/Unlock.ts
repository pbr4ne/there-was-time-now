import { Timeline } from '@/entities/Timeline'

export class Unlock {
  type: String;
  key: String;
  person: String;
  threshold: Number;
  message: Timeline;

  constructor(type: String, key: String, person: String, threshold: Number, message: Timeline) {
    this.type = type;
    this.key = key;
    this.person = person;
    this.threshold = threshold;
    this.message = message;
  }
}