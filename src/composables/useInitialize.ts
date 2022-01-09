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
  FlaskOutline as AlchemyIcon,
} from '@vicons/ionicons5'

import {
  ComputerOutlined as QuantumComputerIcon
} from '@vicons/material'

import {
  Atom as PhysicsIcon,
  CircleX as DefaultIcon,
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
  [PersonKey.SAMA]: new Person(PersonKey.SAMA, 'Sama (904)', 904),
  [PersonKey.ITOTIA]: new Person(PersonKey.ITOTIA, 'Itotia (374)', 374),
  [PersonKey.NECHTAN]: new Person(PersonKey.NECHTAN, 'Nechtan (2524 BC)', 0), //todo - deal with year
});

const scienceList : any = reactive({
  [ScienceKey.PHYSICS]: new Science('Physics', shallowRef(PhysicsIcon), '#B10DC9', 10),
  [ScienceKey.QUANTUM_COMPUTING]: new Science('Quantum Computing', shallowRef(QuantumComputingIcon), '#39CCCC', 5),

  [ScienceKey.BIOLOGY]: new Science('Biology', shallowRef(BiologyIcon), '#F012BE', 10),
  [ScienceKey.GENETIC_MEMORY]: new Science('Genetic Memory', shallowRef(DefaultIcon), '#FFFFFF', 5),

  [ScienceKey.ALCHEMY]: new Science('Alchemy', shallowRef(AlchemyIcon), '#FF4136', 10),
  [ScienceKey.CHRONOMOGRIFICATION]: new Science('Chronomogrification', shallowRef(DefaultIcon), '#FFFFFF', 5),

  [ScienceKey.MATHEMATICS]: new Science('Mathematics', shallowRef(DefaultIcon), '#FFFFFF', 10),
  [ScienceKey.TIMELESS_ALGEBRA]: new Science('Timeless Algebra', shallowRef(DefaultIcon), '#FFFFFF', 5),

  [ScienceKey.ASTRONOMY]: new Science('Astronomy', shallowRef(DefaultIcon), '#FFFFFF', 10),
  [ScienceKey.AETHERIC_HOROSCOPES]: new Science('Aetheric Horoscopes', shallowRef(DefaultIcon), '#FFFFFF', 5),
});

const engineeringList : any = reactive({
  [EngineeringKey.QUANTUM_COMPUTER]: new Engineering('Quantum Computer', shallowRef(QuantumComputerIcon), '#01FF70', 0.5, 1.1),
  [EngineeringKey.CHRONOCRYSTALS]: new Engineering('Chronocrystals', shallowRef(DefaultIcon), '#FFFFFF', 0.5, 1),

  [EngineeringKey.TELOMERE_STRETCHER]: new Engineering('Telomere Stretcher', shallowRef(DefaultIcon), '#FFFFFF', 0.5, 1.1),
  [EngineeringKey.THE_FLUID]: new Engineering('The Fluid', shallowRef(DefaultIcon), '#FFFFFF', 0.5, 1),

  [EngineeringKey.DISTILLER]: new Engineering('Distiller', shallowRef(DefaultIcon), '#FFFFFF', 0.5, 1.1),
  [EngineeringKey.ELEMENT_ZERO]: new Engineering('Element Zero', shallowRef(DefaultIcon), '#FFFFFF', 0.5, 1),

  [EngineeringKey.NEPOHUALTZINTZIN]: new Engineering('Nepohualtzintzin', shallowRef(DefaultIcon), '#FFFFFF', 0.5, 1.1),
  [EngineeringKey.OBSIDIAN]: new Engineering('Obsidian', shallowRef(DefaultIcon), '#FFFFFF', 0.5, 1),

  [EngineeringKey.ZODIAC_TALISMAN]: new Engineering('Zodiac Talisman', shallowRef(DefaultIcon), '#FFFFFF', 0.5, 1.1),
  [EngineeringKey.SARSEN_STONES]: new Engineering('Sarsen Stones', shallowRef(DefaultIcon), '#FFFFFF', 0.5, 1),
});

