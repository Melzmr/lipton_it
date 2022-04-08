import { useState } from 'react';
import { Button, Caption, Gallery, Headline, Radio, Subhead, Text } from '@vkontakte/vkui';
import { useRouterStore } from '../../store';
import { PanelIds } from '../../init/routerEnums';
import { Image } from '../../components/Image';
import { TestQuestion, TTestData } from '../../store/testsMocks';
import { fetchData } from '../../api/Api';

function Question({
  title,
  index,
  len,
  data,
  _id,
  onClick,
}: TestQuestion & {
  index: number;
  len: number;
  onClick: (answer: 0 | 1, questionId: string) => void;
}): JSX.Element {
  const [selected, setSelected] = useState<0 | 1>(0);

  return (
    <>
      <Subhead style={{ color: 'var(--text_secondary)' }}>
        Вопрос {index + 1} из {len}
      </Subhead>
      <Headline weight="regular">{title}</Headline>
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
          <a target="_blank" href={data[0]} rel="noreferrer" style={{ display: 'block', marginRight: 12 }}>
            <Image imgUrl={data[0]} />
          </a>
          <Text weight="regular" style={{ color: 'var(--text_secondary)', paddingTop: 12 }}>
            1 вариант
          </Text>
        </div>
        <div>
          <a target="_blank" href={data[1]} rel="noreferrer" style={{ display: 'block', marginRight: 12 }}>
            <Image imgUrl={data[1] ?? ''} />
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
            onClick(selected, _id);
          }}
        >
          {index === len - 1 ? 'Завершить тест' : 'Следующий вопрос'}
        </Button>
      </div>
    </>
  );
}

export function SideBySideContent({ title, questions }: TTestData): JSX.Element {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const setActivePanel = useRouterStore((state) => state.setActivePanel);

  const handleOnClick = async (answer: 0 | 1, questionId: string) => {
    await fetchData('/results', 'POST', {
      questionId,
      data: `${answer}`,
    });
    if (currentQuestion === questions.length - 1) {
      setActivePanel(PanelIds.Success, { testName: title });
    } else {
      setCurrentQuestion((state) => state + 1);
    }
  };

  return (
    <Question {...questions[currentQuestion]} index={currentQuestion} len={questions.length} onClick={handleOnClick} />
  );
}
