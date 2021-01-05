export interface BookComplete {
  datum: any; //für type 'day' ist dateOfDetails, ansonsten ist "Buchung" oder "Pause"
  tag: number; //Tagsnummer in der Liste
  buchung: number; // Buchungsnummer an dem dazugehörigen Tag
  pause: number; //Pausennummer in der dazugehörigen Buchung
  type: string; //'day', 'book', oder 'break'
  start: Date;
  end: Date;
  id: number; //index in der kompletten Liste
  sollAZ: string;
  istAZ: string;
  sollPause: string;
  istPause: string;
  ueberstunden: string;
  bookID: number; // if type day, bookID=-1, otherwise bookID=bookingId from backend
  breakID: number; //if type break, breakID= breakId from backend, otherwise -1
  editable: boolean;
}

export interface Book {
  dateOfDetails: Date;
  id: number; // index in der kompletten Liste
  position: Level; //[day, book, break], bsp : [1, 2, 2]
  start: Date;
  end: Date;
  editable: boolean;
  info: Info;
}

export interface Info {
  sollAZ: string;
  istAZ: string;
  sollPause: string;
  istPause: string;
  ueberstunden: string;
  bookID: number;
  breakID: number;
}

export interface Level {
  day: number;
  book: number;
  break: number;
  //type day/book/break is davon abhängig
}

export interface tree {}

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
      // {
      //   bookingId: 20,
      //   employeeId: '10',
      //   breakTimeTotal: 1800000,
      //   period: {
      //     start: '2020-09-01T08:30:00',
      //     end: '2020-09-01T17:30:00',
      //     length: 32400000,
      //   },
      //   breakList: [
      //     {
      //       breakId: 20,
      //       bookingId: 20,
      //       period: {
      //         start: '2020-09-01T13:30:00',
      //         end: '2020-09-01T14:00:00',
      //         length: 1800000,
      //       },
      //     },
      //   ],
      //   location: 'OFFICE',
      // },
      // {
      //   bookingId: 20,
      //   employeeId: '10',
      //   breakTimeTotal: 1800000,
      //   period: {
      //     start: '2020-09-01T08:30:00',
      //     end: '2020-09-01T17:30:00',
      //     length: 32400000,
      //   },
      //   breakList: [
      //     {
      //       breakId: 20,
      //       bookingId: 20,
      //       period: {
      //         start: '2020-09-01T13:30:00',
      //         end: '2020-09-01T14:00:00',
      //         length: 1800000,
      //       },
      //     },
      //   ],
      //   location: 'OFFICE',
      // },
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
