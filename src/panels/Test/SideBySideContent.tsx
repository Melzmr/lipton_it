import { useState } from 'react';
import { Button, Gallery, Headline, Radio, Subhead, Text } from '@vkontakte/vkui';
import { useRouterStore } from '../../store';
import { PanelIds } from '../../init/routerEnums';
import { Image } from '../../components/Image';

function Question({
  question,
  id,
  len,
  urls,
  onClick,
}: {
  question: string;
  id: number;
  len: number;
  urls: [string, string];
  onClick: (answer: 1 | 2) => void;
}): JSX.Element {
  const [selected] = useState<1 | 2>(1);

  return (
    <>
      <Subhead style={{ color: 'var(--text_secondary)' }}>
        Вопрос {id + 1} из {len}
      </Subhead>
      <Headline weight="regular">{question}</Headline>
      <Gallery bullets={false} showArrows slideWidth="90%" style={{ marginTop: 24 }}>
        <div>
          <a target="_blank" href={urls[0]} rel="noreferrer" style={{ display: 'block', marginRight: 12 }}>
            <Image imgUrl={urls[0]} />
          </a>
          <Text weight="regular" style={{ color: 'var(--text_secondary)', paddingTop: 12 }}>
            1 вариант
          </Text>
        </div>
        <div>
          <a target="_blank" href={urls[1]} rel="noreferrer" style={{ display: 'block', marginRight: 12 }}>
            <Image imgUrl={urls[1]} />
          </a>
          <Text weight="regular" style={{ color: 'var(--text_secondary)', paddingTop: 12 }}>
            2 вариант
          </Text>
        </div>
      </Gallery>
      <Subhead weight="regular" style={{ paddingTop: 32, color: 'var(--text_secondary)' }}>
        Выберите вариант ответа
      </Subhead>
      <div style={{ display: 'flex' }}>
        <Radio name="variant" value={1} checked={selected === 1}>
          1 вариант
        </Radio>
        <Radio name="variant" value={2} checked={selected === 2}>
          2 вариант
        </Radio>
      </div>
      <div style={{ textAlign: 'right' }}>
        <Button style={{ marginTop: 24 }} onClick={() => onClick(selected)}>
          Следующий вопрос
        </Button>
      </div>
    </>
  );
}

const mockQuestions: { question: string; id: number; urls: [string, string] }[] = [
  {
    id: 0,
    question: 'Какой дизайн красивее?))',
    urls: [
      'https://vkpay.com/index/images/desktop_header_image2x.png',
      'https://vkpay.com/index/images/desktop_header_image2x.png',
    ],
  },
  {
    id: 1,
    question: 'Какой дизайн красивее?))',
    urls: [
      'https://vkpay.com/index/images/desktop_header_image2x.png',
      'https://vkpay.com/index/images/desktop_header_image2x.png',
    ],
  },
  {
    id: 2,
    question: 'Какой дизайн красивее?))',
    urls: [
      'https://vkpay.com/index/images/desktop_header_image2x.png',
      'https://vkpay.com/index/images/desktop_header_image2x.png',
    ],
  },
  {
    id: 3,
    question: 'Какой дизайн красивее?))',
    urls: [
      'https://vkpay.com/index/images/desktop_header_image2x.png',
      'https://vkpay.com/index/images/desktop_header_image2x.png',
    ],
  },
];

export function SideBySideContent(): JSX.Element {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const setActivePanel = useRouterStore((state) => state.setActivePanel);

  const handleOnClick = (answer: 1 | 2) => {
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
