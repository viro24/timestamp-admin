export interface TreeNode {
  value: any[];
  child: TreeNode[];
  type: number;
}

export const tree = [
  {
    type: 1,
    value: [
      {
        dateOfDetails: '2020-09-01',
        completePeriod: {
          start: '2020-09-01T08:30:00',
          end: '2020-09-01T17:30:00',
        },
      },
    ],
    child: [
      {
        type: 2,
        value: [
          {
            period: {
              start: '2020-09-01T08:30:00',
              end: '2020-09-01T12:30:00',
            },
          },
        ],
        child: [
          {
            type: 3,
            value: [
              {
                period: {
                  start: '2020-09-01T09:30:00',
                  end: '2020-09-01T10:00:00',
                },
              },
            ],
            child: [],
          },
          {
            type: 3,
            value: [
              {
                period: {
                  start: '2020-09-01T10:30:00',
                  end: '2020-09-01T10:40:00',
                },
              },
            ],
            child: [],
          },
        ],
      },
      {
        type: 2,
        value: [
          {
            period: {
              start: '2020-09-01T14:00:00',
              end: '2020-09-01T18:30:00',
            },
          },
        ],
        child: [
          {
            type: 3,
            value: [
              {
                period: {
                  start: '2020-09-01T15:30:00',
                  end: '2020-09-01T16:00:00',
                },
              },
            ],
            child: [],
          },
        ],
      },
      {
        type: 2,
        value: [
          {
            period: {
              start: '2020-09-01T19:00:00',
              end: '2020-09-01T20:30:00',
            },
          },
        ],
        child: [],
      },
    ],
  },
  {
    type: 1,
    value: [
      {
        dateOfDetails: '2020-09-02',
        completePeriod: {
          start: '2020-09-03T08:30:00',
          end: '2020-09-03T17:30:00',
        },
      },
    ],
    child: [
      {
        type: 2,
        value: [
          {
            period: {
              start: '2020-09-02T08:30:00',
              end: '2020-09-02T10:30:00',
            },
          },
        ],
        child: [
          {
            type: 3,
            value: [
              {
                period: {
                  start: '2020-09-02T09:30:00',
                  end: '2020-09-02T10:00:00',
                },
              },
            ],
            child: [],
          },
          {
            type: 3,
            value: [
              {
                period: {
                  start: '2020-09-02T11:00:00',
                  end: '2020-09-02T11:15:00',
                },
              },
            ],
            child: [],
          },
        ],
      },
      {
        type: 2,
        value: [
          {
            period: {
              start: '2020-09-02T12:00:00',
              end: '2020-09-02T17:30:00',
            },
          },
        ],
        child: [],
      },
    ],
  },
  {
    type: 1,
    value: [
      {
        dateOfDetails: '2020-09-03',
        completePeriod: {
          start: '2020-09-03T08:30:00',
          end: '2020-09-03T15:30:00',
        },
      },
    ],
    child: [
      {
        type: 2,
        value: [
          {
            type: 3,
            value: [
              {
                period: {
                  start: '2020-09-03T08:30:00',
                  end: '2020-09-03T12:30:00',
                },
              },
            ],
            child: [
              {
                type: 4,
                value: [
                  {
                    period: {
                      start: '2020-09-02T10:30:00',
                      end: '2020-09-02T11:00:00',
                    },
                  },
                ],
                child: [],
              },
              {
                type: 4,
                value: [
                  {
                    period: {
                      start: '2020-09-02T12:00:00',
                      end: '2020-09-02T12:10:00',
                    },
                  },
                ],
                child: [],
              },
            ],
          },
          {
            type: 3,
            value: [
              {
                period: {
                  start: '2020-09-02T14:00:00',
                  end: '2020-09-02T15:30:00',
                },
              },
            ],
            child: [],
          },
        ],
        child: [],
      },
    ],
  },
];

