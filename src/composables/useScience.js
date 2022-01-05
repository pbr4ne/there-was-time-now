import { reactive, shallowRef } from 'vue'

import { Timeline } from '../entities/Timeline'

import {
  Chip as QuantumComputingIcon
} from '@vicons/carbon'

import {
  Atom as QuantumPhysicsIcon,
} from '@vicons/tabler'

import {
  AnimalTurtle16Regular as BiologyIcon,
} from '@vicons/fluent'

import { Science } from '../entities/Science'

export let scienceList = reactive([
  new Science(
    'quantum-mechanics', 
    'Quantum Mechanics', 
    shallowRef(QuantumPhysicsIcon), 
    '#B10DC9', 
    true,
    //quantum mechanics unlocks young lennox
    [
      {
        type: 'person',
        key: 'lennox-young',
        person: 'lennox-young',
        threshold: 1,
        message: new Timeline(
          'lennox-young',
          'lennox-young-1',
          'Young Lennox Unlocked',
          'I am Lennox - an inventor. The year is 1934.',
          '1934-04-01 05:31:00',
        ),
      }
    ],
  ),

  new Science(
    'quantum-computing', 
    'Quantum Computing', 
    shallowRef(QuantumComputingIcon), 
    '#39CCCC', 
    false,
    //no unlocks
    [],
  ),

  new Science(
    'biology', 
    'Biology', 
    shallowRef(BiologyIcon), 
    '#F012BE', 
    true,
    //biology unlocks quantum computing
    [
      {
        type: 'science',
        key: 'quantum-computing',
        person: 'lennox-old',
        threshold: 1,
        message: new Timeline(
          'lennox-old',
          'lennox-old-2',
          'Quantum Computing unlocked',
          'You can now research Quantum Computing.',
          '1984-05-01 06:42:00',
        ),
      }
    ],
  ),
])

export default function useScience() {
  const increment = (key) => {
    //todo - yuck do this better
    const science = scienceList.find(science => science.key === key);
    if(!science.isIncrementing) {
      let timer = setInterval(function() {
        science.isIncrementing = true;
        //todo - figure out how I want the progress bars to work
        science.current += 10;
        if(science.current >= 100) {
          clearInterval(timer);
          setTimeout(function() {
            science.current = 0;
            science.total += 1;
            science.isIncrementing = false;
          },200);
        }
      },100);
    }
  };

  return {
    scienceList,
    increment,
  };
}