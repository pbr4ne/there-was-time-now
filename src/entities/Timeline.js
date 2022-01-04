import { scienceList } from './Science'

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

//todo - eh find a better way to associate the sciences
export let timelineList = [
  new Timeline(
    'lennox-old', 
    'Lennox', 
    1984, 
    [scienceList.find(science => science.key === 'quantum-mechanics')],
    [],
    [],
    true,
  ),

  new Timeline(
    'lennox-young',
    'Lennox2',
    1934,
    [scienceList.find(science => science.key === 'biology')],
    [],
    [],
    false,
  ),
]