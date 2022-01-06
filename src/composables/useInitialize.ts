import { reactive, shallowRef } from 'vue'

import { Person } from '@/entities/Person'
import { Science } from '@/entities/Science'
import { Timeline } from '@/entities/Timeline'

import {
  Chip as QuantumComputingIcon
} from '@vicons/carbon'

import {
  AnimalTurtle16Regular as BiologyIcon,
} from '@vicons/fluent'

import {
  ComputerOutlined as QuantumComputerIcon
} from '@vicons/material'

import {
  Atom as QuantumPhysicsIcon,
} from '@vicons/tabler'

import { EngineeringKey, PersonKey, ScienceKey, UnlockKey } from '@/enum/Constants'
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
      new Unlock(UnlockKey.PERSON, PersonKey.LENNOX_YOUNG, 'lennox-young', 1, 
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
    //no unlocks
    [],
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
    [],
   ),
});

const personList = reactive([
  new Person(
    PersonKey.LENNOX_OLD, 
    'Lennox (1984)', 
    1984, 
    [
      scienceList[ScienceKey.QUANTUM_MECHANICS] as Science,
      scienceList[ScienceKey.QUANTUM_COMPUTING] as Science,
    ],
    [],
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
    personList,
    scienceList,
    engineeringList,
  }
}