const deviceList : any = reactive({
  [DeviceKey.CRYSTAL_SARCOPHAGUS]: new Device('Crystal Sarcophagus', shallowRef(CrystalSarcophagusIcon), '#FFDC00', 0.25),
  [DeviceKey.OMEGAPERSON]: new Device('Omegaperson', shallowRef(DefaultIcon), '#FFFFFF', 0.25),
  [DeviceKey.PHILOSOPHERS_STONE]: new Device('Philosopher\'s Stone', shallowRef(DefaultIcon), '#FFFFFF', 0.25),
  [DeviceKey.TZOLKIN]: new Device('Tzolk\'in', shallowRef(DefaultIcon), '#FFFFFF', 0.25),
  [DeviceKey.TIMEHENGE]: new Device('Timehenge', shallowRef(DefaultIcon), '#FFFFFF', 0.25),
});

const researchList : any = reactive({
  ...scienceList,
  ...engineeringList,
  ...deviceList,
})

function associateUnlocksToResearch() {

  //Lennox (1984)
  scienceList[ScienceKey.PHYSICS].unlocks.push(new Unlock(UnlockKey.SCIENCE, ScienceKey.QUANTUM_COMPUTING, PersonKey.LENNOX_OLD, 10, null!));
  scienceList[ScienceKey.QUANTUM_COMPUTING].unlocks.push(new Unlock(UnlockKey.ENGINEERING, EngineeringKey.QUANTUM_COMPUTER, PersonKey.LENNOX_OLD, 10, null!));
  engineeringList[EngineeringKey.QUANTUM_COMPUTER].unlocks.push(new Unlock(UnlockKey.PERSON, PersonKey.LENNOX_YOUNG, PersonKey.LENNOX_YOUNG, 1, null!));
  engineeringList[EngineeringKey.QUANTUM_COMPUTER].unlocks.push(new Unlock(UnlockKey.SCIENCE, ScienceKey.BIOLOGY, PersonKey.LENNOX_YOUNG, 1, null!));

  //Lennox (1934)
  scienceList[ScienceKey.BIOLOGY].unlocks.push(new Unlock(UnlockKey.SCIENCE, ScienceKey.GENETIC_MEMORY, PersonKey.LENNOX_YOUNG, 10, null!));
  scienceList[ScienceKey.GENETIC_MEMORY].unlocks.push(new Unlock(UnlockKey.ENGINEERING, EngineeringKey.TELOMERE_STRETCHER, PersonKey.LENNOX_YOUNG, 10, null!));
  engineeringList[EngineeringKey.TELOMERE_STRETCHER].unlocks.push(new Unlock(UnlockKey.DEVICE, DeviceKey.CRYSTAL_SARCOPHAGUS, PersonKey.LENNOX_OLD, 10, null!));
  engineeringList[EngineeringKey.TELOMERE_STRETCHER].unlocks.push(new Unlock(UnlockKey.ENGINEERING, EngineeringKey.CHRONOCRYSTALS, PersonKey.LENNOX_OLD, 10, null!));

  //Lennox (1984)
  engineeringList[EngineeringKey.CHRONOCRYSTALS].unlocks.push(new Unlock(UnlockKey.DEVICE, DeviceKey.OMEGAPERSON, PersonKey.LENNOX_YOUNG, 10, null!));
  engineeringList[EngineeringKey.CHRONOCRYSTALS].unlocks.push(new Unlock(UnlockKey.ENGINEERING, EngineeringKey.THE_FLUID, PersonKey.LENNOX_YOUNG, 10, null!));

  //Lennox (1934)
  engineeringList[EngineeringKey.THE_FLUID].unlocks.push(new Unlock(UnlockKey.PERSON, PersonKey.SAMA, PersonKey.SAMA, 10, null!));
  engineeringList[EngineeringKey.THE_FLUID].unlocks.push(new Unlock(UnlockKey.SCIENCE, ScienceKey.ALCHEMY, PersonKey.SAMA, 10, null!));

  //Sama (904)
  scienceList[ScienceKey.ALCHEMY].unlocks.push(new Unlock(UnlockKey.SCIENCE, ScienceKey.CHRONOMOGRIFICATION, PersonKey.SAMA, 10, null!));
  scienceList[ScienceKey.CHRONOMOGRIFICATION].unlocks.push(new Unlock(UnlockKey.ENGINEERING, EngineeringKey.DISTILLER, PersonKey.SAMA, 10, null!));
  engineeringList[EngineeringKey.DISTILLER].unlocks.push(new Unlock(UnlockKey.DEVICE, DeviceKey.PHILOSOPHERS_STONE, PersonKey.SAMA, 10, null!));
  engineeringList[EngineeringKey.DISTILLER].unlocks.push(new Unlock(UnlockKey.ENGINEERING, EngineeringKey.ELEMENT_ZERO, PersonKey.SAMA, 10, null!));
  engineeringList[EngineeringKey.ELEMENT_ZERO].unlocks.push(new Unlock(UnlockKey.PERSON, PersonKey.ITOTIA, PersonKey.ITOTIA, 10, null!));
  engineeringList[EngineeringKey.ELEMENT_ZERO].unlocks.push(new Unlock(UnlockKey.SCIENCE, ScienceKey.MATHEMATICS, PersonKey.ITOTIA, 10, null!));

  //Itotia (374)
  scienceList[ScienceKey.MATHEMATICS].unlocks.push(new Unlock(UnlockKey.SCIENCE, ScienceKey.TIMELESS_ALGEBRA, PersonKey.ITOTIA, 10, null!));
  scienceList[ScienceKey.TIMELESS_ALGEBRA].unlocks.push(new Unlock(UnlockKey.ENGINEERING, EngineeringKey.NEPOHUALTZINTZIN, PersonKey.ITOTIA, 10, null!));
  engineeringList[EngineeringKey.NEPOHUALTZINTZIN].unlocks.push(new Unlock(UnlockKey.DEVICE, DeviceKey.TZOLKIN, PersonKey.ITOTIA, 10, null!));
  engineeringList[EngineeringKey.NEPOHUALTZINTZIN].unlocks.push(new Unlock(UnlockKey.ENGINEERING, EngineeringKey.OBSIDIAN, PersonKey.ITOTIA, 10, null!));
  engineeringList[EngineeringKey.OBSIDIAN].unlocks.push(new Unlock(UnlockKey.PERSON, PersonKey.NECHTAN, PersonKey.NECHTAN, 10, null!));
  engineeringList[EngineeringKey.OBSIDIAN].unlocks.push(new Unlock(UnlockKey.SCIENCE, ScienceKey.ASTRONOMY, PersonKey.NECHTAN, 10, null!));

  //Nechtan (2524 BC)
  scienceList[ScienceKey.ASTRONOMY].unlocks.push(new Unlock(UnlockKey.SCIENCE, ScienceKey.AETHERIC_HOROSCOPES, PersonKey.NECHTAN, 10, null!));
  scienceList[ScienceKey.AETHERIC_HOROSCOPES].unlocks.push(new Unlock(UnlockKey.ENGINEERING, EngineeringKey.ZODIAC_TALISMAN, PersonKey.NECHTAN, 10, null!));
  engineeringList[EngineeringKey.ZODIAC_TALISMAN].unlocks.push(new Unlock(UnlockKey.DEVICE, DeviceKey.TIMEHENGE, PersonKey.NECHTAN, 10, null!));
  engineeringList[EngineeringKey.ZODIAC_TALISMAN].unlocks.push(new Unlock(UnlockKey.ENGINEERING, EngineeringKey.SARSEN_STONES, PersonKey.NECHTAN, 10, null!));
}

