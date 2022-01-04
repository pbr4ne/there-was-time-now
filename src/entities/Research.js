export class Research {
  constructor(key, label, icon, color, isUnlocked) {
    this.key = key;
    this.label = label;
    this.icon = icon;
    this.color = color;
    this.isUnlocked = isUnlocked;

    this.total = 0;
    this.current = 0;
    this.isIncrementing = false;
  }
}

