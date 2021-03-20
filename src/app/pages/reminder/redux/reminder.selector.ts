import { createFeatureSelector, createSelector } from '@ngrx/store';
import { reminderKey, State } from './reminder.reducer';

export const selector = createFeatureSelector<State>(reminderKey);

export const getReminderById = (id: string) => createSelector(
  selector, (state: State) => state.reminder.filter(remind => remind.dateId == id)
);
export const getRemindersLengthById = (id: string) => createSelector(
  selector, (state: State) => state.reminder.filter(remind => remind.dateId == id).length
);
