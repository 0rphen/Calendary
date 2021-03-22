export class Reminder {
  id: string;
  remind: string;
  datetime: Date;
  dateId: string;
  color: string;

  constructor(obj: Reminder) {
    this.id = obj.id || '';
    this.remind = obj.remind || '';
    this.datetime = obj.datetime || new Date();
    this.dateId = obj.dateId || '';
    this.color = obj.color || 'red';
  }
}
