import { Node } from '../models';
import { book } from './models';

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
