export class Day {
  id: string;
  day: number;
  date?: number;
  schedule?: string[];
  isDisabled: boolean;
  constructor(obj: Day) {
    this.id = obj.id || '';
    this.day = obj.day || 0;
    this.isDisabled = obj.isDisabled || false;
  }
}
