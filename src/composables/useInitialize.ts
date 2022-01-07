import { reactive, shallowRef } from 'vue'

import {
  Chip as QuantumComputingIcon,
  Dna as BiologyIcon
} from '@vicons/carbon'

import {
  GemRegular as CrystalSarcophagusIcon,
} from '@vicons/fa'

import {
} from '@vicons/fluent'

import {
  FlaskOutline as ChemistryIcon,
} from '@vicons/ionicons5'

import {
  ComputerOutlined as QuantumComputerIcon
} from '@vicons/material'

import {
  Atom as QuantumPhysicsIcon,
} from '@vicons/tabler'

import { Device } from '@/entities/Device'
import { Engineering } from '@/entities/Engineering'
import { Person } from '@/entities/Person'
import { Science } from '@/entities/Science'
import { Message } from '@/entities/Message'
import { Unlock } from '@/entities/Unlock'
import { GameConstants } from '@/enum/Constants'
import { 
  DeviceKey, 
  EngineeringKey, 
  PersonKey, 
  ScienceKey, 
  UnlockKey
} from '@/enum/Enums'

const scienceList : any = reactive({
  [ScienceKey.QUANTUM_MECHANICS]: new Science(
    'Quantum Mechanics', 
    shallowRef(QuantumPhysicsIcon), 
    '#B10DC9', 
    //quantum mechanics unlocks young lennox
    //todo - this is a lot of redundant cruft
    [
      new Unlock(UnlockKey.PERSON, PersonKey.LENNOX_YOUNG, PersonKey.LENNOX_YOUNG, 1, 
        new Message('Young Lennox Unlocked', 
        'I am Lennox - an inventor. The year is 1934.')),
      new Unlock(UnlockKey.SCIENCE, ScienceKey.BIOLOGY, PersonKey.LENNOX_YOUNG, 1, 
        null!),
    ],
  ),

  [ScienceKey.QUANTUM_COMPUTING]: new Science(
    'Quantum Computing', 
    shallowRef(QuantumComputingIcon), 
    '#39CCCC', 
    //quantum computing unlocks quantum computers
    [
      new Unlock(UnlockKey.ENGINEERING, EngineeringKey.QUANTUM_COMPUTER, PersonKey.LENNOX_OLD, 1,
        new Message('Quantum Computer Unlocked',
        'You can now build Quantum Computers.'))
    ],
  ),

  [ScienceKey.BIOLOGY]: new Science(
    'Biology', 
    shallowRef(BiologyIcon), 
    '#F012BE', 
    //biology unlocks quantum computing
    [
      new Unlock(UnlockKey.SCIENCE, ScienceKey.QUANTUM_COMPUTING, PersonKey.LENNOX_OLD, 1,
        new Message('Quantum Computing unlocked', 
        'You can now research Quantum Computing.'))
    ],
  ),

  [ScienceKey.CHEMISTRY]: new Science(
    'Chemistry', 
    shallowRef(ChemistryIcon), 
    '#FF4136', 
    //biology unlocks quantum computing
    [
      new Unlock(UnlockKey.DEVICE, DeviceKey.CRYSTAL_SARCOPHAGUS, PersonKey.LENNOX_OLD, 1,
        new Message('Crystal Sarcophagus unlocked',
        'You can now build the Crystal Sarcophagus.')),
    ],
  ),
});

const engineeringList : any = reactive({
  [EngineeringKey.QUANTUM_COMPUTER]: new Engineering(
    'Quantum Computer',
    shallowRef(QuantumComputerIcon),
    '#01FF70',
    //no unlocks
    [
      new Unlock(UnlockKey.SCIENCE, ScienceKey.CHEMISTRY, PersonKey.LENNOX_YOUNG, 1,
        new Message('Chemistry unlocked',
        'You can now research Chemistry.')),
    //   new Unlock(UnlockKey.MESSAGE, PersonKey.LENNOX_OLD, PersonKey.LENNOX_OLD, 5,
    //     new Message('Whoaaaa',
    //     'Quantum Computer: Beep Boop. Detecting timelines. ALERT. ALERT. YOUR QUANTUM REALITY HAS SKEWED INTO A TANGENT. TIME IS ENDING. DOOMSDAY IMMINENT.'))
    ],
   ),
});

const deviceList : any = reactive({
  [DeviceKey.CRYSTAL_SARCOPHAGUS]: new Device(
    'Crystal Sarcophagus',
    shallowRef(CrystalSarcophagusIcon),
    '#FFDC00',
    //no unlocks
    [],
  ),
});

const researchList : any = reactive({
  ...scienceList,
  ...engineeringList,
  ...deviceList,
})

const personList:Person[] = reactive([
  new Person(
    PersonKey.LENNOX_OLD, 
    'Lennox (1984)', 
    1984, 
    [
      scienceList[ScienceKey.QUANTUM_MECHANICS] as Science,
      scienceList[ScienceKey.QUANTUM_COMPUTING] as Science,
    ],
    [
      engineeringList[EngineeringKey.QUANTUM_COMPUTER] as Engineering,
    ],
    [
      deviceList[DeviceKey.CRYSTAL_SARCOPHAGUS] as Device,
    ],
  ),

  new Person(
    PersonKey.LENNOX_YOUNG,
    'Lennox (1934)',
    1934,
    [
      scienceList[ScienceKey.BIOLOGY] as Science,
      scienceList[ScienceKey.CHEMISTRY] as Science,
    ],
    [],
    [],
  ),
]);

export default function useInitialize() {

  scienceList[ScienceKey.QUANTUM_MECHANICS].isUnlocked = true;
  personList[0].isUnlocked = true;

  //todo - remove this later
  if(GameConstants.UNLOCK_ALL) {
    personList.forEach(person => person.isUnlocked = true);
    for(const research in researchList) {
      researchList[research].isUnlocked = true;
    }
  }

  return {
    deviceList,
    engineeringList,
    personList,
    researchList,
    scienceList,
  }
}