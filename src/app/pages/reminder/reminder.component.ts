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

  formBuilder: FormGroup = new FormGroup({
    'reminder': new FormControl('', [Validators.maxLength(30), Validators.required])
  });

  constructor(private _store: Store<AppState>) { }

  ngOnInit(): void {
    this.subs.add(this._store.select(monthKey).subscribe(month => {
      this.isReminder = month.isReminder;
      this.reminderId = month.id;
      this.formBuilder.reset();
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
    let reminder = new Reminder({
      dateId: this.reminderId,
      remind: text,
      datetime: new Date()
    })
    this._store.dispatch(reminderActions.addReminder({ reminder: reminder }));
    this.formBuilder.reset();
    this.isReminder = false;
  }

  removeReminder(remind: Reminder) {
    this._store.dispatch(reminderActions.removeReminder({ reminder: remind }));
  }
}
