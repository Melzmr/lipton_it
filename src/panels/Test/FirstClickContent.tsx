import { useState } from 'react';
import { Button, Headline, Subhead } from '@vkontakte/vkui';
import { useRouterStore } from '../../store';
import { PanelIds } from '../../init/routerEnums';
import { Image } from '../../components/Image';
import { TestQuestion, TTestData } from '../../store/testsMocks';
import { fetchData } from '../../api/Api';

function Question({
  title,
  data,
  index,
  len,
  onClick,
  _id,
}: TestQuestion & {
  index: number;
  len: number;
  onClick: (answer: string, questionId: string) => void;
}): JSX.Element {
  return (
    <>
      <Subhead style={{ color: 'var(--text_secondary)', paddingBottom: 2 }}>
        Вопрос {index + 1} из {len}
      </Subhead>
      <Headline weight="regular">{title}</Headline>
      <Image
        imgUrl={data[0]}
        onClick={(e, left, top) => {
          const { height, width } = e.currentTarget.getBoundingClientRect();
          const widthPercentage = (((width - e.clientX + (left ?? 0)) / width) * 100).toFixed(4);
          const heightPercentage = (((height - e.clientY + (top ?? 0)) / height) * 100).toFixed(4);
          onClick(`${widthPercentage}|${heightPercentage}`, _id);
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

export function FirstClickContent({ title, questions }: TTestData): JSX.Element {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const setActivePanel = useRouterStore((state) => state.setActivePanel);

  const handleOnClick = async (answer: string, questionId: string) => {
    await fetchData('/results', 'POST', {
      questionId,
      data: answer,
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
