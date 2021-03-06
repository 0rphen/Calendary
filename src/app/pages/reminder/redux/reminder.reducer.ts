import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { Reminder } from 'src/app/models/reminder';
import * as reminderAction from './reminder.actions';

export const reminderKey = 'reminder';

export enum reminderMode {
  'INSERT',
  'EDIT'
};

export interface State {
  reminder: Reminder[];
  displayForm: boolean;
  reminderId: string;
  mode: reminderMode;
  id?: string;
  hasTime: boolean
}

export const initialState: State = {
  reminder: [],
  displayForm: false,
  reminderId: '',
  mode: reminderMode.INSERT,
  hasTime: true
}

const _reminderReducer: ActionReducer<State, Action> = createReducer(
  initialState,
  on(reminderAction.addReminder, (state: State, { reminder }) => ({ ...state, reminder: [...state.reminder, reminder], displayForm: false, hasTime: true })),
  on(reminderAction.removeReminder, (state: State, { id }) => ({ ...state, reminder: [...state.reminder.filter(remind => remind.id != id)] })),
  on(reminderAction.editReminder, (state: State, { reminder }) => ({
    ...state, reminder: [...state.reminder.map((remind) => {
      return (remind.id != reminder.id) ? remind : reminder
    })], displayForm: false, id: initialState.id, mode: initialState.mode, hasTime: true
  })),
  on(reminderAction.removeAllReminder, (state: State, { reminderId }) => ({ ...state, reminder: [...state.reminder.filter(remind => remind.dateId != reminderId)] })),
  on(reminderAction.displayReminderForm, (state: State, { displayForm, reminderId, mode }) => ({ ...state, displayForm: displayForm, reminderId: reminderId, mode: mode, hasTime: true })),
  on(reminderAction.setModeReminder, (state: State, { mode, id = '' }) => ({ ...state, mode: mode, id: id })),
  on(reminderAction.setNoHasTime, state => ({ ...state, hasTime: false }))
);

export function reminderReducer(state: State | undefined, action: Action): State {
  return _reminderReducer(state, action);
}

