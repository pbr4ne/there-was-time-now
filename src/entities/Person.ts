import { Message } from '@/entities/Message'
import { Unlockable } from '@/entities/Unlockable'

export class Person extends Unlockable {
  key: string;
  name: string;
  year: number;
  messageList: Array<Message> = new Array<Message>();
  workerTitle: string;

  constructor(key: string, name: string, year: number, workerTitle: string,) {
    super();
    this.key = key;
    this.name = name;
    this.year = year;
    this.workerTitle = workerTitle;
  }

  numUnread() {
    let count = 0;
    this.messageList.forEach(t => {
      if(!t.isRead) {
        count++;
      }
    });
    return count;
  }

  markRead() {
    this.messageList.forEach(t => {t.isRead = true;});
  }
}
