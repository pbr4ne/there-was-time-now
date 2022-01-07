import { Device } from '@/entities/Device'
import { Engineering } from '@/entities/Engineering'
import { Science } from '@/entities/Science'
import { Timeline } from '@/entities/Timeline'

export class Person {
  //todo - do i even need this field
  key: string;
  name: string;
  year: Number;
  scienceList: Array<Science>;
  engineeringList: Array<Engineering>;
  deviceList: Array<Device>;
  isUnlocked: Boolean;
  timeline: Array<Timeline>;

  constructor(key: string, name: string, year: Number, scienceList: Array<Science>, 
    engineeringList: Array<Engineering>, deviceList: Array<Device>, isUnlocked: Boolean) {
    this.key = key;
    this.name = name;
    this.year = year;

    this.scienceList = scienceList;
    this.engineeringList = engineeringList;
    this.deviceList = deviceList;

    this.isUnlocked = isUnlocked;

    this.timeline = new Array<Timeline>();
  }

  numUnread() {
    let count = 0;
    this.timeline.forEach(t => {
      if(!t.isRead) {
        count++;
      }
    });
    return count;
  }

  markRead() {
    this.timeline.forEach(t => {t.isRead = true;});
  }
}
