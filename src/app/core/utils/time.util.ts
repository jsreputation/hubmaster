function leadZeroFormat(value: number): string {
  if (value < 10) {
    return `0${value}`;
  }
  return String(value);
}

export function timeFromTimeSlot(date: Date, timeSlot: string): Date {
  const hour = Number(timeSlot.slice(0, 2));
  date.setHours(hour);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

export function timeSlotFromDate(date: Date): string {
  return `${leadZeroFormat(date.getHours())}:00 - ${leadZeroFormat(date.getHours() + 1)}:00`;
}

export function generateTimeSlots(isRange = true): string[] {
  const start = 0;
  const end = 24;
  const startTimes = Array.from(new Array(end - start), (val, index) => index + start);
  return startTimes.map(hour => {
      if (isRange) {
        return `${leadZeroFormat(hour)}:00 - ${leadZeroFormat(hour + 1)}:00`;
      } else {
        return `${leadZeroFormat(hour)}:00`;
      }
    }
  );
}

export function isValidDate(date: string) {
  return Date.parse(date);
}


