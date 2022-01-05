export class Person {
  constructor(key, personName, year, scienceList, engineeringList, deviceList, isUnlocked) {
    this.key = key;
    this.personName = personName;
    this.year = year;

    this.scienceList = scienceList;
    this.engineeringList = engineeringList;
    this.devicesList = deviceList;

    this.isUnlocked = isUnlocked;

    this.timeline = [];
  }
}
