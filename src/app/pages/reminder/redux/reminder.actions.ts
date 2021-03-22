import { createAction, props } from '@ngrx/store';
import { Reminder } from 'src/app/models/reminder';
import { reminderMode } from './reminder.reducer';

export const addReminder = createAction(
  '[Reminder Component] addReminder',
  props<{ reminder: Reminder }>()
);
export const removeReminder = createAction(
  '[Reminder Component] removeReminder',
  props<{ id: string }>()
);
export const editReminder = createAction(
  '[Reminder Component] editReminder',
  props<{ reminder: Reminder }>()
);
export const removeAllReminder = createAction(
  '[Reminder Component] removeAllReminder',
  props<{ reminderId: string }>()
);
export const displayReminderForm = createAction(
  '[Reminder Component] displayReminderForm',
  props<{ displayForm: boolean, reminderId: string, mode: reminderMode }>()
);
export const setModeReminder = createAction(
  '[Reminder Component] editModeReminder',
  props<{ mode: reminderMode, id?: string }>()
);
export const setNoHasTime = createAction('[Reminder Component] setNoHasTime');
