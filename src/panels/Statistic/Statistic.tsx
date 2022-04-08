import { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import { Div, Group, Panel, PanelHeader, Spacing, Tabs, TabsItem } from '@vkontakte/vkui';
import { TPanel } from '../TPanel';
import { useRouterStore } from '../../store';
import { PanelIds } from '../../init/routerEnums';

import { TTest } from '../../store/testsMocks';
import { SideBySideStat } from './SideBySideStat';
import { FirstClickStat } from './FirstClickStat';
import { FiveSecStat } from './FiveSecStat';

export type TQuestion = {
  _id: string;
  title: string;
  testId: TTest['id'];
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
  const setActivePanel = useRouterStore((state) => state.setActivePanel);
  const panelParams = useRef(useRouterStore((state) => state.panelParams[state.panelParams.length - 1]));

  const [results, setResults] = useState<IStatistic | null>(null);

  useEffect(() => {
    const testId = panelParams.current?.testId as string;

    const getResults = async (testId: string) => {
      console.log(testId);
      setResults({
        testType: 'five_sec',
        questions: [
          {
            title: 'Что видели, что слышали?',
            data: ['https://vkpay.com/index/images/desktop_header_image2x.png'],
            results: [
              { data: 'На нос 🤡', createdAt: '2022-04-07T21:22:41.617Z' },
              { data: 'На нос 🤡', createdAt: '2022-04-07T21:22:41.617Z' },
              { data: 'На нос 🤡', createdAt: '2022-04-07T21:22:41.617Z' },
              { data: 'На нос 🤡', createdAt: '2022-04-07T21:22:41.617Z' },
            ],
          },
          {
            title: 'Что видели, что слышали?',
            data: ['https://vkpay.com/index/images/desktop_header_image2x.png'],
            results: [
              { data: 'На нос 🤡', createdAt: '2022-04-07T21:22:41.617Z' },
              { data: 'На нос 🤡', createdAt: '2022-04-07T21:22:41.617Z' },
              { data: 'На нос 🤡', createdAt: '2022-04-07T21:22:41.617Z' },
              { data: 'На нос 🤡', createdAt: '2022-04-07T21:22:41.617Z' },
            ],
          },
          {
            title: 'Что видели, что слышали?',
            data: ['https://vkpay.com/index/images/desktop_header_image2x.png'],
            results: [
              { data: 'На нос 🤡', createdAt: '2022-04-07T21:22:41.617Z' },
              { data: 'На нос 🤡', createdAt: '2022-04-07T21:22:41.617Z' },
              { data: 'На нос 🤡', createdAt: '2022-04-07T21:22:41.617Z' },
              { data: 'На нос 🤡', createdAt: '2022-04-07T21:22:41.617Z' },
            ],
          },
        ],
      } as IStatistic);
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
        <PanelHeader separator={false}>Исследования</PanelHeader>
        <Spacing style={{ padding: 0 }} separator />
        <Div style={{ paddingTop: 0, paddingBottom: 0 }}>
          <Tabs>
            <TabsItem onClick={() => setActivePanel(PanelIds.Home)} selected={false}>
              Главная
            </TabsItem>
            <TabsItem selected>Мои исследования</TabsItem>
          </Tabs>
        </Div>
        <Spacing separator />
        <Div>{renderStatistic()}</Div>
      </Group>
    </Panel>
  );
});
