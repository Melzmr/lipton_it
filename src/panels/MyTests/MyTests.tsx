import { FC, memo, useCallback, useEffect, useState } from 'react';
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
  Switch,
  Tabs,
  TabsItem,
} from '@vkontakte/vkui';
import { fetchData } from '../../api/Api';
import { TestCell } from '../../components/TestCell';
import { TTest } from '../../store/testsMocks';
import { getCaption, getIcon } from '../../utils';
import { TPanel } from '../TPanel';
import { useRouterStore } from '../../store';
import { PanelIds } from '../../init/routerEnums';

export const MyTests: FC<TPanel> = memo(({ id }) => {
  const setActivePanel = useRouterStore((state) => state.setActivePanel);
  const [myTests, setMyTests] = useState<TTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const onTestStatusChange = useCallback(async (test: TTest) => {
    try {
      await fetchData(`/test/${test._id}`, 'PUT', {
        ...test,
        status: test.status === 'available' ? 'unavailable' : 'available',
      });
    } catch (e) {
      setError(true);
    }
  }, []);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const tests = await fetchData('/test/my');

        setMyTests(tests);
      } catch (e) {
        console.log('Error', e);
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
            <TabsItem onClick={() => setActivePanel(PanelIds.Home)} selected={false}>
              Главная
            </TabsItem>
            <TabsItem selected>Мои исследования</TabsItem>
          </Tabs>
        </Div>
        <Spacing separator />
        <Div>
          {error && <Placeholder>Ошибка</Placeholder>}
          {loading && <PanelSpinner />}
          {!error && !loading && (
            <>
              {!!myTests.length && (
                <>
                  <Headline weight="regular" style={{ paddingBottom: 24 }}>
                    Доступные исследования
                  </Headline>
                  {myTests.map((test) => (
                    <TestCell
                      key={test._id}
                      caption={getCaption(test.testType)}
                      before={getIcon(test.testType)}
                      after={
                        <Switch
                          aria-label="Включить"
                          onChange={() => {
                            onTestStatusChange(test);
                          }}
                        />
                      }
                      actions={
                        <Button mode="secondary" onClick={() => setActivePanel(PanelIds.Test, { id: test._id })}>
                          Пройти
                        </Button>
                      }
                    >
                      {test.title}
                    </TestCell>
                  ))}
                </>
              )}
            </>
          )}
        </Div>
      </Group>
    </Panel>
  );
});
