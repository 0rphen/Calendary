import { Day } from "./day";

export class Week {
  days: Day[]

  constructor(obj: Week) {
    this.days = obj.days || [];
  }
}
