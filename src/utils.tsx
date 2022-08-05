import { Icon56ComputerOutline, Icon56FragmentsOutline, Icon56RecentOutline } from '@vkontakte/icons';
import { TestStatus, TestType } from './store/testsMocks';

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

export const getAfterText = (status: TestStatus): string => {
  switch (status) {
    case 'available':
      return 'Не пройден';

    case 'completed':
      return 'Пройден';

    case 'unavailable':
      return 'Не доступен';
  }
};

export const getIcon = (type: TestType): JSX.Element => {
  switch (type) {
    case 'five_sec':
      return (
        <Icon56RecentOutline
          height={48}
          width={48}
          fill="var(--dynamic_red)"
          style={{ marginRight: 12, marginTop: 8, marginBottom: 8 }}
        />
      );

    case 'first_click':
      return (
        <Icon56ComputerOutline
          height={48}
          width={48}
          fill="var(--dynamic_green)"
          style={{ marginRight: 12, marginTop: 8, marginBottom: 8 }}
        />
      );

    case 'side_by_side':
      return (
        <Icon56FragmentsOutline
          height={48}
          width={48}
          fill="var(--dynamic_orange)"
          style={{ marginRight: 12, marginTop: 8, marginBottom: 8 }}
        />
      );
  }
};

/**
 * @param {number} num Число, для которого будет подобрана форма слова
 * @param {string} textFor1 Форма слова для "один/одно/одна"
 * @param {string} textFor2 Форма слова для "два"
 * @param {string} textForMany форма слова для "много"
 * @returns {string} возвращает корректную форму слова для соответствующего числа
 */
export const pluralString = (num: number, textFor1: string, textFor2: string, textForMany: string): string => {
  const remainderOfHundred = Math.abs(num) % 100;
  const remainderOfTen = num % 10;

  if (remainderOfHundred > 10 && remainderOfHundred < 20) {
    return textForMany;
  } else if (remainderOfTen > 1 && remainderOfTen < 5) {
    return textFor2;
  } else if (remainderOfTen === 1) {
    return textFor1;
  }

  return textForMany;
};
