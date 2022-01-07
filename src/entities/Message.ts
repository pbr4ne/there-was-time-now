export class Message {
  personKey: string;
  key: string;
  name: string;
  text: string;
  timestamp: string;
  isRead: Boolean;

  constructor(personKey: string, key: string, name: string, text: string, 
    timestamp: string, isRead: boolean) {
    this.personKey = personKey;
    this.key = key;
    this.name = name;
    this.text = text;
    this.timestamp = timestamp;
    this.isRead = isRead;
  }
}