import { GameStateMessage } from '@/dto/GameStateMessage'

export class GameStatePerson {
  key: string;
  isUnlocked: boolean;
  messageList: Array<GameStateMessage>;

  constructor(key: string, isUnlocked: boolean, messageList: any) {
    this.key = key;
    this.isUnlocked = isUnlocked;
    this.messageList = messageList;
  }
}