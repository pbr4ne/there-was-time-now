export class Message {
  key: string;
  title: string;
  text: string;
  timestamp: string;
  isRead: boolean = false;

  constructor(key: string, title: string, text: string, timestamp: string) {
    this.key = key;
    this.title = title;
    this.text = text;
    this.timestamp = timestamp;
  }
}