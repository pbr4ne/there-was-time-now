export class Message {
  personKey: string;
  key: string;
  name: string;
  text: string;
  timestamp: string;
  isRead: boolean = false;

  constructor(personKey: string, key: string, name: string, text: string, 
    timestamp: string) {
    this.personKey = personKey;
    this.key = key;
    this.name = name;
    this.text = text;
    this.timestamp = timestamp;
  }
}