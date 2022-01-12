import { reactive, shallowRef } from 'vue'

import {
  AccumulationPrecipitation as DistillerIcon,
  Asset as AstronomyIcon,
  Carbon as ChronomogrificationIcon,
  Chip as QuantumComputingIcon,
  Compass as TzolkinIcon,
  Dna as BiologyIcon,
  EdtLoop as QuantumComputerIcon,
  Integration as CrystalSarcophagusIcon,
  MachineLearningModel as GeneticMemoryIcon,
  NavaidNdb as NepohualtzintzinIcon,
  NavaidVhfor as ElementZeroIcon,
} from '@vicons/carbon'

import {
} from '@vicons/fa'

import {
  Cube24Regular as ObsidianIcon,
  MathFormatProfessional24Regular as TimelessAlgebraIcon,
} from '@vicons/fluent'

import {
  BodyOutline as OmegapersonIcon,
  FlaskOutline as AlchemyIcon,
  PlanetOutline as ZodiacTalismanIcon,
  PrismOutline as PhilosophersStoneIcon,
} from '@vicons/ionicons5'

import {
} from '@vicons/material'

import {
  Atom as PhysicsIcon,
  BuildingMonument as TimehengeIcon,
  Circles as SarsenStonesIcon,
  CircleX as DefaultIcon,
  Diamond as ChronocrystalsIcon,
  DropletHalf2 as TheFluidIcon,
  Dna as TelomereStretcherIcon,
  Math as MathematicsIcon,
  ZodiacLeo as AethericHoroscopesIcon,
} from '@vicons/tabler'

import { Device } from '@/entities/Device'
import { Person } from '@/entities/Person'
import { Science } from '@/entities/Science'
import { ResearchKey, PersonKey, UnlockKey } from '@/enum/Enums'

const personList : any = reactive({
  [PersonKey.LENNOX_OLD]: new Person(PersonKey.LENNOX_OLD, 'Lennox (1984)', 1984, 'Undergrads'),
  [PersonKey.LENNOX_YOUNG]: new Person(PersonKey.LENNOX_YOUNG, 'Lennox (1934)', 1934, 'Lab Partners'),
  [PersonKey.SAMA]: new Person(PersonKey.SAMA, 'Sama (904)', 904, 'Research Assistants'),
  [PersonKey.ITOTIA]: new Person(PersonKey.ITOTIA, 'Itotia (374)', 374, 'Numeric Priests'),
  [PersonKey.NECHTAN]: new Person(PersonKey.NECHTAN, 'Nechtan (2524 BC)', 0, 'Druids'),
});

