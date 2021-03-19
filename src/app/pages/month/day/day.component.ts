import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { getDayById } from '../redux/month.selectors';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  @Input() day: number | undefined;
  @Input() id: string | undefined;
  isDisabled: boolean = true;

  constructor(private _store: Store<AppState>) {
  }

  ngOnInit(): void {
    if (this.id == undefined) this.id = '';
    this._store.select(getDayById(this.id)).subscribe((day) => {
      if (day?.isDisabled !== undefined)
        this.isDisabled = day.isDisabled;
    })
  }
}
