export type TestType = 'five_sec' | 'side_by_side' | 'first_click';

export type TestStatus = 'available' | 'completed' | 'unavailable';

export type TTest = {
  _id: string;
  userId: string;
  testType: TestType;
  title: string;
  status: TestStatus;
  createdAt: string;
  counter?: number;
  completed?: boolean;
};

export type ISODate = string;

export type TestQuestion = {
  description: string;
  testId: string;
  title: string;
  _id: string;
  data: [string, string?];
};

export type TTestData = {
  createdAt: ISODate;
  description: string;
  questions: TestQuestion[];
  status: TestStatus;
  testType: TestType;
  title: string;
  userId: string;
  _id: string;
};

export const mocks: TTest[] = [
  {
    _id: '1',
    userId: '1',
    testType: 'five_sec',
    title: 'Тест от команды VK Pay',
    status: 'available',
    createdAt: '2022-04-07T21:15:54.478Z',
  },
  {
    _id: '2',
    userId: '1',
    testType: 'side_by_side',
    title: 'Тест от команды VK Pay',
    status: 'available',
    createdAt: '2022-04-07T21:15:54.478Z',
  },
  {
    _id: '3',
    userId: '1',
    testType: 'first_click',
    title: 'Тест от команды VK Pay',
    status: 'available',
    createdAt: '2022-04-07T21:15:54.478Z',
  },
  {
    _id: '4',
    userId: '5',
    testType: 'five_sec',
    title: 'Тест от команды VK Pay',
    status: 'completed',
    createdAt: '2022-04-07T21:15:54.478Z',
  },
  {
    _id: '5',
    userId: '2',
    testType: 'five_sec',
    title: 'Тест от команды VK Pay',
    status: 'unavailable',
    createdAt: '2022-04-07T21:15:54.478Z',
  },
];
