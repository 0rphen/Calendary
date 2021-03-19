import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-schedulers',
  templateUrl: './schedulers.component.html',
  styleUrls: ['./schedulers.component.css']
})
export class SchedulersComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
