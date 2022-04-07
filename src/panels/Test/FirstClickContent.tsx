import { useState } from 'react';
import { Button, Headline, Subhead } from '@vkontakte/vkui';
import { useRouterStore } from '../../store';
import { PanelIds } from '../../init/routerEnums';
import { Image } from '../../components/Image';

function Question({
  question,
  id,
  len,
  url,
  onClick,
}: {
  question: string;
  id: number;
  len: number;
  url: string;
  onClick: (answer: string) => void;
}): JSX.Element {
  return (
    <>
      <Subhead style={{ color: 'var(--text_secondary)', paddingBottom: 2 }}>
        Вопрос {id + 1} из {len}
      </Subhead>
      <Headline weight="regular">{question}</Headline>
      <Image
        imgUrl={url}
        onClick={(e) => {
          onClick(`${e.clientX}|${e.clientY}`);
        }}
        style={{ marginTop: 24, width: '100%' }}
      />
      <div style={{ textAlign: 'right' }}>
        <Button disabled style={{ marginTop: 24 }}>
          Для ответа нажмите на картинку
        </Button>
      </div>
    </>
  );
}

const mockQuestions = [
  {
    id: 0,
    question: 'Куда бы вы нажали, чтобы увидеть полный список сервисов?',
    url: 'https://vkpay.com/index/images/desktop_header_image2x.png',
  },
  {
    id: 1,
    question: 'Куда бы вы нажали, чтобы увидеть полный список сервисов?',
    url: 'https://vkpay.com/index/images/desktop_header_image2x.png',
  },
  {
    id: 2,
    question: 'Куда бы вы нажали, чтобы увидеть полный список сервисов?',
    url: 'https://vkpay.com/index/images/desktop_header_image2x.png',
  },
];

export function FirstClickContent(): JSX.Element {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const setActivePanel = useRouterStore((state) => state.setActivePanel);

  const handleOnClick = (answer: string) => {
    console.log(answer);
    // TODO:
    // sendAnswerApi(answer);
    if (currentQuestion === mockQuestions.length - 1) {
      setActivePanel(PanelIds.Success);
    } else {
      setCurrentQuestion((state) => state + 1);
    }
  };

  return <Question {...mockQuestions[currentQuestion]} len={mockQuestions.length} onClick={handleOnClick} />;
}
