import { createReducer, on, Action, ActionReducer } from '@ngrx/store';
import { Day } from 'src/app/models/day';
import * as monthActions from './month.actions';

export const monthKey = 'months';

export interface State {
  days: Day[]
  id: string;
  isReminder: boolean;
}

export const initialState: State = {
  days: [],
  id: '',
  isReminder: false
};

const _monthReducer: ActionReducer<State, Action> = createReducer(
  initialState,
  on(monthActions.addDays, (state: State, { days }) => ({ ...state, days: [...days] })),
  on(monthActions.setReminder, (state: State, { isReminder, id }) => ({ ...state, isReminder: isReminder, id: id }))
);

export function monthReducer(state: State | undefined, action: Action): State {
  return _monthReducer(state, action);
}
