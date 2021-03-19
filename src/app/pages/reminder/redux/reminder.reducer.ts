import { Action, createReducer, on } from '@ngrx/store';
import { Reminder } from 'src/app/models/reminder';
import * as reminderAction from './reminder.actions';

export interface State {
  reminder: Reminder[]
}

export const initialState: State = {
  reminder: []
}

const _reminderReducer = createReducer(
  initialState,
  on(reminderAction.addReminder, (state, { reminder }) => ({ ...state, reminder: [...state.reminder, reminder] }))
);

export function reminderReducer(state: State, action: Action) {
  return _reminderReducer(state, action);
}
