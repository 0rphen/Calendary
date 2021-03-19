import { createAction, props } from '@ngrx/store';
import { Reminder } from 'src/app/models/reminder';

export const addReminder = createAction(
  '[Reminder Component] addReminder',
  props<{ reminder: Reminder }>()
);

