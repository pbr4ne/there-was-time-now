export class Message {
  title: string;
  text: string;
  timestamp: string;
  isRead: boolean = false;

  constructor(title: string, text: string, timestamp: string) {
    this.title = title;
    this.text = text;
    this.timestamp = timestamp;
  }
}