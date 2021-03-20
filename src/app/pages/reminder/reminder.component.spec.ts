import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { ReminderComponent } from './reminder.component';
import * as reducer from './redux/reminder.reducer';
import * as reducerAction from './redux/reminder.actions';
import { Reminder } from 'src/app/models/reminder';

describe('ReminderComponent', (): void => {
  let component: ReminderComponent;
  let fixture: ComponentFixture<ReminderComponent>;
  const { initialState } = reducer;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [ReminderComponent],
      providers: [provideMockStore({ initialState })]
    })
      .compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(ReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should create new reminder', (): void => {
    const stateAction: Reminder = {
      remind: 'dentist',
      datetime: new Date(),
      dateId: 'Mon Mar 01 2021',
      color: 'red'
    };
    const stateFinish = {
      reminder: [
        {
          remind: 'dentist',
          datetime: new Date(),
          dateId: 'Mon Mar 01 2021',
          color: 'red'
        }
      ]
    };
    const action = reducerAction.addReminder({ reminder: stateAction });
    const state = reducer.reminderReducer(initialState, action);
    expect(state).toEqual(stateFinish);
  });

  it('should delete reminder', () => {
    const stateAction: Reminder = {
      remind: 'dentist',
      datetime: new Date(),
      dateId: 'Mon Mar 01 2021',
      color: 'red'
    };
    const initState: reducer.State = {
      reminder: [
        stateAction
      ]
    };
    const action = reducerAction.removeReminder({ reminder: stateAction });
    const state = reducer.reminderReducer(initState, action);
    expect(state).toEqual(initialState);
  })
});
