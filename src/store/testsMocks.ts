export type TestType = 'five_sec' | 'side_by_side' | 'first_click';

export type TestStatus = 'available' | 'completed' | 'unavailable';

export type TTest = {
  id: string;
  type: TestType;
  title: string;
  status: TestStatus;
};

export const mocks: TTest[] = [
  {
    id: '1',
    type: 'five_sec',
    title: 'Тест от команды VK Pay',
    status: 'available',
  },
  {
    id: '2',
    type: 'side_by_side',
    title: 'Тест от команды VK Pay',
    status: 'available',
  },
  {
    id: '3',
    type: 'first_click',
    title: 'Тест от команды VK Pay',
    status: 'available',
  },
  {
    id: '4',
    type: 'five_sec',
    title: 'Тест от команды VK Pay',
    status: 'completed',
  },
  {
    id: '5',
    type: 'five_sec',
    title: 'Тест от команды VK Pay',
    status: 'unavailable',
  },
];
