import d3 from 'd3';

class TimeUnit {
  constructor(
    public readonly brief: string,
    public readonly unit: string,
    public readonly d3ref: string
  ) {}
}


export const TimeUnits = {
  'H': new TimeUnit('H', 'hour', 'timeHour'),
  'D': new TimeUnit('D', 'day', 'timeDay'),
  'W': new TimeUnit('W', 'week', 'timeWeek'),
  'M': new TimeUnit('M', 'month', 'timeMonth'),
  'Y': new TimeUnit('Y', 'year', 'timeYear')
};

export function timeRollup(date: number = new Date().getTime(), unit: TimeUnit) {
  return (d3 as any)[unit.d3ref].floor(new Date(date));
}
