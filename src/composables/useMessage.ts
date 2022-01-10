import { useNotification } from 'naive-ui'
import useInitialize from '@/composables/useInitialize'
import useTime from '@/composables/useTime'
import { GameConstants } from '@/enum/Constants'
import { PersonKey } from '@/enum/Enums'
import { Message } from '@/entities/Message'
import { Person } from '@/entities/Person'
import { Unlock } from '@/entities/Unlock'

//todo - less code duplication
export default function useMessage() {
  const notification = useNotification();
  const { personList } = useInitialize();
  const { timeElapsed } = useTime();

  function sendInitialMessage() {
    const initialMessage = new Message(
      '1984',
      'The year is 1984. You are Lennox, a physicist researching the most cutting-edge technology: Quantum Computing! With enough research, you should be able to build your own Quantum Computer. Let’s get started…',
    );
    initialMessage.isRead = true;
    initialMessage.timestamp = '1984-01-01';
    
    notification.create({
      title: initialMessage.title,
      content: initialMessage.text,
      meta: initialMessage.timestamp,
      duration: GameConstants.NOTIFICATION_DURATION,
    });
    personList[PersonKey.LENNOX_OLD].messageList.push(initialMessage);
  }

  function sendEndOfWorldMessage() {
    //todo - this message stuff should probably have been done via a normal unlock, idk
    const endOfWorldMessage = new Message(
      'Whoaaaa', 
      'Quantum Computer: Beep Boop. Detecting timelines. ALERT. ALERT. YOUR QUANTUM REALITY HAS SKEWED INTO A TANGENT. TIME IS ENDING. DOOMSDAY IMMINENT.'
    );
    const d = new Date(1984, 0);
    d.setDate(d.getDate() + timeElapsed.value);
    endOfWorldMessage.timestamp = d.toISOString().split('T')[0];

    notification.create({
      title: endOfWorldMessage.title,
      content: endOfWorldMessage.text,
      meta: endOfWorldMessage.timestamp,
      duration: GameConstants.NOTIFICATION_DURATION,
    });
    personList[PersonKey.LENNOX_OLD].messageList.unshift(endOfWorldMessage);
  }

  function sendHalfwayMessage() {
    const halfwayMessage = new Message(
      'HALFWAY THERE',
      'You are halfway to the end of the world.'
    );
    const d = new Date(1984, 0);
    d.setDate(d.getDate() + timeElapsed.value);
    halfwayMessage.timestamp = d.toISOString().split('T')[0];

    notification.create({
      title: halfwayMessage.title,
      content: halfwayMessage.text,
      meta: halfwayMessage.timestamp,
      duration: GameConstants.NOTIFICATION_DURATION,
    });
    personList[PersonKey.LENNOX_OLD].messageList.unshift(halfwayMessage);
  }

  function sendUnlockMessage(unlock: Unlock, person: Person) {
    const message = unlock.message;
    //not every unlock needs a message
    if(!message) {
      return;
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
    notification.create({
      title: message.title,
      content: message.text,
      meta: message.timestamp,
      duration: GameConstants.NOTIFICATION_DURATION,
    })
    person.messageList.unshift(message);
  }

  return {
    sendEndOfWorldMessage,
    sendHalfwayMessage,
    sendInitialMessage,
    sendUnlockMessage,
  }
}
