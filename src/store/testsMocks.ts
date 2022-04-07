export type TestType = 'five_sec' | 'side_by_side' | 'first_click';

export type TestStatus = 'available' | 'completed' | 'unavailable';

export type TTest = {
  _id: string;
  userId: string;
  testType: TestType;
  title: string;
  status: TestStatus;
};

export const mocks: TTest[] = [
  {
    _id: '1',
    userId: '1',
    testType: 'five_sec',
    title: 'Тест от команды VK Pay',
    status: 'available',
  },
  {
    _id: '2',
    userId: '1',
    testType: 'side_by_side',
    title: 'Тест от команды VK Pay',
    status: 'available',
  },
  {
    _id: '3',
    userId: '1',
    testType: 'first_click',
    title: 'Тест от команды VK Pay',
    status: 'available',
  },
  {
    _id: '4',
    userId: '5',
    testType: 'five_sec',
    title: 'Тест от команды VK Pay',
    status: 'completed',
  },
  {
    _id: '5',
    userId: '2',
    testType: 'five_sec',
    title: 'Тест от команды VK Pay',
    status: 'unavailable',
  },
];
