export class Unlockable {
  isUnlocked: boolean = false;
  unlockedBy: string = null!;
  unlockThreshold: number = 0;

  setUnlock(unlockedBy: string, unlockThreshold: number) {
    this.unlockedBy = unlockedBy;
    this.unlockThreshold = unlockThreshold;
  }
}