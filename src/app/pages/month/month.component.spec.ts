import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';

import { MonthComponent } from './month.component';
import { DayComponent } from './day/day.component';

import * as reducer from './redux/month.reducer';
import * as reducerAction from './redux/month.actions';
import { Day } from 'src/app/models/day';

describe('MonthComponent', () => {
  let component: MonthComponent;
  let fixture: ComponentFixture<MonthComponent>;
  let store: MockStore;
  const initialState = {
    months: {
      actualMonth: 3,
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
    store = TestBed.inject(MockStore);
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
    expect(fixture.debugElement.queryAll(By.css('.day')).length).toBe(9);
  });

  it('should get next month', () => {
    let spy = spyOn(component, 'generateWeeks').and.callFake(() => { });
    component.nextMonth();
    expect(spy).toHaveBeenCalled();
  });

  it('should get prev month', () => {
    let spy = spyOn(component, 'generateWeeks').and.callFake(() => { });
    component.prevMonth();
    expect(spy).toHaveBeenCalled();
  });

  it('should get id on actionReminder', () => {
    component.actionReminder('123');
    expect(component).toBeTruthy();
  });

  it('should dispatch addDays', () => {
    const days: Array<Day> = [
      {
        id: '1234',
        day: 1,
        date: 1,
        schedule: ['test1', 'test2'],
        isDisabled: true
      }
    ];
    const action = reducerAction.addDays({ days: days });
    const state = reducer.monthReducer(reducer.initialState, action);
    expect(state.days).toEqual(days);
  });

  it('should dispatch nextMonth', () => {
    const initState = {
      actualMonth: 3,
      days: [
        {
          id: 'Sun Feb 28 2021',
          day: 28,
          isDisabled: false
        }
      ]
    };
    const action = reducerAction.nextMonth();
    const state = reducer.monthReducer(initState, action);
    expect(state.actualMonth).toEqual(4);
  });

  it('should dispatch prevMonth', () => {
    const initState = {
      actualMonth: 3,
      days: [
        {
          id: 'Sun Feb 28 2021',
          day: 28,
          isDisabled: false
        }
      ]
    };
    const action = reducerAction.prevMonth();
    const state = reducer.monthReducer(initState, action);
    expect(state.actualMonth).toEqual(2);
  });
});
