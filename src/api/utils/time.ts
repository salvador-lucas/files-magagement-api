import { DateTime } from 'luxon';

export function dateTimeFormat(dateTime: Date, format: string): string {
  return DateTime.fromJSDate(dateTime).toFormat(format);
}
