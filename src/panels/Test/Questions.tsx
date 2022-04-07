import { Button, Headline, Subhead, Textarea } from '@vkontakte/vkui';
import { useState } from 'react';
import { useRouterStore } from '../../store';
import { PanelIds } from '../../init/routerEnums';

function Question({
  question,
  id,
  len,
  onClick,
}: {
  question: string;
  id: number;
  len: number;
  onClick: (answer: string) => void;
}) {
  const [value, setValue] = useState<string>();

  return (
    <>
      <Subhead style={{ color: 'var(--text_secondary)' }}>
        Вопрос {id + 1} из {len}
      </Subhead>
      <Headline weight="regular">{question}</Headline>
      <Subhead style={{ color: 'var(--text_secondary)', paddingTop: 24 }}>Ответ</Subhead>
      <Textarea onChange={(ev) => setValue(ev.target.value)} value={value} placeholder="Напишите развёрнуто..." />
      <div style={{ textAlign: 'right' }}>
        <Button
          disabled={!value}
          onClick={() => {
            if (value) {
              setValue('');
              onClick(value);
            }
          }}
          style={{ marginTop: 24 }}
        >
          Следующий вопрос
        </Button>
      </div>
    </>
  );
}

export function Questions({ questions }: { questions: { question: string; id: number }[] }): JSX.Element {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const setActivePanel = useRouterStore((state) => state.setActivePanel);

  const handleOnClick = (answer: string) => {
    console.log(answer);
    // TODO:
    // sendAnswerApi(answer);
    if (currentQuestion === questions.length - 1) {
      setActivePanel(PanelIds.Success);
    } else {
      setCurrentQuestion((state) => state + 1);
    }
  };

  return <Question {...questions[currentQuestion]} len={questions.length} onClick={handleOnClick} />;
}
