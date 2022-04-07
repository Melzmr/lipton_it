import { Button, Placeholder } from '@vkontakte/vkui';
import { Icon56ComputerOutline, Icon56FragmentsOutline, Icon56RecentOutline } from '@vkontakte/icons';
import { useState } from 'react';
import { TestType, TTest } from '../../store/testsMocks';
import { FirstClickContent } from './FirstClickContent';
import { FiveSecContent } from './FiveSecContent';
import { SideBySideContent } from './SideBySideContent';

const getContent = (type: TestType): { text: string; icon: JSX.Element; startContent?: JSX.Element } => {
  switch (type) {
    case 'first_click':
      return {
        text: 'Вы увидите вопрос и картинку. Нажмите на картинку в том месте, в котором считаете нужным. время не ограничено.',
        icon: <Icon56ComputerOutline fill="var(--dynamic_green)" />,
        startContent: <FirstClickContent />,
      };
    case 'five_sec':
      return {
        text: 'Вы увидите картинку на протяжении 5 секунд. Потом нужно будет ответить на вопрос.',
        icon: <Icon56RecentOutline fill="var(--dynamic_red)" />,
        startContent: <FiveSecContent />,
      };
    case 'side_by_side':
      return {
        text: 'В каждом вопросе будет 2 картинки. Нужно выбрать один вариант ответа. Таймера нет.',
        icon: <Icon56FragmentsOutline fill="var(--dynamic_orange)" />,
        startContent: <SideBySideContent />,
      };
  }
};

export function TestContent({ title, testType: type }: TTest): JSX.Element {
  const { icon, text, startContent } = getContent(type);
  const [content, setContent] = useState<JSX.Element>();
  const desc = 'Пользовательское описание теста';

  return (
    content || (
      <Placeholder icon={icon} action={<Button onClick={() => setContent(startContent)}>Начать</Button>} header={title}>
        {text}
        {desc && (
          <>
            <br />
            <br />
            {desc}
          </>
        )}
      </Placeholder>
    )
  );
}
