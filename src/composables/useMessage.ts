import { useNotification } from 'naive-ui'
import { GameConstants } from '@/enum/Constants'
import { Person } from '@/entities/Person'
import { Unlock } from '@/entities/Unlock'

export default function useMessage() {
  const notification = useNotification();

  function sendUnlockMessage(unlock: Unlock, person: Person) {
    const message = unlock.message;
    notification.create({
      title: message.name,
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
