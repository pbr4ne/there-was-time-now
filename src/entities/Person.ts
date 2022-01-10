import { Device } from '@/entities/Device'
import { Science } from '@/entities/Science'
import { Message } from '@/entities/Message'

export class Person {
  //todo - do i even need this field
  key: string;
  name: string;
  year: number;
  scienceList: Array<Science> = new Array<Science>();
  deviceList: Array<Device> = new Array<Device>();
  isUnlocked: boolean = false;
  messageList: Array<Message> = new Array<Message>();
  workerTitle: string;

  constructor(key: string, name: string, year: number, workerTitle: string,) {
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
