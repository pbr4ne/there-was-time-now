import { reactive, ref, shallowRef } from 'vue'
import { useStopwatch } from 'vue-timer-hook'

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
import { Unlock } from '@/entities/Unlock'
import { DeviceKey, PersonKey, ScienceKey, UnlockKey } from '@/enum/Enums'
import { messages } from '@/locales/en'

const gameStarted = ref(false);
const gamePaused = ref(false);
const gameEnded = ref(false);
const countdownTriggered = ref(false);
const isLoading = ref(true);
const saveStopwatch = useStopwatch(0, true);
const sellFeatureEnabled = ref(false);
const slowdownEnabled = ref(false);
const spokeToLennox = ref(false);

const personList : any = reactive({
  [PersonKey.LENNOX_OLD]: new Person(PersonKey.LENNOX_OLD, 'Lennox (1984)', 1984, 'Undergrads'),
  [PersonKey.LENNOX_YOUNG]: new Person(PersonKey.LENNOX_YOUNG, 'Lennox (1934)', 1934, 'Lab Partners'),
  [PersonKey.SAMA]: new Person(PersonKey.SAMA, 'Sama (904)', 904, 'Research Assistants'),
  [PersonKey.ITOTIA]: new Person(PersonKey.ITOTIA, 'Itotia (374)', 374, 'Numeric Priests'),
  [PersonKey.NECHTAN]: new Person(PersonKey.NECHTAN, 'Nechtan (2524 BC)', 0, 'Druids'),
});

const scienceList : any = reactive({
  [ScienceKey.PHYSICS]: new Science('Physics', shallowRef(PhysicsIcon), '#F72585', 10, 1),
  [ScienceKey.QUANTUM_COMPUTING]: new Science('Quantum Computing', shallowRef(QuantumComputingIcon), '#B5179E', 5, 1),
  [ScienceKey.QUANTUM_COMPUTER]: new Science('Quantum Computer', shallowRef(QuantumComputerIcon), '#4361EE', 0.5, 1.1),
  [ScienceKey.CHRONOCRYSTALS]: new Science('Chronocrystals', shallowRef(ChronocrystalsIcon), '#4CC9F0', 0.5, 1),

  [ScienceKey.BIOLOGY]: new Science('Biology', shallowRef(BiologyIcon), '#f4e285', 10, 1),
  [ScienceKey.GENETIC_MEMORY]: new Science('Genetic Memory', shallowRef(GeneticMemoryIcon), '#FEFAE0', 5, 1),
  [ScienceKey.TELOMERE_STRETCHER]: new Science('Telomere Stretcher', shallowRef(TelomereStretcherIcon), '#bc6c25', 0.5, 1.1),
  [ScienceKey.THE_FLUID]: new Science('The Fluid', shallowRef(TheFluidIcon), '#606c38', 0.5, 1),

  [ScienceKey.ALCHEMY]: new Science('Alchemy', shallowRef(AlchemyIcon), '#bfc0c0', 10, 1),
  [ScienceKey.CHRONOMOGRIFICATION]: new Science('Chronomogrification', shallowRef(ChronomogrificationIcon), '#FFFFFF', 5, 1),
  [ScienceKey.DISTILLER]: new Science('Distiller', shallowRef(DistillerIcon), '#EF8354', 0.5, 1.1),
  [ScienceKey.ELEMENT_ZERO]: new Science('Element Zero', shallowRef(ElementZeroIcon), '#4f5d75', 0.5, 1),

  [ScienceKey.MATHEMATICS]: new Science('Mathematics', shallowRef(MathematicsIcon), '#48d7e7', 10, 1),
  [ScienceKey.TIMELESS_ALGEBRA]: new Science('Timeless Algebra', shallowRef(TimelessAlgebraIcon), '#f168a7', 5, 1),
  [ScienceKey.NEPOHUALTZINTZIN]: new Science('Nepohualtzintzin', shallowRef(NepohualtzintzinIcon), '#f1cbe6', 0.5, 1.1),
  [ScienceKey.OBSIDIAN]: new Science('Obsidian', shallowRef(ObsidianIcon), '#f9d567', 0.5, 1),

  [ScienceKey.ASTRONOMY]: new Science('Astronomy', shallowRef(AstronomyIcon), '#2c7da0', 10, 1),
  [ScienceKey.AETHERIC_HOROSCOPES]: new Science('Aetheric Horoscopes', shallowRef(AethericHoroscopesIcon), '#468faf', 5, 1),
  [ScienceKey.ZODIAC_TALISMAN]: new Science('Zodiac Talisman', shallowRef(ZodiacTalismanIcon), '#61a5c2', 0.5, 1.1),
  [ScienceKey.SARSEN_STONES]: new Science('Sarsen Stones', shallowRef(SarsenStonesIcon), '#89c2d9', 0.5, 1),
});

