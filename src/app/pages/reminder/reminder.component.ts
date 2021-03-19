import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-schedulers',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {
  formBuilder: FormGroup = new FormGroup({
    'remidner': new FormControl('', Validators.maxLength(30))
  });

  constructor(private _store: Store<AppState>) { }

  ngOnInit(): void {

  }

}
