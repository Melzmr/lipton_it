import { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import { Div, Group, Panel, PanelHeader, Spacing, Tappable, Text } from '@vkontakte/vkui';
import { Icon28ChevronLeftOutline } from '@vkontakte/icons';
import { TPanel } from '../TPanel';
import { useRouterStore } from '../../store';

import { TTest } from '../../store/testsMocks';
import { SideBySideStat } from './SideBySideStat';
import { FirstClickStat } from './FirstClickStat';
import { FiveSecStat } from './FiveSecStat';
import { fetchData } from '../../api/Api';

export type TQuestion = {
  _id: string;
  title: string;
  testId: TTest['_id'];
  data: string[];
};

export type TResult = {
  _id: string;
  questionId: TQuestion['_id'];
  userId: string;
  data: string;
  createdAt: string;
};

export interface IQuestionWithResults extends TQuestion {
  results: TResult[];
}

export interface IStatistic extends TTest {
  questions: IQuestionWithResults[];
}

export const Statistic: FC<TPanel> = memo(({ id }) => {
  const closeActivePanel = useRouterStore((state) => state.closeActivePanel);
  const panelParams = useRef(useRouterStore((state) => state.panelParams[state.panelParams.length - 1]));

  const [results, setResults] = useState<IStatistic | null>(null);

  useEffect(() => {
    const testId = panelParams.current?.testId as string;

    const getResults = async (testId: string) => {
      const data: IStatistic = await fetchData(`/results/${testId}`);
      setResults(data);
    };

    getResults(testId);
  }, []);

  const renderStatistic = useCallback(() => {
    if (!results) return null;

    return results.questions.map((question, idx) => {
      switch (results.testType) {
        case 'first_click':
          return (
            <FirstClickStat
              sep={idx !== 0}
              question={question}
              title={`Вопрос ${idx + 1} из ${results.questions.length}`}
            />
          );
        case 'five_sec':
          return (
            <FiveSecStat
              sep={idx !== 0}
              question={question}
              title={`Вопрос ${idx + 1} из ${results.questions.length}`}
            />
          );
        case 'side_by_side':
          return (
            <SideBySideStat
              sep={idx !== 0}
              question={question}
              title={`Вопрос ${idx + 1} из ${results.questions.length}`}
            />
          );
      }
    });
  }, [results]);

  return (
    <Panel id={id}>
      <Group separator="hide">
        <PanelHeader
          separator={false}
          left={
            <Tappable
              onClick={closeActivePanel}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 10px 2px 0',
              }}
            >
              <Icon28ChevronLeftOutline fill="var(--icon_medium)" />
              <Text weight="regular" style={{ color: 'var(--text_secondary)' }}>
                Назад
              </Text>
            </Tappable>
          }
        >
          Исследования
        </PanelHeader>
        <Spacing style={{ padding: 0 }} separator />
        <Div>{renderStatistic()}</Div>
      </Group>
    </Panel>
  );
});