export const tree0 = [
  {
    type: 0,
    value: {
      dateOfDetails: '2020-09-04',
      bookingsList: [
        {
          bookingId: 46,
          employeeId: '20',
          breakTimeTotal: 0,
          period: {
            start: '2020-09-04T08:00:00',
            end: '2020-09-04T14:00:00',
            length: 21600000,
          },
          breakList: [],
          location: 'OFFICE',
        },
      ],
      dailyBookingTimeInMillisReal: 21600000,
      dailyBreakTimeInMillisEffective: 1800000,
      dailyBreakTimeInMillisReal: 0,
      targetWorkingTimeInMillis: 28080000,
      overtimeInMillis: -8280000,
      completePeriod: {
        start: '2020-09-04T08:00:00',
        end: '2020-09-04T14:00:00',
        length: 21600000,
      },
    },
    child: [],
  },
  {
    type: 0,
    value: {
      dateOfDetails: '2020-09-07',
      bookingsList: [
        {
          bookingId: 47,
          employeeId: '20',
          breakTimeTotal: 1800000,
          period: {
            start: '2020-09-07T08:00:00',
            end: '2020-09-07T17:00:00',
            length: 32400000,
          },
          breakList: [
            {
              breakId: 44,
              bookingId: 47,
              period: {
                start: '2020-09-07T13:00:00',
                end: '2020-09-07T13:30:00',
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
        start: '2020-09-07T08:00:00',
        end: '2020-09-07T17:00:00',
        length: 32400000,
      },
    },
    child: [],
  },
  {
    type: 0,
    value: {
      dateOfDetails: '2020-09-08',
      bookingsList: [
        {
          bookingId: 48,
          employeeId: '20',
          breakTimeTotal: 1800000,
          period: {
            start: '2020-09-08T08:00:00',
            end: '2020-09-08T17:00:00',
            length: 32400000,
          },
          breakList: [
            {
              breakId: 45,
              bookingId: 48,
              period: {
                start: '2020-09-08T13:00:00',
                end: '2020-09-08T13:30:00',
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
        start: '2020-09-08T08:00:00',
        end: '2020-09-08T17:00:00',
        length: 32400000,
      },
    },
    child: [],
  },
];

export const tree2: TreeNode[] = [
  {
    type: 1,
    value: [
      {
        period: {
          start: '2020-09-01T08:00:00',
          end: '2020-09-01T17:30:00',
        },
      },
    ],
    child: [
      {
        type: 2,
        value: [
          {
            period: {
              start: '2020-09-01T08:00:00',
              end: '2020-09-01T18:30:00',
            },
          },
        ],
        child: [
          {
            type: 3,
            value: [
              {
                period: {
                  start: '2020-09-01T14:00:00',
                  end: '2020-09-01T15:00:00',
                },
              },
            ],
            child: [],
          },
        ],
      },
    ],
  },
  {
    type: 1,
    value: [
      {
        period: {
          start: '2020-09-02T09:00:00',
          end: '2020-09-02T15:30:00',
        },
      },
    ],
    child: [
      {
        type: 2,
        value: [
          {
            period: {
              start: '2020-09-02T09:00:00',
              end: '2020-09-02T15:30:00',
            },
          },
        ],
        child: [
          {
            type: 3,
            value: [
              {
                period: {
                  start: '2020-09-02T12:00:00',
                  end: '2020-09-02T12:30:00',
                },
              },
            ],
            child: [
              {
                type: 4,
                value: [
                  {
                    period: {
                      start: '2020-09-02T12:00:00',
                      end: '2020-09-02T12:30:00',
                    },
                  },
                ],
                child: [],
              },
              {
                type: 4,
                value: [
                  {
                    period: {
                      start: '2020-09-02T12:00:00',
                      end: '2020-09-02T12:30:00',
                    },
                  },
                ],
                child: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 1,
    value: [
      {
        period: {
          start: '2020-09-01T08:00:00',
          end: '2020-09-01T17:30:00',
        },
      },
    ],
    child: [
      {
        type: 2,
        value: [
          {
            period: {
              start: '2020-09-01T08:00:00',
              end: '2020-09-01T18:30:00',
            },
          },
        ],
        child: [
          {
            type: 3,
            value: [
              {
                period: {
                  start: '2020-09-01T14:00:00',
                  end: '2020-09-01T15:00:00',
                },
              },
            ],
            child: [],
          },
        ],
      },
    ],
  },
];

/**col  ist index nummer von child*/
// export function getTree(data, col) {
//   let tree: Node[] = [];
//   let type = 0;
//   data.forEach((d) => {
//     addNode(tree, d, type);
//     recursive(tree, d, col, type + 1);
//   });
// }

// function addNode(tree: Node[], data, type) {
//   const node: Node = {
//     value: data,
//     child: [],
//     type: type,
//   };
//   tree.push(node);
// }

// function recursive(tree: Node[], data, col, type) {
//   if (Array.isArray(data[col])) {
//     data[col].forEach((d) => {
//       addNode(tree, data, type + 1);
//       this.recursive(tree, data[col], col, type + 1);
//     });
//   }
// }

// const mockBooking = [
//   {
//     dateOfDetails: '2021-01-04',
//     bookingsList: [
//       {
//         bookingId: 164,
//         employeeId: '10',
//         breakTimeTotal: 1800000,
//         period: {
//           start: '2021-01-04T07:30:00',
//           end: '2021-01-04T19:30:00',
//           length: 43200000,
//         },
//         breakList: [
//           {
//             breakId: 147,
//             bookingId: 164,
//             period: {
//               start: '2021-01-04T12:30:00',
//               end: '2021-01-04T13:00:00',
//               length: 1800000,
//             },
//           },
//         ],
//         location: 'OFFICE',
//       },
//     ],
//     dailyBookingTimeInMillisReal: 43200000,
//     dailyBreakTimeInMillisEffective: 2700000,
//     dailyBreakTimeInMillisReal: 1800000,
//     targetWorkingTimeInMillis: 28080000,
//     overtimeInMillis: 12420000,
//     completePeriod: {
//       start: '2021-01-04T07:30:00',
//       end: '2021-01-04T19:30:00',
//       length: 43200000,
//     },
//   },
//   {
//     dateOfDetails: '2021-01-05',
//     bookingsList: [
//       {
//         bookingId: 165,
//         employeeId: '10',
//         breakTimeTotal: 1800000,
//         period: {
//           start: '2021-01-05T07:30:00',
//           end: '2021-01-05T16:30:00',
//           length: 32400000,
//         },
//         breakList: [
//           {
//             breakId: 148,
//             bookingId: 165,
//             period: {
//               start: '2021-01-05T12:30:00',
//               end: '2021-01-05T13:00:00',
//               length: 1800000,
//             },
//           },
//         ],
//         location: 'OFFICE',
//       },
//     ],
//     dailyBookingTimeInMillisReal: 32400000,
//     dailyBreakTimeInMillisEffective: 2700000,
//     dailyBreakTimeInMillisReal: 1800000,
//     targetWorkingTimeInMillis: 28080000,
//     overtimeInMillis: 1620000,
//     completePeriod: {
//       start: '2021-01-05T07:30:00',
//       end: '2021-01-05T16:30:00',
//       length: 32400000,
//     },
//   },
//   {
//     dateOfDetails: '2021-01-06',
//     bookingsList: [
//       {
//         bookingId: 166,
//         employeeId: '10',
//         breakTimeTotal: 1800000,
//         period: {
//           start: '2021-01-06T07:30:00',
//           end: '2021-01-06T16:30:00',
//           length: 32400000,
//         },
//         breakList: [
//           {
//             breakId: 149,
//             bookingId: 166,
//             period: {
//               start: '2021-01-06T12:30:00',
//               end: '2021-01-06T13:00:00',
//               length: 1800000,
//             },
//           },
//         ],
//         location: 'OFFICE',
//       },
//     ],
//     dailyBookingTimeInMillisReal: 32400000,
//     dailyBreakTimeInMillisEffective: 2700000,
//     dailyBreakTimeInMillisReal: 1800000,
//     targetWorkingTimeInMillis: 28080000,
//     overtimeInMillis: 1620000,
//     completePeriod: {
//       start: '2021-01-06T07:30:00',
//       end: '2021-01-06T16:30:00',
//       length: 32400000,
//     },
//   },
//   {
//     dateOfDetails: '2021-01-07',
//     bookingsList: [
//       {
//         bookingId: 167,
//         employeeId: '10',
//         breakTimeTotal: 1800000,
//         period: {
//           start: '2021-01-07T07:30:00',
//           end: '2021-01-07T16:30:00',
//           length: 32400000,
//         },
//         breakList: [
//           {
//             breakId: 150,
//             bookingId: 167,
//             period: {
//               start: '2021-01-07T12:30:00',
//               end: '2021-01-07T13:00:00',
//               length: 1800000,
//             },
//           },
//         ],
//         location: 'OFFICE',
//       },
//     ],
//     dailyBookingTimeInMillisReal: 32400000,
//     dailyBreakTimeInMillisEffective: 2700000,
//     dailyBreakTimeInMillisReal: 1800000,
//     targetWorkingTimeInMillis: 28080000,
//     overtimeInMillis: 1620000,
//     completePeriod: {
//       start: '2021-01-07T07:30:00',
//       end: '2021-01-07T16:30:00',
//       length: 32400000,
//     },
//   },
// ];
