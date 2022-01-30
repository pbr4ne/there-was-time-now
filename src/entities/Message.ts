export class Message {
  title: string;
  messageSections: Array<MessageSection>;
  timestamp: string = '';
  isRead: boolean = false;
  wasSent: boolean = false;
  icon: any = null;
  color: string = '';

  constructor(title: string, messageSections: Array<MessageSection>, icon?: any, color?: string) {
    this.title = title;
    this.messageSections = messageSections;
    this.icon = icon;
    this.color = color!;
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
