import { useNotification } from 'naive-ui'
import useTime from '@/composables/useTime'
import { GameConstants } from '@/enum/Constants'
import { Person } from '@/entities/Person'
import { Unlock } from '@/entities/Unlock'

export default function useMessage() {
  const notification = useNotification();
  const { timeElapsed } = useTime();

  function sendUnlockMessage(unlock: Unlock, person: Person) {
    const message = unlock.message;
    //not every unlock needs a message
    if(!message) {
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
    sendUnlockMessage,
  }
}
