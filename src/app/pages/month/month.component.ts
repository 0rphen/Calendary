import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as monthActions from './redux/month.actions';
import { Day } from 'src/app/models/day';
import { Week } from 'src/app/models/week';
import { monthKey } from './redux/month.reducer';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {
  weeks: Week[] = [];
  date: Date = new Date();
  constructor(private _store: Store<AppState>) { }

  ngOnInit(): void {
    this.generateWeeks();
    this._store.select(monthKey).subscribe(months => {
      let days = months.days;
      this.weeks = [];
      for (let i = 0; i < days.length; i += 7) {
        let week: Week = new Week({ days: days.slice(i, i + 7) });
        this.weeks.push(week);
      }
    });
  }

  generateWeeks(): void {
    let firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    let lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
    let days: Day[] = [];
    if (firstDay.getDay() != 0)
      for (let i = 1; i <= firstDay.getDay(); i++) {
        let day = (firstDay.getDay() - i) * - 1;
        let date = new Date(this.date.getFullYear(), this.date.getMonth(), day).getDate();
        days.push(this.genDay(date, this.date.getMonth() - 1, false));
      }
    for (let i = 1; i <= lastDay.getDate(); i++)
      days.push(this.genDay(i, this.date.getMonth(), true));
    if (lastDay.getDay() != 6)
      for (let i = 1; i <= 6 - lastDay.getDay(); i++)
        days.push(this.genDay(i, this.date.getMonth() + 1, false));
    this._store.dispatch(monthActions.addDays({ days: days }))
  }

  genDay(day: number, month: number, isDisabled: boolean): Day {
    let id: string = new Date(this.date.getFullYear(), month, day).toDateString();
    return new Day({ day, isDisabled, id });
  }
}