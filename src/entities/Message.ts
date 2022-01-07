export class Message {
  key: string;
  name: string;
  text: string;
  timestamp: string;
  isRead: boolean = false;

  constructor(key: string, name: string, text: string, timestamp: string) {
    this.key = key;
    this.name = name;
    this.text = text;
    this.timestamp = timestamp;
  }
}