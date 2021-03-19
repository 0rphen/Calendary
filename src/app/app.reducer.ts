import { ActionReducerMap } from '@ngrx/store';
import * as months from './pages/month/redux/month.reducer';

export interface AppState {
  months: months.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  months: months.monthReducer
};
