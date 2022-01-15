import { h, ref } from 'vue'
import { useDialog, NIcon } from 'naive-ui'
import { AccessTimeOutlined as TimeIcon } from '@vicons/material'
import TGameMessage from '@/components/TGameMessage.vue'
import useInitialize from '@/composables/useInitialize'
import useTime from '@/composables/useTime'
import { PersonKey,  NarrativeKey } from '@/enum/Enums'
import { messages } from '@/locales/en'
//todo convert back to typescript
const showTimeline = ref(false);

function createNotification(message, dialog) {
  dialog.create({
    title: message.title,
    content: () => h(TGameMessage, { messageSections: message.messageSections}),
    positiveText: "OK!",
    maskClosable: false,
    icon: () => h(NIcon, null, { default: () => h(TimeIcon) })
  });
}

function setTimestamp(message, year, timeElapsed) {
  const d = new Date(year, 0);
  d.setDate(d.getDate() + timeElapsed.value);
  message.timestamp = d.toISOString().split('T')[0];
  //todo - this is hacky
  message.timestamp = message.timestamp.replace('1900-', '2524 BC ');
}

export default function useMessage() {
  const dialog = useDialog();
  const { personList } = useInitialize();
  const { timeElapsed } = useTime();

  function sendMessage(message, person) {
    if(!message.wasSent){
      setTimestamp(message, person.year, timeElapsed);
      createNotification(message, dialog);
      person.messageList.unshift(message);
    }
  }

  const sendInitialMessage = () => sendNarrativeMessage(messages[NarrativeKey.INTRO]);

  function sendUnlockMessage(key, person) {
    let message = messages[key];
    if(!message) {
      return;
    }

    if(!message.wasSent) {
      message.wasSent = true;
      sendMessage(message, person);
    }
    else {
      return;
    }
  }

  function sendNarrativeMessage(message) {
    sendMessage(message, personList[PersonKey.LENNOX_OLD]);
  }

  return {
    sendInitialMessage,
    sendNarrativeMessage,
    sendUnlockMessage,
    showTimeline,
  }
}
