import { Message } from '@/entities/Message'

export class Unlock {
  type: string;
  key: string;
  person: string;
  threshold: Number;
  message: Message;

  constructor(type: string, key: string, person: string, threshold: Number, message: Message) {
    this.type = type;
    this.key = key;
    this.person = person;
    this.threshold = threshold;
    this.message = message;
  }
}