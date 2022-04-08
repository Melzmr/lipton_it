import { Button, Headline, Subhead, Textarea } from '@vkontakte/vkui';
import { useEffect, useState } from 'react';
import { useRouterStore } from '../../store';
import { PanelIds } from '../../init/routerEnums';
import { TestQuestion } from '../../store/testsMocks';
import { Image } from '../../components/Image';
import { fetchData } from '../../api/Api';

function Question({
  title,
  data,
  _id,
  len,
  onClick,
  index,
}: TestQuestion & {
  len: number;
  onClick: (answer: string, questionId: string) => void;
  index: number;
}) {
  const [value, setValue] = useState<string>();
  const [showImage, setShowImage] = useState(true);

  useEffect(
    () => () => {
      setValue('');
      setShowImage(true);
    },
    [index],
  );

  return showImage ? (
    <Image
      imgUrl={data[0]}
      onLoadCallback={() =>
        setTimeout(() => {
          setShowImage(false);
        }, 5000)
      }
    />
  ) : (
    <>
      <Subhead style={{ color: 'var(--text_secondary)', paddingBottom: 2 }}>
        Вопрос {index + 1} из {len}
      </Subhead>
      <Headline weight="regular">{title}</Headline>
      <Subhead style={{ color: 'var(--text_secondary)', paddingTop: 24, paddingBottom: 6 }}>Ответ</Subhead>
      <Textarea onChange={(ev) => setValue(ev.target.value)} value={value} placeholder="Напишите развёрнуто..." />
      <div style={{ textAlign: 'right' }}>
        <Button
          disabled={!value}
          onClick={() => {
            if (value) {
              onClick(value, _id);
            }
          }}
          style={{ marginTop: 24 }}
        >
          {index === len - 1 ? 'Завершить тест' : 'Следующий вопрос'}
        </Button>
      </div>
    </>
  );
}

export function Questions({ questions, title }: { questions: TestQuestion[]; title: string }): JSX.Element {
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
