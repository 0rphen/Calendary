import { createReducer, on, Action, ActionReducer } from '@ngrx/store';
import { Day } from 'src/app/models/day';
import * as monthActions from './month.actions';

export const monthKey = 'months';

export interface State {
  days: Day[]
}

export const initialState: State = {
  days: []
}

const _monthReducer: ActionReducer<State, Action> = createReducer(
  initialState,
  on(monthActions.addDays, (state: State, { days }) => ({ ...state, days: [...days] }))
);

export function monthReducer(state: State | undefined, action: Action): State {
  return _monthReducer(state, action);
}
