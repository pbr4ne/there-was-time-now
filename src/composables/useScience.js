import { reactive, shallowRef } from 'vue'

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
        type: 'timeline',
        key: 'lennox-young',
        threshold: 1,
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
        threshold: 1,
      }
    ],
  ),
])

export default function useScience() {
  const increment = (key) => {
    //todo - yuck do this better
    const science = scienceList.find(science => science.key === key);
    if(!science.incrementing) {
      let timer = setInterval(function() {
        science.incrementing = true;
        science.current += 1;
        if(science.current >= 100) {
          clearInterval(timer);
          setTimeout(function() {
            science.current = 0;
            science.total += 1;
            science.incrementing = false;
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