const scienceList : any = reactive({
  [ResearchKey.PHYSICS]: new Science(ResearchKey.PHYSICS, 'Physics', shallowRef(PhysicsIcon), '#F72585', 10, 1),
  [ResearchKey.QUANTUM_COMPUTING]: new Science(ResearchKey.QUANTUM_COMPUTING, 'Quantum Computing', shallowRef(QuantumComputingIcon), '#B5179E', 5, 1),
  [ResearchKey.QUANTUM_COMPUTER]: new Science(ResearchKey.QUANTUM_COMPUTER, 'Quantum Computer', shallowRef(QuantumComputerIcon), '#4361EE', 0.5, 1.1),
  [ResearchKey.CHRONOCRYSTALS]: new Science(ResearchKey.CHRONOCRYSTALS, 'Chronocrystals', shallowRef(ChronocrystalsIcon), '#4CC9F0', 0.5, 1),

  [ResearchKey.BIOLOGY]: new Science(ResearchKey.BIOLOGY, 'Biology', shallowRef(BiologyIcon), '#f4e285', 10, 1),
  [ResearchKey.GENETIC_MEMORY]: new Science(ResearchKey.GENETIC_MEMORY, 'Genetic Memory', shallowRef(GeneticMemoryIcon), '#FEFAE0', 5, 1),
  [ResearchKey.TELOMERE_STRETCHER]: new Science(ResearchKey.TELOMERE_STRETCHER, 'Telomere Stretcher', shallowRef(TelomereStretcherIcon), '#bc6c25', 0.5, 1.1),
  [ResearchKey.THE_FLUID]: new Science(ResearchKey.THE_FLUID, 'The Fluid', shallowRef(TheFluidIcon), '#606c38', 0.5, 1),

  [ResearchKey.ALCHEMY]: new Science(ResearchKey.ALCHEMY, 'Alchemy', shallowRef(AlchemyIcon), '#bfc0c0', 10, 1),
  [ResearchKey.CHRONOMOGRIFICATION]: new Science(ResearchKey.CHRONOMOGRIFICATION, 'Chronomogrification', shallowRef(ChronomogrificationIcon), '#FFFFFF', 5, 1),
  [ResearchKey.DISTILLER]: new Science(ResearchKey.DISTILLER, 'Distiller', shallowRef(DistillerIcon), '#EF8354', 0.5, 1.1),
  [ResearchKey.ELEMENT_ZERO]: new Science(ResearchKey.ELEMENT_ZERO, 'Element Zero', shallowRef(ElementZeroIcon), '#4f5d75', 0.5, 1),

  [ResearchKey.MATHEMATICS]: new Science(ResearchKey.MATHEMATICS, 'Mathematics', shallowRef(MathematicsIcon), '#48d7e7', 10, 1),
  [ResearchKey.TIMELESS_ALGEBRA]: new Science(ResearchKey.TIMELESS_ALGEBRA, 'Timeless Algebra', shallowRef(TimelessAlgebraIcon), '#f168a7', 5, 1),
  [ResearchKey.NEPOHUALTZINTZIN]: new Science(ResearchKey.NEPOHUALTZINTZIN, 'Nepohualtzintzin', shallowRef(NepohualtzintzinIcon), '#f1cbe6', 0.5, 1.1),
  [ResearchKey.OBSIDIAN]: new Science(ResearchKey.OBSIDIAN, 'Obsidian', shallowRef(ObsidianIcon), '#f9d567', 0.5, 1),

  [ResearchKey.ASTRONOMY]: new Science(ResearchKey.ASTRONOMY, 'Astronomy', shallowRef(AstronomyIcon), '#2c7da0', 10, 1),
  [ResearchKey.AETHERIC_HOROSCOPES]: new Science(ResearchKey.AETHERIC_HOROSCOPES, 'Aetheric Horoscopes', shallowRef(AethericHoroscopesIcon), '#468faf', 5, 1),
  [ResearchKey.ZODIAC_TALISMAN]: new Science(ResearchKey.ZODIAC_TALISMAN, 'Zodiac Talisman', shallowRef(ZodiacTalismanIcon), '#61a5c2', 0.5, 1.1),
  [ResearchKey.SARSEN_STONES]: new Science(ResearchKey.SARSEN_STONES, 'Sarsen Stones', shallowRef(SarsenStonesIcon), '#89c2d9', 0.5, 1),
});

const deviceList : any = reactive({
  [ResearchKey.CRYSTAL_SARCOPHAGUS]: new Device(ResearchKey.CRYSTAL_SARCOPHAGUS, 'Crystal Sarcophagus', shallowRef(CrystalSarcophagusIcon), '#e0c3fc', 0.25, []),
  [ResearchKey.OMEGAPERSON]: new Device(ResearchKey.OMEGAPERSON, 'Omegaperson', shallowRef(OmegapersonIcon), '#fb8500', 0.25, []),
  [ResearchKey.PHILOSOPHERS_STONE]: new Device(ResearchKey.PHILOSOPHERS_STONE, 'Philosopher\'s Stone', shallowRef(PhilosophersStoneIcon), '#d4af37', 0.25, []),
  [ResearchKey.TZOLKIN]: new Device(ResearchKey.TZOLKIN, 'Tzolk\'in', shallowRef(TzolkinIcon), '#8cb369', 0.25, []),
  [ResearchKey.TIMEHENGE]: new Device(ResearchKey.TIMEHENGE, 'Timehenge', shallowRef(TimehengeIcon), '#a9d6e5', 0.25, []),
});

const researchList : any = reactive({
  ...scienceList,
  ...deviceList,
})

