import { createAction, props } from '@ngrx/store';
import { Day } from 'src/app/models/day';

export const addDays = createAction(
  '[Actions Component] addDays',
  props<{ days: Day[] }>()
);

