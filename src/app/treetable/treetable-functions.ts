export interface Level {
  type: number;
  id: number[];
}

export interface Item {
  content: any;
  level: Level;
}

export const mockTree = [
  {
    dateOfDetails: '2020-09-01',
    child: [
      {
        period: {
          start: '2020-09-01T08:30:00',
          end: '2020-09-01T17:30:00',
        },
        child: [
          {
            period: {
              start: '2020-09-01T08:30:00',
              end: '2020-09-01T17:30:00',
            },
          },
        ],
      },
      {
        period: {
          start: '2020-09-01T08:30:00',
          end: '2020-09-01T17:30:00',
        },
        child: [
          {
            period: {
              start: '2020-09-01T08:30:00',
              end: '2020-09-01T17:30:00',
            },
          },
        ],
      },
      {
        period: {
          start: '2020-09-01T08:30:00',
          end: '2020-09-01T17:30:00',
        },
        child: [
          {
            period: {
              start: '2020-09-01T08:30:00',
              end: '2020-09-01T17:30:00',
            },
          },
        ],
      },
    ],

    completePeriod: {
      start: '2020-09-01T08:30:00',
      end: '2020-09-01T17:30:00',
    },
  },
  {
    child: [
      {
        period: {
          start: '2020-09-02T08:30:00',
          end: '2020-09-02T17:30:00',
        },
        child: [
          {
            period: {
              start: '2020-09-01T08:30:00',
              end: '2020-09-01T17:30:00',
            },
          },
        ],
      },
      {
        period: {
          start: '2020-09-02T08:30:00',
          end: '2020-09-02T17:30:00',
        },
        child: [
          {
            period: {
              start: '2020-09-01T08:30:00',
              end: '2020-09-01T17:30:00',
            },
          },
        ],
      },
    ],
    dateOfDetails: '2020-09-02',

    completePeriod: {
      start: '2020-09-02T08:30:00',
      end: '2020-09-02T17:30:00',
      length: 32400000,
    },
  },
  {
    child: [
      {
        bookingId: 22,

        period: {
          start: '2020-09-03T08:30:00',
          end: '2020-09-03T17:30:00',
        },
        child: [],
      },
    ],
    dateOfDetails: '2020-09-03',

    completePeriod: {
      start: '2020-09-03T08:30:00',
      end: '2020-09-03T17:30:00',
    },
  },
];