const deviceList : any = reactive({
  [DeviceKey.CRYSTAL_SARCOPHAGUS]: new Device('Crystal Sarcophagus', shallowRef(CrystalSarcophagusIcon), '#e0c3fc', 0.25, []),
  [DeviceKey.OMEGAPERSON]: new Device('Omegaperson', shallowRef(OmegapersonIcon), '#fb8500', 0.25, []),
  [DeviceKey.PHILOSOPHERS_STONE]: new Device('Philosopher\'s Stone', shallowRef(PhilosophersStoneIcon), '#d4af37', 0.25, []),
  [DeviceKey.TZOLKIN]: new Device('Tzolk\'in', shallowRef(TzolkinIcon), '#8cb369', 0.25, []),
  [DeviceKey.TIMEHENGE]: new Device('Timehenge', shallowRef(TimehengeIcon), '#a9d6e5', 0.25, []),
});

const researchList : any = reactive({
  ...scienceList,
  ...deviceList,
})

//todo i kind of regret reorganizing things like this because the amount it takes to unlock applies to the parent, not the child
const unlockList : any = reactive({
  [PersonKey.LENNOX_YOUNG]: new Unlock(UnlockKey.PERSON, PersonKey.LENNOX_YOUNG, PersonKey.LENNOX_YOUNG, 10, messages[PersonKey.LENNOX_YOUNG]),
  [PersonKey.SAMA]: new Unlock(UnlockKey.PERSON, PersonKey.SAMA, PersonKey.SAMA, 10, null!),
  [PersonKey.ITOTIA]: new Unlock(UnlockKey.PERSON, PersonKey.ITOTIA, PersonKey.ITOTIA, 10, null!),
  [PersonKey.NECHTAN]: new Unlock(UnlockKey.PERSON, PersonKey.NECHTAN, PersonKey.NECHTAN, 10, null!),

  [ScienceKey.QUANTUM_COMPUTING]: new Unlock(UnlockKey.SCIENCE, ScienceKey.QUANTUM_COMPUTING, PersonKey.LENNOX_OLD, 10, messages[ScienceKey.QUANTUM_COMPUTING]),
  [ScienceKey.QUANTUM_COMPUTER]: new Unlock(UnlockKey.SCIENCE, ScienceKey.QUANTUM_COMPUTER, PersonKey.LENNOX_OLD, 10, messages[ScienceKey.QUANTUM_COMPUTER]),
  [ScienceKey.CHRONOCRYSTALS]: new Unlock(UnlockKey.SCIENCE, ScienceKey.CHRONOCRYSTALS, PersonKey.LENNOX_OLD, 10, messages[ScienceKey.CHRONOCRYSTALS]),

  [ScienceKey.BIOLOGY]: new Unlock(UnlockKey.SCIENCE, ScienceKey.BIOLOGY, PersonKey.LENNOX_YOUNG, 10, messages[ScienceKey.BIOLOGY]),
  [ScienceKey.GENETIC_MEMORY]: new Unlock(UnlockKey.SCIENCE, ScienceKey.GENETIC_MEMORY, PersonKey.LENNOX_YOUNG, 10, messages[ScienceKey.GENETIC_MEMORY]),
  [ScienceKey.TELOMERE_STRETCHER]: new Unlock(UnlockKey.SCIENCE, ScienceKey.TELOMERE_STRETCHER, PersonKey.LENNOX_YOUNG, 10, messages[ScienceKey.TELOMERE_STRETCHER]),
  [ScienceKey.THE_FLUID]: new Unlock(UnlockKey.SCIENCE, ScienceKey.THE_FLUID, PersonKey.LENNOX_YOUNG, 10, messages[ScienceKey.THE_FLUID]),

  [ScienceKey.ALCHEMY]: new Unlock(UnlockKey.SCIENCE, ScienceKey.ALCHEMY, PersonKey.SAMA, 10, messages[ScienceKey.ALCHEMY]),
  [ScienceKey.CHRONOMOGRIFICATION]: new Unlock(UnlockKey.SCIENCE, ScienceKey.CHRONOMOGRIFICATION, PersonKey.SAMA, 10, messages[ScienceKey.CHRONOMOGRIFICATION]),
  [ScienceKey.DISTILLER]: new Unlock(UnlockKey.SCIENCE, ScienceKey.DISTILLER, PersonKey.SAMA, 10, messages[ScienceKey.DISTILLER]),
  [ScienceKey.ELEMENT_ZERO]: new Unlock(UnlockKey.SCIENCE, ScienceKey.ELEMENT_ZERO, PersonKey.SAMA, 10, messages[ScienceKey.ELEMENT_ZERO]),

  [ScienceKey.MATHEMATICS]: new Unlock(UnlockKey.SCIENCE, ScienceKey.MATHEMATICS, PersonKey.ITOTIA, 10, messages[ScienceKey.MATHEMATICS]),
  [ScienceKey.TIMELESS_ALGEBRA]: new Unlock(UnlockKey.SCIENCE, ScienceKey.TIMELESS_ALGEBRA, PersonKey.ITOTIA, 10, messages[ScienceKey.TIMELESS_ALGEBRA]),
  [ScienceKey.NEPOHUALTZINTZIN]: new Unlock(UnlockKey.SCIENCE, ScienceKey.NEPOHUALTZINTZIN, PersonKey.ITOTIA, 10, messages[ScienceKey.NEPOHUALTZINTZIN]),
  [ScienceKey.OBSIDIAN]: new Unlock(UnlockKey.SCIENCE, ScienceKey.OBSIDIAN, PersonKey.ITOTIA, 10, messages[ScienceKey.OBSIDIAN]),

  [ScienceKey.ASTRONOMY]: new Unlock(UnlockKey.SCIENCE, ScienceKey.ASTRONOMY, PersonKey.NECHTAN, 10, messages[ScienceKey.ASTRONOMY]),
  [ScienceKey.AETHERIC_HOROSCOPES]: new Unlock(UnlockKey.SCIENCE, ScienceKey.AETHERIC_HOROSCOPES, PersonKey.NECHTAN, 10, messages[ScienceKey.AETHERIC_HOROSCOPES]),
  [ScienceKey.ZODIAC_TALISMAN]: new Unlock(UnlockKey.SCIENCE, ScienceKey.ZODIAC_TALISMAN, PersonKey.NECHTAN, 10, messages[ScienceKey.ZODIAC_TALISMAN]),
  [ScienceKey.SARSEN_STONES]: new Unlock(UnlockKey.SCIENCE, ScienceKey.SARSEN_STONES, PersonKey.NECHTAN, 10, messages[ScienceKey.SARSEN_STONES]),

  [DeviceKey.CRYSTAL_SARCOPHAGUS]: new Unlock(UnlockKey.DEVICE, DeviceKey.CRYSTAL_SARCOPHAGUS, PersonKey.LENNOX_OLD, 10, messages[DeviceKey.CRYSTAL_SARCOPHAGUS]),
  [DeviceKey.OMEGAPERSON]: new Unlock(UnlockKey.DEVICE, DeviceKey.OMEGAPERSON, PersonKey.LENNOX_YOUNG, 10, messages[DeviceKey.OMEGAPERSON]),
  [DeviceKey.PHILOSOPHERS_STONE]: new Unlock(UnlockKey.DEVICE, DeviceKey.PHILOSOPHERS_STONE, PersonKey.SAMA, 10, messages[DeviceKey.PHILOSOPHERS_STONE]),
  [DeviceKey.TZOLKIN]: new Unlock(UnlockKey.DEVICE, DeviceKey.TZOLKIN, PersonKey.ITOTIA, 10, messages[DeviceKey.TZOLKIN]),
  [DeviceKey.TIMEHENGE]: new Unlock(UnlockKey.DEVICE, DeviceKey.TIMEHENGE, PersonKey.NECHTAN, 10, messages[DeviceKey.TIMEHENGE]),
});

