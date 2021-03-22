import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { ReminderComponent } from './reminder.component';
import * as reducer from './redux/reminder.reducer';
import * as reducerAction from './redux/reminder.actions';
import { Reminder } from 'src/app/models/reminder';

describe('ReminderComponent', (): void => {
  let component: ReminderComponent;
  let fixture: ComponentFixture<ReminderComponent>;
  const { initialState } = reducer;
  let store: MockStore;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [ReminderComponent],
      providers: [provideMockStore({ initialState })]
    })
      .compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(ReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should dispatch addReminder', (): void => {
    const stateAction: Reminder = {
      id: '123123',
      remind: 'dentist',
      datetimeFrom: new Date(),
      datetimeTo: new Date(),
      dateId: 'Mon Mar 01 2021',
      color: 'red'
    };
    const action = reducerAction.addReminder({ reminder: stateAction });
    const state = reducer.reminderReducer(initialState, action);
    expect(state.reminder.length).toEqual(1);
  });

  it('should dispatch removeReminder', () => {
    const initState: reducer.State = {
      reminder: [
        {
          id: '123123',
          remind: 'dentist',
          datetimeFrom: new Date(),
          datetimeTo: new Date(),
          dateId: 'Mon Mar 01 2021',
          color: 'red'
        }
      ],
      reminderId: '',
      mode: 0,
      displayForm: false,
      hasTime: true
    };
    const action = reducerAction.removeReminder({ id: '123123' });
    const state = reducer.reminderReducer(initState, action);
    expect(state).toEqual(initialState);
  });

  it('should be remind required', () => {
    const remind = component.formBuilder.get('remind');
    remind?.setValue('');
    expect(remind?.valid).toBeFalsy();
  });

  it('should be color required', () => {
    const color = component.formBuilder.get('color');
    color?.setValue('');
    expect(color?.valid).toBeFalsy();
  });

  it('should call addReminder', () => {
    let spy = spyOn(store, 'dispatch').and.callFake(() => { });
    component.formBuilder.get('remind')?.setValue('test');
    component.formBuilder.get('color')?.setValue('red');
    component.formBuilder.get('from')?.setValue('12:00');
    component.formBuilder.get('to')?.setValue('13:00');
    component.addReminder();
    expect(spy).toHaveBeenCalled();
  });

  it('should call removeReminder', () => {
    let spy = spyOn(store, 'dispatch').and.callFake(() => { });
    const stateAction: Reminder = {
      id: '123123',
      remind: 'dentist',
      datetimeFrom: new Date(),
      datetimeTo: new Date(),
      dateId: 'Mon Mar 01 2021',
      color: 'red'
    };
    component.removeReminder(stateAction);
    expect(spy).toHaveBeenCalled();
  });

  it('should call removeAllReminder', () => {
    let spy = spyOn(store, 'dispatch').and.callFake(() => { });
    component.removeAllReminder();
    expect(spy).toHaveBeenCalled();
  });

  it('should call editReminder', () => {
    let spy = spyOn(store, 'dispatch').and.callFake(() => { });
    component.formBuilder.get('remind')?.setValue('test');
    component.formBuilder.get('color')?.setValue('red');
    component.formBuilder.get('from')?.setValue('12:00');
    component.formBuilder.get('to')?.setValue('13:00');
    component.editReminder();
    expect(spy).toHaveBeenCalled();
  });

  it('should not continue if remind has more of 30 chars', () => {
    const remind = component.formBuilder.get('remind');
    remind?.setValue('testtesttesttesttesttesttesttesttesttest');
    expect(remind?.valid).toBeFalsy();
  });

  it('should call reminderAction on mode insert', () => {
    let spy = spyOn(component, 'addReminder').and.callFake(() => { });
    component.mode = reducer.reminderMode.INSERT;
    component.reminderAction();
    expect(spy).toHaveBeenCalled();
  });

  it('should call reminderAction on mode edit', () => {
    let spy = spyOn(component, 'editReminder').and.callFake(() => { });
    component.mode = reducer.reminderMode.EDIT;
    component.reminderAction();
    expect(spy).toHaveBeenCalled();
  });

  it('should call edit', () => {
    let form = component.formBuilder;
    let spy = spyOn(form, 'reset').and.callFake(() => { });
    const stateAction: Reminder = {
      id: '123123',
      remind: 'dentist',
      datetimeFrom: new Date(),
      datetimeTo: new Date(),
      dateId: 'Mon Mar 01 2021',
      color: 'red'
    };
    component.edit(stateAction);
    expect(spy).toHaveBeenCalled();
  });

  it('should call showFormToggle', () => {
    let spy = spyOn(store, 'dispatch').and.callFake(() => { });
    component.showFormToggle();
    expect(spy).toHaveBeenCalled();
  });

  it('should dispatch editReminder', () => {
    const initState: reducer.State = {
      reminder: [
        {
          id: '123134',
          remind: 'test2',
          datetimeFrom: new Date(),
          datetimeTo: new Date(),
          dateId: 'Mon Mar 01 2021',
          color: 'blue'
        },
        {
          id: '123123',
          remind: 'dentist',
          datetimeFrom: new Date(),
          datetimeTo: new Date(),
          dateId: 'Mon Mar 01 2021',
          color: 'red'
        }
      ],
      reminderId: '',
      mode: 0,
      displayForm: false,
      hasTime: true
    };
    const editState: Reminder = {
      id: '123123',
      remind: 'test',
      datetimeFrom: new Date(),
      datetimeTo: new Date(),
      dateId: 'Mon Mar 01 2021',
      color: 'red'
    };
    const action = reducerAction.editReminder({ reminder: editState });
    const state = reducer.reminderReducer(initState, action);
    expect(state.reminder[1]).toEqual(editState);
  });

  it('should dispatch removeAllReminder', () => {
    const initState: reducer.State = {
      reminder: [
        {
          id: '123123',
          remind: 'test1',
          datetimeFrom: new Date(),
          datetimeTo: new Date(),
          dateId: 'Mon Mar 01 2021',
          color: 'red'
        },
        {
          id: '123134',
          remind: 'test2',
          datetimeFrom: new Date(),
          datetimeTo: new Date(),
          dateId: 'Mon Mar 01 2021',
          color: 'blue'
        }
      ],
      reminderId: '',
      mode: 0,
      displayForm: false,
      hasTime: true
    };
    const action = reducerAction.removeAllReminder({ reminderId: 'Mon Mar 01 2021' });
    const state = reducer.reminderReducer(initState, action);
    expect(state.reminder.length).toBe(0);
  });

  it('should dispatch displayReminderForm', () => {
    const action = reducerAction.displayReminderForm({ displayForm: true, reminderId: '2341', mode: reducer.reminderMode.INSERT });
    const state = reducer.reminderReducer(initialState, action);
    expect(state.reminderId).toEqual('2341');
    expect(state.displayForm).toBeTruthy();
    expect(state.mode).toEqual(reducer.reminderMode.INSERT);
  });

  it('should dispatch setModeReminder with id', () => {
    const action = reducerAction.setModeReminder({ mode: reducer.reminderMode.EDIT, id: '12' });
    const state = reducer.reminderReducer(initialState, action);
    expect(state.mode).toEqual(reducer.reminderMode.EDIT);
    expect(state.id).toEqual('12');
  });

  it('should dispatch setModeReminder with id', () => {
    const action = reducerAction.setModeReminder({ mode: reducer.reminderMode.EDIT });
    const state = reducer.reminderReducer(initialState, action);
    expect(state.mode).toEqual(reducer.reminderMode.EDIT);
    expect(state.id).toEqual('');
  });
});
