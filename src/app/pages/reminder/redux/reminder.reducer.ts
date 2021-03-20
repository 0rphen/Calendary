import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { Reminder } from 'src/app/models/reminder';
import * as reminderAction from './reminder.actions';

export const reminderKey = 'reminder';

export interface State {
  reminder: Reminder[]
}

export const initialState: State = {
  reminder: []
}

const _reminderReducer: ActionReducer<State, Action> = createReducer(
  initialState,
  on(reminderAction.addReminder, (state: State, { reminder }) => ({ ...state, reminder: [...state.reminder, reminder] })),
  on(reminderAction.removeReminder, (state: State, { reminder }) => ({ ...state, reminder: [...state.reminder.filter(remind => remind !== reminder)] }))
);

export function reminderReducer(state: State | undefined, action: Action): State {
  return _reminderReducer(state, action);
}