function associateUnlocks() {
  //Lennox (1984)
  scienceList[ResearchKey.QUANTUM_COMPUTING].setUnlock(ResearchKey.PHYSICS, 1);
  scienceList[ResearchKey.QUANTUM_COMPUTER].setUnlock(ResearchKey.QUANTUM_COMPUTING, 10);
  scienceList[ResearchKey.CHRONOCRYSTALS].setUnlock(ResearchKey.TELOMERE_STRETCHER, 10);
  deviceList[ResearchKey.CRYSTAL_SARCOPHAGUS].setUnlock(ResearchKey.TELOMERE_STRETCHER, 10);

  //Lennox (1934)
  personList[PersonKey.LENNOX_YOUNG].setUnlock(ResearchKey.QUANTUM_COMPUTER, 10);
  scienceList[ResearchKey.BIOLOGY].setUnlock(ResearchKey.QUANTUM_COMPUTER, 10);
  scienceList[ResearchKey.GENETIC_MEMORY].setUnlock(ResearchKey.BIOLOGY, 10);
  scienceList[ResearchKey.TELOMERE_STRETCHER].setUnlock(ResearchKey.GENETIC_MEMORY, 10);
  scienceList[ResearchKey.THE_FLUID].setUnlock(ResearchKey.CHRONOCRYSTALS, 10);
  deviceList[ResearchKey.OMEGAPERSON].setUnlock(ResearchKey.CHRONOCRYSTALS, 10);

  //Sama (904)
  personList[PersonKey.SAMA].setUnlock(ResearchKey.THE_FLUID, 10);
  scienceList[ResearchKey.ALCHEMY].setUnlock(ResearchKey.THE_FLUID, 10);
  scienceList[ResearchKey.CHRONOMOGRIFICATION].setUnlock(ResearchKey.ALCHEMY, 10);
  scienceList[ResearchKey.DISTILLER].setUnlock(ResearchKey.CHRONOMOGRIFICATION, 10);
  scienceList[ResearchKey.ELEMENT_ZERO].setUnlock(ResearchKey.DISTILLER, 10);
  deviceList[ResearchKey.PHILOSOPHERS_STONE].setUnlock(ResearchKey.DISTILLER, 10);

  //Itotia (374)
  personList[PersonKey.ITOTIA].setUnlock(ResearchKey.ELEMENT_ZERO, 10);
  scienceList[ResearchKey.MATHEMATICS].setUnlock(ResearchKey.ELEMENT_ZERO, 10);
  scienceList[ResearchKey.TIMELESS_ALGEBRA].setUnlock(ResearchKey.MATHEMATICS, 10);
  scienceList[ResearchKey.NEPOHUALTZINTZIN].setUnlock(ResearchKey.TIMELESS_ALGEBRA, 10);
  scienceList[ResearchKey.OBSIDIAN].setUnlock(ResearchKey.NEPOHUALTZINTZIN, 10);
  deviceList[ResearchKey.TZOLKIN].setUnlock(ResearchKey.NEPOHUALTZINTZIN, 10);

  //Nechtan (2524 BC)
  personList[PersonKey.NECHTAN].setUnlock(ResearchKey.OBSIDIAN, 10);
  scienceList[ResearchKey.ASTRONOMY].setUnlock(ResearchKey.OBSIDIAN, 10);
  scienceList[ResearchKey.AETHERIC_HOROSCOPES].setUnlock(ResearchKey.ASTRONOMY, 10);
  scienceList[ResearchKey.ZODIAC_TALISMAN].setUnlock(ResearchKey.AETHERIC_HOROSCOPES, 10);
  scienceList[ResearchKey.SARSEN_STONES].setUnlock(ResearchKey.ZODIAC_TALISMAN, 10);
  deviceList[ResearchKey.TIMEHENGE].setUnlock(ResearchKey.ZODIAC_TALISMAN, 10);
}

