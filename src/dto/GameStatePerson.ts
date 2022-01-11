export class GameStatePerson {
  key: string;
  isUnlocked: boolean;
  messageList: any;

  constructor(key: string, isUnlocked: boolean, messageList: any) {
    this.key = key;
    this.isUnlocked = isUnlocked;
    this.messageList = messageList;
  }
}