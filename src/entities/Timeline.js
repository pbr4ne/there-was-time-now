export class Timeline {
  constructor(personKey, key, name, text, timestamp, isRead) {
    this.personKey = personKey;
    this.key = key;
    this.name = name;
    this.text = text;
    this.timestamp = timestamp;
    this.isRead = isRead;
  }
}