function associateResearchToPeople() {
  personList[PersonKey.LENNOX_OLD].scienceList.push(scienceList[ResearchKey.PHYSICS] as Science);
  personList[PersonKey.LENNOX_OLD].scienceList.push(scienceList[ResearchKey.QUANTUM_COMPUTING] as Science);
  personList[PersonKey.LENNOX_OLD].scienceList.push(scienceList[ResearchKey.QUANTUM_COMPUTER] as Science);
  personList[PersonKey.LENNOX_OLD].scienceList.push(scienceList[ResearchKey.CHRONOCRYSTALS] as Science);
  personList[PersonKey.LENNOX_OLD].deviceList.push(deviceList[ResearchKey.CRYSTAL_SARCOPHAGUS] as Device);
  
  personList[PersonKey.LENNOX_YOUNG].scienceList.push(scienceList[ResearchKey.BIOLOGY] as Science);
  personList[PersonKey.LENNOX_YOUNG].scienceList.push(scienceList[ResearchKey.GENETIC_MEMORY] as Science);
  personList[PersonKey.LENNOX_YOUNG].scienceList.push(scienceList[ResearchKey.TELOMERE_STRETCHER] as Science);
  personList[PersonKey.LENNOX_YOUNG].scienceList.push(scienceList[ResearchKey.THE_FLUID] as Science);
  personList[PersonKey.LENNOX_YOUNG].deviceList.push(deviceList[ResearchKey.OMEGAPERSON] as Device);

  personList[PersonKey.SAMA].scienceList.push(scienceList[ResearchKey.ALCHEMY] as Science);
  personList[PersonKey.SAMA].scienceList.push(scienceList[ResearchKey.CHRONOMOGRIFICATION] as Science);
  personList[PersonKey.SAMA].scienceList.push(scienceList[ResearchKey.DISTILLER] as Science);
  personList[PersonKey.SAMA].scienceList.push(scienceList[ResearchKey.ELEMENT_ZERO] as Science);
  personList[PersonKey.SAMA].deviceList.push(deviceList[ResearchKey.PHILOSOPHERS_STONE] as Device);

  personList[PersonKey.ITOTIA].scienceList.push(scienceList[ResearchKey.MATHEMATICS] as Science);
  personList[PersonKey.ITOTIA].scienceList.push(scienceList[ResearchKey.TIMELESS_ALGEBRA] as Science);
  personList[PersonKey.ITOTIA].scienceList.push(scienceList[ResearchKey.NEPOHUALTZINTZIN] as Science);
  personList[PersonKey.ITOTIA].scienceList.push(scienceList[ResearchKey.OBSIDIAN] as Science);
  personList[PersonKey.ITOTIA].deviceList.push(deviceList[ResearchKey.TZOLKIN] as Device);

  personList[PersonKey.NECHTAN].scienceList.push(scienceList[ResearchKey.ASTRONOMY] as Science);
  personList[PersonKey.NECHTAN].scienceList.push(scienceList[ResearchKey.AETHERIC_HOROSCOPES] as Science);
  personList[PersonKey.NECHTAN].scienceList.push(scienceList[ResearchKey.ZODIAC_TALISMAN] as Science);
  personList[PersonKey.NECHTAN].scienceList.push(scienceList[ResearchKey.SARSEN_STONES] as Science);
  personList[PersonKey.NECHTAN].deviceList.push(deviceList[ResearchKey.TIMEHENGE] as Device);
}

associateResearchToPeople();
associateUnlocks();

export default function useInitialize() {

  scienceList[ResearchKey.PHYSICS].isUnlocked = true;
  personList[PersonKey.LENNOX_OLD].isUnlocked = true;

  //todo - remove this later
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  if(params['UNLOCK_ALL'] === "true") {
    for(const person in personList) {
      personList[person].isUnlocked = true;
    }
    for(const research in researchList) {
      researchList[research].isUnlocked = true;
    }
  }
  if(params['QUICK_MODE'] === "true") {
    for(const research in researchList) {
      researchList[research].speed = 10;
      researchList[research].unlockThreshold = 1;
      //researchList[research].unlocks.forEach((unlock: { threshold: number }) => unlock.threshold = 1);
    }
    for(const person in personList) {
      personList[person].unlockThreshold = 1;
    }
  }

  return {
    deviceList,
    personList,
    researchList,
    scienceList,
  }
}