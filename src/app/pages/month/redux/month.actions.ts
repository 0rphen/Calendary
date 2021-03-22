import { createAction, props } from '@ngrx/store';
import { Day } from 'src/app/models/day';

export const addDays = createAction(
  '[Month Component] addDays',
  props<{ days: Day[] }>()
);
export const prevMonth = createAction('[Month Component] prevMonth');
export const nextMonth = createAction('[Month Component] nextMonth');
