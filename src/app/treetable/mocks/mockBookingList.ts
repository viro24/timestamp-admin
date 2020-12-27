import { Node } from '../models';
import { book } from './models';

export const mockTree = {
  value: {
    details: '2020-09-01',
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
    children: [
      {
        value: {
          details: 'Buchung',
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
          children: [
            {
              value: {
                details: 'Pause',
                dailyBookingTimeInMillisReal: 32400000,
                dailyBreakTimeInMillisEffective: 2700000,
                dailyBreakTimeInMillisReal: 1800000,
                targetWorkingTimeInMillis: 28080000,
                overtimeInMillis: 1620000,
                completePeriod: {
                  start: '2020-09-01T13:30:00',
                  end: '2020-09-01T14:00:00',
                  length: 1800000,
                },
              },
            },
            {
              value: {
                details: 'Pause',
                dailyBookingTimeInMillisReal: 32400000,
                dailyBreakTimeInMillisEffective: 2700000,
                dailyBreakTimeInMillisReal: 1800000,
                targetWorkingTimeInMillis: 28080000,
                overtimeInMillis: 1620000,
                completePeriod: {
                  start: '2020-09-01T14:00:00',
                  end: '2020-09-01T14:05:00',
                  length: 60000,
                },
              },
            },
          ],
        },
      },
    ],
  },
};

export const mockBookingList: Node<book> = {
  value: {
    id: 'Tag 1', //day1
    start: '09:00',
    end: '22:00',
    sollAZ: '08:00',
    istAZ: '08:20',
    sollPause: '00:30',
    istPause: '01:10',
    überstunden: '00:20',
  },
  children: [
    {
      value: {
        id: 'Buchung 11', //booking1
        start: '09:00',
        end: '12:00',
        sollAZ: '',
        istAZ: '',
        sollPause: '',
        istPause: '',
        überstunden: '',
      },
      children: [
        {
          value: {
            id: 'Pause 111', //pause1 booking1
            start: '10:00',
            end: '10:15',
            sollAZ: '',
            istAZ: '',
            sollPause: '',
            istPause: '',
            überstunden: '',
          },
          children: [],
        },
        {
          value: {
            id: 'Pause 112', //pause2 booking1
            start: '10:50',
            end: '11:05',
            sollAZ: '',
            istAZ: '',
            sollPause: '',
            istPause: '',
            überstunden: '',
          },
          children: [],
        },
      ],
    },

    {
      value: {
        id: 'Buchung 12', //booking2
        start: '15:00',
        end: '18:00',
        sollAZ: '',
        istAZ: '',
        sollPause: '',
        istPause: '',
        überstunden: '',
      },
      children: [
        {
          value: {
            id: 'Pause 121', //pause1 booking2
            start: '16:50',
            end: '17:30',
            sollAZ: '',
            istAZ: '',
            sollPause: '',
            istPause: '',
            überstunden: '',
          },
          children: [],
        },
      ],
    },

    {
      value: {
        id: 'Buchung 13', //booking3
        start: '19:00',
        end: '22:30',
        sollAZ: '',
        istAZ: '',
        sollPause: '',
        istPause: '',
        überstunden: '',
      },
      children: [],
    },
  ],
};
