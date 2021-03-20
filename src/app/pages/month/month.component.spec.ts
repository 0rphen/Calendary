import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';

import { MonthComponent } from './month.component';
import { DayComponent } from './day/day.component';

describe('MonthComponent', () => {
  let component: MonthComponent;
  let fixture: ComponentFixture<MonthComponent>;
  const initialState = {
    months: {
      days: [
        {
          id: 'Sun Feb 28 2021',
          day: 28,
          isDisabled: false
        },
        {
          id: 'Mon Mar 01 2021',
          day: 1,
          isDisabled: true
        }
      ]
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthComponent, DayComponent],
      providers: [
        provideMockStore({ initialState })
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate Weeks', () => {
    component.generateWeeks();
    expect(fixture.debugElement.queryAll(By.css('.day')).length).toBe(9);
  });
});
