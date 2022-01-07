import { Message } from '@/entities/Message'

export class Unlock {
  //type of thing to unlock
  type: string;
  //key of thing to unlock
  key: string;
  //person that this unlock applies to (e.g. the message should show up in)
  person: string;
  //threshold that the parent research needs to reach
  threshold: Number;
  //message to display
  message: Message;

  constructor(type: string, key: string, person: string, threshold: Number, message: Message) {
    this.type = type;
    this.key = key;
    this.person = person;
    this.threshold = threshold;
    this.message = message;
  }
}