import { Icon56UsersOutline } from '@vkontakte/icons';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
  Button,
  Div,
  Group,
  Header,
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

  const copyLinkToClipboard = useCallback(async (test: TTest) => {
    try {
      await bridge.send('VKWebAppCopyText', { text: `https://vk.com/app8128820_6522588#test=${test._id}` });
    } catch (e) {
      setError(true);
    }
  }, []);

  const deleteTest = async (test: TTest) => {
    try {
      await fetchData(`/test/${test._id}`, 'DELETE');
      try {
        const tests = await fetchData('/test/my');

        setMyTests(tests);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    } catch (e) {}
  };

  useEffect(() => {
    (async function () {
      try {
        const tests = await fetchData('/test/my');

        setMyTests(tests);
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
              {myTests.length ? (
                <>
                  <Header
                    mode="primary"
                    aside={
                      <Button mode="tertiary" onClick={() => setActivePanel(PanelIds.CreateTest)}>
                        Создать тест
                      </Button>
                    }
                  >
                    Ваши тесты
                  </Header>
                  {myTests.map((test) => (
                    <TestCell
                      key={test._id}
                      caption={getCaption(test.testType)}
                      before={getIcon(test.testType)}
                      after={
                        <Switch
                          aria-label="Включить"
                          defaultChecked={test.status === 'available'}
                          onChange={() => {
                            onTestStatusChange(test);
                          }}
                        />
                      }
                      actions={
                        <>
                          <Button
                            mode="secondary"
                            onClick={() => setActivePanel(PanelIds.Statistic, { testId: test._id })}
                          >
                            Статистика
                          </Button>

                          <Button mode="tertiary" onClick={() => copyLinkToClipboard(test)}>
                            Скопировать ссылку
                          </Button>

                          <Button
                            mode="tertiary"
                            style={{ color: 'var(--destructive)' }}
                            onClick={() => deleteTest(test)}
                          >
                            Удалить тест
                          </Button>
                        </>
                      }
                    >
                      {test.title}
                    </TestCell>
                  ))}
                </>
              ) : (
                <Placeholder
                  icon={<Icon56UsersOutline />}
                  action={
                    <Button size="m" onClick={() => setActivePanel(PanelIds.CreateTest)}>
                      Создать тест
                    </Button>
                  }
                >
                  Вы не создали ни одного теста
                </Placeholder>
              )}
            </>
          )}
        </Div>
      </Group>
    </Panel>
  );
});
