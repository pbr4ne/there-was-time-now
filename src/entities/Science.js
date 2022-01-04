import { shallowRef } from 'vue'

import {
  Atom as PhysicsIcon,
} from '@vicons/tabler'

import {
  AnimalTurtle16Regular as BiologyIcon,
} from '@vicons/fluent'

import { Research } from './Research'

export class Science extends Research {
  constructor(key, label, icon, color, isUnlocked) {
    super(key, label, icon, color, isUnlocked);
  }
}

export let scienceList = [
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
]

