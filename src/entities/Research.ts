export class Research {
  key: String;
  label: String;
  icon: Object;
  color: String;
  isUnlocked: Boolean;

  unlocks: Object;
  total: number;
  current: number;
  isIncrementing: Boolean;

  constructor(key: String, label: String, icon: Object, color: String, 
    isUnlocked: Boolean, unlocks: Object) {
    this.key = key;
    this.label = label;
    this.icon = icon;
    this.color = color;
    this.isUnlocked = isUnlocked;

    /* example
      [
        {
          type: 'person',
          key: 'lennox-young',
          threshold: 5,
        }
      ]
    */
    this.unlocks = unlocks;

    this.total = 0;
    this.current = 0;
    this.isIncrementing = false;
  }
}

