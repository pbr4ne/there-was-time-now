export class Person {
  constructor(key, name, year, scienceList, engineeringList, deviceList, isUnlocked) {
    this.key = key;
    this.name = name;
    this.year = year;

    this.scienceList = scienceList;
    this.engineeringList = engineeringList;
    this.devicesList = deviceList;

    this.isUnlocked = isUnlocked;

    this.timeline = [];
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
