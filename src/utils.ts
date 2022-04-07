import { TestType } from './store/testsMocks';

export const getCaption = (type: TestType): string => {
  switch (type) {
    case 'five_sec':
      return '5 Sec Test';

    case 'first_click':
      return 'First Click';

    case 'side_by_side':
      return 'Side by Side';
  }
};
