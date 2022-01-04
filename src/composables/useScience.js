import { reactive, shallowRef } from 'vue'

import {
  Atom as PhysicsIcon,
} from '@vicons/tabler'

import {
  AnimalTurtle16Regular as BiologyIcon,
} from '@vicons/fluent'

import { Science } from '../entities/Science'

export let scienceList = reactive([
  new Science(
    'quantum-mechanics', 
    'Quantum Mechanics', 
    shallowRef(PhysicsIcon), 
    '#8a2be2', 
    true
  ),

  new Science(
    'biology', 
    'Biology', 
    shallowRef(BiologyIcon), 
    '#ff69b4', 
    true
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