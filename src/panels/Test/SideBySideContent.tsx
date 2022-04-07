import { useState } from 'react';
import { Button, Caption, Gallery, Headline, Radio, Subhead, Text } from '@vkontakte/vkui';
import { useRouterStore } from '../../store';
import { PanelIds } from '../../init/routerEnums';
import { Image } from '../../components/Image';
import { TTest } from '../../store/testsMocks';

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
  onClick: (answer: 0 | 1) => void;
}): JSX.Element {
  const [selected, setSelected] = useState<0 | 1>(0);

  return (
    <>
      <Subhead style={{ color: 'var(--text_secondary)' }}>
        Вопрос {id + 1} из {len}
      </Subhead>
      <Headline weight="regular">{question}</Headline>
      <Caption style={{ paddingTop: 6, color: 'var(--text_secondary)' }}>
        (кликните по картинке, чтобы увеличить)
      </Caption>
      <Gallery
        onChange={(idx) => setSelected(idx as 0 | 1)}
        slideIndex={selected}
        bullets={false}
        showArrows
        slideWidth="90%"
        style={{ marginTop: 24 }}
      >
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
      <div style={{ display: 'flex', paddingTop: 2 }}>
        <Radio name="variant" checked={selected === 0} onClick={() => setSelected(0)}>
          1 вариант
        </Radio>
        <Radio name="variant" checked={selected === 1} onClick={() => setSelected(1)}>
          2 вариант
        </Radio>
      </div>
      <div style={{ textAlign: 'right' }}>
        <Button
          style={{ marginTop: 24 }}
          onClick={() => {
            setSelected(0);
            onClick(selected);
          }}
        >
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

export function SideBySideContent({ title }: TTest): JSX.Element {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const setActivePanel = useRouterStore((state) => state.setActivePanel);

  const handleOnClick = (answer: 0 | 1) => {
    console.log(answer);
    // TODO:
    // sendAnswerApi(answer);
    if (currentQuestion === mockQuestions.length - 1) {
      setActivePanel(PanelIds.Success, { testName: title });
    } else {
      setCurrentQuestion((state) => state + 1);
    }
  };

  return <Question {...mockQuestions[currentQuestion]} len={mockQuestions.length} onClick={handleOnClick} />;
}