function associateResearchToPeople() {
  personList[PersonKey.LENNOX_OLD].scienceList.push(scienceList[ScienceKey.PHYSICS] as Science);
  personList[PersonKey.LENNOX_OLD].scienceList.push(scienceList[ScienceKey.QUANTUM_COMPUTING] as Science);
  personList[PersonKey.LENNOX_OLD].engineeringList.push(engineeringList[EngineeringKey.QUANTUM_COMPUTER] as Engineering);
  personList[PersonKey.LENNOX_OLD].engineeringList.push(engineeringList[EngineeringKey.CHRONOCRYSTALS] as Engineering);
  personList[PersonKey.LENNOX_OLD].deviceList.push(deviceList[DeviceKey.CRYSTAL_SARCOPHAGUS] as Device);
  
  personList[PersonKey.LENNOX_YOUNG].scienceList.push(scienceList[ScienceKey.BIOLOGY] as Science);
  personList[PersonKey.LENNOX_YOUNG].scienceList.push(scienceList[ScienceKey.GENETIC_MEMORY] as Science);
  personList[PersonKey.LENNOX_YOUNG].engineeringList.push(engineeringList[EngineeringKey.TELOMERE_STRETCHER] as Engineering);
  personList[PersonKey.LENNOX_YOUNG].engineeringList.push(engineeringList[EngineeringKey.THE_FLUID] as Engineering);
  personList[PersonKey.LENNOX_YOUNG].deviceList.push(deviceList[DeviceKey.OMEGAPERSON] as Device);

  personList[PersonKey.SAMA].scienceList.push(scienceList[ScienceKey.ALCHEMY] as Science);
  personList[PersonKey.SAMA].scienceList.push(scienceList[ScienceKey.CHRONOMOGRIFICATION] as Science);
  personList[PersonKey.SAMA].engineeringList.push(engineeringList[EngineeringKey.DISTILLER] as Engineering);
  personList[PersonKey.SAMA].engineeringList.push(engineeringList[EngineeringKey.ELEMENT_ZERO] as Engineering);
  personList[PersonKey.SAMA].deviceList.push(deviceList[DeviceKey.PHILOSOPHERS_STONE] as Device);

  personList[PersonKey.ITOTIA].scienceList.push(scienceList[ScienceKey.MATHEMATICS] as Science);
  personList[PersonKey.ITOTIA].scienceList.push(scienceList[ScienceKey.TIMELESS_ALGEBRA] as Science);
  personList[PersonKey.ITOTIA].engineeringList.push(engineeringList[EngineeringKey.NEPOHUALTZINTZIN] as Engineering);
  personList[PersonKey.ITOTIA].engineeringList.push(engineeringList[EngineeringKey.OBSIDIAN] as Engineering);
  personList[PersonKey.ITOTIA].deviceList.push(deviceList[DeviceKey.TZOLKIN] as Device);

  personList[PersonKey.NECHTAN].scienceList.push(scienceList[ScienceKey.ASTRONOMY] as Science);
  personList[PersonKey.NECHTAN].scienceList.push(scienceList[ScienceKey.AETHERIC_HOROSCOPES] as Science);
  personList[PersonKey.NECHTAN].engineeringList.push(engineeringList[EngineeringKey.ZODIAC_TALISMAN] as Engineering);
  personList[PersonKey.NECHTAN].engineeringList.push(engineeringList[EngineeringKey.SARSEN_STONES] as Engineering);
  personList[PersonKey.NECHTAN].deviceList.push(deviceList[DeviceKey.TIMEHENGE] as Device);
}

associateResearchToPeople();
associateUnlocksToResearch();

export default function useInitialize() {

  scienceList[ScienceKey.PHYSICS].isUnlocked = true;
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
  if(GameConstants.QUICK_MODE) {
    for(const research in researchList) {
      researchList[research].speed = 10;
      researchList[research].unlocks.forEach((unlock: { threshold: number }) => unlock.threshold = 1);
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