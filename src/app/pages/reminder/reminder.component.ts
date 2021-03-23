import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from 'src/app/app.reducer';
import { Reminder } from 'src/app/models/reminder';
import * as reducer from './redux/reminder.reducer';
import * as reminderActions from './redux/reminder.actions';
import { PValidatorsService } from 'src/app/services/p-validators.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit, OnDestroy {
  hasTime: boolean = true;
  reminderId: string = '';
  displayForm: boolean = false;
  reminders: Reminder[] = [];
  subs: Subscription = new Subscription();
  isEdit: boolean = false;
  id: string = '';
  mode: reducer.reminderMode = reducer.reminderMode.INSERT;
  colors: string[] = ['red', 'blue', 'green', 'gray', 'indigo', 'purple', 'pink'];

  formBuilder: FormGroup = new FormGroup({
    'remind': new FormControl('', [Validators.maxLength(30), Validators.required]),
    'color': new FormControl('red', Validators.required),
    'from': new FormControl('', Validators.required),
    'to': new FormControl('', Validators.required)
  }, { validators: this._pValidService.overTime('from', 'to') });

  constructor(private _store: Store<AppState>, private _pValidService: PValidatorsService) { }

  ngOnInit(): void {
    this.subs.add(this._store.select(reducer.reminderKey).subscribe(reminder => {
      if (reminder?.hasTime) this.formBuilder.reset();
      this.displayForm = reminder?.displayForm || false;
      this.reminderId = reminder?.reminderId || '';
      this.id = reminder?.id || '';
      this.mode = reminder?.mode || reducer.reminderMode.INSERT;
      this.hasTime = reminder?.hasTime;
      if (reminder.reminder)
        this.reminders = [...reminder.reminder.filter(remind => remind.dateId == this.reminderId)];
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  addReminder(): void {
    let text = this.formBuilder.get('remind')!.value;
    let color = this.formBuilder.get('color')!.value;
    let dateFrom = this.stringToDate(this.formBuilder.get('from')!.value);
    let dateTo = this.stringToDate(this.formBuilder.get('to')!.value);
    let id = this.reminderId + Date.now();
    let reminder = new Reminder({
      id: id,
      dateId: this.reminderId,
      remind: text,
      datetimeFrom: dateFrom,
      datetimeTo: dateTo,
      color: color
    });
    if (this.hasTimeDate(dateFrom, dateTo, id)) {
      this._store.dispatch(reminderActions.addReminder({ reminder: reminder }));
      this.formBuilder.reset();
    } else
      this._store.dispatch(reminderActions.setNoHasTime());
  }

  removeReminder(remind: Reminder) {
    this._store.dispatch(reminderActions.removeReminder({ id: remind.id }));
  }

  removeAllReminder() {
    this._store.dispatch(reminderActions.removeAllReminder({ reminderId: this.reminderId }));
  }

  editReminder() {
    let text = this.formBuilder.get('remind')!.value;
    let color = this.formBuilder.get('color')!.value;
    let dateFrom = this.stringToDate(this.formBuilder.get('from')!.value);
    let dateTo = this.stringToDate(this.formBuilder.get('to')!.value);
    let reminder = new Reminder({
      id: this.id,
      dateId: this.reminderId,
      remind: text,
      datetimeFrom: dateFrom,
      datetimeTo: dateTo,
      color: color
    });
    if (this.hasTimeDate(dateFrom, dateTo, this.id))
      this._store.dispatch(reminderActions.editReminder({ reminder: reminder }));
    else
      this._store.dispatch(reminderActions.setNoHasTime());
  }

  reminderAction() {
    (this.mode == reducer.reminderMode.INSERT) ? this.addReminder() : this.editReminder();
  }

  edit(remind: Reminder) {
    this._store.dispatch(reminderActions.setModeReminder({ mode: reducer.reminderMode.EDIT, id: remind.id }));
    this.formBuilder.reset(remind);
    let dateFrom = this.dateToString(remind.datetimeFrom);
    let dateTo: string = this.dateToString(remind.datetimeTo);
    this.formBuilder.get('from')?.setValue(dateFrom);
    this.formBuilder.get('to')?.setValue(dateTo);
  }

  showFormToggle() {
    this._store.dispatch(reminderActions.displayReminderForm({ displayForm: !this.displayForm, reminderId: this.reminderId, mode: reducer.reminderMode.INSERT }));
  }

  stringToDate(time: string): Date {
    let fecha: Date = new Date();
    let array = time.split(':');
    fecha.setHours(+array[0]);
    fecha.setMinutes(+array[1]);
    return fecha;
  }

  dateToString(item: Date): string {
    let hour: string = item.getHours().toString().padStart(2, '0');
    let minutes: string = item.getMinutes().toString().padStart(2, '0');
    return hour + ':' + minutes;
  }

  hasTimeDate(dateFrom: Date, dateTo: Date, id: string): boolean {
    let isEmpty: boolean = true;
    this.reminders.forEach(reminder => {
      if (((dateTo >= reminder.datetimeFrom && dateFrom < reminder.datetimeTo) ||
        (dateTo < reminder.datetimeFrom && dateFrom >= reminder.datetimeTo)) &&
        id !== reminder.id)
        isEmpty = false;
    })
    return isEmpty;
  }
}
