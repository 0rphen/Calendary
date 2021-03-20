import { createAction, props } from '@ngrx/store';
import { Reminder } from 'src/app/models/reminder';

export const addReminder = createAction(
  '[Reminder Component] addReminder',
  props<{ reminder: Reminder }>()
);
export const removeReminder = createAction(
  '[Reminder Component] removeReminder',
  props<{ reminder: Reminder }>()
);
export const editReminder = createAction(
  '[Reminder Component] editReminder',
  props<{ reminder: Reminder, index: number }>()
);
