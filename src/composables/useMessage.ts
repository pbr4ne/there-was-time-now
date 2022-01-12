import { h, ref } from 'vue'
import { useNotification } from 'naive-ui'
import TGameMessage from '@/components/TGameMessage.vue'
import useInitialize from '@/composables/useInitialize'
import useTime from '@/composables/useTime'
import { GameConstants } from '@/enum/Constants'
import { PersonKey } from '@/enum/Enums'
import { Message } from '@/entities/Message'
import { Person } from '@/entities/Person'
import { Unlock } from '@/entities/Unlock'

const showTimeline = ref(false);

//todo - less code duplication
export default function useMessage() {
  const notification = useNotification();
  const { personList } = useInitialize();
  const { timeElapsed } = useTime();

  function sendInitialMessage() {
    const initialMessage = new Message(
      '1984',
      [
        {
          text: 'The year is 1984. You are Lennox, a physicist researching the most cutting-edge technology: Quantum Computing! With enough research, you should be able to build your own Quantum Computer.'
        }, 
        {
          text: 'Let\'s get started...',
        },
      ]
    );
    initialMessage.isRead = true;
    initialMessage.timestamp = '1984-01-01';
    
    notification.create({
      title: initialMessage.title,
      content: () => h(TGameMessage, { messageSections: initialMessage.messageSections}),
      meta: initialMessage.timestamp,
      duration: GameConstants.NOTIFICATION_DURATION,
    });
    personList[PersonKey.LENNOX_OLD].messageList.unshift(initialMessage);
  }

  function sendWorkersMessage() {
    const workersMessage = new Message(
      '1984',
      [
        {
          text: 'Eureka! If I reroute the nanoseconds through the quantum flux thingamajig in the compumatrix, I *should* be able to slow time down. If only I had some undergrads to help, this is a lot of work and I haven\'t even had time to order a pizza - the most important element of research!'
        }, 
      ]
    );
    const d = new Date(1984, 0);
    d.setDate(d.getDate() + timeElapsed.value);
    workersMessage.timestamp = d.toISOString().split('T')[0];
    
    notification.create({
      title: workersMessage.title,
      content: () => h(TGameMessage, { messageSections: workersMessage.messageSections}),
      meta: workersMessage.timestamp,
      duration: GameConstants.NOTIFICATION_DURATION,
    });
    personList[PersonKey.LENNOX_OLD].messageList.unshift(workersMessage);
  }

  function sendEndOfWorldMessage() {
    //todo - this message stuff should probably have been done via a normal unlock, idk
    const endOfWorldMessage = new Message(
      'Uh oh', 
      [
        {
          person: 'Quantum Computer',
          text: 'Beep Boop. Detecting timelines. ALERT. ALERT. YOUR QUANTUM REALITY HAS SKEWED INTO A TANGENT. TIME IS ENDING. DOOMSDAY IMMINENT.',
        },
        {
          person: 'Lennox',
          text: 'Great Scott! What am I going to do? I\'ll need to invent a way to slow down time so that I have enough time to fix time!',
        }
      ]
    );
    const d = new Date(1984, 0);
    d.setDate(d.getDate() + timeElapsed.value);
    endOfWorldMessage.timestamp = d.toISOString().split('T')[0];

    notification.create({
      title: endOfWorldMessage.title,
      content: () => h(TGameMessage, { messageSections: endOfWorldMessage.messageSections}),
      meta: endOfWorldMessage.timestamp,
      duration: GameConstants.NOTIFICATION_DURATION,
    });
    personList[PersonKey.LENNOX_OLD].messageList.unshift(endOfWorldMessage);
  }

  function sendSlowdownMessage() {
    const message = new Message(
      'Unlocked slowdown', 
      [
        {
          person: 'Undergrad',
          text: 'Dr. Lennox. Dr. Lennox, take a look at this. It appears there is indeed a way to *add* more time before the Doomsday Event.',
        },
        {
          person: 'Lennox',
          text: 'I thought we were calling it the Doomsminute Event.',
        },
        {
          person: 'Undergrad',
          text: 'The media disagreed. What\'s important is that we can spend research to ADD time to the end of the clock. Buying us more time so that we can solve our time problem.',
        },
        {
          person: 'Lennox',
          text: 'Then it looks like it\'s time for the next phase.',
        }
      ]
    );
    const d = new Date(1984, 0);
    d.setDate(d.getDate() + timeElapsed.value);
    message.timestamp = d.toISOString().split('T')[0];

    notification.create({
      title: message.title,
      content: () => h(TGameMessage, { messageSections: message.messageSections}),
      meta: message.timestamp,
      duration: GameConstants.NOTIFICATION_DURATION,
    });
    personList[PersonKey.LENNOX_OLD].messageList.unshift(message);
  }

  function sendHalfwayMessage() {
    // const halfwayMessage = new Message(
    //   'HALFWAY THERE',
    //   'You are halfway to the end of the world.'
    // );
    // const d = new Date(1984, 0);
    // d.setDate(d.getDate() + timeElapsed.value);
    // halfwayMessage.timestamp = d.toISOString().split('T')[0];

    // notification.create({
    //   title: halfwayMessage.title,
    //   content: halfwayMessage.text,
    //   meta: halfwayMessage.timestamp,
    //   duration: GameConstants.NOTIFICATION_DURATION,
    // });
    // personList[PersonKey.LENNOX_OLD].messageList.unshift(halfwayMessage);
  }

  function sendUnlockMessage(unlock: Unlock, person: Person, name: string) {
    let message = unlock.message;
    //not every unlock needs a message
    // if(!message) {
    //   return;
    // }

    //default message?
    if(!message) {
      message = new Message(
        `Unlock`,
        [
          {
            text: `${name} unlocked.`
          }
        ],
      );
    }

    if(!message.wasSent) {
      message.wasSent = true;
    }
    else {
      return;
    }

    const d = new Date(person.year, 0);
    d.setDate(d.getDate() + timeElapsed.value);
    message.timestamp = d.toISOString().split('T')[0];
    //todo - this is hacky
    message.timestamp = message.timestamp.replace('1900-', '2524 BC ');

    notification.create({
      title: message.title,
      content: () => h(TGameMessage, { messageSections: message.messageSections}),
      meta: message.timestamp,
      duration: GameConstants.NOTIFICATION_DURATION,
    })
    person.messageList.unshift(message);
  }

  return {
    sendEndOfWorldMessage,
    sendHalfwayMessage,
    sendInitialMessage,
    sendSlowdownMessage,
    sendUnlockMessage,
    sendWorkersMessage,
    showTimeline,
  }
}
