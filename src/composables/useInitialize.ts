import { reactive, shallowRef } from 'vue'

import { Device } from '@/entities/Device'
import { Engineering } from '@/entities/Engineering'
import { Person } from '@/entities/Person'
import { Science } from '@/entities/Science'
import { Timeline } from '@/entities/Timeline'

import {
  Chip as QuantumComputingIcon
} from '@vicons/carbon'

import {
  GemRegular as CrystalSarcophagusIcon,
} from '@vicons/fa'

import {
  AnimalTurtle16Regular as BiologyIcon,
} from '@vicons/fluent'

import {
  ComputerOutlined as QuantumComputerIcon
} from '@vicons/material'

import {
  Atom as QuantumPhysicsIcon,
} from '@vicons/tabler'

import { DeviceKey, EngineeringKey, PersonKey, ScienceKey, UnlockKey } from '@/enum/Constants'
import { Unlock } from '@/entities/Unlock'

const scienceList : any = reactive({
  [ScienceKey.QUANTUM_MECHANICS]: new Science(
    ScienceKey.QUANTUM_MECHANICS, 
    'Quantum Mechanics', 
    shallowRef(QuantumPhysicsIcon), 
    '#B10DC9', 
    true,
    //quantum mechanics unlocks young lennox
    //todo - this is a lot of redundant cruft
    [
      new Unlock(UnlockKey.PERSON, PersonKey.LENNOX_YOUNG, PersonKey.LENNOX_YOUNG, 1, 
        new Timeline(PersonKey.LENNOX_YOUNG, 'lennox-young-1', 'Young Lennox Unlocked', 
        'I am Lennox - an inventor. The year is 1934.',  '1934-04-01 05:31:00', false))
    ],
  ),

  [ScienceKey.QUANTUM_COMPUTING]: new Science(
    ScienceKey.QUANTUM_COMPUTING, 
    'Quantum Computing', 
    shallowRef(QuantumComputingIcon), 
    '#39CCCC', 
    false,
    //quantum computing unlocks quantum computers
    [
      new Unlock(UnlockKey.ENGINEERING, EngineeringKey.QUANTUM_COMPUTER, PersonKey.LENNOX_OLD, 1,
        new Timeline(PersonKey.LENNOX_OLD, 'lennox-old-3', 'Quantum Computer Unlocked',
        'You can now build Quantum Computers.', '1984-06-23 18:04:00', false))
    ],
  ),

  [ScienceKey.BIOLOGY]: new Science(
    ScienceKey.BIOLOGY, 
    'Biology', 
    shallowRef(BiologyIcon), 
    '#F012BE', 
    true,
    //biology unlocks quantum computing
    [
      new Unlock(UnlockKey.SCIENCE, ScienceKey.QUANTUM_COMPUTING, PersonKey.LENNOX_OLD, 1,
        new Timeline(PersonKey.LENNOX_OLD,'lennox-old-2','Quantum Computing unlocked', 
        'You can now research Quantum Computing.','1984-05-01 06:42:00', false))
    ],
  ),
});

const engineeringList : any = reactive({
  [EngineeringKey.QUANTUM_COMPUTER]: new Science(
    EngineeringKey.QUANTUM_COMPUTER,
    'Quantum Computer',
    shallowRef(QuantumComputerIcon),
    '#01FF70',
    false,
    //no unlocks
    [
      new Unlock(UnlockKey.DEVICE, DeviceKey.CRYSTAL_SARCOPHAGUS, PersonKey.LENNOX_OLD, 1,
        new Timeline(PersonKey.LENNOX_OLD, 'lennox-old-4', 'Crystal Sarcophagus unlocked',
        'You can now build the Crystal Sarcophagus.', '1984-07-15 11:11:00', false))
    ],
   ),
});

const deviceList : any = reactive({
  [DeviceKey.CRYSTAL_SARCOPHAGUS]: new Device(
    DeviceKey.CRYSTAL_SARCOPHAGUS,
    'Crystal Sarcophagus',
    shallowRef(CrystalSarcophagusIcon),
    '#7FDBFF',
    false,
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
    [],
    true,
  ),

  new Person(
    PersonKey.LENNOX_YOUNG,
    'Lennox (1934)',
    1934,
    [
      scienceList[ScienceKey.BIOLOGY] as Science
    ],
    [],
    [],
    false,
  ),
]);

export default function useInitialize() {
  return {
    deviceList,
    engineeringList,
    personList,
    researchList,
    scienceList,
  }
}