function associateUnlocksToResearch() {
  //Lennox (1984)
  scienceList[ScienceKey.PHYSICS].unlocks.push(unlockList[ScienceKey.QUANTUM_COMPUTING]);
  scienceList[ScienceKey.QUANTUM_COMPUTING].unlocks.push(unlockList[ScienceKey.QUANTUM_COMPUTER]);
  scienceList[ScienceKey.QUANTUM_COMPUTER].unlocks.push(unlockList[PersonKey.LENNOX_YOUNG]);
  scienceList[ScienceKey.QUANTUM_COMPUTER].unlocks.push(unlockList[ScienceKey.BIOLOGY]);

  //Lennox (1934)
  scienceList[ScienceKey.BIOLOGY].unlocks.push(unlockList[ScienceKey.GENETIC_MEMORY]);
  scienceList[ScienceKey.GENETIC_MEMORY].unlocks.push(unlockList[ScienceKey.TELOMERE_STRETCHER]);
  scienceList[ScienceKey.TELOMERE_STRETCHER].unlocks.push(unlockList[DeviceKey.CRYSTAL_SARCOPHAGUS]);
  scienceList[ScienceKey.TELOMERE_STRETCHER].unlocks.push(unlockList[ScienceKey.CHRONOCRYSTALS]);

  //Lennox (1984)
  scienceList[ScienceKey.CHRONOCRYSTALS].unlocks.push(unlockList[DeviceKey.OMEGAPERSON]);
  scienceList[ScienceKey.CHRONOCRYSTALS].unlocks.push(unlockList[ScienceKey.THE_FLUID]);

  //Lennox (1934)
  scienceList[ScienceKey.THE_FLUID].unlocks.push(unlockList[PersonKey.SAMA]);
  scienceList[ScienceKey.THE_FLUID].unlocks.push(unlockList[ScienceKey.ALCHEMY]);

  //Sama (904)
  scienceList[ScienceKey.ALCHEMY].unlocks.push(unlockList[ScienceKey.CHRONOMOGRIFICATION]);
  scienceList[ScienceKey.CHRONOMOGRIFICATION].unlocks.push(unlockList[ScienceKey.DISTILLER]);
  scienceList[ScienceKey.DISTILLER].unlocks.push(unlockList[DeviceKey.PHILOSOPHERS_STONE]);
  scienceList[ScienceKey.DISTILLER].unlocks.push(unlockList[ScienceKey.ELEMENT_ZERO]);
  scienceList[ScienceKey.ELEMENT_ZERO].unlocks.push(unlockList[PersonKey.ITOTIA]);
  scienceList[ScienceKey.ELEMENT_ZERO].unlocks.push(unlockList[ScienceKey.MATHEMATICS]);

  //Itotia (374)
  scienceList[ScienceKey.MATHEMATICS].unlocks.push(unlockList[ScienceKey.TIMELESS_ALGEBRA]);
  scienceList[ScienceKey.TIMELESS_ALGEBRA].unlocks.push(unlockList[ScienceKey.NEPOHUALTZINTZIN]);
  scienceList[ScienceKey.NEPOHUALTZINTZIN].unlocks.push(unlockList[DeviceKey.TZOLKIN]);
  scienceList[ScienceKey.NEPOHUALTZINTZIN].unlocks.push(unlockList[ScienceKey.OBSIDIAN]);
  scienceList[ScienceKey.OBSIDIAN].unlocks.push(unlockList[PersonKey.NECHTAN]);
  scienceList[ScienceKey.OBSIDIAN].unlocks.push(unlockList[ScienceKey.ASTRONOMY]);

  //Nechtan (2524 BC)
  scienceList[ScienceKey.ASTRONOMY].unlocks.push(unlockList[ScienceKey.AETHERIC_HOROSCOPES]);
  scienceList[ScienceKey.AETHERIC_HOROSCOPES].unlocks.push(unlockList[ScienceKey.ZODIAC_TALISMAN]);
  scienceList[ScienceKey.ZODIAC_TALISMAN].unlocks.push(unlockList[DeviceKey.TIMEHENGE]);
  scienceList[ScienceKey.ZODIAC_TALISMAN].unlocks.push(unlockList[ScienceKey.SARSEN_STONES]);
}

