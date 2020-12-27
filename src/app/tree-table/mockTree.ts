export interface tree {
  //level: number; //"level" of the element in the tree, in mockData just like type
  /**id is a list of unique numbers with length l, which is the number of levels in the tree
   * for example, mockData has 3 levels ("day", "book", "break"), every element of its flatlist
   * has a unique "tag, buchung, und pause" number. This time we generally store these numbers in a list
   * of numbers.
   */
  id: number[];

  title: string; //what we want in the row to display, in mock it is display

  indexInBigList: number; //index of this element in the original list, in mock it is id

  /**additional info that every child (and parent) has, and we want to display,
   * in mock they are separately stored in start and date
   * */
  allInfos: any[];

  /**parentInfos sind additional info that we want--just for parent--to display.
   * in mock they are : sollAZ, istAZ, sollPause, istPause, ueberstunden.
   */
  parentInfos: any[];
}

/**
 * misalnya, kta pake mock list di bawah sbg datasource.
 * tiap element dari list adalah parent.
 * if parent, title=dateOfDetails.
 * kta bakal buat tabel dgn 8 column :
 * ["datum", "start", "end", "istAZ", "sollAZ", "istPause", "sollPause", "ueberstunde"]
 * davon ist [datum] --> title
 * [start, end] --> allInfos
 * [istAZ, sollAZ, istPause, sollPause, ueberstunde] --> parentInfos
 */

export interface mockData {
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
      {
        bookingId: 30,
        employeeId: '10',
        breakTimeTotal: 1800000,
        period: {
          start: '2020-09-01T08:30:00',
          end: '2020-09-01T17:30:00',
          length: 32400000,
        },
        breakList: [
          {
            breakId: 30,
            bookingId: 30,
            period: {
              start: '2020-09-01T13:30:00',
              end: '2020-09-01T14:00:00',
              length: 1800000,
            },
          },
        ],
        location: 'OFFICE',
      },
      {
        bookingId: 40,
        employeeId: '10',
        breakTimeTotal: 1800000,
        period: {
          start: '2020-09-01T08:30:00',
          end: '2020-09-01T17:30:00',
          length: 32400000,
        },
        breakList: [
          {
            breakId: 40,
            bookingId: 40,
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
