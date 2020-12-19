export interface bookComplete {
  datum: any;
  tag: number;
  buchung: number;
  pause: number;
  type: string;
  start: Date;
  end: Date;
  id: number;
  sollAZ: string;
  istAZ: string;
  sollPause: string;
  istPause: string;
  ueberstunden: string;
}

export default [
  {
    dateOfDetails: '2020-09-01',
    bookingsList: [
      {
        bookingId: 20,
        employeeId: '10',
        breakTimeTotal: 1800000,
        period: {
          start: '2020-09-01T08:30:00',
          end: '2020-09-01T17:30:00',
          length: 32400000,
        },
        breakList: [
          {
            breakId: 20,
            bookingId: 20,
            period: {
              start: '2020-09-01T13:30:00',
              end: '2020-09-01T14:00:00',
              length: 1800000,
            },
          },
        ],
        location: 'OFFICE',
      },
    ],
    dailyBookingTimeInMillisReal: 32400000,
    dailyBreakTimeInMillisEffective: 2700000,
    dailyBreakTimeInMillisReal: 1800000,
    targetWorkingTimeInMillis: 28080000,
    overtimeInMillis: 1620000,
    completePeriod: {
      start: '2020-09-01T08:30:00',
      end: '2020-09-01T17:30:00',
      length: 32400000,
    },
  },
  {
    dateOfDetails: '2020-09-02',
    bookingsList: [
      {
        bookingId: 21,
        employeeId: '10',
        breakTimeTotal: 1800000,
        period: {
          start: '2020-09-02T08:30:00',
          end: '2020-09-02T17:30:00',
          length: 32400000,
        },
        breakList: [
          {
            breakId: 21,
            bookingId: 21,
            period: {
              start: '2020-09-02T13:30:00',
              end: '2020-09-02T14:00:00',
              length: 1800000,
            },
          },
        ],
        location: 'OFFICE',
      },
    ],
    dailyBookingTimeInMillisReal: 32400000,
    dailyBreakTimeInMillisEffective: 2700000,
    dailyBreakTimeInMillisReal: 1800000,
    targetWorkingTimeInMillis: 28080000,
    overtimeInMillis: 1620000,
    completePeriod: {
      start: '2020-09-02T08:30:00',
      end: '2020-09-02T17:30:00',
      length: 32400000,
    },
  },
  {
    dateOfDetails: '2020-09-03',
    bookingsList: [
      {
        bookingId: 22,
        employeeId: '10',
        breakTimeTotal: 1800000,
        period: {
          start: '2020-09-03T08:30:00',
          end: '2020-09-03T17:30:00',
          length: 32400000,
        },
        breakList: [
          {
            breakId: 22,
            bookingId: 22,
            period: {
              start: '2020-09-03T13:30:00',
              end: '2020-09-03T14:00:00',
              length: 1800000,
            },
          },
        ],
        location: 'OFFICE',
      },
    ],
    dailyBookingTimeInMillisReal: 32400000,
    dailyBreakTimeInMillisEffective: 2700000,
    dailyBreakTimeInMillisReal: 1800000,
    targetWorkingTimeInMillis: 28080000,
    overtimeInMillis: 1620000,
    completePeriod: {
      start: '2020-09-03T08:30:00',
      end: '2020-09-03T17:30:00',
      length: 32400000,
    },
  },
];
