import { Message } from "@/entities/Message"
import { UnlockMessageKey } from '@/enum/Enums'

const messages = {
  [UnlockMessageKey.INITIAL]: new Message(
    '1984', [{
      text: 'The year is 1984. You are Lennox, a physicist researching the most cutting-edge technology: Quantum Computing! With enough research, you should be able to build your own Quantum Computer.'
    }, {
      text: 'Let\'s get started...',
    }]
  ),
  [UnlockMessageKey.UNLOCK_WORKERS]: new Message(
    'Undergrads', [{
      text: 'Eureka! If I reroute the nanoseconds through the quantum flux thingamajig in the compumatrix, I *should* be able to slow time down. If only I had some undergrads to help, this is a lot of work and I haven\'t even had time to order a pizza - the most important element of research!'
    }]
  ),
  [UnlockMessageKey.UNLOCK_COUNTDOWN]: new Message(
    'Uh oh', [{
      person: 'Quantum Computer',
      text: 'Beep Boop. Detecting timelines. ALERT. ALERT. YOUR QUANTUM REALITY HAS SKEWED INTO A TANGENT. TIME IS ENDING. DOOMSDAY IMMINENT.',
    },{
      person: 'Lennox',
      text: 'Great Scott! What am I going to do? I\'ll need to invent a way to slow down time so that I have enough time to fix time!',
    }]
  ),
  [UnlockMessageKey.UNLOCK_SLOWDOWN]: new Message(
    'Unlocked slowdown', [{
      person: 'Undergrad',
      text: 'Dr. Lennox. Dr. Lennox, take a look at this. It appears there is indeed a way to *add* more time before the Doomsday Event.',
    },{
      person: 'Lennox',
      text: 'I thought we were calling it the Doomsminute Event.',
    },{
      person: 'Undergrad',
      text: 'The media disagreed. What\'s important is that we can spend research to ADD time to the end of the clock. Buying us more time so that we can solve our time problem.',
    },{
      person: 'Lennox',
      text: 'Then it looks like it\'s time for the next phase.',
    }]
  ),
  [UnlockMessageKey.HALFWAY]: new Message(
    'Halfway there', [{
      text: 'Halfway to the end of the world',
    }]
  ),
}

export { messages }