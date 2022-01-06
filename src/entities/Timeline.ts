export class Timeline {
  personKey: String;
  key: String;
  name: String;
  text: String;
  timestamp: String;
  isRead: Boolean;

  constructor(personKey: String, key: String, name: String, text: String, 
    timestamp: String, isRead: boolean) {
    this.personKey = personKey;
    this.key = key;
    this.name = name;
    this.text = text;
    this.timestamp = timestamp;
    this.isRead = isRead;
  }
}