export type TestType = 'five_sec' | 'side_by_side' | 'first_click';

export type TestStatus = 'available' | 'completed' | 'unavailable';

export type TTest = {
  id: string;
  testType: TestType;
  title: string;
  status: TestStatus;
  createdAt: string;
};

export const mocks: TTest[] = [
  {
    id: '1',
    testType: 'five_sec',
    title: 'Тест от команды VK Pay',
    status: 'available',
    createdAt: '2022-04-07T21:15:54.478Z',
  },
  {
    id: '2',
    testType: 'side_by_side',
    title: 'Тест от команды VK Pay',
    status: 'available',
    createdAt: '2022-04-07T21:15:54.478Z',
  },
  {
    id: '3',
    testType: 'first_click',
    title: 'Тест от команды VK Pay',
    status: 'available',
    createdAt: '2022-04-07T21:15:54.478Z',
  },
  {
    id: '4',
    testType: 'five_sec',
    title: 'Тест от команды VK Pay',
    status: 'completed',
    createdAt: '2022-04-07T21:15:54.478Z',
  },
  {
    id: '5',
    testType: 'five_sec',
    title: 'Тест от команды VK Pay',
    status: 'unavailable',
    createdAt: '2022-04-07T21:15:54.478Z',
  },
];
