import { Message } from "@/entities/Message"
import { DeviceKey, PersonKey, ScienceKey, UnlockMessageKey } from '@/enum/Enums'

const messages = {
  //Special Events
  [UnlockMessageKey.INITIAL]: new Message('Intro', [{
      text: 'The year is 1984. You are Lennox, a physicist researching the most cutting-edge technology: Quantum Computing! With enough research, you should be able to build your own Quantum Computer.'
    }, {
      text: 'Let\'s get started...',
    }]
  ),
  [UnlockMessageKey.UNLOCK_WORKERS]: new Message('A Breakthrough.', [{
      person: 'Lennox',
      text: 'Eureka! If I reroute the nanoseconds through the quantum flux thingamajig in the compumatrix, I *should* be able to slow time down. If only I had some undergrads to help, this is a lot of work and I haven\'t even had time to order a pizza - the most important element of research!'
    }]
  ),
  [UnlockMessageKey.UNLOCK_COUNTDOWN]: new Message('You fire up your very first supercomputer.', [{
      person: 'Quantum Computer',
      text: 'Beep Boop. Detecting timelines. ALERT. ALERT. YOUR QUANTUM REALITY HAS SKEWED INTO A TANGENT. TIME IS ENDING. DOOMSDAY IMMINENT.',
    },{
      person: 'Lennox',
      text: 'Great Scott! What am I going to do? I\'ll need to invent a way to slow down time so that I have enough time to fix time!',
    }]
  ),
  [UnlockMessageKey.UNLOCK_SLOWDOWN]: new Message('Unlocked slowdown', [{
      person: 'Undergrad',
      text: 'Dr. Lennox. Dr. Lennox, take a look at this. It appears there is indeed a way to *add* more time before the Doomsday Event.',
    },{
      person: 'Lennox',
      text: 'I thought we were calling it the Doomsminute Event.',
    },{
      person: 'Undergrad',
      text: 'The media disagreed. What\'s important is that we can spend research to SLOW time down. So that we have more time... so to speak... to solve our time problem.',
    },{
      person: 'Lennox',
      text: 'Then it looks like it\'s time for the next phase.',
    }]
  ),
  [UnlockMessageKey.HALFWAY]: new Message('Halfway there', [{
      text: 'Halfway to the end of the world.',
    }]
  ),

  //Sciences
  [ScienceKey.QUANTUM_COMPUTING]: new Message('Unlocked Quantum Computing', [{
      text: 'The study of how to use phenomena in quantum physics to create new ways of computing.'
    }]
  ),
  [ScienceKey.QUANTUM_COMPUTER]: new Message('Unlocked Quantum Computer', [{
      text: 'You\'ve made a quantum leap in the field of computing!'
    }]
  ),
  [ScienceKey.CHRONOCRYSTALS]: new Message('Unlocked Chronocrystals', [{
      text: 'I\'m sure in 2022 time crystals are available in every corner drug store, but in 1984 they\'re a little hard to come by.'
    }],
  ),
  [ScienceKey.BIOLOGY]: new Message('Unlocked Biology', [{
      text: 'The study of living stuff, and stuff.'
    }],
  ),
  [ScienceKey.GENETIC_MEMORY]: new Message('Unlocked Genetic Memory', [{
      text: 'Remember the memories.'
    }],
  ),
  [ScienceKey.TELOMERE_STRETCHER]: new Message('Unlocked Telomere Stretcher', [{
      text: 'It\'s a bit of a stretch, but you believe that prolonging a lifespan might be related to lengthening time.'
    }],
  ),
  [ScienceKey.THE_FLUID]: new Message('Unlocked The Fluid', [{
      text: 'The Fluid! Lennox, I must have the Fluid!'
    }],
  ),
  [ScienceKey.ALCHEMY]: new Message('Unlocked Alchemy', [{
      text: 'Sure it seems like a romantic pastime, but it\'s mostly mercury poisoning when you get down to it.'
    }],
  ),
  [ScienceKey.CHRONOMOGRIFICATION]: new Message('Unlocked Chronomogrification', [{
      text: 'You can transmogrify and now you can chronomogrify, but can you ever just mogrify?'
    }],
  ),
  [ScienceKey.DISTILLER]: new Message('Unlocked Distiller', [{
      text: 'I know you\'re tempted, but this is for science, not hooch.'
    }],
  ),
  [ScienceKey.ELEMENT_ZERO]: new Message('Unlocked Element Zero', [{
      text: 'Is this trademarked?'
    }],
  ),
  [ScienceKey.MATHEMATICS]: new Message('Unlocked Mathematics', [{
      text: 'The purest of the sciences, except for economics.'
    }],
  ),
  [ScienceKey.TIMELESS_ALGEBRA]: new Message('Unlocked Timeless Algebra', [{
      text: 'Classic.'
    }],
  ),
  [ScienceKey.NEPOHUALTZINTZIN]: new Message('Unlocked Nepohuatlzintzin', [{
      text: 'Eat your heart out, abacus.'
    }],
  ),
  [ScienceKey.OBSIDIAN]: new Message('Unlocked Obsidian', [{
      text: 'Coal\'s sexier cousin'
    }],
  ),
  [ScienceKey.ASTRONOMY]: new Message('Unlocked Astronomy', [{
      text: 'Astronomy compels the soul to look upward, and...oh sorry, wrong game.'
    }],
  ),
  [ScienceKey.AETHERIC_HOROSCOPES]: new Message('Unlocked Aetheric Horoscopes', [{
      text: 'Astronomy, astrology...what\'s the difference?'
    }],
  ),
  [ScienceKey.ZODIAC_TALISMAN]: new Message('Unlocked Zodiac Talisman', [{
      text: 'Comes in 12 varieties'
    }],
  ),
  [ScienceKey.SARSEN_STONES]: new Message('Unlocked Sarsen Stones', [{
      text: '90% sandstone, 10% "how the heck did they move those massive things?"'
    }],
  ),

  //Devices
  [DeviceKey.CRYSTAL_SARCOPHAGUS]: new Message('Unlocked Crystal Sarcophagus', [{
      text: 'The final stage of the DEVICE. Why a sarcophagus? Because \'Crystal Crypt\' doesn\'t roll off the tongue.'
    }],
  ),
  [DeviceKey.OMEGAPERSON]: new Message('Unlocked Omegaperson', [{
      text: 'Not the Charlton Heston version.'
    }],
  ),  
  [DeviceKey.PHILOSOPHERS_STONE]: new Message('Unlocked Philosopher\'s Stone', [{
    text: 'Definitely not a Sorcerer\'s Stone. That\'s not even a real thing.'
    }],
  ),
  [DeviceKey.TZOLKIN]: new Message('Unlocked Tzolk\'in', [{
    text: '"The division of days." Whatever you do, do NOT divide them by zero.'
    }],
  ),
  [DeviceKey.TIMEHENGE]: new Message('Unlocked Timehenge', [{
    text: 'The name says it all.'
    }],
  ),

  //People
  [PersonKey.LENNOX_YOUNG]: new Message('Lost to Time', [{
      person: 'Lennox',
      text: 'We\'ve done it. We\'ve found a way to stop the Doomsminute Event. We need to build THE DEVICE!'
    },{
      person: 'Undergrad',
      text: 'Doctor. We\'ve got a problem. Our research indicates that, with the exception of quantum physics, the kind of research required to complete THE DEVICE has been lost.'
    },{
      person: 'Lennox',
      text: 'Lost how?',
    },{
      person: 'Undergrad',
      text: 'Lost to time.',
    },{
      person: 'Lennox',
      text: 'What *kind* of research?',
    },{
      person: 'Undergrad',
      text: 'Well. It appears that only one scientist, back in the 30s, was doing this kind of biological research…',
    },{
      person: 'Lennox',
      text: 'WHO?',
    },{
      person: 'Undergrad',
      text: 'Well…YOU, doctor!',
    },{
      person: 'Lennox',
      text: 'By the Code!',
    },{
      person: 'Narrator',
      text: 'And it was at that time that Lennox experienced a *flashback*',
    },
  ]),
}

export { messages }