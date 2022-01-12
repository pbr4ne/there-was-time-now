//todo - convert this file back to typescript
import { h, ref } from 'vue'
import { useNotification } from 'naive-ui'
import TGameMessage from '@/components/TGameMessage.vue'
import useInitialize from '@/composables/useInitialize'
import useTime from '@/composables/useTime'
import { GameConstants } from '@/enum/Constants'
import { PersonKey } from '@/enum/Enums'
import { Message } from '@/entities/Message'
import { messages } from '@/locales/en'

const showTimeline = ref(false);

function createNotification(message, notification) {
  notification.create({
    title: message.title,
    content: () => h(TGameMessage, { messageSections: message.messageSections}),
    meta: message.timestamp,
    duration: GameConstants.NOTIFICATION_DURATION,
  });
}

function setTimestamp(message, timeElapsed) {
  const d = new Date(1984, 0);
  d.setDate(d.getDate() + timeElapsed.value);
  message.timestamp = d.toISOString().split('T')[0];
}

export default function useMessage() {
  const notification = useNotification();
  const { personList } = useInitialize();
  const { timeElapsed } = useTime();

  function sendMessage(key) {
    const message = messages[key];
    setTimestamp(message, timeElapsed);
    message.isRead = true;
    createNotification(message, notification);
    personList[PersonKey.LENNOX_OLD].messageList.unshift(message);
    return message;
  }

  const sendInitialMessage = () => sendMessage('initial');
  const sendWorkersMessage = () => sendMessage('unlockWorkers');
  const sendEndOfWorldMessage = () => sendMessage('unlockCountdown');
  const sendSlowdownMessage = () => sendMessage('unlockSlowdown');
  const sendHalfwayMessage = () => sendMessage('halfway');

  function sendUnlockMessage(unlock, person, name) {
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
