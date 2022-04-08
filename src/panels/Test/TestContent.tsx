import { Button, Placeholder } from '@vkontakte/vkui';
import { Icon56ComputerOutline, Icon56FragmentsOutline, Icon56RecentOutline } from '@vkontakte/icons';
import { useState } from 'react';
import { TTestData } from '../../store/testsMocks';
import { FirstClickContent } from './FirstClickContent';
import { FiveSecContent } from './FiveSecContent';
import { SideBySideContent } from './SideBySideContent';

const getContent = (testData: TTestData): { text: string; icon: JSX.Element; startContent?: JSX.Element } => {
  switch (testData.testType) {
    case 'first_click':
      return {
        text: 'Вы увидите вопрос и картинку. Нажмите на картинку в том месте, в котором считаете нужным. время не ограничено.',
        icon: <Icon56ComputerOutline fill="var(--dynamic_green)" />,
        startContent: <FirstClickContent {...testData} />,
      };
    case 'five_sec':
      return {
        text: 'Вы увидите картинку на протяжении 5 секунд. Потом нужно будет ответить на вопрос.',
        icon: <Icon56RecentOutline fill="var(--dynamic_red)" />,
        startContent: <FiveSecContent {...testData} />,
      };
    case 'side_by_side':
      return {
        text: 'В каждом вопросе будет 2 картинки. Нужно выбрать один вариант ответа. Таймера нет.',
        icon: <Icon56FragmentsOutline fill="var(--dynamic_orange)" />,
        startContent: <SideBySideContent {...testData} />,
      };
  }
};

export function TestContent(testData: TTestData): JSX.Element {
  const { icon, text, startContent } = getContent(testData);
  const [content, setContent] = useState<JSX.Element>();
  const { title, description } = testData;

  return (
    content || (
      <Placeholder icon={icon} action={<Button onClick={() => setContent(startContent)}>Начать</Button>} header={title}>
        {text}
        {description && (
          <>
            <br />
            <br />
            {description}
          </>
        )}
      </Placeholder>
    )
  );
}
