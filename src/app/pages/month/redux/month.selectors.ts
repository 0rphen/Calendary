import { createFeatureSelector, createSelector } from '@ngrx/store';
import { monthKey, State } from './month.reducer';

export const selector = createFeatureSelector<State>(monthKey);

export const getDayById = (id: string) => createSelector(selector, (state: State) => state!.days.find(day => day.id == id));
