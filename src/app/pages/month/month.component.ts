import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as monthActions from './redux/month.actions';
import { Day } from 'src/app/models/day';
import { Week } from 'src/app/models/week';
import { monthKey } from './redux/month.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit, OnDestroy {
  weeks: Week[] = [];
  date: Date = new Date();
  subs: Subscription = new Subscription();
  month: number = new Date().getMonth();
  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor(private _store: Store<AppState>) { }

  ngOnInit(): void {
    this.generateWeeks();
    this.subs.add(this._store.select(monthKey).subscribe(months => {
      let days = months.days;
      this.weeks = [];
      this.month = months.actualMonth;
      for (let i = 0; i < days.length; i += 7) {
        let week: Week = new Week({ days: days.slice(i, i + 7) });
        this.weeks.push(week);
      }
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  prevMonth() {
    this._store.dispatch(monthActions.prevMonth());
    this.generateWeeks();
  }
  nextMonth() {
    this._store.dispatch(monthActions.nextMonth());
    this.generateWeeks();
  }

  generateWeeks(): void {
    let firstDay = new Date(this.date.getFullYear(), this.month, 1);
    let lastDay = new Date(this.date.getFullYear(), this.month + 1, 0);
    let days: Day[] = [];
    if (firstDay.getDay() != 0)
      for (let i = 1; i <= firstDay.getDay(); i++) {
        let day = (firstDay.getDay() - i) * - 1;
        let date = new Date(this.date.getFullYear(), this.month, day).getDate();
        days.push(this.genDay(date, this.month - 1, false));
      }
    for (let i = 1; i <= lastDay.getDate(); i++)
      days.push(this.genDay(i, this.month, true));
    if (lastDay.getDay() != 6)
      for (let i = 1; i <= 6 - lastDay.getDay(); i++)
        days.push(this.genDay(i, this.month + 1, false));
    this._store.dispatch(monthActions.addDays({ days: days }))
  }

  genDay(day: number, month: number, isDisabled: boolean): Day {
    let id: string = new Date(this.date.getFullYear(), month, day).toDateString();
    return new Day({ day, isDisabled, id });
  }

  actionReminder(id: string) {
    this._store.dispatch(monthActions.setReminder({ isReminder: true, id: id }));
  }
}
