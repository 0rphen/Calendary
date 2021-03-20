import { ActionReducerMap } from '@ngrx/store';
import * as months from './pages/month/redux/month.reducer';
import * as reminder from './pages/reminder/redux/reminder.reducer';

export interface AppState {
  months: months.State;
  reminder: reminder.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  months: months.monthReducer,
  reminder: reminder.reminderReducer
};
