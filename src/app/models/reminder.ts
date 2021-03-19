export class Reminder {
  remind: string;
  datetime: Date;
  dateId: string;

  constructor(obj: Reminder) {
    this.remind = obj.remind || '';
    this.datetime = obj.datetime || new Date();
    this.dateId = obj.dateId || '';
  }
}
