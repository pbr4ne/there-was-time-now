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

const personList : any = reactive({
  [PersonKey.LENNOX_OLD]: new Person(PersonKey.LENNOX_OLD, 'Lennox (1984)', 1984),
  [PersonKey.LENNOX_YOUNG]: new Person(PersonKey.LENNOX_YOUNG, 'Lennox (1934)', 1934),
});

const scienceList : any = reactive({
  [ScienceKey.QUANTUM_MECHANICS]: new Science('Quantum Mechanics', shallowRef(QuantumPhysicsIcon), '#B10DC9', 10),
  [ScienceKey.QUANTUM_COMPUTING]: new Science('Quantum Computing', shallowRef(QuantumComputingIcon), '#39CCCC', 5),
  // [ScienceKey.BIOLOGY]: new Science('Biology', shallowRef(BiologyIcon), '#F012BE'),
  // [ScienceKey.CHEMISTRY]: new Science('Chemistry', shallowRef(ChemistryIcon), '#FF4136'),
});

const engineeringList : any = reactive({
  [EngineeringKey.QUANTUM_COMPUTER]: new Engineering('Quantum Computer', shallowRef(QuantumComputerIcon), '#01FF70', 0.5),
});

const deviceList : any = reactive({
  [DeviceKey.CRYSTAL_SARCOPHAGUS]: new Device('Crystal Sarcophagus', shallowRef(CrystalSarcophagusIcon), '#FFDC00', 0.25),
});

const researchList : any = reactive({
  ...scienceList,
  ...engineeringList,
  ...deviceList,
})

function associateUnlocksToResearch() {
  //quantum mechanics unlocks young lennox
  // scienceList[ScienceKey.QUANTUM_MECHANICS].unlocks.push(new Unlock(UnlockKey.PERSON, PersonKey.LENNOX_YOUNG, PersonKey.LENNOX_YOUNG, 1, 
  //   new Message('Young Lennox Unlocked', 'I am Lennox - an inventor. The year is 1934.')));
  //quantum mechanics unlocks young lennox's first science (biology)
  //scienceList[ScienceKey.QUANTUM_MECHANICS].unlocks.push(new Unlock(UnlockKey.SCIENCE, ScienceKey.BIOLOGY, PersonKey.LENNOX_YOUNG, 1, null!));

  // scienceList[ScienceKey.QUANTUM_MECHANICS].unlocks.push(new Unlock(UnlockKey.MESSAGE, PersonKey.LENNOX_OLD, PersonKey.LENNOX_OLD, 2,
  //   new Message('Testing Message', 'Testing Message')));

  scienceList[ScienceKey.QUANTUM_MECHANICS].unlocks.push(new Unlock(UnlockKey.SCIENCE, ScienceKey.QUANTUM_COMPUTING, PersonKey.LENNOX_OLD, 1,
  new Message('Quantum Computing Unlocked', 'You can now research Quantum Computing.')));

  //quantum computing unlocks quantum computer
  scienceList[ScienceKey.QUANTUM_COMPUTING].unlocks.push(new Unlock(UnlockKey.ENGINEERING, EngineeringKey.QUANTUM_COMPUTER, PersonKey.LENNOX_OLD, 1,
    new Message('Quantum Computer Unlocked', 'You can now build Quantum Computers.')));
  
  //biology unlocks quantum computing
  // scienceList[ScienceKey.BIOLOGY].unlocks.push(new Unlock(UnlockKey.SCIENCE, ScienceKey.QUANTUM_COMPUTING, PersonKey.LENNOX_OLD, 1,
  //   new Message('Quantum Computing unlocked', 'You can now research Quantum Computing.')));

  //quantum computer unlocks crystal sarcophagus
  engineeringList[EngineeringKey.QUANTUM_COMPUTER].unlocks.push(new Unlock(UnlockKey.DEVICE, DeviceKey.CRYSTAL_SARCOPHAGUS, PersonKey.LENNOX_OLD, 1,
    new Message('Crystal Sarcophagus Unlocked', 'You can now construct the Crystal Sarcophagus.')));

  //quantum computer unlocks chemistry
  // engineeringList[EngineeringKey.QUANTUM_COMPUTER].unlocks.push(new Unlock(UnlockKey.SCIENCE, ScienceKey.CHEMISTRY, PersonKey.LENNOX_YOUNG, 1,
  //   new Message('Chemistry unlocked', 'You can now research Chemistry.')));
}

function associateResearchToPeople() {
  personList[PersonKey.LENNOX_OLD].scienceList.push(scienceList[ScienceKey.QUANTUM_MECHANICS] as Science);
  personList[PersonKey.LENNOX_OLD].scienceList.push(scienceList[ScienceKey.QUANTUM_COMPUTING] as Science);
  personList[PersonKey.LENNOX_OLD].engineeringList.push(engineeringList[EngineeringKey.QUANTUM_COMPUTER] as Engineering);
  personList[PersonKey.LENNOX_OLD].deviceList.push(deviceList[DeviceKey.CRYSTAL_SARCOPHAGUS] as Device);
  
  personList[PersonKey.LENNOX_YOUNG].scienceList.push(scienceList[ScienceKey.BIOLOGY] as Science);
  personList[PersonKey.LENNOX_YOUNG].scienceList.push(scienceList[ScienceKey.CHEMISTRY] as Science);
}

associateResearchToPeople();
associateUnlocksToResearch();

export default function useInitialize() {

  scienceList[ScienceKey.QUANTUM_MECHANICS].isUnlocked = true;
  personList[PersonKey.LENNOX_OLD].isUnlocked = true;

  //todo - remove this later
  if(GameConstants.UNLOCK_ALL) {
    for(const person in personList) {
      personList[person].isUnlocked = true;
    }
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