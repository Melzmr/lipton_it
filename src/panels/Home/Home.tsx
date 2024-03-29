import React, { memo, useEffect, useState } from 'react';
import { PanelIds } from 'init/routerEnums';
import {
  Button,
  Div,
  Group,
  Headline,
  Panel,
  PanelHeader,
  PanelSpinner,
  Placeholder,
  Spacing,
  Tabs,
  TabsItem,
} from '@vkontakte/vkui';
import { Icon56UsersOutline } from '@vkontakte/icons';
import { TPanel } from '../TPanel';
import { useRouterStore } from '../../store';
import { TestCell } from '../../components/TestCell';
import { TTest } from '../../store/testsMocks';
import { getAfterText, getCaption, getIcon } from '../../utils';
import { fetchData, vkPlatform } from '../../api/Api';

export const Home: React.FC<TPanel> = memo(({ id }) => {
  const setActivePanel = useRouterStore((state) => state.setActivePanel);
  const [availableTests, setAvailableTests] = useState<TTest[]>([]);
  const [unavailableTests, setUnavailableTests] = useState<TTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const hashParams = window.location.hash
      .replace('#', '')
      .split('&')
      .reduce((acc: Record<string, string>, cur) => {
        const [key, value] = cur.split('=');
        acc[key] = value;

        return acc;
      }, {});
    if (hashParams.test) {
      setActivePanel(PanelIds.Test, { id: hashParams.test });
      window.location.hash = '';
    }
  }, [setActivePanel]);

  useEffect(() => {
    (async () => {
      try {
        const avTests = await fetchData(`/test?user_platform=${vkPlatform}`);
        const historyTests = await fetchData(`/test/history?user_platform=${vkPlatform}`);
        const completed: (TTest & { completed: boolean })[] = [];
        const uncompleted: TTest[] = [];
        avTests.forEach((test: TTest & { completed: boolean }) => {
          if (test.completed) {
            completed.push(test);
          } else {
            uncompleted.push(test);
          }
        });
        setAvailableTests(uncompleted.reverse());
        setUnavailableTests([...completed.reverse(), ...historyTests.reverse()]);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Panel id={id}>
      <Group separator="hide">
        <PanelHeader separator={false}>Исследования</PanelHeader>
        <Spacing style={{ padding: 0 }} separator />
        <Div style={{ paddingTop: 0, paddingBottom: 0 }}>
          <Tabs>
            <TabsItem selected>Главная</TabsItem>
            <TabsItem onClick={() => setActivePanel(PanelIds.MyTests)} selected={false}>
              Мои исследования
            </TabsItem>
          </Tabs>
        </Div>
        <Spacing separator />

        <Div>
          {error && <Placeholder>Ошибка</Placeholder>}
          {loading && <PanelSpinner />}
          {!error && !loading && !availableTests.length && !unavailableTests.length && (
            <Placeholder icon={<Icon56UsersOutline />}>Пока нет доступных тестов</Placeholder>
          )}
          {!error && !loading && (
            <>
              {!!availableTests.length && (
                <>
                  <Headline weight="regular" style={{ paddingBottom: 24 }}>
                    Доступные исследования
                  </Headline>
                  {availableTests.map(({ _id: id, testType, title, status }) => (
                    <TestCell
                      key={id}
                      caption={getCaption(testType)}
                      before={getIcon(testType)}
                      after={getAfterText(status)}
                      actions={
                        <Button mode="secondary" onClick={() => setActivePanel(PanelIds.Test, { id })}>
                          Пройти
                        </Button>
                      }
                    >
                      {title}
                    </TestCell>
                  ))}
                </>
              )}
              {!!unavailableTests.length && (
                <>
                  <Headline
                    weight="regular"
                    style={{
                      paddingBottom: 24,
                      ...(!!availableTests.length && { paddingTop: 36 }),
                    }}
                  >
                    История исследований
                  </Headline>
                  {unavailableTests.map(({ _id, testType, title, status }) => (
                    <TestCell
                      key={_id}
                      caption={getCaption(testType)}
                      before={getIcon(testType)}
                      after={getAfterText(status)}
                      style={{ opacity: 0.4 }}
                    >
                      {title}
                    </TestCell>
                  ))}
                </>
              )}
            </>
          )}
          {/*  <Button onClick={() => setActiveModal(ModalIds.TestModal)} size="m" stretched>Open modal</Button> */}
          {/*  <Button onClick={() => setActivePanel(PanelIds.Test, { id: 5 })} size="m" stretched>Open Test</Button> */}
        </Div>
      </Group>
    </Panel>
  );
});
