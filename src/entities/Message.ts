export class Message {
  title: string;
  messageSections: Array<MessageSection>;
  timestamp: string = '';
  isRead: boolean = false;
  wasSent: boolean = false;

  constructor(title: string, messageSections: Array<MessageSection>) {
    this.title = title;
    this.messageSections = messageSections;
  }
}

export class MessageSection {
  person?: string;
  text: string;

  constructor(text: string, person?:string) {
    if(typeof person !== undefined) {
      this.person = person;
    }
    this.text = text;
  }
}
