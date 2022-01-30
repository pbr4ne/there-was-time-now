export class GameStateMessage {
  key: string;
  timestamp: string;
  isRead: boolean;
  wasSent: boolean;

  constructor(key: string, timestamp: string, isRead: boolean, wasSent: boolean) {
    this.key = key;
    this.timestamp = timestamp;
    this.isRead = isRead;
    this.wasSent = wasSent;
  }
}
