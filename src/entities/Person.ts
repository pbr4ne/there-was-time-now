import { Science } from '@/entities/Science'
import { Engineering } from '@/entities/Engineering'
import { Timeline } from '@/entities/Timeline'

export class Person {
  key: String;
  name: String;
  year: Number;
  scienceList: Array<Science>;
  engineeringList: Array<Engineering>;
  devicesList: Array<Object>;
  isUnlocked: Boolean;
  timeline: Array<Timeline>;

  constructor(key: String, name: String, year: Number, scienceList: Array<Science>, 
    engineeringList: Array<Engineering>, deviceList: Array<Object>, isUnlocked: Boolean) {
    this.key = key;
    this.name = name;
    this.year = year;

    this.scienceList = scienceList;
    this.engineeringList = engineeringList;
    this.devicesList = deviceList;

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
