import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from 'src/app/app.reducer';
import { Reminder } from 'src/app/models/reminder';
import { monthKey } from '../month/redux/month.reducer';
import * as reminderActions from './redux/reminder.actions';
import { getReminderById } from './redux/reminder.selector';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit, OnDestroy {
  reminderId: string = '';
  isReminder: boolean = false;
  reminders: Reminder[] = [];
  subs: Subscription = new Subscription();
  editIndex: number = 0;
  isEdit: boolean = false;

  formBuilder: FormGroup = new FormGroup({
    'reminder': new FormControl('', [Validators.maxLength(30), Validators.required]),
    'color': new FormControl('red', Validators.required)
  });
  colors: string[] = ['red', 'blue', 'gray', 'indigo', 'purple', 'pink'];

  constructor(private _store: Store<AppState>) { }

  ngOnInit(): void {
    this.subs.add(this._store.select(monthKey).subscribe(month => {
      this.isReminder = month?.isReminder || false;
      this.reminderId = month?.id || '';
      this.formBuilder.reset();
      this.isEdit = month?.isEdit || false;
      if (this.reminderId)
        this._store.select(getReminderById(this.reminderId)).subscribe(reminders => {
          this.reminders = [...reminders];
        });
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  addReminder() {
    let text = this.formBuilder.get('reminder')?.value || '';
    let color = this.formBuilder.get('color')?.value || 'red';
    let reminder = new Reminder({
      dateId: this.reminderId,
      remind: text,
      datetime: new Date(),
      color: color
    })
    this._store.dispatch(reminderActions.addReminder({ reminder: reminder }));
    this.formBuilder.reset();
    this.isReminder = false;
  }

  removeReminder(remind: Reminder) {
    this._store.dispatch(reminderActions.removeReminder({ reminder: remind }));
  }

  editReminder() {
    let text = this.formBuilder.get('reminder')?.value || '';
    let color = this.formBuilder.get('color')?.value || 'red';
    let reminder = new Reminder({
      dateId: this.reminderId,
      remind: text,
      datetime: new Date(),
      color: color
    })
    this._store.dispatch(reminderActions.editReminder({ reminder: reminder, index: this.editIndex }));
    this.isEdit = false;
    this.isReminder = false;
  }

  edit(remind: Reminder, index: number) {
    this.editIndex = index;
    this.formBuilder.get('reminder')?.setValue(remind.remind);
    this.isEdit = true;
  }
}
