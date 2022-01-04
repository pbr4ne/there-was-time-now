export class Timeline {
  constructor(key, personName, year, scienceList, engineeringList, deviceList, isUnlocked) {
    this.key = key;
    this.personName = personName;
    this.year = year;
    this.isUnlocked = isUnlocked;

    this.scienceList = scienceList;
    this.engineeringList = engineeringList;
    this.devicesList = deviceList;
  }
}
