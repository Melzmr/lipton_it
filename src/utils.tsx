import { Icon56ComputerOutline, Icon56FragmentsOutline, Icon56RecentOutline } from '@vkontakte/icons';
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
