import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/app.reducer';
import { Reminder } from 'src/app/models/reminder';
import { monthKey } from '../month/redux/month.reducer';
import * as reminderActions from './redux/reminder.actions';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {
  reminderId: string = '';
  isReminder: boolean = false;

  formBuilder: FormGroup = new FormGroup({
    'reminder': new FormControl('', [Validators.maxLength(30), Validators.required])
  });

  constructor(private _store: Store<AppState>) { }

  ngOnInit(): void {
    this._store.select(monthKey).subscribe(month => {
      this.isReminder = month.isReminder;
      this.reminderId = month.id;
      this.formBuilder.reset();
    });
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
}
