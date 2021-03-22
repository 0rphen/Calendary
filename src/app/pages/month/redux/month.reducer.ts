import { createReducer, on, Action, ActionReducer } from '@ngrx/store';
import { Day } from 'src/app/models/day';
import * as monthActions from './month.actions';

export const monthKey = 'months';

export interface State {
  days: Day[]
  actualMonth: number;
}

export const initialState: State = {
  days: [],
  actualMonth: new Date().getMonth(),
};

const _monthReducer: ActionReducer<State, Action> = createReducer(
  initialState,
  on(monthActions.addDays, (state: State, { days }) => ({ ...state, days: [...days] })),
  on(monthActions.prevMonth, state => ({ ...state, actualMonth: state.actualMonth - 1, isEdit: false })),
  on(monthActions.nextMonth, state => ({ ...state, actualMonth: state.actualMonth + 1, isEdit: false }))
);

export function monthReducer(state: State | undefined, action: Action): State {
  return _monthReducer(state, action);
}
