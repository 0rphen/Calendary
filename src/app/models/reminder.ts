export class Reminder {
  id: string;
  remind: string;
  datetimeFrom: Date;
  datetimeTo: Date;
  dateId: string;
  color: string;

  constructor(obj: Reminder) {
    this.id = obj.id || '';
    this.remind = obj.remind || '';
    this.datetimeFrom = obj.datetimeFrom || new Date();
    this.datetimeTo = obj.datetimeTo || new Date();
    this.dateId = obj.dateId || '';
    this.color = obj.color || 'red';
  }
}
