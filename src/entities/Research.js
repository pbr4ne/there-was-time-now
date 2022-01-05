export class Research {
  constructor(key, label, icon, color, isUnlocked, unlocks) {
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

