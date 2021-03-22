import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from 'src/app/app.reducer';
import { Reminder } from 'src/app/models/reminder';
import * as reducer from './redux/reminder.reducer';
import * as reminderActions from './redux/reminder.actions';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit, OnDestroy {
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
    'color': new FormControl('red', Validators.required)
  });

  constructor(private _store: Store<AppState>) { }

  ngOnInit(): void {
    this.subs.add(this._store.select(reducer.reminderKey).subscribe(reminder => {
      this.formBuilder.reset();
      this.displayForm = reminder?.displayForm || false;
      this.reminderId = reminder?.reminderId || '';
      this.id = reminder?.id || '';
      this.mode = reminder?.mode || reducer.reminderMode.INSERT;
      if (reminder.reminder)
        this.reminders = [...reminder.reminder.filter(remind => remind.dateId == this.reminderId)];
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  addReminder() {
    let text = this.formBuilder.get('remind')!.value;
    let color = this.formBuilder.get('color')!.value;
    let reminder = new Reminder({
      id: this.reminderId + Date.now(),
      dateId: this.reminderId,
      remind: text,
      datetime: new Date(),
      color: color
    });
    this._store.dispatch(reminderActions.addReminder({ reminder: reminder }));
    this.formBuilder.reset();
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
    let reminder = new Reminder({
      id: this.id,
      dateId: this.reminderId,
      remind: text,
      datetime: new Date(),
      color: color
    });
    this._store.dispatch(reminderActions.editReminder({ reminder: reminder }));
  }

  reminderAction() {
    (this.mode == reducer.reminderMode.INSERT) ? this.addReminder() : this.editReminder();
  }

  edit(remind: Reminder) {
    this._store.dispatch(reminderActions.setModeReminder({ mode: reducer.reminderMode.EDIT, id: remind.id }));
    this.formBuilder.reset(remind);
  }

  showFormToggle() {
    this._store.dispatch(reminderActions.displayReminderForm({ displayForm: !this.displayForm, reminderId: this.reminderId, mode: reducer.reminderMode.INSERT }));
  }
}