function associateResearchToPeople() {
  personList[PersonKey.LENNOX_OLD].scienceList.push(scienceList[ScienceKey.PHYSICS] as Science);
  personList[PersonKey.LENNOX_OLD].scienceList.push(scienceList[ScienceKey.QUANTUM_COMPUTING] as Science);
  personList[PersonKey.LENNOX_OLD].scienceList.push(scienceList[ScienceKey.QUANTUM_COMPUTER] as Science);
  personList[PersonKey.LENNOX_OLD].scienceList.push(scienceList[ScienceKey.CHRONOCRYSTALS] as Science);
  personList[PersonKey.LENNOX_OLD].deviceList.push(deviceList[DeviceKey.CRYSTAL_SARCOPHAGUS] as Device);
  
  personList[PersonKey.LENNOX_YOUNG].scienceList.push(scienceList[ScienceKey.BIOLOGY] as Science);
  personList[PersonKey.LENNOX_YOUNG].scienceList.push(scienceList[ScienceKey.GENETIC_MEMORY] as Science);
  personList[PersonKey.LENNOX_YOUNG].scienceList.push(scienceList[ScienceKey.TELOMERE_STRETCHER] as Science);
  personList[PersonKey.LENNOX_YOUNG].scienceList.push(scienceList[ScienceKey.THE_FLUID] as Science);
  personList[PersonKey.LENNOX_YOUNG].deviceList.push(deviceList[DeviceKey.OMEGAPERSON] as Device);

  personList[PersonKey.SAMA].scienceList.push(scienceList[ScienceKey.ALCHEMY] as Science);
  personList[PersonKey.SAMA].scienceList.push(scienceList[ScienceKey.CHRONOMOGRIFICATION] as Science);
  personList[PersonKey.SAMA].scienceList.push(scienceList[ScienceKey.DISTILLER] as Science);
  personList[PersonKey.SAMA].scienceList.push(scienceList[ScienceKey.ELEMENT_ZERO] as Science);
  personList[PersonKey.SAMA].deviceList.push(deviceList[DeviceKey.PHILOSOPHERS_STONE] as Device);

  personList[PersonKey.ITOTIA].scienceList.push(scienceList[ScienceKey.MATHEMATICS] as Science);
  personList[PersonKey.ITOTIA].scienceList.push(scienceList[ScienceKey.TIMELESS_ALGEBRA] as Science);
  personList[PersonKey.ITOTIA].scienceList.push(scienceList[ScienceKey.NEPOHUALTZINTZIN] as Science);
  personList[PersonKey.ITOTIA].scienceList.push(scienceList[ScienceKey.OBSIDIAN] as Science);
  personList[PersonKey.ITOTIA].deviceList.push(deviceList[DeviceKey.TZOLKIN] as Device);

  personList[PersonKey.NECHTAN].scienceList.push(scienceList[ScienceKey.ASTRONOMY] as Science);
  personList[PersonKey.NECHTAN].scienceList.push(scienceList[ScienceKey.AETHERIC_HOROSCOPES] as Science);
  personList[PersonKey.NECHTAN].scienceList.push(scienceList[ScienceKey.ZODIAC_TALISMAN] as Science);
  personList[PersonKey.NECHTAN].scienceList.push(scienceList[ScienceKey.SARSEN_STONES] as Science);
  personList[PersonKey.NECHTAN].deviceList.push(deviceList[DeviceKey.TIMEHENGE] as Device);
}

associateResearchToPeople();
associateUnlocksToResearch();

export default function useInitialize() {

  scienceList[ScienceKey.PHYSICS].isUnlocked = true;
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
      researchList[research].unlocks.forEach((unlock: { threshold: number }) => unlock.threshold = 1);
    }
  }

  return {
    countdownTriggered,
    deviceList,
    gameEnded,
    gamePaused,
    gameStarted,
    isLoading,
    personList,
    researchList,
    saveStopwatch,
    scienceList,
    sellFeatureEnabled,
    slowdownEnabled,
    spokeToLennox,
  }
}