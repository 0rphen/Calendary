import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Reminder } from 'src/app/models/reminder';
import { getReminderById } from '../../reminder/redux/reminder.selector';
import { getDayById } from '../redux/month.selectors';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit, OnDestroy {
  @Input() day: number | undefined;
  @Input() id: string | undefined;
  isDisabled: boolean = true;
  reminders: Reminder[] = [];
  subs: Subscription = new Subscription();

  constructor(private _store: Store<AppState>) {
  }

  ngOnInit(): void {
    if (this.id != undefined) {
      this.subs.add(this._store.select(getDayById(this.id)).subscribe((day) => {
        if (day?.isDisabled !== undefined)
          this.isDisabled = day.isDisabled;
      }));
      this.subs.add(this._store.select(getReminderById(this.id)).subscribe(reminder => {
        if (reminder.length >= 0)
          this.reminders = [...reminder];
      }));
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
