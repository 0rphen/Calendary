import { createAction, props } from '@ngrx/store';
import { Day } from 'src/app/models/day';

export const addDays = createAction(
  '[Month Component] addDays',
  props<{ days: Day[] }>()
);
export const setReminder = createAction(
  '[Month Component] setReminder',
  props<{ isReminder: boolean, id: string }>()
);
