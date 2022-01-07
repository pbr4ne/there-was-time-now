import { Device } from '@/entities/Device'
import { Engineering } from '@/entities/Engineering'
import { Science } from '@/entities/Science'
import { Message } from '@/entities/Message'

export class Person {
  //todo - do i even need this field
  key: string;
  name: string;
  year: number;
  scienceList: Array<Science> = new Array<Science>();
  engineeringList: Array<Engineering> = new Array<Engineering>();
  deviceList: Array<Device> = new Array<Device>();
  isUnlocked: boolean = false;
  messageList: Array<Message> = new Array<Message>();

  constructor(key: string, name: string, year: number) {
    this.key = key;
    this.name = name;
    this.year = year;
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
