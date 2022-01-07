import { Device } from '@/entities/Device'
import { Engineering } from '@/entities/Engineering'
import { Science } from '@/entities/Science'
import { Message } from '@/entities/Message'

export class Person {
  //todo - do i even need this field
  key: string;
  name: string;
  year: number;
  scienceList: Array<Science>;
  engineeringList: Array<Engineering>;
  deviceList: Array<Device>;
  isUnlocked: Boolean;
  messageList: Array<Message>;

  constructor(key: string, name: string, year: number, scienceList: Array<Science>, 
    engineeringList: Array<Engineering>, deviceList: Array<Device>, isUnlocked: Boolean) {
    this.key = key;
    this.name = name;
    this.year = year;

    this.scienceList = scienceList;
    this.engineeringList = engineeringList;
    this.deviceList = deviceList;

    this.isUnlocked = isUnlocked;

    this.messageList = new Array<Message>();
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
