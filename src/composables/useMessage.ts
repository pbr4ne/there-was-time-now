import { h, ref } from 'vue'
import { useDialog, NIcon } from 'naive-ui'
import { AccessTimeOutlined as TimeIcon } from '@vicons/material'
import TGameMessage from '@/components/TGameMessage.vue'
import useInitialize from '@/composables/useInitialize'
import usePause from '@/composables/usePause'
import useTime from '@/composables/useTime'
import { PersonKey,  NarrativeKey } from '@/enum/Enums'
import { messages } from '@/locales/en'
import { Message } from '@/entities/Message'
import { Person } from '@/entities/Person'
import { Research } from '@/entities/Research'

const showTimeline = ref(false);

//todo - functions are inconsistent whether they want objects or keys
export default function useMessage() {
  const dialog = useDialog();
  const { personList } = useInitialize();
  const { pause, unpause } = usePause();
  const { timeElapsed } = useTime();

  const createNotification = (message: Message) => {
    pause();
    const dialogIcon = message.icon? message.icon : TimeIcon;
    const style = message.color? { color: message.color } : {}; 
    dialog.create({
      title: message.title,
      content: () => h(TGameMessage, { messageList: [message] }),
      icon: () => h(NIcon, style, { default: () => h(dialogIcon) }),
      maskClosable: false,
      closable: false,
      positiveText: "OK!",
      onPositiveClick: unpause,
    });
  }

  const createNotificationMultipleMessages = (messageList: Array<Message>) => {
    pause();
    dialog.create({
      title: 'Unlocked Multiple',
      content: () => h(TGameMessage, { messageList, displayMessageTitle: true, }),
      icon: () => h(NIcon, null, { default: () => h(TimeIcon) }),
      maskClosable: false,
      closable: false,
      positiveText: "OK!",
      onPositiveClick: unpause,
    });
  }
  
  const setTimestamp = (message: Message, year: number, timeElapsed: any) => {
    const d = new Date(year, 0);
    d.setDate(d.getDate() + timeElapsed.value);
    message.timestamp = d.toISOString().split('T')[0];
    //todo - this is hacky
    message.timestamp = message.timestamp.replace('1900-', '2524 BC ');
  }

  const sendInitialMessage = () => sendNarrativeMessage(messages[NarrativeKey.INTRO], [PersonKey.LENNOX_OLD]);

  const sendUnlockMessages = (unlocks: Array<any>) => {
    const messageList = new Array<Message>();
    unlocks.forEach((unlock) => {
      const message = messages[unlock.research.key];
      message.wasSent = true;
      message.icon = unlock.research.icon;
      message.color = unlock.research.color;
      const person = unlock.person;

      setTimestamp(message, person.year, timeElapsed);
      person.messageList.unshift(message);
      messageList.push(message);
    });
    createNotificationMultipleMessages(messageList);
  }

  const sendUnlockMessage = (research: Research, person: Person) => {
    const message = messages[research.key];
    message.wasSent = true;
    message.icon = research.icon;
    message.color = research.color;
    createNotification(message);

    setTimestamp(message, person.year, timeElapsed);
    person.messageList.unshift(message);
  }

  const sendNarrativeMessage = (message: Message, personKeyList: Array<PersonKey>) => {
    message.wasSent = true;
    createNotification(message);

    personKeyList.forEach(personKey => {
      const personSpecificMessage = { ...message };
      const person = personList[personKey];
      setTimestamp(personSpecificMessage, person.year, timeElapsed);
      person.messageList.unshift(personSpecificMessage);
    });
  }

  return {
    sendInitialMessage,
    sendNarrativeMessage,
    sendUnlockMessage,
    sendUnlockMessages,
    showTimeline,
  }
}
