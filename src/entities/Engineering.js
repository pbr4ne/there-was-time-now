import Research from './Research'
//import Science from './Science'

export class Engineering extends Research {
  constructor(key, label, icon, color, isUnlocked, required) {
    super(key, label, icon, color, isUnlocked);

    this.required = required;
  }
}